const error = (status, message) => {
    // bir error nesnesi oluştur
    const err = new Error(message);
    // hata nesnesine status bilgisi ekle
    err.status = status;
    // oluşturulan hata nesnesini döndür
    return err;
};
export default error;
