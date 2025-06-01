const errorHandler = (err, req, res, next) => {
    // gönderilecen bilgileri belirle
    const errStatus = err.status || 500;
    const errMessage = err.message || "Bilinmeyen Hata";
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
