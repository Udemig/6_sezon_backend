const fs = require("fs");

const deleteRequest = (req, res) => {
  console.log(req.url);
  //url'in temel adresini değişkene aktar (sonda ki param dışarısında kalan)
  const path = req.url.substring(0, req.url.lastIndexOf("/"));

  //url soh-nudaki id değerini değişkene aktar
  const id = req.url.split("/")[3];

  if (path === "/api/movies" && id) {
    //bütün filmleri al
    const data = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

    //parametre olarak gelen id'li film dizi de var mı ara
    const isFound = data.find((i) => i.id === id);

    // yoksa id geçersiz hatası gönder
    if (!isFound) {
      res.writeHead(404);
      return res.end("Gönderilen id'li eleman bulunamadı");
    }

    //diziden id'si bilinen filmi kaldır
    const filtred = data.filter((i) => i.id !== id);

    //json dosyasını yeni diziye aktar
    fs.writeFileSync("./data/movies.json", JSON.stringify(filtred));

    //clienta cevap gönder
    res.writeHead(204);
    return res.end();
  }
};

module.exports = deleteRequest;
