import OrderController from "./order.controller.ts";
import express from "express";
import { authenticate, authorize } from "./order.middleware.ts";

const router = express.Router();

router.post("/", authenticate, OrderController.createOrder);
router.post("/:orderId", authenticate, OrderController.getOrder);
router.post("/user/:userId", authenticate, OrderController.getUserOrders);
router.post(
  "/:orderId/status",
  authenticate,
  authorize(["admin", "restaurant_owner"]),
  OrderController.updateOrderStatus
);

export default router;
