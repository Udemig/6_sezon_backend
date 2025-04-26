const express = require("express");
const {
  getAllCars,
  createCar,
  getCar,
  updateCar,
  deleteCar,
} = require("./controllers");
const { logger } = require("./middleware");
const idControl = require("./middleware/idControl");

const carRoutes = require("./routes/carRoutes");

//! 1) kurulum
const app = express();
const PORT = 3000;

//! Middleware (arayazılım) > backende isteğin gelmesi ile gönderilmesi arasında çalışan yazılım
app.use(logger);

//! isteklerin body/header/param bölümlerinin tamamını ekleyen middleware
app.use(express.json());

app.use(carRoutes);

//!2) dinlenecek portu oluştur
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunu dinlemye başladı.`);
});
