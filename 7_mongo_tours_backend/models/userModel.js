const { Schema, model } = require("mongoose");

const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// kullanıcı şema
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Kullanıcı isim değerine sahip olmalıdır"],
  },

  email: {
    type: String,
    required: [true, "Kullanıcı email değerine sahip olmalıdır"],
    unique: [true, "Bu eposta adresine ait kayıtlı bir hesap bulunmaktadır"],
    validate: [validator.isEmail, "Lütfen geçerli bir email giriniz"],
  },

  photo: {
    type: String,
    default: "defaultpic.webp",
  },
  password: {
    type: String, //
    required: [true, "Kullanıcı şifre değerine sahip olmalıdır"],
    minLength: [8, "Şifre en az 8 karakter içermeli"],
    validate: [validator.isStrongPassword, "Şifreniz yeterince güçlü değil"],
  },

  passwordConfirm: {
    type: String,
    required: [true, "Lütfen şifrenizi onaylayın"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Onay şifreniz eşleşmiyor",
    },
  },

  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
    default: "user",
  },

  active: {
    type: Boolean,
    default: true,
  },

  // şifrenin değiştriilme tarihini tutuyoruz
  passChangedAt: Date,

  // şifreyi değiştirmeye yarayan tokeni tutuyoruz
  passResetToken: String,

  // şifre değiştirme tokeninin geçerli olduğu tarihi tutuyoruz.
  passResetExpires: Date,

});


// 1) Veritabanına kullanıcıyı kaydetmeden önce
// * password alanını şifreleme algoritmalarından geçir.
// * passwordConfirm alanını kaldır
userSchema.pre("save", async function (next) {
  // daha önce parola hashlendiyse aşağıdaki adımları atla
  if (!this.isModified("password")) return next();

  // şifreyi hashle ve saltla
  this.password = await bcrypt.hash(this.password, 12);

  // onay şifreisni kaldır
  this.passwordConfirm = undefined;
});


// Veritabanı kullancııyı güncellemeden önce
// şifre değiştiyse şifre değişim tarihini güncelle
userSchema.pre("save",async function(next){
  if(!this.isModified("password") || this.isNew) return next();

  // şifre değiştirildiyse değişim tarihini güncelle
  // şifre değişiminden hemen sonra jwt tokeni oluşturduğumuz için şifre değiştirme tarihini 1 saniye öncesinden ayarla

  this.passChangedAt = Date.now() - 1000
})


// GET ALL USERS
// kullanıcılar veritabanından alınmaya çalışılınca

userSchema.pre(/^find/, function (next){

  // sorgudan hesabı aktif olmayan herkesi çıkart
  // yani active değeri ne(not equal=eşit olmayan) false'a eşit olmayanlar (yani aktif hesaplar) gelsin, gerisi kalsın.
  this.find({active: {$ne: false}})

  // sonrasında fonksiyonun geri kalanı çalışabilir.
  next();
})




// şifre sıfırlama tokeni oluşturup bunu döndüren fonksiyon

userSchema.methods.createResetToken = function () {

  // 1) 32 byte'lık rastgele bir veri oluştur ve bunu hexadecimal bir diziye dönüştür

  const resetToken = crypto.randomBytes(32).toString("hex");

  // 2) tokeni hashle ve veri tabanına kaydet
  this.passResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  // 3) reset tokenimizin son geçerlilik tarihini veritabanına kaydet (15dk)
  this.passResetExpires = Date.now() + 15 * 60 * 1000;

  // tokenin normal halini fonksiyonun çağrıldığı yere geri döndür
  return resetToken;
}


// Sadece model üzerinden erişebildiğimiz fonksiyonlardan birisi (method)

// normal şifreyle hashlenmiş şifreyi karşılaştıralım
userSchema.methods.correctPass = async function (pass,hashedPass) {


  // iki şifre birbiriyle eşleşiyorsa true döndürür, eşleşmiyorsa false döndürür
  return await bcrypt.compare(pass,hashedPass)
}




//kullanıcı modeli
const User = model("User", userSchema);

module.exports = User;
