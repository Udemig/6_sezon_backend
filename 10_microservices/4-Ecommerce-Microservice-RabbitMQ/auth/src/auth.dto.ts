import { z } from "zod";

// Zod schemas
// bu şema sayesinde client tarafından gelen iteğin body kısmında gerekli verilerl var mı kontrol et
const registerSchema = z.object({
  email: z.email("Geçerli bir email adresi giriniz"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
  firstName: z.string().min(1, "Ad alanı zorunludur"),
  lastName: z.string().min(1, "Soyad alanı zorunludur"),
  phone: z.string().min(1, "Telefon alanı zorunludur"),
  role: z.enum(["customer", "restaurant_owner", "courier", "admin"]).default("customer"),
});

const loginSchema = z.object({
  email: z.email("Geçerli bir email adresi giriniz"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
});

const addressSchema = z.object({
  title: z.string().min(1, "Adres başlığı zorunludur"),
  address: z.string().min(1, "Adres zorunludur"),
  city: z.string().min(1, "Şehir zorunludur"),
  district: z.string().min(1, "İlçe zorunludur"),
  postalCode: z.number().min(1, "Posta kodu zorunludur"),
  isDefault: z.boolean().default(false),
});

// Şemalar üzerinden tip çıkartabiliyoruz
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type AddressInput = z.infer<typeof addressSchema>;

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

export { registerSchema, loginSchema, addressSchema, validateDto };
