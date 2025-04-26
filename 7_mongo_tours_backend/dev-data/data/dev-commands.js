// Geliştirme aşamasında mongodb deki verilerin bozılması sıkça karşılaştığımız bir durum ve bu durumda database deki verileri silip json dosyasında ki verileri tekrardan aktarmamız gerekicek bunu arayüzden yapmak uğraştuırcı olucağı için 2 fonksiyon hazırlaycağız.

const fs = require("fs");
const mongoose = require("mongoose");
const Tour = require("../../models/tourModel.js");
const Review = require("../../models/reviewModel.js");

//json dosyasında verileri al
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`));

// dotenv kütüphanesini çevre değişkenlerine erişmek için kuruyoruz.
require("dotenv").config();

// mongo veritabanına bağlan (driver)
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log(" 😍 Veritabanı ile bağlantı kuruldu."))
  .catch((err) => console.log(" 🤬 veritabanına bağlanırken hata oluştu", err));

//devdata klasöründeki json dosyalarından verileri alıp mpngodb ye aktar
const importData = async () => {
  try {

    // tours yani json dosyasında tuttuğumuz örnek tur verilerini alttaki komut ile Mongo'daki koleksiyonumuza aktarmış olduk, validateBeforeSave = false diyerek de içerideki veriler modele uygun mu değil mi kontrol etme demiş olduk

    await Tour.create(tours, { validateBeforeSave: false });
    await Review.create(reviews, {validateBeforeSave: false});
    console.log("Json verileri koleksiyona aktarıldı");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

//mongodb deki dataları silecek

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await Review.deleteMany();
    console.log("Bütün veriler temizlendi");
  } catch (error) {
    console.log(error);
  }

  process.exit();
};

console.log(process.argv);

//komutun sonuna eklenen argümana göre çalışacak fonskiyonu belitliyoruz.
if (process.argv.includes("--import")) {
  importData();
} else if (process.argv.includes("--delete")) {
  deleteData();
}
