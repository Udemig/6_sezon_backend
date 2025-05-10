import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { LoginReq, RegisterReq } from "../types";
import User from "../models/user.model";
import jwt from "jsonwebtoken";

// ----------- Kaydol ---------------- Yeni Hesap Oluştur
const register = async (req: RegisterReq, res: Response): Promise<void> => {
  // şifreyi saltla ve hashla
  const hashedPass: string = bcrypt.hashSync(req.body.password, 12);

  // kullanıcıyı veritbanına kaydet
  const newUser = await User.create({
    ...req.body,
    password: hashedPass,
  });

  // client'a cevap gönder
  res.json({ message: "Hesabınız Oluşturuldul", user: newUser });
};

// ----------- Giriş Yap ------------- Mevcut Hesapta Oturum Aç
const login = async (req: LoginReq, res: Response): Promise<void> => {
  // ismine göre kullanıcyı ara
  const user = await User.findOne({
    username: req.body.username,
  });

  // kullanıcı bulunumazsa hata gönder
  if (!user) {
    res.status(404).json({ message: "Bu isimde kullanıcı bulunmadı" });
    return;
  }

  // veritabanın gelen hashlenmiş şifre ile isteğin body'sinden gelen normal şifreyi karşılaştır
  const isPassCorrect: boolean = bcrypt.compareSync(req.body.password, user.password);

  // şifreler aynı değilse hata gönder
  if (!isPassCorrect) {
    res.status(404).json({ message: "Yanlış şifre girdiniz" });
    return;
  }

  // şifreler aynı ise jwt tokeni oluştur
  const token = jwt.sign({ id: user._id, isSeller: user.isSeller }, process.env.JWT_SECRET as string);

  // token'ı ve diğer bilgieri client'a gönder
  res.json({ message: "Giriş Yapıldı", token });
};

// ----------- Çıkış Yap ------------- Mevcut Oturumu Kapat
const logout = async (req: Request, res: Response): Promise<void> => {
  res.json({ message: "Çıkış Yapıldı" });
};

// ----------- Profile --------------- Profil Bilgilerini Görünütüle
const getProfile = async (req: Request, res: Response): Promise<void> => {
  res.json({ message: "Profile Verileriniz Hazırlandı" });
};

export { register, login, logout, getProfile };
