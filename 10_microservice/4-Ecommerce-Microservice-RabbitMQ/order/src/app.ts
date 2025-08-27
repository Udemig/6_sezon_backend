import express, { type NextFunction, type Request, type Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import orderRoutes from "./order.routes.ts";

// dotenv ile .env dosyasını yükle
dotenv.config();

// express uygulamasını oluştur
const app = express();

// mongoose ile veritabanına bağlan
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("🎾 Veritabanına bağlandı"))
  .catch(() => console.log("❌ Veritabanına bağlanılamadı"));

// rate limit
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQ),
});

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(limiter);

// router
app.use("/", orderRoutes);

// hata middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const message = err?.message || "Bir şeyler ters gitti";
  console.log(message);
  res.status(500).json({ status: "fail", message });
});

// 404 middleware
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "İstek attığınız adres bulunamadı" });
});

// express uygulamasını başlat
app.listen(process.env.PORT, () => {
  console.log(`⭐️ Order servisi ${process.env.PORT} portunda çalışıyor`);
});
