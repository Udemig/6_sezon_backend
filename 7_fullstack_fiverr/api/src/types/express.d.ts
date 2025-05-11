import * as express from "express";

// express içerisindeki Requst interface'inin içerisine yeni veriler (userId,isSeller) eklediğimiz için
// aşşağıdaki tanım ile birlikte request interface'inin tipini genişlettik
declare global {
  namespace Express {
    interface Request {
      headers: { authorization?: string } & Headers;
      cookies: { token?: string };
      userId?: string;
      isSeller?: boolean;
    }
  }
}
