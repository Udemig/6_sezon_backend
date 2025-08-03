import OrderController from "./order.controller.ts";
import express from "express";

const router = express.Router();

router.post("/register", OrderController.register);
router.post("/login", OrderController.login);

export default router;
