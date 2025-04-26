// Alınan statuscode ve message parametrelerine göre hata üretsin

const error = (statusCode, message) => {

    // yeni error oluştur

    const err = new Error(message);

    // status kodu güncelle
    err.statusCode = statusCode;

    // hatayı döndür
    return err;
}

module.exports = error;