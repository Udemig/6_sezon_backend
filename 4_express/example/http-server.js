const http = require("http");

// bir http sunucusu oluştur gelen istekleri karşıla ve cevap ver

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET")
    //durum kodu ve headernı belirle
    res.writeHead(200, { "content-type": "application/json" });

  //cevao gönder
  res.end(JSON.stringify({ message: "node Serverdan merhabalar" }));
});

//port 3001'e gelen istekleri dinle

const port = 3001;

server.listen(port, () => {
  console.log(`Server ${port}. porta gelen şstekleri dinliyor`);
});
