const express = require("express");

const app = express();

app.use(express.json());

app.use("/", (req, res) => {
  return res.status(200).json({ message: "Customer API'na hoşgelediniz" });
});

app.listen(3001, () => {
  console.log("Customer API'nın portu 3001");
});
