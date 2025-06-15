import dotenv from "dotenv";

// proje ayağa kaldırılırken belirlenen NODE_ENV değerine göre hangi .env dosyasının yükleniceğini belirle
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";

// yukarı belirlenen .env dosyasını yükle yükle
dotenv.config({ path: envFile });

// eğer yukarıdaki komut  prod veya dev env'lerini yüklemeyezse bu kod satıtı çalışır ve .env'i yükler
dotenv.config();

// değişkenli tiplerini varsayılan değerlerini tanımla
export const config = {
  // enviroment
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "3000"),

  // database
  MONGO_URI: process.env.MONGO_URI as string,

  // auth
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRES: parseInt(process.env.JWT_EXPIRES as string),

  // cloudinary
  CLOUD_NAME: process.env.CLOUD_NAME as string,
  CLOUD_API_KEY: process.env.CLOUD_API_KEY as string,
  CLOUD_SECRET: process.env.CLOUD_SECRET as string,

  // frontend
  CROSS_ORIGIN: process.env.CROSS_ORIGIN || "http://localhost:5173",
};

export const isDevelopment = config.NODE_ENV === "development";
export const isProduction = config.NODE_ENV === "production";
