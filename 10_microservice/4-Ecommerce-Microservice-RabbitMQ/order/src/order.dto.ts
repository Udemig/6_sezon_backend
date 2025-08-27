import { z } from "zod";

// address dto
const addressSchema = z.object({
  title: z.string().optional(),
  address: z.string().min(1, "Adres alanı zorunludur"),
  city: z.string().min(1, "Şehir alanı zorunludur"),
  district: z.string().min(1, "İlçe alanı zorunludur"),
  postalCode: z.string().min(1, "Posta kodu alanı zorunludur"),
  isDefault: z.boolean().default(false),
});

// order item dto
const orderItemSchema = z.object({
  productId: z.string().min(1, "Ürün ID alanı zorunludur"),
  name: z.string().min(1, "Ürün adı alanı zorunludur"),
  price: z.number().min(1, "Fiyat alanı zorunludur"),
  quantity: z.number().min(1, "Adet alanı zorunludur"),
});

// order dto
const orderSchema = z.object({
  restaurantId: z.string().min(1, "Restoran ID alanı zorunludur"),
  items: z.array(orderItemSchema).min(1, "En az bir ürün seçilmelidir"),
  deliveryAddress: addressSchema,
  paymentMethod: z.enum(["credit_card", "cash", "online"]),
  specialInstructions: z.string().optional(),
});

// status dto
const orderStatusSchema = z.object({
  status: z.enum(["pending", "confirmed", "preparing", "ready", "on_the_way", "delivered", "cancelled"]),
  reason: z.string().optional(),
});

// query dto
const queryParamsSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  status: z.enum(["pending", "confirmed", "preparing", "ready", "on_the_way", "delivered", "cancelled"]).optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

// infer types
type AddressInput = z.infer<typeof addressSchema>;
type OrderItemInput = z.infer<typeof orderItemSchema>;
type OrderInput = z.infer<typeof orderSchema>;
type OrderStatusInput = z.infer<typeof orderStatusSchema>;
type QueryParamsInput = z.infer<typeof queryParamsSchema>;

// Bir şema ve veri alıp verinin şemaya uygun olup olmadığını kontrol eden fonksiyon
async function validateDto<T>(schema: z.ZodSchema<T>, data: unknown): Promise<T> {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(z.prettifyError(error));
    }

    throw error;
  }
}

export { addressSchema, orderItemSchema, orderSchema, orderStatusSchema, queryParamsSchema, validateDto };
export type { AddressInput, OrderItemInput, OrderInput, OrderStatusInput, QueryParamsInput };
