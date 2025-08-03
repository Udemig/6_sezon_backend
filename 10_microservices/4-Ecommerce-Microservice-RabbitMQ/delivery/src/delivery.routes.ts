import DeliveryController from "./delivery.controller.ts";
import express from "express";

const router = express.Router();

router.post("/register", DeliveryController.register);
router.post("/login", DeliveryController.login);

export default router;
