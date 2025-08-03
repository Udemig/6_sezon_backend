import RestaurantController from "./restaurant.controller.ts";
import express from "express";

const router = express.Router();

router.get("/restaurants", RestaurantController.getAllRestaurants);
router.post("/restaurants", RestaurantController.createResaturant);
router.get("/restaurants/:id", RestaurantController.getRestaurant);
router.get("/restaurants/:id/menu", RestaurantController.getRestaurantMenu);
router.post("/restaurants/:id/menu", RestaurantController.addMenuItem);

export default router;
