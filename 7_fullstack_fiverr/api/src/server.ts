import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from './routes/auth.routes.ts'
import gigRouter from './routes/gig.routes.ts'
import errorMiddleware from './helpers/error.ts'
import globalErrorHandler from "./middlewares/globalErrorHandler.ts";

// env dosyası değişikliklerine erişim sağlar
dotenv.config();


//veritabanı bağlantısı kuralım

mongoose
    .connect(process.env.DATABASE_URL as string)
    .then(()=>console.log("\n\n Veritabanı bağlantısı kuruldu \n\n"))
    .catch((err)=>console.log("\n\n Veritabanına bağlanılamadı \n\n", err))


//express sunucumuzu belirliyoruz
const app = express();

// middlewareler
app.use(express.json())




// route'ları kullanıyoruz
app.use("/api/auth",authRouter)
app.use('/api/gigs',gigRouter)




// hata yönetimi middleware'i, en sonda belirliyoruz ki bütün hataları yakalayabilsin
app.use(globalErrorHandler)


//express sunucumuzu ayağa kaldırıyoruz || bu komut yürüdükten sonra bu IP ve porta istek atılabilir ve cevap alınabilir

app.listen(process.env.PORT, ()=>{
    console.log(`Sunucu ${process.env.PORT} portunu dinlemeye başladı.`)
})