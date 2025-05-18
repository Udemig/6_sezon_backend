import { NextFunction, Request, Response } from "express";

type FunctionType = (req: Request, res: Response, next: NextFunction) => Promise<any>;

// parametre olarak aldığı fonksiyonu çalıştırıcak
// eğer fonksiyonda hata olursa hata middleware'ine yönlendirecek
const catchAsync = (fn: FunctionType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
