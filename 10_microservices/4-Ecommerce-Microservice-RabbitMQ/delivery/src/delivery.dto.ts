import { z } from "zod";

// courier register
const courierRegisterSchema = z.object({
  email: z.email("Geçerli bir email giriniz"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
  firstName: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
  lastName: z.string().min(2, "Soyisim en az 2 karakter olmalıdır"),
  phone: z.string().min(10, "Telefon numarası en az 10 karakter olmalıdır"),
  vehicleType: z.enum(["motorcycle", "bicycle", "car"]),
  vehiclePlate: z.string().optional(),
  isAvailable: z.boolean().default(true),
});

// courier login
const courierLoginSchema = z.object({
  email: z.email("Geçerli bir email giriniz"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
});

// courier status update
const courierStatusUpdateSchema = z.object({
  status: z.enum(["available", "busy", "offline"]),
  location: z
    .object({
      latitude: z.number().min(-90).max(90, "Geçerli bir enlem değeri giriniz"),
      longtitude: z.number().min(-180).max(180, "Geçerli bir boylam değeri giriniz"),
    })
    .optional(),
});

// delivery status update
const deliveryStatusUpdateSchema = z.object({
  status: z.enum(["assigned", "picked_up", "in_transit", "delivered", "failed"]),
  location: z
    .object({
      latitude: z.number().min(-90).max(90, "Geçerli bir enlem değeri giriniz"),
      longtitude: z.number().min(-180).max(180, "Geçerli bir boylam değeri giriniz"),
    })
    .optional(),
  estimatedArrival: z.number().min(1, "Tahmini gelme süresi en az 1 dakika olmalıdır").optional(),
  actualArrival: z.date().optional(),
  notes: z.string().optional(),
});

// courier performance
const courierPerformanceSchema = z.object({
  deliveriesCompleted: z.number().min(0, "Tamamlanan teslimat sayısı en az 0 olmalıdır"),
  averageRating: z.number().min(0).max(5, "Ortalama puan en az 0 ve en fazla 5 olmalıdır"),
  totalEarnings: z.number().min(0, "Toplam kazanç en az 0 olmalıdır"),
  period: z.enum(["daily", "weekly", "monthly"]),
});

// location update
const locationUpdateSchema = z.object({
  latitude: z.number().min(-90).max(90, "Geçerli bir enlem değeri giriniz"),
  longtitude: z.number().min(-180).max(180, "Geçerli bir boylam değeri giriniz"),
  timestamp: z.date().optional(),
});

// export schemas
export {
  courierRegisterSchema,
  courierLoginSchema,
  courierStatusUpdateSchema,
  deliveryStatusUpdateSchema,
  courierPerformanceSchema,
  locationUpdateSchema,
};

// type inference
export type CourierRegisterInput = z.infer<typeof courierRegisterSchema>;
export type CourierLoginInput = z.infer<typeof courierLoginSchema>;
export type CourierStatusUpdateInput = z.infer<typeof courierStatusUpdateSchema>;
export type DeliveryStatusUpdateInput = z.infer<typeof deliveryStatusUpdateSchema>;
export type CourierPerformanceInput = z.infer<typeof courierPerformanceSchema>;
export type LocationUpdateInput = z.infer<typeof locationUpdateSchema>;

// Bir şema ve veri alıp verinin şemaya uygun olup olmadığını kontrol eden fonksiyon
export async function validateDto<T>(schema: z.ZodSchema<T>, data: unknown): Promise<T> {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(z.prettifyError(error));
    }

    throw error;
  }
}
