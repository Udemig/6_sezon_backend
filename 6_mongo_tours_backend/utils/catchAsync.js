// Asenkron fonksiyonlarda hata yakalayan bir fonksiyon yazalım

// Çalıştıracağımız fonksiyonu parametre olarak alsın

// try catch bloğunda bu kodu çalıştırsın

// hata olursa hata middleware'ine yönlendirsin.

module.exports = (fn) => {
    return (req,res,next) => {
        fn(req,res,next).catch(next);
    }
}