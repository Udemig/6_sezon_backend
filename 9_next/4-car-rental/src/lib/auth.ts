import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";
import connectMongo from "./mongodb";
import User from "./models/User";

// Password hashing utilities (keep these for registration)
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// Login schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const authOptions: NextAuthOptions = {
  // Giriş seçeneği olarak sadece email ve password kullanıyoruz
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // login function
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          // Validate input
          const validatedData = loginSchema.parse({
            email: credentials.email,
            password: credentials.password,
          });

          await connectMongo();

          // Find user
          const user = await User.findOne({ email: validatedData.email });
          if (!user) {
            return null;
          }

          // Verify password
          const isPasswordValid = await verifyPassword(
            validatedData.password,
            user.password
          );
          if (!isPasswordValid) {
            return null;
          }

          // Return user object
          return {
            id: user._id.toString(),
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: user.isAdmin,
            isEmailVerified: user.isEmailVerified,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  // kullanıcı oturumunu jwt üzerinden yöneticeğimiz söylüyoruz
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // callback fonksiyonlarını konfigüre ediyoruz
  callbacks: {
    // jwt tokeni oluşuturulurken çalışır
    // token içinde saklanıcak verileri belirtiyoruz
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.isAdmin = user.isAdmin;
        token.isEmailVerified = user.isEmailVerified;
      }
      return token;
    },
    // useSesion / getSession ile kullanıcının oturum bilgilerini alırken çalışır
    // session içinde saklanıcak verileri belirtiyoruz
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.isAdmin = token.isAdmin as boolean;
        session.user.isEmailVerified = token.isEmailVerified as boolean;
      }
      return session;
    },
  },

  // sayfa yönlendirmelerini belirtiyoruz
  pages: {
    signIn: "/auth/login", // kaydolunca yönlendirilecek sayfa
    error: "/auth/error", // hata oluştuğunda yönlendirilecek sayfa
  },

  // secret keyi belirtiyoruz
  secret: process.env.NEXTAUTH_SECRET,
};

// Export registration function
export async function registerUser(userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}) {
  await connectMongo();

  // Check if user already exists
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  // Hash password
  const hashedPassword = await hashPassword(userData.password);

  // Create user
  const user = new User({
    email: userData.email,
    password: hashedPassword,
    firstName: userData.firstName,
    lastName: userData.lastName,
    phone: userData.phone,
  });

  await user.save();

  return {
    id: user._id.toString(),
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    isAdmin: user.isAdmin,
    isEmailVerified: user.isEmailVerified,
  };
}
