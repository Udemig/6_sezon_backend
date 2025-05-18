type ExtendedError = Error & { status: number };

const error = (status: number, message: string) => {
  // bir error nesnesi oluştur
  const err = new Error(message) as ExtendedError;

  // hata nesnesine status bilgisi ekle
  err.status = status;

  // oluşturulan hata nesnesini döndür
  return err;
};

export default error;
