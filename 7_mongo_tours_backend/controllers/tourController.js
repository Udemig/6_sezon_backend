//API'a gelen tur ile alakalı http isteklerine cevap gönderen bütün dosyalar bu dosya da yer alacak
const Tour = require("../models/tourModel.js");
const APIFeatures = require("../utils/apiFeatures.js");
const c = require("../utils/catchAsync.js")
const factory = require('./handlerFactory.js')

// getTourStats: Zorluk seviyesine göre tur istatistiklerini hesapla
exports.getTourStats = async (req, res, next) => {
  // MongoDB Aggregation Pipeline ile istatistikleri hesapla
  const stats = await Tour.aggregate([
    // 1. Adım: Yalnızca 4.0 ve üzeri puana sahip turları filtrele
    {
      $match: { ratingsAverage: { $gte: 4.0 } },
    },
    // 2. Adım: Turları zorluk seviyesine göre grupla ve istatistikleri hesapla
    {
      $group: {
        _id: "$difficulty", // Zorluk seviyesine göre grupla
        count: { $sum: 1 }, // Her grupta kaç tur olduğunu say
        avgRating: { $avg: "$ratingsAverage" }, // Ortalama puanı hesapla
        avgPrice: { $avg: "$price" }, // Ortalama fiyatı hesapla
        minPrice: { $min: "$price" }, // En düşük fiyatı al
        maxPrice: { $max: "$price" }, // En yüksek fiyatı al
      },
    },
    // 3. Adım: Ortalama fiyata göre artan sırala
    { $sort: { avgPrice: 1 } },
    // 4. Adım: Ortalama fiyatı 500'den küçük olanları kaldır
    { $match: { avgPrice: { $gte: 500 } } },
  ]);

  // JSON yanıtı dön
  res.status(200).json({
    message: "Rapor oluşturuldu",
    stats, // Hesaplanan istatistikleri döndür
  });
};

// getMonthlyPlan: Yıla göre aylık tur istatistiklerini hesapla
exports.getMonthlyPlan = async (req, res, next) => {
  // URL parametresinden yılı al ve Number formatına çevir
  const year = Number(req.params.year);

  // MongoDB Aggregation Pipeline ile istatistikleri hesapla
  const stats = await Tour.aggregate([
    // 1. Adım: startDates dizisini açarak her tarihi ayrı bir belge haline getir
    {
      $unwind: {
        path: "$startDates",
      },
    },
    // 2. Adım: Yalnızca belirtilen yıl içinde gerçekleşen turları seç
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`), // Yılın başından itibaren
          $lte: new Date(`${year}-12-31`), // Yılın sonuna kadar olanları filtrele
        },
      },
    },
    // 3. Adım: Turları aylara göre grupla ve istatistikleri hesapla
    {
      $group: {
        _id: { $month: "$startDates" }, // Ay bazında grupla
        count: { $sum: 1 }, // Her ay kaç tur olduğunu hesapla
        tours: { $push: "$name" }, // O ay yapılan turları listele
      },
    },
    // 4. Adım: Yeni bir alan ekleyerek ay bilgisini düzenle
    {
      $addFields: {
        month: "$_id", // "_id" yerine "month" alanı ekle
      },
    },
    // 5. Adım: "_id" alanını kaldırarak gereksiz veriyi temizle
    {
      $project: {
        _id: 0,
      },
    },
    // 6. Adım: Aylara göre artan sıralama yap
    {
      $sort: { month: 1 },
    },
  ]);

  // JSON yanıtı dön
  res.status(200).json({
    message: `${year} yılı için aylık plan oluşturuldu`,
    stats, // Hesaplanan istatistikleri döndür
  });
};

// günün fırsatları için gerekli filtrelemeyi ayarlar
exports.aliasTopTours = async (req, res, next) => {
  req.query.sort = "-ratingsAverage,-ratingsQuantity";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  req.query["price[lte]"] = 1200;
  req.query.limit = 5;

  next();
};

//handlerFactory'den bütün verileri çekme fonksiyonunu çağırdık ve çekilecek veri türünün Tour olduğunu belirledik.
exports.getAllTours = factory.getAll(Tour);

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({ message: "Yeni tur oluşturuldu", tour: newTour });
  } catch (error) {
    res.status(400).json({ message: "Bir hata oluştu", error: error.message });
  }
};

// id'sine göre bir tur döndüren fonksiyon
exports.getTour = async (req, res) => {
  console.log(req.params);
  console.log(req.params.id);
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({ message: "Bir tur alındı", tour });
  } catch (error) {
    res.status(400).json({ message: "Bir hata oluştu", error: error.message });
  }
};

//id'sine göre bir turu güncelle
exports.updateTour = factory.updateOne(Tour)

//id'sine göre bir turu sil
exports.deleteTour = factory.deleteOne(Tour)