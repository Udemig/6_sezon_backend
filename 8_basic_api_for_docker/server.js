const express = require("express");

const app = express();
const PORT = 3000;

// çalıştığını kontrol etmek için kullancığaımız endpoin
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Server Sağlıklı", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portta çalışıyor`);
});

// npm init
// npm i express
// node server.js
