import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { LoginReq, RegisterReq } from "../types";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import upload from "../utils/cloudinary";
import c from "../utils/catch-async";
import e from "../utils/error";

// ----------- Kaydol ---------------- Yeni Hesap Oluştur
const register = c(async (req: RegisterReq, res: Response, next: NextFunction): Promise<void> => {
  // şifreyi saltla ve hashla
  const hashedPass: string = bcrypt.hashSync(req.body.password, 12);

  // fotoğrafı buluta yükle
  const image = await upload(next, req.file?.path as string, "avatars", 200, 200, "fill", "auto");

  // kullanıcıyı veritbanına kaydet
  const newUser = await User.create({
    ...req.body,
    password: hashedPass,
    profilePicture: image.secure_url,
  });

  // client'a cevap gönder
  res.json({ message: "Hesabınız Oluşturuldu", user: newUser });
});

// ----------- Giriş Yap ------------- Mevcut Hesapta Oturum Aç
const login = c(async (req: LoginReq, res: Response, next: NextFunction): Promise<void> => {
  // ismine göre kullanıcyı ara
  const user = await User.findOne({
    username: req.body.username,
  });

  // kullanıcı bulunumazsa hata gönder
  if (!user) {
    return next(e(404, "Giriş bilgileriniz yanlış"));
  }

  // veritabanın gelen hashlenmiş şifre ile isteğin body'sinden gelen normal şifreyi karşılaştır
  const isPassCorrect: boolean = bcrypt.compareSync(req.body.password, user.password);

  // şifreler aynı değilse hata gönder
  if (!isPassCorrect) {
    return next(e(404, "Giriş bilgileriniz yanlış"));
  }

  // şifreler aynı ise jwt tokeni oluştur
  const token = jwt.sign({ id: user._id, isSeller: user.isSeller }, process.env.JWT_SECRET as string, {
    expiresIn: Number(process.env.JWT_EXPIRES),
  });

  // token'ı ve diğer bilgieri client'a gönder
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      expires: new Date(Date.now() + 14 * 24 * 3600 * 1000),
    })
    .json({ message: "Giriş Yapıldı", user });
});

// ----------- Çıkış Yap ------------- Mevcut Oturumu Kapat
const logout = c(async (req: Request, res: Response): Promise<void> => {
  res.clearCookie("token").status(200).json({
    message: "Hesaptan çıkış yapıldı",
  });
});

// ----------- Profile --------------- Profil Bilgilerini Görünütüle
const getProfile = c(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // protect mw'den gelen req nesnesi içerisindeki kullanıcı id'sinden yola çıkarak kullanıcının bilgilerini sorguladık
  const user = await User.findById(req.userId);

  // eğer kullanıcı bulunamadıysa
  if (!user) {
    return next(e(404, "Kullanıcı bulunamadı"));
  }

  // client'a cevap gönder
  res.status(200).json({
    message: "Profile Verileriniz Hazırlandı",
    user,
  });
});

export { register, login, logout, getProfile };
