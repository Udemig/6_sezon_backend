import RestaurantService from "./restaurant.service.ts";
import type { RouteParams } from "./types/index.ts";
import catchAsync from "./utils/index.ts";

class RestaurantController {
  getAllRestaurants = catchAsync(async (req, res, next) => {
    res.status(201).json({ message: "İşlem başarılı" });
  });
  getRestaurant = catchAsync(async (req, res, next) => {
    res.status(201).json({ message: "İşlem başarılı" });
  });
  getRestaurantMenu = catchAsync(async (req, res, next) => {
    res.status(201).json({ message: "İşlem başarılı" });
  });
  createResaturant = catchAsync(async (req, res, next) => {
    res.status(201).json({ message: "İşlem başarılı" });
  });
  addMenuItem = catchAsync(async (req, res, next) => {
    res.status(201).json({ message: "İşlem başarılı" });
  });
}

export default new RestaurantController();
