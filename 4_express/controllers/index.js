const fs = require("fs");
const crypto = require("crypto");
const write = require("../utils/write");

// console.log(__dirname); // bulunduğunuz klasörün yolu
// console.log(__filename); // bulunduğumuz dosyanın yolu

//! ARABA VERİLERİNİ AL
let cars = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/cars.json`, "utf-8")
);

//! 1) bütün araçları al
exports.getAllCars = (req, res) => {
  res.status(200).json({
    message: "Araç verileri alındı",
    results: cars.length,
    cars,
  });
};

//! 2) yeni araç ekle
exports.createCar = (req, res) => {
  //bunu yazdığımda body ulaşırsın ama varsayılan olarak body bölümü kapalı geliyor, bizim bunu açmamız lazım.
  console.log(req.body);

  //id eklenmeiş aaraç veriis
  const newCar = { ...req.body, id: crypto.randomUUID() };

  //yeni aracı diziye ekle
  cars.push(newCar);

  //json dosyasını güncelle
  write(cars);

  res.status(201).json({
    message: "Yeni araç oluşturuldu",
    newCar,
  });
};

//! 3) bir aracı al
exports.getCar = (req, res) => {
  res.status(200).json({
    message: "Araç bulundu",
    car: req.car,
  });
};

//! 4) bir aracı sil
exports.deleteCar = (req, res) => {
  //id'si gelen aracı diziden kaldır
  cars = cars.filter((car) => car.id !== req.params.id);

  //json dosyasını güncelle
  write(cars);

  res.status(204).json({
    message: "Araç silindi",
  });
};

//! 5) bir aracı güncelleme
exports.updateCar = (req, res) => {
  //isteğin body kısmınd akş güncellenecek verileri al
  const updateCar = req.body;

  console.log(req.car);
  console.log(updateCar);

  //aracın güncel değerlerine sahip yeni bir nesne oluştur
  const updatedCar = { ...req.car, ...updateCar };

  console.log(updatedCar);

  //güncellenecek elemanın sırasını bul
  const ındex = cars.findIndex((car) => car.id == updatedCar.id);

  //dizide ki eski aracın yerine yeni aracı koy
  cars.splice(ındex, 1, updatedCar);

  //json dosyasını güncelle
  write(cars);

  res.status(200).json({
    message: "Araç güncellendi",
  });
};
