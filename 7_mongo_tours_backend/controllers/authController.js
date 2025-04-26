const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const c = require("../utils/catchAsync.js");
const e = require("../utils/error.js");
const sendMail = require("../utils/sendMail.js");
const crypto = require('crypto')

const signToken = (user_id) => {
  return jwt.sign({ id: user_id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
};

// token oluştur ve client'a gönder
const createSendToken = (user, code, res) => {
  // tokeni oluştur (parametre olarak mongoda tutulan userın idsini ver _id )
  const token = signToken(user._id);

  // jwt sadece cevap olarak gönderilmek zorunda değildir, aynı zamanda cookie olarak da gönderilebilir.

  res.cookie("jwt", token, {
    // 90 günü milisaniye türüne çevirmek için saatle, dakikayla, milisaniyeyle vs. çarptık.
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    // saldırılara karşı daha güvenli olsun
    httpOnly: true,

    // secure: true  sadece https protokülündeki (güvenli protokoldeki) domainleri seyahat eder.
  });

  // clienta göndereceğimiz cevaptan şifreyi kaldır

  user.password = undefined;

  // clienta olumlu cevap gönder
  res.status(code).json({ message: "Oturum açıldı", token, user });
};

// ---------------------- AUTHORIZATION MIDDLEWARE ---------------------------
// 1) Client'ın gönderidği tokenin geçerliliğini doğrula
// geçerliyse route'a erişime izin ver
// geçersizse hata gönder

exports.protect = c(async (req, res, next) => {
  // 1) client'tan gelen tokeni al

  let token = req.cookies.jwt || req.headers.authorization;

  //  1.2) eğer token cookie değil de header olarak geldiyse Bearer'dan sonrasını al
  if (token && token.startsWith("Bearer")) {
    token = token.split(" ")[1];
  }

  // 1.3) eğer token hiç gelmediyse hata döndür

  if (!token) {
    return next(e(401, "JWT Tokeniniz bulunmamakta, lütfen giriş yapınız."));
  }

  // 2) tokenin geçerliliğini doğrula ( zaman aşımına uğramış mı? / imzası doğru mu? )

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error.message === "jwt expired") {
      return next(
        e(403, "Oturumunuzun süresi doldu, lütfen tekrar giriş yapınız.")
      );
    }
    return next(
      e(400, "Gönderilen token geçersiz, lütfen tekrar giriş yapınız.")
    );
  }

  // 3) token ile gelen kullanıcının hesabı duruyor mu?

  const activeUser = await User.findById(decoded.id);

  if (!activeUser) {
    return next(e(404, "Böyle bir kullanıcı veritabanında yok."));
  }

  // 3.1) token ile gelen kullanıcının hesabı aktif mi?

  if (!activeUser.active) {
    return next(e(400, "Bu hesap askıya alınmıştır."));
  }

  // 4) token verildikten sonra şifre değiştirilmiş mi onu kontrol et

  if (activeUser.passChangedAt && decoded.iat) {
    // şifrenin ne zaman değiştirildiğini öğren
    const passChangedSeconds = parseInt(
      activeUser.passChangedAt.getTime() / 1000
    );

    // şifrenin değiştirilme tarihi jwt'nin oluşturulma tarihinden büyükse hata gönder

    if (passChangedSeconds > decoded.iat) {
      return next(
        e(
          401,
          "Yakın zamanda şifre değiştirdiniz, lütfen tekrar giriş yapınız.",
          res
        )
      );
    }
  }

  // EĞER BÜTÜN BU DOĞRULAMALARDAN GEÇERSE, Middleware ilerlemeye izin versin.

  req.user = activeUser;

  next();
});

exports.signUp = c(async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createSendToken(newUser, 201, res);
});

exports.login = c(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) email ve şifre geldi mi? kontrol edelim
  if (!email || !password) {
    return next(e(400, "Lütfen e-posta ve şifre giriniz."));
  }

  // 2) client'tan gelen email ile kaydedilmiş bir kullanıcı var mı? kontrol edelim

  const user = await User.findOne({ email });

  // 2.1) Kayıtlı kullanıcı yoksa eğer hata fırlat

  if (!user) {
    return next(
      e(404, "E-posta veya şifreniz yanlış ya da böyle bir kullanıcı yok.")
    );
  }

  if(!user.active){
    return next(e(401,"Bu hesap askıya alınmıştır, lütfen destek ile iletişime geçiniz."))
  }

  // 3) Client'ın gönderdiği şifre ile veritabanındaki şifre aynı mı?

  const isValid = await bcrypt.compare(password, user.password);

  // 3.1) Eğer bu veriler uyuşmuyorsa hata döndür

  if (!isValid) {
    return next(e(403, "Girdiğiniz şifre geçersiz."));
  }

  // Eğer uyuşuyorlarsa her şey tamam! Yeni bir JWT oluştur ve kullanıcıya gönder.

  createSendToken(user, 200, res);
});




// Rol bazlı yetki middleware'i

exports.restrictTo = (...roles) => 
(req,res,next) => {

  // a) izin verilen rollerin arasında mevcut kullanıcının rolü yoksa hata gönder.

  if(!roles.includes(req.user.role))
  {
    return (next(e(403,"Bu işlem için yetkiniz yok (rol yetersiz).")))
  }


  // b) eğer yetkisi varsa middleware'den geçmesine izin ver

  next();

}


