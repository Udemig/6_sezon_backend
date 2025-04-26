const fs = require("fs");

/*
ASENKRON
* asenkron işlemler başladığında aynı anda kod çalışmaya başlar ve devam eder.
* node.js işlemi arka planda yürütür ve tamamlandığında callback function ile sonuç döndürür.
* asenkron işlmler node.js single-thread yapısından dolayı performansı artırır çünkü bir işlem devam ederken diğer işlemleri engellemeden yürütebilir.

* Hangi durumlarda kullanılır ?
* Performansın önemli olduğu kullnıcı deneyimini etkilemek istemediğimiz durumlarda asenkron yöntemleri kullanmalyıız.
* Büyük dosya varsa veya daha fazla girfi / çıktı varsa asenkron tercih ederiz.

*/

// fs.readFile("./data/örnek.txt", "utf-8", (err, data) => {
//   if (err) return console.log("okuma işleminde hata !!! 💥 ", err);

//   console.log("dosya başarıyla okundu ", data);
// });

// fs.writeFile("./data/output2.txt", "selamlar 6sezon BACKEND", (err) => {
//   if (err) return console.log("yazma işlemi hatalı !!! 💥 ", err);

//   console.log(" 😄 yeni dosya başarıyla oluşturuldu.");
// });

// fs.unlink("./data/bozuk.txt", (err) => {
//   if (err) return console.log("silme işleminde hata oluştu !!! 💥 ");
//   console.log(" 😄 dosya başarıyla silindi.");
// });

// Okuma işleminin okuma işlemine bağımlı olduğu seneryoda asenkron yapıyı kullanabiliriz.

fs.readFile("./data/start.txt", "utf-8", (err, filename) => {
  if (err) return console.log("okunamadı !!! ");

  console.log(filename);

  //start.txt dosyasının içeriisnde yazan dosyayı oku
  const sonuc = fs.readFileSync(filename, "utf-8");

  //sonucu konsola yzdır
  console.log("sonuc", sonuc);
});
