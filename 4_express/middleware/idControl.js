const fs = require("fs");

//! ARABA VERİLERİNİ AL
let cars = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/cars.json`, "utf-8")
);

module.exports = (req, res, next) => {
  //isteğe parametre olarak gelen id'li elemanı diziden al
  console.log(req.params.id);

  const found = cars.find((car) => car.id === req.params.id);

  //eğer eleman bulunamadıysa hata gönder
  if (!found)
    return res
      .status(404)
      .json({ message: "Gönderilen id'ye sahip bir araç bulunmadı" });

  //sonra ki adımda foundu erişebilmek için işteğe ekle
  req.car = found;

  next();
};
