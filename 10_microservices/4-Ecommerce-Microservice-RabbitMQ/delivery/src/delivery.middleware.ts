import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { IJwtPayload } from "./types/index.ts";
// jwt token doğrulama
export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // token'a eriş
    const accessToken = req.cookies.accessToken || req.headers.authorization?.substring(7);
    if (!accessToken) {
      res.status(401).json({
        status: "error",
        message: "Token bulunamadı",
      });
      return;
    }

    // token geçerli mi kontrol et
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET) as IJwtPayload;

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        status: "error",
        message: "Geçersiz token ",
      });
    } else if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        status: "error",
        message: "Token süresi dolmuş ",
      });
    } else {
      res.status(401).json({
        status: "error",
        message: "Token doğrulama hatası ",
      });
    }
  }
};

// rol kontrolü
export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: "Kullanıcı kimlik doğrulaması gerekli" });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ message: "Bu işlem için yetkiniz yok" });
      return;
    }

    next();
  };
};
