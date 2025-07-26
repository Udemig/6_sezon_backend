const express = require("express");
const proxy = require("express-http-proxy");

const app = express();

app.use(express.json());

// Client tarafı istek atarken sürekli farklı portlara istek atmasını engellemek için proxy kullanıyoruz.
// Proxy client gelen isteği farklı sunuculara / portlara yönlendirmemizi sağlıyor.
app.use("/customer", proxy("http://localhost:3001"));
app.use("/shopping", proxy("http://localhost:3003"));
app.use("/", proxy("http://localhost:3002"));

app.listen(3000, () => {
  console.log("Gateway API'nın portu 3000");
});
