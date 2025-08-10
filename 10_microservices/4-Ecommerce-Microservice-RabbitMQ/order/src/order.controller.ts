import { orderItemSchema, orderSchema, orderStatusSchema, validateDto } from "./order.dto.ts";
import OrderService from "./order.service.ts";
import catchAsync from "./utils/index.ts";

class OrderController {
  createOrder = catchAsync(async (req, res, next) => {
    const orderData = await validateDto(orderSchema, req.body);

    const order = await OrderService.createOrder(req.user?.userId as string, orderData);

    res.status(201).json({ order });
  });

  getOrder = catchAsync(async (req, res, next) => {
    const { orderId } = req.params;

    const order = await OrderService.getOrderById(orderId as string);

    if (!order) {
      res.status(404).json({ message: "Sipariş bulunamadı" });
      return;
    }

    res.status(200).json({ order });
  });

  getUserOrders = catchAsync(async (req, res, next) => {
    const { userId } = req.params;

    const orders = await OrderService.getUserOrders(userId as string);

    res.status(200).json({ orders });
  });

  updateOrderStatus = catchAsync(async (req, res, next) => {
    const { orderId } = req.params;
    const { status } = await validateDto(orderStatusSchema, req.body);

    const updatedOrder = await OrderService.updateOrderStatus(orderId as string, status);

    if (!updatedOrder) {
      res.status(404).json({ message: "Sipariş bulunamadı" });
      return;
    }

    res.status(200).json({ order: updatedOrder });
  });
}

export default new OrderController();
