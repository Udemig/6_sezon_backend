// isteğin body kısmınd ali veriye erişebilmek için parça parça gelen bütün byte'ları birleştirip fonksiyonun çağrıldığı yere return et

const bodyParser = (req) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      // frontend'den body'nin her parçası geldiğinde onu al ve yukarıda ki stringe ekle
      req.on("data", (chunk) => {
        body += chunk;
      });

      //yüklenme bittiğinde json verisini js verisine çevir
      req.on("end", () => {
        //fonksiyonun çağrıldığı yere body içeriği return et
        resolve(JSON.parse(body));
      });
    } catch (error) {
      //hata oluşurs hatayı döndür
      reject(error);
    }
  });
};

module.exports = bodyParser;
