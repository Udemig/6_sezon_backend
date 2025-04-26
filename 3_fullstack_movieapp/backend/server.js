const http = require("http");
const getRequest = require("./methods/get");
const postRequest = require("./methods/post");
const deleteRequest = require("./methods/delete");
const defaultRequest = require("./methods/default");
const optionsRequest = require("./methods/options");

//1) server oluştur
const server = http.createServer((req, res) => {
  console.log("🥵 istek geldi", req.method);

  //cevaba gönderilecek içeriğin tipini header olarak ekle
  res.setHeader("Content-type", "application/json");

  //kaynak paylaşımında sorun yaşamamak için (CORS)
  res.setHeader("Access-Control-Allow-Origin", "*");

  console.log("🥵 istek geldi", req.method);

  //gelen isteğin. method türüne göre clienta farklı cevaplar gönderelim
  //kod kalabalığı olmaması için isteklere cevap gönderen fonksiyonları ayrı dosyalarda tanımladık.
  switch (req.method) {
    case "GET":
      return getRequest(req, res);

    case "POST":
      return postRequest(req, res);

    case "DELETE":
      return deleteRequest(req, res);

    case "OPTIONS":
      return optionsRequest(req, res);

    default:
      return defaultRequest(req, res);
  }
});

// belirl, bir porta gelen istekleri dinle

const port = 4090;

server.listen(port, () => {
  console.log(`🥵 server ${port}' gelen istekleri dinlemeye başladı.`);
});
