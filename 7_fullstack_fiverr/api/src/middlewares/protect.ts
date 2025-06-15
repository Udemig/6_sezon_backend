import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import e from "../utils/error.js";
import { config } from "../config/enviroment.js";

// Cookie ile gelen JWT Token'ı üzerinden kullanıcının kimiliğini doğrulayacak mw
const protect = (req: Request, res: Response, next: NextFunction): void => {
  //1) çerezler / header'la gelen tokena eriş
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

  //2) token yoksa: hata ver
  if (!token) {
    return next(e(403, "Yekiniz yok (Token bulunamadı)"));
  }

  //3) token varsa: geçerli mi kontrol et
  jwt.verify(token, config.JWT_SECRET as string, (err: any, payload: any) => {
    // 4) token geçersiz ise: hata ver
    if (err) {
      return next(e(403, "Tokenınız geçersiz veya süresi dolmuş"));
    }

    //5) token geçerliyse: req nesnesi içerisine kullanıcı bilgilerini ekle
    // bu sayede bu mw'den sonra çalışcak fonksiyonlar kullanıcı id'si ve role'üne sahip olucak
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
  });

  //6) sonraki adıma devam et
  next();
};

export default protect;
