// API : Gelen istekkeri izler ve isteklere cevap gönderirir.

// gerekli modülleri çağırdık
const http = require("http");
const fs = require("fs");
const url = require("url");

// kendi oluşturduğumuz fonskiyonu import et
const replaceTemplate = require("./modules/replaceTemplate");

/*
* createServer (), verdiğimiz dinleyiciyi fonksiyona her geldiğinde tetikler.
* Bu fonksiyon 2 parametre alır.
* 1) request > istek ile alakalı verileri içeren nesne.
* 2) response > cevap göndermemmizi sağlayacak nesne.


* Bu foksiyon içeriisnde gelen isteğe göre cevap gönderilir.


*/

/*
Routing
* API'ya gelen isteğin hangi endpoint (uç nokta / yol )'a geldğinin tespit edip ona göre farklı cevapşar gönderme işlemine routing denir.
* Routing için client'ın hangi yola ve hangi http methodu ile istek attığını bilmemiz gerekiyor.

*/

// html şablon verilerine eriş
let tempOverview = fs.readFileSync("./templates/overview.html", "utf-8");
let tempProduct = fs.readFileSync("./templates/product.html", "utf-8");
let tempCard = fs.readFileSync("./templates/card.html", "utf-8");

// json dosyasındaki verilere eriş
let jsonData = fs.readFileSync("./dev-data/data.json", "utf-8");

// json veriisni js formatına çevir
const data = JSON.parse(jsonData);

//http.createServer fonk. bir HTTP sunucusu oluşturur.
const server = http.createServer((request, response) => {
  console.log("😀 API'YE İSTEK GELDİ .", request.url);

  //obje dağıtma yöntemi ile aldık
  const { query, pathname } = url.parse(request.url, true);

  // gelen isteğin url'ine göre farklı cevap gönder
  switch (pathname) {
    case "/overview":
      //ürünler dizisinde ki eleman saysısı kadar kart oluştur
      const cards = data.map((item) => replaceTemplate(tempCard, item));

      tempOverview = tempOverview.replace("{%PRODUCT_CARDS%}", cards);
      return response.end(tempOverview);

    case "/product":
      //1) dizide ki doğru elemanı bul
      const item = data.find((item) => item.id == query.id);

      //2) detay sayfasında  html'i bulunna elemanın verilerine göre güncelle
      const output = replaceTemplate(tempProduct, item);

      //3) güncel html'i client'a gönder

      return response.end(output);

    default:
      return response.end("<h1>Tanimlanmayan Yol</h1>");
  }
});

// Bir dinleyici oluşturup hangi porta gelen isteklerin dinleneceğini söylemeliyiz.

server.listen(1616, "127.0.0.1", () => {
  console.log("IP adresinin 1616 portuna gelen istekler dinlenmeye alındı.");
});
