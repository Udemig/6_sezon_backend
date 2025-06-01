import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler.js";
import gigRoutes from "./routes/gig.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// env dosyasındaki değişkenle erişebilmek için kurulum
dotenv.config();
// veritabanı ile bağlantı kur
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("🔥Veritabanına Bağlantı Başarılı🔥"))
    .catch(() => console.log("😡Veritabanına Bağlantı Başarısız😡"));
// express uygulaması başlat
const app = express();
// middleware'ler
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express.json()); // isteğin içeriğinde gelen verileri js formatına çeviren mw
app.use(cookieParser());
// deneme route'u
app.get("/", (req, res) => {
    res.json({ message: "Backend Hayatta..." });
});
// route'ları projeye tanıt
app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
// hata yönetimi için middleware
app.use(errorHandler);
// dinlemeye başla
app.listen(process.env.PORT, () => {
    console.log(`🎾 Server ${process.env.PORT} portunu dinlemeye başladı 🎾`);
});
