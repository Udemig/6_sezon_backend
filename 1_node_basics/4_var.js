const path = require("node:path");

// dosya dizinin deki kullanılabilecek methodlar

const text = "./data/örnek.txt";

console.log("dirname(): ", path.dirname(text)); // klasör yolunun ismi
console.log("basename(): ", path.basename(text)); // dosya ismi
console.log("extname(): ", path.extname(text)); // uzantı ismini

//iki veya daha fazla yolu birleştir

console.log("join() :", path.join("/media", "photos", "profile.png"));

// dosyanın mutlak konumu bulmak istiyorum ?
console.log("resolve(): ", path.resolve("örnek.txt"));

// yolu en basit hale getirir
console.log("normalize(): ", path.normalize("/users/selin/..//start.txt"));
