# Routing

- Next.js'de gücncelse sürümlerde önerilen ve tercih edilen routing yöntemi `App Router`'dır ama next.js 13 öncesi sürümlerinde `Pages Router` kullanılırdı.

# App Router

- React projelerinde react-router-don kütüphanesiyle yaptığımız sayfalamayı next.js'in kendine has app router yöntemiyle yaparız
- Dosya dizinine göre / klasör tabanlı sayfalama yapar.
- Bütün sayflar src/app klasörü içerisinde tanımlanır
- Bir sayfa oluşturmak için app klasörü içerisinde o sayfanın adına sahip bir klasör oluşturmalıyız
- Oluşturduğumuz klasörüin içerisine `page.jsx` dosyası oluşturmalıyız
- `page.jsx` dosyası içerisine bir react component oluşturup export etmeliyiz
- Next.js bu sayfayı tespit edip otomatik olarak kendi router'ına ekler

## Nested Routes - İç İçe Yollar

- örn:
- /profile > profilini görüntüle
- /profile/friends > arkadaşlarını görüntüle
- /profile/edit > profilini düzenles

- Nested routes oluşturuken bir child oluşturma için sadece bir sayfa klasörü içerisine başka bir sayfa klasörü açmak yeterlidir.

## Link - Yönlendirme

- Next.js'de kullanıcyı linkler aracılığıyla yönlendirmek için Link componentını kullanırız.
- `href` propu ile yönlendireceğimiz adresi belirleriz

## Dynamic Routes - Dinamik Yollar

- Detay sayfalarında url'deki parametrelere erişmek için kullanılır
- /products/10 & /videos/jasdkf87 & /cars/model-y
- Bir dinamik route tanımlamak için klasör oluştururken parametre ismini [] içerisine yazarız
- Component ise bu parametreye proplar aracılığıyla erişir
- `/products/[id]`

## Catch All Segmets - Birden fazla parametreye erişme

- Bir route'da birden fazla parametre olduğu seneryoda dynamic routes yönteminden farklı olarak bu yolu kullanırız
- Bu yöntemde parametre sayısı belirsiz olduğu için parametreler her zaman bir dizi içerisinde gelir

- /docs/belge-1
- /docs/belge-1/sayfa-4
- /docs/belge-1/sayfa-4/satir-15
- `/docs/[...slug]`

## Not-Found - 404 Sayfası

- Bir 404 sayfası oluşturmak için tek yapmamız gereken app klasörü içerisinde `not-found.js` isimli bir dosya oluşturmamız yeterli.
- Next.js'İn varsayılan bir 404 sayfası var ama istersek onu yukarıdaki yöntemle özelleştirebiliyoruz
- Kullanıcı, projede mevcut olmayan route'lara gitmeye çalıştığında otomatik olarak devreye girer.
- Eğer bir kullanıcyı bu sayfaya yönlendirmek istersek `notFound()` fonksiyonunu çalıştırmmaız yeterli

## Route Group - Sayfa Gruplandırma

- Proje içerisindeki sayfaları daha erişlebilir olması için kategorilerine göre gruplandırmak isteyebiliriz.
- Ortak layout'a sahip olucak sayfaları aynı route grubu içerine almak isteyebiliriz
- Normal klasörleri url'i etkileyiceği için sayfaları gruplandırmak için kullanamayız
- `/auth/signup ` > auth ismi url'e etki eder
- `/(auth)/signup` > auth url'e yansımaz

## Layout

- Bir uygulamanın veya sayfa grubunun genel dizaynını / ortak elementlerini / yetkilendirme durumunu belirlemek için kullandığımız bileşendir.

- Bir sayfa grubunun veya projedeki bütün sayfaların ortak kullancığı bileşenleri layout'da tanımlayığ kod tekrarını önleyebiliriz.

- Layout klasörünü oluşturuduğumuz konuma bağlı olarak etkliyeceği sayfa sayısı değişir.
- - Eğer app klasörü içerisinde oluşturursak (RootLayout) bütün sayfaları etkiler
- - Eğer layout dosyasını bir route grubu içerine oluşturusak sadece o route grubundaki elementleri etkiler

- Layout componetları ekran basılcak olan sayfaları children propu olarak alır bundan dolayı birer HOC'lardır.

- Dosya ismi mutlaka `layout.jsx` olmalıdır

## Template

- Layout ile aynı özelliklere sahiptir sadece sayfa geçişlerinde state'i sıfırla

## Metadata

- Next.js'de react'dan farklı olarak her sayfaya özgü ayrı metadatalar tanımlayabiliyoruz.

- Bu sayede next.js projeri SEO açısından çok daha iyi olur.

- Sayfaların tarayıcıda öne çıkması için tanımladığımız metadata özelliklerini (title,description,keywords/author) react tarafında bütün sayfalara ortak sabit bir şekşilde tanımlarken next'de her sayfaya özgü ve istersek dinamik bir şekilde tanımlayaniliriz

- Bir sayfanın metadatasını tanımlamak istiyorsak o sayfada bir `metadata nesnesi` oluşturur ve export ederiz.

- Dinamik sayfaların metadatalarınıda `generateMetadata` fonksiyonu aracılığı ile dinamik hale getirebiliriz.
- generateMetadata fonksiyınu component'ın aldığı propların hepsini parametrele olarak alır bu parametrelerde yola çıkarak ürünün bilgilerine göre metadatayı düzenleyebiliriz.

# Özel Dosyaları

- `page.jsx` > sayfa tanımlar
- `layout.jsx` > sayfa düzeni tanımlar
- `template.jsx` > sayfa düzeni tanımlar
- `not-found.jsx` > 404 sayfası tanımlar

- `loading.jsx`
- - bir bileşen await ile promise'i beklediği süre boyunca otomatik olarak ekrana gelir
- - dosyayı oluşturduğunuz konum loading elementinin sayfanın neresinde ekrana basılacağını belirler
- - oluşturuduluğu klasöredeki layout component'ında children nerede ekrana basıldıysa loading orada ekrana gelirse

- `error.jsx`
- - bir bileşenden throw ile hata fırlatıldığında otomatik olarak ekrana gelir
- - loading gibi oluşturulduğu klasöre bağlı ekrana gelir
- - `use client` kullanmak zorunlu
- - `hata verilerini` ve `sayfayı yenileme yarayan fonksiyonu` prop olarak alır
