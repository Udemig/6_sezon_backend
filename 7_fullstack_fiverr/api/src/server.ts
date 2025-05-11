import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";

// env dosyasındaki değişkenle erişebilmek için kurulum
dotenv.config();

// veritabanı ile bağlantı kur
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("🔥Veritabanına Bağlantı Başarılı🔥"))
  .catch(() => console.log("😡Veritabanına Bağlantı Başarısız😡"));

// express uygulaması başlat
const app = express();

// middleware'ler
app.use(express.json()); // isteğin içeriğinde gelen verileri js formatına çeviren mw
app.use(cookieParser());

// deneme route'u
app.get("/", (req, res) => {
  res.json({ message: "Backend Hayatta..." });
});

// route'ları projeye tanıt
app.use("/api/auth", authRoutes);

// dinlemeye başla
app.listen(process.env.PORT, () => {
  console.log(`🎾 Server ${process.env.PORT} portunu dinlemeye başladı 🎾`);
});
