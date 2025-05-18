import { NextFunction, Response, Request } from "express";

const errorHandler = (
  err: { status?: number; message?: string; stack?: string },
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // gönderilecen bilgileri belirle
  const errStatus: number = err.status || 500;
  const errMessage: string = err.message || "Bilinmeyen Hata";

  // terminale hata detaylarını yazdır
  console.error("Hata Detaylar", {
    message: errMessage,
    status: errStatus,
    stack: err?.stack || "Stack bilgisi yok",
  });

  // client'a cevap gönder
  res.status(errStatus).json({
    status: errStatus === 500 ? "error" : "fail",
    statusCode: errStatus,
    message: errMessage,
  });
  return;
};

export default errorHandler;
