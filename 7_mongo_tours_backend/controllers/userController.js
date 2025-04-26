const User = require("../models/userModel");
const c = require("../utils/catchAsync");
const e = require("../utils/error");
const { filterObject } = require("../utils/filterObject");
const factory = require("./handlerFactory")

exports.getAllUsers = factory.getAll(User);

exports.createUser = c(async(req, res) => {

  const {name,email,active,photo,password,role} = req.body;

  const newUser = await User.create({
    name,
    email,
    active,
    photo,
    password,
    passwordConfirm:password,
    role,
  })

  
  res.status(200).json({success:true,message:"Kullanıcı başarıyla oluşturuldu",newUser});

})

// id'sine göre bir kullanıcı döndüren fonksiyon

exports.getUser = c(async (req, res,next) => {

  const {id} = req.params;

  // kullanıcıyı bul fakat password ve email alanlarını alma
  const user = await User.findById(id).select("-password -__v");

  if(!user){
    return next(e(404,"Aradığınız ID'ye sahip kullanıcı bulunmamaktadır."))
  }


  res.status(200).json({
    success:true,
    user
  });
})

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
  const filteredObject = filterObject(changeReqProps, [
    "name",
    "email",
    "photo",
  ]);

  for (let key in filteredObject) {
    
      user[key] = filteredObject[key];
      
  }

  // verileri değiştirilmiş kullanıcıyı kaydet
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success:true,
    user
  });
});

exports.activateAccount = c(async(req,res,next)=>{

  const {active} = req.body;

  const user = await User.findById(req.params.id);

  user.active = active;

  await user.save({validateBeforeSave:false});

  if(!user){
    return next(e(404,"Böyle bir kullanıcı bulunmamaktadır."))
  }

  return res.status(200).json({
    success:true,
    message:`Hesap başarıyla ${active? "aktifleştirildi." : "askıya alındı."}`})
})

exports.deleteUser = factory.deleteOne(User)
