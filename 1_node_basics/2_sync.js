//* FS modülünü bu dosyaya çağırma (import etme)

const fs = require("fs");

//* FS (FileSystem)
//* Node.js modülleridnen bir tanesi
//* Sahip olduğu modüller sayesinde dosya dizininde işlemler yapabileceğiz.
//* Dosya Oluşturma / Silme / Okuma / Yazma

/*
SENKRON
* senkron bir işlem baştan sona tamamlanana kadar diğer kodların çalışmasını durdurur.
* yani işlemi başlatığınızda işlem tamamlanmadan sonr aki satır çalışmaz.

* senkron işlemler özellikle büyük veri işlenleri için bekleme süresini artırabilir ve performansı düşürür.
* bunun sebebi node.js tek iş parçacıklı yapıya sahip olması ve bir senkron işlem devam ederken diğer işlemler beklemek zorunda kalır.

**** Hangi durumlarda senkron kullanılır ?
* küçük işlemlerde ve beklmenin kritik olduğu duurmlarda kullanılır.
*/

//! 1) Dosya Okuma

const text = fs.readFileSync("./data/örnek.txt", "utf-8");

// console.log(text);

console.log("Dosya Okuma bitti");

//! 2) Dosya Yazma
//* Gönderilecek metin içeriğini hazırla

const newText = `
Greyfurt hakkında öğrendiğim bilgiler bunlardı:
${text}
Oluşturulma Tarihi:
${new Date().toLocaleDateString()}
`;

//output isminde varolan dosya yoksa yenisini oluşturup içeriğini belirler.
fs.writeFileSync("./data/output.txt", newText);
console.log("Dosya yazma bitti");

//! 3) Dosya Silme
fs.unlinkSync("./data/bozuk.txt");
console.log("Dosya silme bitti");

//! 4) Dizinde (Klasör) Oluşturma
fs.mkdirSync("challange");
console.log("Klasör oluşturma bitti");

//! 5) Dosya / Dizinin İsmini Değiştirme
fs.renameSync("challange", "important");
console.log("Klasör ismi değiştirme bitti");
