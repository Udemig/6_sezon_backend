import type { AddressInput, LoginInput, RegisterInput } from "./auth.dto.ts";
import User from "./auth.model.ts";
import type { IAddress, IAuthResponse, IJwtPayload, IUser } from "./types/index.ts";
import jwt from "jsonwebtoken";

// Business logic'i yöneticek ve veritabanı ile iletişime geç
class AuthService {
  constructor() {}

  // Token oluşturma
  private generateTokens(user: IUser): { accessToken: string; refreshToken: string } {
    const accessToken = jwt.sign({ userId: user?._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign({ userId: user?._id }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    return { accessToken, refreshToken };
  }

  // Kullanıcı kaydı
  async register(userData: RegisterInput): Promise<IAuthResponse> {
    // email kontrolü
    const existingUser = await User.findOne({ email: userData.email });

    // email kullnıyorsa hata gönder
    if (existingUser) {
      throw new Error("Email zaten kullanımda");
    }

    // kullanııcyı oluştur
    const user = new User(userData);
    await user.save();

    // tokenları oluştur
    const tokens = this.generateTokens(user);

    // client'a gönderilecek cevabı hazırla
    return {
      status: "success",
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          role: user.role,
        },
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    };
  }

  // Kullanıcı giriş
  async login(loginData: LoginInput): Promise<IAuthResponse> {
    // kullanıcı kontrolü
    const user = await User.findOne({ email: loginData.email });
    if (!user) {
      throw new Error("Geçersiz email veya şifre");
    }

    // şifre kontrolü
    const isPassValid = await user.comparePassword(loginData.password);
    if (!isPassValid) {
      throw new Error("Geçersiz email veya şifre");
    }
    // token oluştur
    const tokens = this.generateTokens(user);

    return {
      status: "success",
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          role: user.role,
        },
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    };
  }

  // Token yenileme
  async refresh(refreshToken: string): Promise<{ accessToken: string }> {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET) as IJwtPayload;
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error("Geçersiz refresh token");
    }

    const token = this.generateTokens(user);

    return { accessToken: token.accessToken };
  }

  // adress ekle
  async addAddress(
    userId: string,
    addressData: AddressInput
  ): Promise<{ status: string; data: { addresses: IAddress[] | undefined } }> {
    const user = await User.findById(userId);

    // eğer yeni adres varsayılan ise, diğer adresleri varsayılandan çıkar
    if (addressData.isDefault) {
      user?.addresses.forEach((addr) => (addr.isDefault = false));
    }

    // yeni adresi ekle
    user?.addresses.push(addressData);
    await user?.save();

    return {
      status: "success",
      data: {
        addresses: user?.addresses,
      },
    };
  }
}

export default new AuthService();
