const express = require("express");
const userController = require("../controllers/userController.js");
const authController = require("../controllers/authController.js");

const router = express.Router();

const {signUp,login,logout,forgotPassword,resetPassword,updatePassword,protect,restrictTo} = authController;

const {getAllUsers,getUser,createUser,updateUser,deleteUser, activateAccount} = userController;

router.post("/signup", signUp);

router.post("/login", login);

router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);

router.patch("/reset-password/:token",resetPassword)

router.patch("/update-password", protect, updatePassword)

router.post("/activate/:id", protect, restrictTo("admin"), activateAccount)


  // burada yazdığımız protect satırının altındaki bütün istekler protect'ten etkilenecek,
  // yani giriş yapmayan kullanıcı istek atamayacak
  router.use(protect)

router
  .route("/")
  .get(restrictTo("admin"),getAllUsers)
  .post(restrictTo("admin"),createUser);

router
  .route("/:id")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
