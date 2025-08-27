import type { Channel, ChannelModel } from "amqplib";
import amqp from "amqplib";
import type { IOrder } from "./types/index.ts";
import { Courier, DeliveryTracking } from "./delivery.model.ts";

class RabbitMQService {
  private connection: ChannelModel | null = null;
  private channel: Channel | null = null;
  private readonly exchangeName = "food_delivery_exchange";
  private readonly orderQueue = "order_queue";
  private readonly deliveryQueue = "delivery_queue";

  /*
   * Broker'a bağlan, kanal oluştur, exchange/queue'ları oluştur
   * Notlar:
   * - Exchange tipi "topic": routing key değerlerine göre (ör: order.*) yönlendirme yapılır
   * - {durable: true} -> RabbitMQ restart edilse bile exchange kalır
   */
  async initialize(): Promise<void> {
    try {
      // Broker'a bağlan
      const url = process.env.RABBITMQ_URL ?? "amqp://localhost:5672";
      this.connection = await amqp.connect(url);

      // Kanal oluştur
      this.channel = await this.connection.createChannel();

      // Exchange oluştur
      await this.channel.assertExchange(this.exchangeName, "topic", { durable: true });

      // Queue oluştur
      await this.channel.assertQueue(this.orderQueue, { durable: true });
      await this.channel.assertQueue(this.deliveryQueue, { durable: true });

      // Queue'ları exchange'e bağla
      await this.channel.bindQueue(this.deliveryQueue, this.exchangeName, "order.created");
      await this.channel.bindQueue(this.deliveryQueue, this.exchangeName, "order.ready");

      // Queue'ları dinle
      await this.listenToDeliveryQueue();

      console.log("Delivery Service RabbitMQ bağlantısı başarılı");
    } catch (error) {
      console.error("Delivery Service RabbitMQ bağlantısı hatası:", error);
    }
  }

  // Order Servisinden gelen teslimat isteklerini dinle
  // sipairş oluşturulduğunda ve hazır olduğunda gelen mesjaları dinle
  // gerekli işlmleri yap
  async listenToDeliveryQueue(): Promise<void> {
    if (!this.channel) {
      throw new Error("RabbitMQ bağlantısı kurulamadı");
    }

    await this.channel.consume(this.deliveryQueue, async (message) => {
      // befferdan json verisine çevir
      const deliveryMessage = JSON.parse(message!.content.toString()) as IOrder;

      if (deliveryMessage.status === "pending") {
        // eğer sipariş durumu pending ise yeni bir delivery tracking oluştur
        const deliveryTracking = await DeliveryTracking.create({
          orderId: deliveryMessage.id,
          courierId: null,
          status: "pending",
          estimatedDeliveryTime: new Date(Date.now() + 60 * 60 * 1000),
          notes: deliveryMessage.specialInstructions,
        });

        // müsait kurye bul
        const courier = await Courier.findOne({ status: "available", isAvailable: true }).sort({ createdAt: 1 });

        // kuryeyi siparişe ata
        if (courier) {
          // sipariş verisini güncelle
          await DeliveryTracking.findByIdAndUpdate(deliveryTracking.id, { courierId: courier.id, status: "assigned" });
          // kurye durumunu güncelle
          await Courier.findByIdAndUpdate(courier.id, { status: "busy", isAvailable: false });
        }
      }

      // eğer sipariş durumu ready ise delivery tracking'i güncelle
      if (deliveryMessage.status === "ready") {
        await DeliveryTracking.findOneAndUpdate({ orderId: deliveryMessage.id }, { status: "ready" });
      }
    });
  }
}

export default new RabbitMQService();
