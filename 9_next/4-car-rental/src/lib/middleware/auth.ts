import { NextRequest, NextResponse } from "next/server";
import { verifyToken, AuthUser } from "../auth";
import connectMongo from "../mongodb";
import User, { IUser } from "../models/User";

export interface AuthenticatedRequest extends NextRequest {
  user?: AuthUser;
}

export async function getAuthUser(
  request: NextRequest
): Promise<AuthUser | null> {
  try {
    const token =
      request.cookies.get("auth-token")?.value ||
      request.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return null;
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return null;
    }

    await connectMongo();
    const user = await User.findById(decoded.userId);

    if (!user) {
      return null;
    }

    return {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      isEmailVerified: user.isEmailVerified,
    };
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
}

export async function requireAuth(
  request: NextRequest
): Promise<AuthUser | NextResponse> {
  const user = await getAuthUser(request);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return user;
}

export async function requireAdmin(
  request: NextRequest
): Promise<AuthUser | NextResponse> {
  const user = await getAuthUser(request);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!user.isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return user;
}
