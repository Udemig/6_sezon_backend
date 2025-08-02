import AuthController from "./auth.controller.ts";
import express from "express";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

export default router;
