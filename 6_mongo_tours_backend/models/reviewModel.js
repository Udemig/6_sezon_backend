const { Schema, model } = require("mongoose");
const Tour = require("../models/tourModel");

// Review tarzındaki verilerimizin taslağını, yani verimizin içinde hangi değerlerin tutulacağını, hangilerinin zorunlu olduğunu, bu veriler doldurulmadığı durumda gönderilecek hata mesajlarını vs. yazıyoruz.
const reviewSchema = new Schema(
  {
    // incelemenin yazısı
    review: {
      type: String,
      required: [true, "Yorum içeriği boş olamaz."],
    },

    // Tura verilen puan

    rating: {
      type: Number,
      max: 5,
      min: 1,
      required: [true, "Puan değeri tanımlanmalı."],
    },

    // İnceleme hangi turla alakalıysa ona bir gönderme(reference) yapıyoruz.
    tour: {
      // reference (gönderme) type'ları her zaman ObjectId şeklinde olur.
      type: Schema.ObjectId,
      ref: "Tour",
      required: [true, "İncelemenin hangi tur için yapıldığını belirtin."],
    },

    // incelemeyi atan bir kullanıcı olmak zorundadır ve bu kullanıcıyı direkt burada tutmaktansa bir referans olarak tutabiliriz
    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: [true, "Yorumu hangi kullanıcının attığı belirtilmelidir."],
    },
  },
  {
    timestamps: true,
  }
);

// yapılan sorgulardan önce kullanıcının referansını gerçek veri kaydıyla doldur

reviewSchema.pre(/^find/, function (next) {
  // id olarak tutulan user'ı gerçek user'ın isim ve foto verisiyle değiştir.
  this.populate({
    path: "user",
    select: "name photo",
  });

  // id olarak tutulan tour stringini gerçek tour verisiyle değiştir (sadece name ve price'ı al geri kalan dursun)
  this.populate({
    path: "tour",
    select: "name price",
  });

  next();
});

// her bir Review için onunla alakalı Tour'un istatistiğini güncelleyen ve hesaplayan bir fonksiyon yazalım
reviewSchema.statics.calcAverage = async function (tourId) {
  // aggregate ile istatistik hesapla
  const stats = await this.aggregate([
    // 1) parametre olarak gelen turun id'si ile eşleşen incelemeleri alalım
    { $match: { tour: tourId } },

    // 2) toplam inceleme sayısını ve sayıların ortalama değerini hesapla
    {
      $group: {
        // tur bazında gruplama yap
        _id: "$tour",
        // toplam kaç yorum olduğunu say
        nRating: { $sum: 1 },
        // rating alanının ortalamasını hesapla
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  // tura atılan yorum varsa hesaplanan istatistikleri tur belgesine kaydet, eğer tura atılan yorum yoksa varsayılan bir değer kaydet
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: stats[0].avgRating,
      ratingsQuantity: stats[0].nRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: 3,
      ratingsQuantity: 0,
    });
  }
};

// Yukarıda belirlediğimiz fonksiyon sadece bir belirlemeydi, yani fonksiyonun çalışması için çağrılması gerekir.
// Biz ise bu fonksiyonun her bir yeni inceleme atıldığında çalışmasını isteriz.

// 1) her bir yeni inceleme kaydedildiğinde çalıştı
reviewSchema.post("save", function () {
  Review.calcAverage(this.tour);
});

// 2) her bir inceleme güncellendiğinde veya silindiğinde çalıştı
reviewSchema.post(/^findOneAnd/, function (document) {
  Review.calcAverage(document.tour._id);
});

// bir kullanıcının aynı tura birden fazla inceleme atmasını engelle
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

// taslağımızı kullanarak bir model (yani veritabanında ayrı bir kısım) oluşturuyoruz.
const Review = model("Review", reviewSchema);

// diğer yerlerde bu review modeline erişebilmek için export ediyoruz
module.exports = Review;
