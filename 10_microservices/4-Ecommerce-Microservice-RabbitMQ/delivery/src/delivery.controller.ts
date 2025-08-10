import {
  courierLoginSchema,
  courierPerformanceSchema,
  courierRegisterSchema,
  courierStatusUpdateSchema,
  deliveryStatusUpdateSchema,
  validateDto,
} from "./delivery.dto.ts";
import DeliveryService from "./delivery.service.ts";
import catchAsync from "./utils/index.ts";

class DeliveryController {
  register = catchAsync(async (req, res, next) => {
    const registerData = await validateDto(courierRegisterSchema, req.body);

    const result = await DeliveryService.register(registerData);

    res.status(201).json(result);
  });

  login = catchAsync(async (req, res, next) => {
    const loginData = await validateDto(courierLoginSchema, req.body);

    const result = await DeliveryService.login(loginData);

    res.status(200).json(result);
  });

  updateCourierStatus = catchAsync(async (req, res, next) => {
    const courierId = req.user?.userId as string;
    const statusData = await validateDto(courierStatusUpdateSchema, req.body);

    const result = await DeliveryService.updateCourierStatus(courierId, statusData);

    res.status(200).json(result);
  });

  getCourierPerformance = catchAsync(async (req, res, next) => {
    const courierId = req.user?.userId as string;
    const result = await DeliveryService.getCourierPerformance(courierId);

    res.status(200).json(result);
  });

  getAvailableOrders = catchAsync(async (req, res, next) => {
    const { courierId } = req.params;

    const result = await DeliveryService.getAvailableOrders(courierId as string);

    res.status(200).json(result);
  });

  acceptDelivery = catchAsync(async (req, res, next) => {
    const { orderId } = req.params as { orderId: string };
    const courierId = req.user?.userId as string;

    const result = await DeliveryService.acceptDelivery(orderId, courierId);

    res.status(200).json(result);
  });

  updateDeliveryStatus = catchAsync(async (req, res, next) => {
    const deliveryData = await validateDto(deliveryStatusUpdateSchema, req.body);
    const { orderId } = req.params as { orderId: string };
    const courierId = req.user?.userId as string;

    const result = await DeliveryService.updateDeliveryStatus(orderId, courierId, deliveryData);

    res.status(200).json(result);
  });

  trackDelivery = catchAsync(async (req, res, next) => {
    const { orderId } = req.params as { orderId: string };

    const result = await DeliveryService.trackDelivery(orderId);

    res.status(200).json(result);
  });
}

export default new DeliveryController();
