import AuthController from "./auth.controller.ts";
import express from "express";
import { authenticate } from "./auth.middleware.ts";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/refresh", AuthController.refresh);
router.post("/logout", AuthController.logout);
router.get("/profile", authenticate, AuthController.getProfile);
router.post("/add-address", authenticate, AuthController.addAddres);

export default router;
