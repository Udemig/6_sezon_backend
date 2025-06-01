// parametre olarak aldığı fonksiyonu çalıştırıcak
// eğer fonksiyonda hata olursa hata middleware'ine yönlendirecek
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
export default catchAsync;
