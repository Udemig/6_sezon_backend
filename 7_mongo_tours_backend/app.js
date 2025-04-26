const express = require("express");
const { getAllTours, createTour } = require("./controllers/tourController.js");
const tourRouter = require("./routes/tourRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const reviewRouter = require("./routes/reviewRoutes.js");
const cookieParser = require("cookie-parser");
const e = require("./utils/error.js")

const app = express();
const morgan = require("morgan");
const sendMail = require("./utils/sendMail.js");
const globalErrorHandler = require("./utils/globalErrorHandler.js");
const {rateLimit} = require("express-rate-limit");
const { default: helmet } = require("helmet");
const sanitize = require("express-sanitize");
const hpp = require('hpp');

// İstek sayısı sınırlama => Brute force saldırılarına karşı bize yardımcı olur.



const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // Belli bir istek grubu için süre aralığı
	limit: 10, // Tek bir IP adresinden atılabilecek isteklerin sınırı
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})

// Bütün isteklere istek atma limitini uygula ki spam istek atılamasın.
app.use(limiter);


// bütün isteklerimiz koruyucu headerlarla kaplanmış olacak
app.use(helmet());

// SQL ve XSS saldırılarına karşı parametreleri, queryleri ve bodyleri temizleyen middleware
app.use(sanitize);

//gelen istekleri loglar
app.use(morgan("dev"));

//gelen isteklerin body'sine eriş
app.use(express.json());

// cookielere eriş
app.use(cookieParser());

// hpp kullanarak parametre kirliliğini önle
app.use(hpp())


//turlar ile alakalı yolları projeye tanıt
app.use("/api/tours", tourRouter);
app.use("/api/users", userRouter);
app.use("/api/reviews", reviewRouter)






// bilinmeyen endpointler için verilecek hata mesajı
app.all("*",(req,res,next)=>{
    next(e(404,`Aradığınız ${req.originalUrl} adresi bulunamadı.`))
})

// evrensel hata yakalayıcı ve cevap gönderen fonksiyonumuz.
// en aşağıda belirliyoruz ki bütün hataları yakalayabilsin.
app.use(globalErrorHandler);



module.exports = app;
