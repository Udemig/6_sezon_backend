# MERN STACK

- MongoDb-Express.js-React-Node.js

# Mongoose

- Node.js ortamında MongoDB veritabanıyla çalışmamızı sağlayan bir kütüphanedir.
- Mongoose, Mongodb ile etkileşime geçerken javascript nesne ve fonskiyonlarını kullanarak veritabanı işlemlerini gerçekleştirmemize olanak sağlıyor.

## Mongoose Temel Özellikleri

1. Şema Tanımlama: Veritabanı koleksiyonları için şema tanımlamanıza izin veriyor.Bu şema verielrin yapısını ve özellklerini önceden belirlememizi sağlar.

2. Modellema:Mongoose şemalara dayalı modeller oluşturu.Bu mpdelelr bir koleksiyonla ilişkili veritabanı işlemleri (okuma,yazma,güncellenme,silme) gerçekleştirmek için kullanılır.

3. Doğrulama (Vaidation):Verilerin belirli kurallara uymasını sağlamak için çeşitli doğrulama seçenekleri sunar.

# Enviroment Variables

- Ortam Değişkenleri / Çevre Değişkenleri

- Githuba gönderip herkesle paylaşmak istemeyeceğimiz değerler bire env variable olarak saklanır.
- gitıgnore dosyasına env dosyasını eklersek bu değişkenler localimize erişilebilir olurken githuba gönderilmez.
- Genelde hassas bilgiler, veritabanı, admin bilgilrti vb.durumlarda kullanırız.

# Operatörler

- gt (>): grather than
- gte (>=): grather tahn or equals
- lt (<): less than
- lte(<=): less than or equals
- ne (!=): not equals

# Authentication (Kimlik Doğrulama)

- Bir kullanıcnın kimliğini doğrulama sürecidir.
- Örn: eposta - şifre | google hesabı | parmak izi
- Kimlik doğrulama bir kullanıcının sisteme erişim talebini gerçekleştiren ilk adımdır.

# Authorization (Yetkilendirme)

- Bir kullancının sistemin belirli kaynaklarına erişimini kontrol etme sürecidir.
- Yetkilendirme kimlik doğrulama sürecinden sonra yaptığımız işlemdir.
- Kimliğini doğruladığımız kullanıcnın hangi eylemleri yapıp yapamayacığını belirleriz
- Örn
- - user role: sadece okuma yapabilir
- - guide / lead-guide: sadece kendi oluşturdukları turlarda CRUD işlemi yapabilir
- - admin role: hem bütün turlarda hemde kullancıı hespalarında CRUD işlemi yapabilir ve adminlere özel rapor route'larına erişebilir.

# Hash

- Hash fonksiyonları bir veriyi (örneğin parola) alarak benzer bir diziye dönüştüren matematiksel algoritmalardır

* "benim şifrem" > "2345421sdfsadgk25467mvcmspü346"
* "benim şifrem" > "2345421sdfsadgk25467mvcmspü346"
* "senin şifrem" > "12492035ujghnffdjh285658743hdf"

- Farklı girdiler farklı hash değerleri üretir. Aynı girdiler aynı hash değerini üretir.
- Kullanıcıların parolaralarının hashlenmesi parolanın depolanması sırasında güvenliği arttırır. Böylece depolama alanına erişen kötü amaçlı kişiler gerçek şifreleri doğrudan elde edemez

# Salt

- Parola tabanlı hash fonksiyonları aynı girdiler için aynı sonuçları üretrikleri için saltlama kullanarak güvenliği arrttırırız. Saltlama kullanıcının parolası için rastgele bir değer oluşturur ve bu değeri parolanın kendisiyle birleştiriyor. Sonra bu salt'lanmmış parolana hashing algoritmasından geçiyor bu satede şifre aynı olsa bile hashande sonraki çiktı farklı oluyor.

* "benim şifrem" > "dsfnl235benim şifrem123jds" > "123190rınfvjng489t645y\*090w2"
* "benim şifrem" > "199sf9benim şifrem456fofsd" > "sdfskdlgj30945891\*ıkfkdsgjı9"

## JWT'nin Yapısı

- JWT 3 ana bileşenden oluşur ve bu bileşenler (.) birbirinden ayrılır.
- Header (Başlık)
- Payload (Yük)
- Signature (İmza)

* Header:
* - Algoritma: Tokenin imzalanmasında kullanılan algoritmayı belirtir (örn: HMAC, SHA256, RSA)
* - Tip: Tokenin türü belirtilir (JWT)

* Payload:
* - Payload token içerisinde taşınacak bilgileri içerir. Bu bilgiler genellikle kullanıcnın kimli bilgileri veya yetkilendirme detayları olur (role).
* - Bizim girdiğimiz değerler dışarısında payload böülümde iss ve exp değerleride bulunur.

* Signature:
* - Header ve payload'ın doğruluğunu ve bütünlüğünü sağlama kiçin kullanılır.
* - İmza header ve payload'ın birleştirilmesiyle oluşan string'in bir algoritma ve bir gizli anahtar kullanılarak şifrelenmesiyle elde edilir.

---

## Postman Workspace Linki

- https://www.postman.com/winter-flare-727325/workspace/6-backend

## Index

- `Index`, veritbanındaki verileri daha hızlı sorgulamak için kullanılan bir yöntemdir.
- Index'ler bir kolleksiyonda yer alan belirli alanlara göre verilerin sıralı bir şekilde depolanmasını sağlar
- Oluşturulan her index veritbanında yer kapladığından dolayı kullanıcıların en çok hangi değerlere göre filtreleme/sıralama yapıcağını analiz edip indexleri ona göre oluşturmak gerekir.
- Schema'da unique kullandığınız zaman oto. olarak o alan için bir index oluşturur.
- Index hem kod üzerinde hemde compass uygulaması üzerinden oluşturabilir.

# Medya Depolama

## 1.Yol - Dosya Sistemi Üzerinden Sunucuda Depolama

- Avantaj:
- - Basit kolay
- - Düşük Maaliyet
- - Kontrol Bizde
- - Hız: Sunucu ile dosya aynı yerel ağda olduğu için erişim hızlı

- Dezavantaj:
- - Ölçeklenemiyor
- - Bakım: Yedeklemesi vs. bizim sorumluluğumuzda ve arıza durumda veri kaybedebiliriz.
- - Dağıtık erişim yok

## 2.Yol - Bulut Depolama (Amazon S3, Google Cloud, Firebase Storage...)

- Avantaj
- - Güvenlik
- - Ölçeklenebilir
- - Bakım
- - Dağıtık erişim var

- Dezanataj
- - Maaliyet
- - Bağımlılık

# Multer

- Node.js'de client'tan gelen medya içeriğini yönetmek için kullanıcağımız kütüphane

# Sharp

- kullanıcı 4k çözünürlükte 30-40mb foğrafı profil fotoğrafı yapmaya çalışabilir
- proje içerisinde profil fotoğrafları genelde 40x40 80x80 boyutlarında kullanılır ana fotoğrafı seçerken 2560x1680 gibi yüksek kaltire fotoğraf seçebilir ve herhangi bir işlemden geçirmeden sunucuya kaydedersek gereksiz yer kağlar.
- Bu yüzden yüklnicek olan fotoğrafın çözünürlüğünü proedeki max boyuta indiricez
