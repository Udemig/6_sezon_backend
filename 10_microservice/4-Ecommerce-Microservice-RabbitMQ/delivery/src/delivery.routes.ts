import DeliveryController from "./delivery.controller.ts";
import express from "express";
import { authenticate, authorize } from "./delivery.middleware.ts";

const router = express.Router();

router.post("/couriers/register", DeliveryController.register);
router.post("/couriers/login", DeliveryController.login);
router.patch("/couriers/status", authenticate, authorize(["courier"]), DeliveryController.updateCourierStatus);
router.get(
  "/couriers/:courierId/performance",
  authenticate,
  authorize(["admin"]),
  DeliveryController.getCourierPerformance
);

router.get("/orders", authenticate, authorize(["courier"]), DeliveryController.getAvailableOrders);
router.post("/orders/:orderId/accept", authenticate, authorize(["courier"]), DeliveryController.acceptDelivery);
router.patch("/orders/:orderId/status", authenticate, authorize(["courier"]), DeliveryController.updateDeliveryStatus);
router.get("/orders/:orderId/tracking", authenticate, DeliveryController.trackDelivery);

export default router;
