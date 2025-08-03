import DeliveryService from "./delivery.service.ts";
import type { RouteParams } from "./types/index.ts";

class DeliveryController {
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

export default new DeliveryController();
