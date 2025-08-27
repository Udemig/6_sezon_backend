import { menuItemSchema, queryParamsSchema, restaurantSchema, validateDto } from "./restaurant.dto.ts";
import RestaurantService from "./restaurant.service.ts";
import type { RouteParams } from "./types/index.ts";
import catchAsync from "./utils/index.ts";

class RestaurantController {
  getAllRestaurants = catchAsync(async (req, res, next) => {
    const validatedQuery = await validateDto(queryParamsSchema, req.query);

    const result = await RestaurantService.getAll(validatedQuery);

    res.status(200).json(result);
  });

  getRestaurant = catchAsync(async (req, res, next) => {
    const result = await RestaurantService.getById(req.params.id as string);

    res.status(200).json(result);
  });

  getRestaurantMenu = catchAsync(async (req, res, next) => {
    const category = req.query.category as string | undefined;

    const result = await RestaurantService.getMenu(req.params.id as string, category);

    res.status(200).json(result);
  });

  addMenuItem = catchAsync(async (req, res, next) => {
    const validatedData = await validateDto(menuItemSchema, req.body);

    const result = await RestaurantService.addMenuItem(validatedData, req.params.id as string);

    res.status(201).json(result);
  });

  createResaturant = catchAsync(async (req, res, next) => {
    const ownerId = req.user?.userId || "";

    const validatedData = await validateDto(restaurantSchema, req.body);

    const result = await RestaurantService.create(validatedData, ownerId);

    res.status(201).json(result);
  });
}

export default new RestaurantController();
