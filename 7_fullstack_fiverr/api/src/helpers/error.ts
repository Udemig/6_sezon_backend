


export type ExtendedError = Error & { status:number };


//aldığı parametrelere göre hata mw(middleware)'ine gönderilecek bir error nesnesi oluştur

const error = (status:number, message:string):ExtendedError => {

    // error nesnesi oluştur
    const err = new Error(message) as ExtendedError;

    // hata nesnesine status bilgisini ekle
    err.status = status

    // döndür
    return err;
}

export default error;