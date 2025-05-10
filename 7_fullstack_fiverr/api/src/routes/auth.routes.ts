import express from "express";
import { register, login, logout, getProfile } from "../controllers/auth.controller";

// 1) router oluşturma
const router = express.Router();

// 2) endpoint'leri belirle
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile").get(getProfile);

// 3) router'ı app'e tanıtmak için export et
export default router;
