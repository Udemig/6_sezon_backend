import type { OrderInput } from "./order.dto.ts";
import { Order } from "./order.model.ts";
import type { IOrder } from "./types/index.ts";
import RabbitMQService from "./rabbitmq.service.ts";

// Business logic'i yöneticek ve veritabanı ile iletişime geç
class OrderService {
  private initialized = false;

  async initialize(): Promise<void> {
    if (!this.initialized) {
      await RabbitMQService.initialize();
      this.initialized = true;
    }
  }

  async createOrder(userId: string, orderData: OrderInput): Promise<IOrder> {
    // rabbitmq bağlantısını başlat
    await this.initialize();

    // toplam tutarı hesapla
    const totalAmount = orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // siparişi oluştur
    const order = await Order.create({
      userId,
      restaurantId: orderData.restaurantId,
      items: orderData.items,
      totalAmount,
      deliveryAddress: orderData.deliveryAddress,
      paymentMethod: orderData.paymentMethod,
      specialInstructions: orderData.specialInstructions,
      status: "pending",
    });

    // sipariş oluşturulduğunda kuyuruğa haber gönder
    await RabbitMQService.publishOrderCreated(order);

    return order;
  }

  async getOrderById(orderId: string) {
    return await Order.findById(orderId);
  }

  async getUserOrders(userId: string) {
    return await Order.find({ userId });
  }

  async updateOrderStatus(orderId: string, newStatus: string) {
    const order = await Order.findByIdAndUpdate(orderId, { status: newStatus }, { new: true });

    // sipariş hazır olduysa delivery servise haber gönder
    if (order && newStatus === "ready") {
      // rabbitmq bağlı değilse bağlantı kur
      await this.initialize();

      // sipariş hazır olduğunda kuyruğa haber gönder
      await RabbitMQService.publishOrderReady(order);
    }

    return order;
  }
}

export default new OrderService();
