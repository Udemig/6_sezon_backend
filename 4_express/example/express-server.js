const express = require("express");
const cors = require("cors");

//bi api oluştur
const app = express();

//middleware  (cors hatalarını çözmekiin doğru headerlar gönderir.)
app.use(cors());

// "/" adrsine gelen isteklere cevap ver
app.get("/", (req, res) => {
  res.json({ message: "express Serverdan merhabalar" });
});

// "/new" adresine gelen isteklere cevap ver
app.post("/new", (req, res) => {
  res.status(201).json({ message: "serverdan merhabalar" });
});

//hangi porttan gelen istekleri dinlenecek
const port = 3002;

app.listen(port, () => {
  console.log(`Server ${port}. porta gelen istekleri dinliyor`);
});
