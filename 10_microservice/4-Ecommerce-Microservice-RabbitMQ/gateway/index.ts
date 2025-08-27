import express from "express";
import proxy from "express-http-proxy";
import dotenv from "dotenv";

// değişkenleri yükle
dotenv.config();

// express uygulması oluştur
const app = express();

// gerekli yönlendirmeleri yap
app.use("/api/auth", proxy(process.env.AUTH_SERVICE_URL));
app.use("/api/delivery", proxy(process.env.DELIVERY_SERVICE_URL));
app.use("/api/order", proxy(process.env.ORDER_SERVICE_URL));
app.use("/api/restaurant", proxy(process.env.RESTAURANT_SERVICE_URL));

// gateway'i ayağa kaldır
app.listen(process.env.PORT, () => {
  console.log(`⭐️ API Gateway ${process.env.PORT} portunda çalışıyor`);
});
