const bodyParser = require("../utils/bodyParser");
const crypto = require("crypto");
const fs = require("fs");

const keys = [
  "title",
  "year",
  "rating",
  "description",
  "director",
  "duration",
  "language",
];

const postRequest = async (req, res) => {
  if (req.url === "/api/movies") {
    //isteğin body kısmına ulaş
    const body = await bodyParser(req);

    //gelen veriyi kontrol et
    console.log("gelen body", body);

    if (
      keys.some((key) => !body[key]) ||
      !body.genre.length > 0 ||
      !body.cast.length > 0
    ) {
      res.end("Lütfen zorunlu olan bütün alanları tanımlayın");
      return;
    }

    //kaydedilecek veriye id  ekle

    body.id = crypto.randomUUID();

    //json dosyasından verileri al
    let data = fs.readFileSync("./data/movies.json", "utf-8");
    data = JSON.parse(data);

    // mevcut filmlerin üzerine yeni film ekle
    data.push(body);

    //json dosyasnını güncelle
    fs.writeFileSync("./data/movies.json", JSON.stringify(data));

    //clienta cevap gönder
    res.writeHead(201);

    res.end(JSON.stringify(body));
  } else {
    res.writeHead(404);
    res.end("Geçersiz yola istek atılıdı");
  }
};

module.exports = postRequest;

console.log(crypto.randomUUID());
