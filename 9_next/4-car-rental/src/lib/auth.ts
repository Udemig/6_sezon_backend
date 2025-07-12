import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

// Password hashing
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// JWT token handling
export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "30d" });
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

// Email verification token
export function generateEmailVerificationToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

// Password reset token
export function generatePasswordResetToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

// Password reset expiry (1 hour)
export function getPasswordResetExpiry(): Date {
  return new Date(Date.now() + 60 * 60 * 1000);
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  isEmailVerified: boolean;
}
