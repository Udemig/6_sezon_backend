const fs = require("fs");

//Örnek;

/*
1) title dosyasını okuyun.  // readFileSync
2) content dosyasını okuyunn. //readFileSync
3) title dosyasında ki başlığa/yola ve content dosyasınd aki içeriğe sahip bir dosya oluşturun.// writeFileSync

*/

const title = fs.readFileSync("./challange/title.txt", "utf-8");

const content = fs.readFileSync("./challange/content.txt", "utf-8");

fs.writeFileSync(title, content);
