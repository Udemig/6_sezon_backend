import z from "zod";

// openingHoursSchema
const openingHoursSchema = z.object({
  monday: z.string().min(1, "Pazartesi çalışma saatleri zorunldur"),
  tuesday: z.string().min(1, "Salı çalışma saatleri zorunldur"),
  wednesday: z.string().min(1, "Çarşamba çalışma saatleri zorunldur"),
  thursday: z.string().min(1, "Perşembe çalışma saatleri zorunldur"),
  friday: z.string().min(1, "Cuma çalışma saatleri zorunldur"),
  saturday: z.string().min(1, "Cumartesi çalışma saatleri zorunldur"),
  sunday: z.string().min(1, "Pazar çalışma saatleri zorunldur"),
});

// restaurantSchema
const restaurantSchema = z.object({
  name: z.string().min(1, "Restoran adı zorunludur"),
  description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır"),
  address: z.string().min(1, "Adres zorunludur"),
  phone: z.string().min(1, "Telefon zorunludur"),
  email: z.email("Geçerli bir email adresi giriniz"),
  categories: z.array(z.string()).min(1, "En az bir kategori seçiniz"),
  deliveryTime: z
    .number()
    .min(15, "Teslimat süresi en az 15 dakika olmalıdır")
    .max(120, "Teslimat süresi en fazla 120 dakika olmalıdır"),
  minOrder: z.number().min(0, "Minimum sipariş tutarı 0'dan küçük olamaz"),
  deliveryFee: z.number().min(0, "Teslimat ücreti 0'dan küçük olamaz"),
  rating: z.number().min(0, "Puan 0'dan küçük olamaz").max(5, "Puan 5'ten büyük olamaz").optional(),
  isActive: z.boolean().default(true),
  isOpen: z.boolean().default(true),
  openingHours: openingHoursSchema,
});

// menuItemSchema
const menuItemSchema = z.object({
  name: z.string().min(1, "Ürün adı zorunludur"),
  description: z.string().min(5, "Açıklama en az 5 karakter olmalıdır"),
  price: z.number().min(0, "Fiyat 0'dan küçük olamaz"),
  category: z.string().min(1, "Kategori zorunludur"),
  imageUrl: z.url("Geçerli bir resim URL'si giriniz").optional(),
  ingredients: z.array(z.string()).min(1, "En az bir malzeme seçiniz"),
  allergens: z.array(z.string()).default([]),
  isVegetarian: z.boolean().default(false),
  isAvailable: z.boolean().default(true),
  preparationTime: z
    .number()
    .min(5, "Hazırlama süresi en az 5 dakika olmalıdır")
    .max(120, "Hazırlama süresi en fazla 120 dakika olmalıdır"),
});

// query params schema
const queryParamsSchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
  category: z.string().optional(),
  rating: z.coerce.number().min(0).max(5).optional(),
  deliveryTime: z.coerce.number().min(15).max(120).optional(),
  minOrder: z.coerce.number().min(0).optional(),
});

// export type
export type RestaurantInput = z.infer<typeof restaurantSchema>;
export type MenuItemInput = z.infer<typeof menuItemSchema>;
export type OpeningHoursInput = z.infer<typeof openingHoursSchema>;
export type QueryParamsInput = z.infer<typeof queryParamsSchema>;

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

export { validateDto, restaurantSchema, menuItemSchema, openingHoursSchema, queryParamsSchema };
