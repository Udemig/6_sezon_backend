import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import gigRoutes from "./routes/gig.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { config, isDevelopment } from "./config/enviroment.js";

// veritabanı ile bağlantı kur
mongoose
  .connect(config.MONGO_URI)
  .then(() => console.log("🔥Veritabanına Bağlantı Başarılı🔥" + " " + config.MONGO_URI))
  .catch((error) => {
    console.log("😡Veritabanına Bağlantı Başarısız😡");
    // sadece geliştirme modunda hata deylarını yaz
    if (isDevelopment) {
      console.log(error);
    }
  });

// express uygulaması başlat
const app = express();

// middleware'ler
app.use(
  cors({
    origin: config.CROSS_ORIGIN,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json()); // isteğin içeriğinde gelen verileri js formatına çeviren mw
app.use(cookieParser());

// geliştirme ortamında istek deyalarını yazan mw
if (isDevelopment) {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// deneme route'u
app.get("/", (req, res) => {
  res.json({ message: "Backend Hayatta...", date: new Date().toLocaleDateString("tr") });
});

// route'ları projeye tanıt
app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);

// hata yönetimi için middleware
app.use(errorHandler);

// dinlemeye başla
app.listen(config.PORT, () => {
  console.log(`🎾 Server ${config.PORT} portunu dinlemeye başladı 🎾`);
});
