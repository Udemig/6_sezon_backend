import type {
  CourierLoginInput,
  CourierPerformanceInput,
  CourierRegisterInput,
  CourierStatusUpdateInput,
  DeliveryStatusUpdateInput,
} from "./delivery.dto.ts";
import bcrypt from "bcrypt";
import { Courier, DeliveryTracking } from "./delivery.model.ts";
import jwt from "jsonwebtoken";
import RabbitMQService from "./rabbitmq.service.ts";

// Business logic'i yöneticek ve veritabanı ile iletişime geç
class DeliveryService {
  private intialized = false;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    if (!this.intialized) {
      await RabbitMQService.initialize();
      this.intialized = true;
    }
  }

  async register(data: CourierRegisterInput) {
    // şifre hashleme
    const hashedPassword = await bcrypt.hash(data.password, 12);

    // veritabanına kaydetme
    const courier = await Courier.create({
      ...data,
      password: hashedPassword,
      role: "courier",
      status: "offline",
    });

    // token oluşturma
    const token = jwt.sign({ userId: courier.id, role: courier.role }, process.env.JWT_SECRET, { expiresIn: "24h" });

    return {
      status: "success",
      data: {
        courier,
        token,
      },
    };
  }

  async login(data: CourierLoginInput) {
    // veritabanında kullanıcı var mı kontrolü
    const courier = await Courier.findOne({ email: data.email });

    if (!courier) {
      throw new Error("Geçersiz email veya şifre");
    }

    // şifre kontrolü
    const isPasswordValid = await bcrypt.compare(data.password, courier.password);

    if (!isPasswordValid) {
      throw new Error("Geçersiz email veya şifre");
    }

    // token oluşturma
    const token = jwt.sign({ userId: courier.id, role: courier.role }, process.env.JWT_SECRET, { expiresIn: "24h" });

    return {
      status: "success",
      data: {
        courier,
        token,
      },
    };
  }

  async updateCourierStatus(courierId: string, data: CourierStatusUpdateInput) {
    const courier = await Courier.findByIdAndUpdate(
      courierId,
      { status: data.status, location: data.location },
      { new: true }
    );

    return {
      status: "success",
      data: {
        courier,
      },
    };
  }

  async getAvailableOrders(courierId: string) {
    const deliveries = await DeliveryTracking.find({
      status: { $in: ["pending", "ready"] },
      courierId: null,
    });

    return {
      status: "success",
      data: {
        deliveries,
      },
    };
  }

  async acceptDelivery(orderId: string, courierId: string) {
    const delivery = await DeliveryTracking.findOneAndUpdate(
      { orderId, courierId: null },
      { courierId, status: "assigned", acceptedAt: new Date() },
      { new: true }
    );
    await Courier.findByIdAndUpdate(courierId, { status: "busy", isAvailable: false });

    return {
      status: "success",
      data: {
        delivery,
      },
    };
  }

  async updateDeliveryStatus(orderId: string, courierId: string, data: DeliveryStatusUpdateInput) {
    const delivery = await DeliveryTracking.findOneAndUpdate(
      { orderId, courierId },
      {
        status: data.status,
        location: data.location,
        estimatedDeliveryTime: data.estimatedArrival,
        actualDeliveryTime: data.actualArrival,
        notes: data.notes,
      },
      { new: true }
    );

    return {
      status: "success",
      data: {
        delivery,
      },
    };
  }

  async trackDelivery(orderId: string) {
    const delivery = await DeliveryTracking.findOne({ orderId });

    if (!delivery) {
      throw new Error("Teslimat bulunamadı");
    }

    return {
      status: "success",
      data: {
        delivery,
      },
    };
  }

  async getCourierPerformance(courierId: string) {
    const deliveries = await DeliveryTracking.find({ courierId });
    const totalDeliveries = deliveries.length;
    const completedDeliveries = deliveries.filter((d) => d.status === "delivered").length;
    const averageDeliveryTime =
      deliveries
        .filter((d) => d.actualDeliveryTime && d.acceptedAt)
        .reduce(
          (acc, d) => acc + new Date(d.actualDeliveryTime as Date).getTime() - new Date(d.acceptedAt as Date).getTime(),
          0
        ) / (completedDeliveries || 1);

    return {
      status: "success",
      data: {
        totalDeliveries,
        completedDeliveries,
        averageDeliveryTime,
        completionRate: totalDeliveries > 0 ? (completedDeliveries / totalDeliveries) * 100 : 0,
      },
    };
  }
}

export default new DeliveryService();
