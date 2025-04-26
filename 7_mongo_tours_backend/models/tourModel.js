// tour verisinin backendde yönetimi için schema ve model dosya da tanımlanacak
const { Schema, model, default: mongoose } = require("mongoose");
const validator = require("validator");

// veritabanına kaydedilecek olan verilerin  kısıtlamalarını yazıcaz
const tourSchema = new Schema(
  {
    name: {
      type: String,
      unique: [true, "İsim değeri benzersiz olmalı"],
      required: [true, "Tur isim değerine sahip olmalı"],
      minLength: [5, "Tur ismi en az 5 karakter olmalu"],
      maxLength: [40, "Tur ismi 40 karakterden fazla olamaz"],
      validate: [
        validator.isAlpha, // validator kütüphaneisinde geldi
        "İsimde sadece alfabetik karaketerler olmalı.",
      ],
    },
    duration: {
      type: Number,
      required: [true, "Tur süre değerine sahip olmalıdır"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "Tur max kişi sayısı değerine sahip olmalı"],
    },
    difficulty: {
      type: String,
      required: [true, "Tur zorluk değerine sahip olmalı"],
      enum: ["easy", "medium", "hard", "difficult"],
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating 1'den küçük olamaz"],
      max: [5, "Rating 5'den büyük olamaz"],
      default: 4.0,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      required: [true, "Tur fiyat değerine sahip olmalı"],
    },

    priceDiscount: {
      type: Number,
      //* custom validator (kendi yazdığımız kontrolcüler)
      // doğrulama fonksiyonu false return ederse bu doğrulamadan geçmedi ve veri veritabanına kaydedilemez anlamına gelir true return ederse verinin kaydedilmesinin önünce bir engel omadığı anlamına gelir
      // indirim değeri asıl fiyattan büyükse false değilse true döndürmeli
      validate: {
        validator: function (value) {
          return value < this.price;
        },
        message: "İndirim fiyatı asıl fiyattan büyük olamaz",
      },
    },

    summary: {
      type: String,
      maxLength: [200, "Özet alanı 200 karakteri geçemez"],
      trim: true,
      required: [true, "Tur özet değerine sahip olmalı"],
    },

    description: {
      type: String,
      maxLength: [1000, "Özet alanı 200 karakteri geçemez"],
      trim: true,
      required: [true, "Tur açıklama değerine sahip olmalı"],
    },
    imageCover: {
      type: String,
      required: [true, "Tur resim değerine sahip olmalı"],
    },
    images: {
      type: [String],
    },
    startDates: {
      type: [Date],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    hour: {
      type: Number,
    },

    // reference yani veritabanındaki başka bir veri tipine olan yönlendirme
    guides: [
      {
        type: mongoose.Schema.ObjectId, // Referans tanımlarken tipi her zaman object ID olur
        ref: "User"
      }
    ]
  },
  //şema ayarları
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//! Virtual Property(sanal)
//veri tabanında tutmamıza değmeyecek ama clienta göndermemiz gereken değerlerdir.fullname:selin atmaca
// Örn: Frontend bizden url'de kullanabilmek için tur isminin slug versiyonunu istesin
// İstenen: The City Wanderer > the-city-wanderer
// Bu tarz durumlarda: Veritabanında tutmamıza değmeyecek ama client tarafından istenilen özellikler var ise bunları veritabanında tutmak yerine verileri veritabanında alıp clienta göndermeden önce hesaplayıp virtuel property olarak ekleriz
tourSchema.virtual("slug").get(function () {
  //return "merhaba";
  return this.name.toLowerCase().replace(/ /g, "-");
});

// Örn: Client sayfada kullanmak üzere turun dolar fiyatından ziyade bizden tl fiyatını da istedi.TL fiyatı zaten dolar fiyatı üzerinden yapılacak hesaplamalar sonucu elde edilebileceği için TL fiyatını veritabanında tutmak çok mantıksız olucaktır.Bunun yerine verileri clienta göndermeden hemen önce tl fiyatını hespalayaıp virtual property olarak gönderebiliriz.
tourSchema.virtual("turkishPrice").get(function () {
  return this.price * 33;
});

//! Document Middleware
// middleware, iki olay  arasında çalışan yapı.
// Bir belgenin kaydedilme güncelleme silinme okunma gibi olylarından önce veya sonra işlem gerçkeleştirmek istiyorsak kullanırız.
// Client'tan gelen turun veritbanına kaydedilmeden hemen önce kaç saat sürdüğünü hesapla ve veritabanına bu veriyi kaydet
tourSchema.pre("save", function (next) {
  console.log("kaydedilme işleminden hemen önce çalıştı");
  // vertibanına hour özelliğini hesaplayıp kaydeder
  this.hour = this.duration * 24;

  // sonraki adıma geçiş izni
  next();
});

//* pre() işlemden önce post() işlemden sonra middleware'i çalıştırmaya yarar
tourSchema.post("save", function (doc, next) {
  //ör; post kullanıcı yeni bir hesap oluşturduktan sonra mail/sms göndermek için kullanılabilir.
  console.log("yeni hesap oluşturma işleminden hemen sonra çalıştı");
  next();
});

//! Query Middleware
// Sorgu işlemlerinden önce veya sonra çalıştırılan middleware'lere verilen isim
tourSchema.pre("find", function (next) {
  // bundan sonraki aşamada çalışıcak sorguyu güncelle (premium olmayanları al)
  this.find({ premium: { $ne: true } });

  next();
});

//! Aggregate Middleware

// Raporlama işlemlerinden önce veya sonra çalıştırılan middleware'lere verilen isim
tourSchema.pre("aggregate", function (next) {
  // premium olanların rapora dahil edilmemesi için aggregation pipeline'a başlangıç adımı olarak premium'ları çıkaran bir adım ekliyecez
  this.pipeline().unshift({ $match: { premium: { $ne: true } } });

  next();
});

//* pre() işlemden önce post() işlemden sonra middleware'i çalıştırmaya yarar
tourSchema.post("aggregate", function (doc, next) {
  console.log("raporlama işleminden hemen sonra çalıştı");
  next();
});


// Turları veritabanından çekmeye çalıştığımızda rehberleri ID olarak değil, gerçekten rehber nesneleri olarak gönder.

tourSchema.pre(/^find/, function (next){
  // sorgudaki rehberler dizisi şuan sadece IDleri tutuyor, kullanıcıya göndermeden önce bu verileri gerçek kullanıcılarla değiştir
  this.populate({
    path: "guides",
    // populate işlemi yaparken yani ID kullanarak gerçek kullanıcı verilerini çekerken almayacağımız kısımları belirtiyoruz.
    select:
    "-password -__v -passResetToken -passResetExpires -passChangedAt"
  });

  next();
})



//model oluştur (veritanaınd akş tur verisini yönetmek için kullanacağız)
const Tour = model("Tour", tourSchema);

module.exports = Tour;
