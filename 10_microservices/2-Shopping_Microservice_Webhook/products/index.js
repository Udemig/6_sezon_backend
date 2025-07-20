const express = require("express");

const app = express();

app.use(express.json());

app.use("/", (req, res) => {
  return res.status(200).json({ message: "Products API'na hoşgelediniz" });
});

app.listen(3002, () => {
  console.log("Products API'nın portu 3002");
});
