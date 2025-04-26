const mongoose = require("mongoose");
const app = require("./app.js");
// dotenv kütüphanesini çevre değişkenlerine erişmek için kuruyoruz.
require("dotenv").config();

// console.log(process.env.DATABASE_URL);
// console.log(process.env.PORT);

// mongo veritabanına bağlan (driver)
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log(" 😍 Veritabanı ile bağlantı kuruldu."))
  .catch((err) => console.log(" 🤬 veritabanına bağlanırken hata oluştu", err));

app.listen(process.env.PORT, () => {
  console.log(`Server ${process.env.PORT} portunda çalışmay başladı.`);
});
