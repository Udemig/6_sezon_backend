import RestaurantController from "./restaurant.controller.ts";
import express from "express";
import { authenticate, authorize } from "./restaurant.middleware.ts";

const router = express.Router();

router.get("/restaurants", authenticate, RestaurantController.getAllRestaurants);
router.post(
  "/restaurants",
  authenticate,
  authorize(["admin", "restaurant_owner"]),
  RestaurantController.createResaturant
);
router.get("/restaurants/:id", authenticate, RestaurantController.getRestaurant);
router.get("/restaurants/:id/menu", authenticate, RestaurantController.getRestaurantMenu);
router.post(
  "/restaurants/:id/menu",
  authenticate,
  authorize(["admin", "restaurant_owner"]),
  RestaurantController.addMenuItem
);

export default router;
