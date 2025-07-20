const express = require("express");

const app = express();

app.use(express.json());

app.use("/", (req, res) => {
  return res.status(200).json({ message: "Shopping API'na hoşgelediniz" });
});

app.listen(3003, () => {
  console.log("Shopping API'nın portu 3003");
});
