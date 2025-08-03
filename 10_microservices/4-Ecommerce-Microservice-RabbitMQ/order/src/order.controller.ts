import OrderService from "./order.service.ts";
import type { RouteParams } from "./types/index.ts";

class OrderController {
  register: RouteParams = async (req, res, next) => {
    try {
      res.status(201).json({ message: "İşlem başarılı" });
    } catch (error) {
      next(error);
    }
  };

  login: RouteParams = async (req, res, next) => {
    try {
      res.status(201).json({ message: "İşlem başarılı" });
    } catch (error) {
      next(error);
    }
  };
}

export default new OrderController();
