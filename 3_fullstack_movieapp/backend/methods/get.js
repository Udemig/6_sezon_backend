const fs = require("fs");

const getRequest = (req, res) => {
  console.log(req.url);
  //url'in temeladrsini değişkene aktar
  const path = req.url.substring(0, req.url.lastIndexOf("/"));

  // urlîn sonund aki id değerini değişkene aktar
  const id = req.url.split("/")[3];

  // temel urlistek atılırsa bütün filmleri al
  if (req.url === "/api/movies") {
    //1 ) json dosyasından filmleri al
    const movies = fs.readFileSync("./data/movies.json", "utf8");

    //2) clienta cevap gönder
    return res.end(movies);
  }

  //yola id eklenirse bir filmi gönder
  if (path === "/api/movies" && id) {
    //1) json dosyasından filmleri al
    const data = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

    //2) url deki id'ye karşılık gelen elemanı dizide ara (find)
    const movie = data.find((i) => i.id === id);

    //3) eğerki film bulunursa clienta cevap gönder

    if (movie) {
      return res.end(JSON.stringify(movie));
    }

    //4) eğer ki film bulunamazsa hata gönder
    res.writeHead(404);
    return res.end(JSON.stringify({ message: "Aranılan film bulunamadı " }));
  }

  //yol yanlışsa hata gönder
  return res.end(JSON.stringify({ message: "Yol Bulunamadı" }));
};

module.exports = getRequest;