// ---- ŞİFRE SIFIRLAMA AŞAMASI -----

// ---- Şifremi Unuttum? ----

// epostaya sıfırlama bağlantısı gönder

// bu fonksiyon, şifremizi SIFIRLAMAZ, sadece şifremizi sıfırlamak için gerekli tokeni ve linki oluşturur.
// Ardından biz gidip reset-password fonksiyonuna bu linki ve tokeni kullanarak istek atarız, ancak o zaman şifremiz değişir.
exports.forgotPassword = c(async (req,res,next) => {

  // epostaya göre kullanıcı hesabıne eriş

  // 1) veritabanında kullanıcıdan gelen email ile eşleşen User'ı bul
  const user = await User.findOne({ email: req.body.email })

  // 2) kullanıcı yoksa hata gönder

  if(!user) return next(e(404,"Bu mail adresine kayıtlı kullanıcı yok."));

  // 3) Şifre sıfırlama tokeni oluştur

  const resetToken = user.createResetToken();


  // 4) güncellemeleri veritabanına kaydedelim. Fakat verileri doğrulama yapmasın.
  await user.save({ validateBeforeSave: false})


  // 5) Kullanıcının mail adresine tokeni link olarak gönder.

  const url = `${req.protocol}://${req.headers.host}/api/users/reset-password/${resetToken}`

  await sendMail({
    email: user.email,
    subject: "Şifre sıfırlama bağlantısı (15 dakika)",
    text: resetToken,
    html: 
    `
    <h2>Merhaba ${user.name}</h2>
    <p>
      <b>${user.email}</b> e posta adresine bağlı tourify hesabı için şifre sıfırlama bağlantısı oluşturuldu.
    </p>
    <a href="${url}">${url}</a>
    <p>Yeni şifre ile birlikte yukarıdaki bağlantıya <b>PATCH</b> isteği atınız.</p>
    <p><b>Tourify Ekibi</b></p>
    `
  })


  // 6) client'a cevap gönder

  res.status(201).json({ message: "Şifre yenileme e-postanız gönderildi."})

})


// yeni belirlenen şifreyi kaydetme

exports.resetPassword = c(async(req,res,next)=>{

  // Tokendan yola çıkarak kullanıcıyı bul.
  const token = req.params.token;

  // 2) elimizdeki token normal olduğu için ve veritabanımızda hashlenmiş (şifrelenmiş) hali saklandığı için bunları karşılaştırmak için elimizdeki tokeni hashleyip veritabanında aratalım.

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // hashlenmiş tokenla ilişkili kullanıcıyı al

  // ve son geçerlilik tarihinin dolmamış olduğundan emin ol
  const user = await User.findOne({
    passResetToken: hashedToken,
    // tokenin bitme tarihi şu andan daha ileri bir tarihse izin ver
    passResetExpires: { $gt: Date.now()}
  });

  // 4) tokenin süresi dolmuşsa yada geçersizse hata gönder

  if(!user){
    return next(e(403,"Tokenin süresi dolmuş ya da geçersiz",res))
  }

  // 5) eğer buraya kadar sorun yoksa kullanıcının bilgilerini güncelle

  user.password = req.body.newPass;
  user.passwordConfirm = req.body.newPass;
  user.passResetToken = undefined;
  user.passResetExpires = undefined;

  await user.save();


  return res.status(200).json({success:true,message:"Şifreniz başarıyla güncellendi."})
})


// Şifre Güncelleme

// Şifremizi hatırlıyoruz ama değiştirmek istiyoruz

exports.updatePassword = c(async(req,res,next) => {

    // kullanıcı bilgilerini al
    
    const user = await User.findById(req.body.userID);

    if(!user){
      return next(e(404,"Şifresini değiştirmeye çalıştığınız hesap yok ya da askıya alınmış."))
    }
    

    // 2) gelen mevcut şifreyi teyit et, doğru mu yanlış mı?

    if(!(await user.correctPass(req.body.currentPass, user.password)))
    {
      return next(e(400,"Girdiğiniz mevcut şifre hatalı"))
    }

    // 3) doğruysa eğer yeni şifreyi kaydet

    user.password = req.body.newPass;
    user.passwordConfirm = req.body.newPass;

    // şifresi güncellenmiş kullanıcı modelini kaydet
    await user.save();




    // 4) (isteğe bağlı) Bilgilendirmek için mail gönderelim

    await sendMail({
      email: user.email,
      subject: "Tourify Hesap Şifreniz Güncellendi",
      text: "Bilgilendirme Maili",
      html:
      `
        <h1>Hesap Bilgileriniz Güncellendi.</h1>
        <p>Merhaba, ${user.name}</p>
        <p>Hesap şifrenizin başarıyla güncellendiğini bildiririz. Bu değişikliği siz yapmadıysanız lütfen iletişime geçiniz.</p>

        <p>Saygılarımızla,</p>
        <p><b>Tourify Ekibi</b></p>
      `
    })

    // (isteğe bağlı) tekrar giriş yapmasın diye token oluşturalım.
    // createSendToken(user,200,res)

    // bunun yerine olumlu bir response da gönderebilirdik.
     res.status(201).json({message:"Şifreniz başarıyla değiştirildi."})
})








// logout fonksiyonu cookielerden jwt'yi siler

exports.logout = async (req,res) => {
  res.clearCookie("jwt").status(200).json({success:true,message:"Oturumunuz kapatıldı."})
};
