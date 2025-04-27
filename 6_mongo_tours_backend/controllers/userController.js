const multer = require("multer");
const User = require("../models/userModel");
const c = require("../utils/catchAsync");
const e = require("../utils/error");
const { filterObject } = require("../utils/filterObject");
const factory = require("./handlerFactory");
const sharp = require("sharp");

// diskstorage kurulum (dosyları diske kaydetmeye yarar)
// const multerStorage = multer.diskStorage({
//   // dosyanın yükleneceği klasörü belirle
//   destination: function (req, file, cb) {
//     cb(null, "public/img/users");
//   },

//   // dosyanın ismi
//   filename: function (req, file, cb) {
//     // dosya uzantısını belirle
//     const ext = file.mimetype.split("/")[1];
//     // dosya ismini belirle
//     cb(null, `${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

// memory storage kurulumu (resimleri buffer veritipinde RAM'de saklar)
const multerStorage = multer.memoryStorage();

// multer kurulum (client'tan gelen dosyalara erişmemizi sağlayacak)
const upload = multer({
  storage: multerStorage,
});

// dosyalara erişip yükleme işlemibi yapıcak mw
exports.uploadUserPhoto = upload.single("avatar");

// dosyayı yeniden boyulandırıcak olan mw
exports.resize = (req, res, next) => {
  // eğer dosya seçilmediyse bu adımı atla
  if (!req.file) return next();

  // işlenmiş dosyasının ismini belirle
  const filename = `${req.user.id}-${Date.now()}.webp`;

  // dosya işle ve yükle
  sharp(req.file.buffer) // buffer veritipindeki resmi alır
    .resize(400, 400) // yeniden boyutlandırma yapar
    .toFormat("webp") // dosya formatını değiştir
    .webp({ quality: 70 }) // kaliteyi düşür
    .toFile(`public/img/users/${filename}`); // dosyayı diske kaydeder

  // sonraki adımda dosya ismine eirşmek için req'i güncelle
  req.file.path = filename;

  next();
};

// kullanıcı bilgilerini güncelle
exports.updateMe = c(async (req, res, next) => {
  // 1) şifre güncellemeye çalışırsa hata ver
  if (req.body.password || req.body.passwordConfirm) {
    return next(e(400, "Şifreyi bu endpoint ile güncelleyemezsiniz"));
  }

  // 2) isteğin body kısmından sadece izin verilen değerleri al
  const filtredBody = {
    name: req.body.name,
  };

  // 2.1) eğer isteğin içerisinde avatar değeri varsa body verisi için sisteme yüklediğimiz resmin ismini ekle
  if (req.file) filtredBody.photo = req.file.path;

  // 3) kullanıcı bilgilierini günelle
  const updated = await User.findByIdAndUpdate(req.user.id, filtredBody, {
    new: true,
  });

  // 4) client'a cevap gönder
  return res.json({ message: "hesap bilgileri güncellendi", updated });
});

exports.getAllUsers = factory.getAll(User);

exports.deleteUser = factory.deleteOne(User);

exports.createUser = c(async (req, res) => {
  const { name, email, active, photo, password, role } = req.body;

  const newUser = await User.create({
    name,
    email,
    active,
    photo,
    password,
    passwordConfirm: password,
    role,
  });

  res.status(200).json({ success: true, message: "Kullanıcı başarıyla oluşturuldu", newUser });
});

// id'sine göre bir kullanıcı döndüren fonksiyon
exports.getUser = c(async (req, res, next) => {
  const { id } = req.params;

  // kullanıcıyı bul fakat password ve email alanlarını alma
  const user = await User.findById(id).select("-password -__v");

  if (!user) {
    return next(e(404, "Aradığınız ID'ye sahip kullanıcı bulunmamaktadır."));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateUser = c(async (req, res, next) => {
  // güncellenmek istenen kullanıcı gerçekten var mı?

  const user = await User.findById(req.params.id);

  if (!user) {
    return next(e(404, "Güncellemek istediğiniz kullanıcı bulunmamaktadır."));
  }

  // Kullanıcının değiştirmek istediği verileri changeReqProps objesine al
  const changeReqProps = req.body;

  // eğer kullanıcı şifreyi buradan değiştirmek istiyorsa bu yolun yanlış olduğunu söyle
  if (changeReqProps.password) {
    return next(e(400, "Şifreyi bu endpointten değiştiremezsiniz."));
  }

  // bu verileri utils'teki filterObject fonksiyonundan geçir ve sadece değiştirilmesine izin verdiğimiz değerleri değiştir.
  const filteredObject = filterObject(changeReqProps, ["name", "email", "photo"]);

  for (let key in filteredObject) {
    user[key] = filteredObject[key];
  }

  // verileri değiştirilmiş kullanıcıyı kaydet
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    user,
  });
});

exports.activateAccount = c(async (req, res, next) => {
  const { active } = req.body;

  const user = await User.findById(req.params.id);

  user.active = active;

  await user.save({ validateBeforeSave: false });

  if (!user) {
    return next(e(404, "Böyle bir kullanıcı bulunmamaktadır."));
  }

  return res.status(200).json({
    success: true,
    message: `Hesap başarıyla ${active ? "aktifleştirildi." : "askıya alındı."}`,
  });
});
