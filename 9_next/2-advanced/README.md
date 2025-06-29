# Parallel Routes

- Parallel routes, aynı anda birden fazla bağımsız sayfayı aynı layout içerisinde ekrana basmaya yarar.

- Her sayfa kendi bağımsız yükleme mantığına sahiptir (loading,error)

- @Slot: @ işareti ile tanımlanan ve paralelel route olarak ekrana basılacak sayfalara denir.

- Slot olarak tanımlanan sayfalar layout'a prop olarak gider

- Layout üzreinden slot olarak tanımlı sayaları aynı anda veya koşullu olaraka ekrana basabiliriz

- - Biz, parallel routes ile aynı arayüzü 2-3 nomal component oluştururakda elde edebilirdik
- - Ama normal component'lar yerine next.js sayfaları `page.jsx`'leri ekrana bastık.
- - `Page.jsx` kendi otomatik loading/error mekanizmasına sahipken normal component'larda manuel yapılmalı
- - `Page.jsx` ile oluşturulan sayfalar urldeki parametreleri otomatik prop olarak alır
- - Slot page'ler SSR, SSG, metadata, hatta middleware desteğinden faydalanabilir.

# Intercepting Routes

- Önizlemeli Route
- Bir sayfaya yönlendiren linkte tıkladığımızda öncelikle bir modal açıp sayfa detaylarını modal üzerinden gösteririz. Kullanıcı sayfayı yenilerse bu sefer modal sayfanın kendisi gösterilir.
- Bu özellik genel olarak ürün/göndeir detay sayflarında, login/register sayfaların, form alanlarında karşımıza çıkar.

# Server Side Render vs Client Side Render

- Client side rendering yöntemi uygulanan bir sayfayaya girdiğimizde `js kodu` ve `boş html dosyası` indiririz. İndilern js kodu `kullanıcının cihazınıda` çalışır ve html'i doldurur ardından sayfa ekrana gelir

- Server side rendering yöntemi uygulanan bir sayfaya girdiğimizde `js kodu` `sunucuda` çalışır ve `html` `sunucuda` oluşur. Oluşan `dolu html dosyasını` client indirir ve sayfa ekrana gelir

## SSR Faydaları

- JS kodu kullanıcnın cihazında değilde sunucuda çalışıyor olması daha hızlı sonç üretir, daha kısa sayfa yüklenme süreleri oluşur.
- SEO açısından dolu html dosyasını indirmek önemlidir, bu sayede google'ın robotları sayfa içeriğini boş zannedip arama sonuölarında alt sıralarda önermez

## Nasıl SSR veya CSR kullanırız?

- Next.js'de iki farklı component türü vardır:
- Server Component: İçeriğini server'da render eder.
- Client Component: İçeriğni client'da render eder.

- Next.js biz aksini belirtmedikçe oluşturuğumuz bütün componentlar `server component` olarak tanımlanır.
- Eğer bileşenin üst kısmına `use client` yazarsak `client component` olur.
- Next.js bizden olabildiğince çok server component kullanmamızı bekler ()(HIZ - SEO)
- Her component'ı server component yapamıyoruz. Kullanıcı etkileşimi gerektiren (onClick,onSubmit) ve react hooks kullanılan (useState,useEffect) durumlarda client component'lar kullanılır

- Not: Next.js bizden olabildiğince çok server component kullanmamızı istediği için bir sayfa içeriisnde kullanıcı etkileşmi / hook kullanımı gerektiren bi yer varsa o sayfayı client component'a çevirmek yerine sayfanın sadece o kısmı için ayrı bir component açarız o component'I client'a çevirirz bu sayede sayfanın geri kalanı server'da render edilir.

# Data Fetching

- Next.js çekilen veriyi belirli bir süre boyunca cache'de tutuar ve veriyi çeken fonksiyonu belirli bir süre içerisinde tekrar çalıştırıdğımızda api'dan veriyi tekrar almak yerine önceki istekden gelen ve cache'de tutulan veriyi alır

- Bu sayede:
- - api'dan cevap beklemek gerekmez > daha hızlı
- - api'a gereksiz istekler gitmez > daha az maliyeti

- Hem bu cache özelliği sayesinde hemde server componentların yoğunlukta olmasını istememiziden dolayı next.js projelerinde context/redux gibi yapıları pek tercih etmeyiz

# Next.js Methodları

## useRouter

- sadece `client` component'larda kullanılır
- proje içerisinde yönlendirme yapmak için kullanılır.
- back() | forward() | refresh() | push() methodları vardır.

## redirect

- sadece `server` component'larda kullanılır
- yönlendirme yapmak için kullanılır

## notFound

- Hem `client` hem de `server` component'larda kullanılır
- 404 sayfasını ekrana basar

## usePathname

- sadece `client` component'larda kullanılır
- kullanıcının bulunduğu yolu url'den alır ve döndürür

## useParams

- sadece `client` component'larda kullanılır
- urldeki path parametreline erişmemizi sağlar

## useSearchParams

- sadece `client` component'larda kullanılır
- urldeki query parametreline erişmemizi sağlar

## Form

- Kulanıncın arattığı kelimyi url'e parametre olarak ekler aynı zamanda kullanıcyı /search sayfasına yönlendirmek istiyoruz

# Static Site Generation

- SSG, nextjs'in build (derleme) sırasında sayfaları önceden HTML olarak üretip sunucu saklamasısıdır.
- Kullanıcı siteyi ziyaret ettiğinde sayfalar anında ve çok hızlı şekilde sunulu çünkü sayfa önceden hazırlanmaştır

## Static Sayfa

- Build anında html'i hazırlanan sabit sayfalar
- Sayfa içeriğinin çok sık değişiceği durumlarda statik sayfa özelliğnii özelleştirmek istebiliriz bunun için component içerinde `revalidate` özelliğini kullanırızı

## Dinamik Sayfa

- Kullanıcının sayfaya girdiği anda hazırlanan dinamik sayfalar
- Genelde url'de parametresi olan ve sayfa içierğini urldeki parametreye göre değiştiği sayfalar dinamik sayfa kategorisine girer

## generateStaticParams

- Bu fonksiyon sayesinde dinamik olan sayfaları statik hale getirebiliyoruz
- Buil sırasında çağrılan dinamik route'lar içn bir parametre listesi döndürür. Next.js'de bu listediki herbir parmaetre için o detay sayfasının statik bir berisyonunu oluşturur

- generateStaticParams() > [{id:1},{id:2},{id:3}]
- yukarıdaki dizideki herbir id değeri içib statik bir detay sayfası oluşur
- /1 , /2 ,/3 adreslerine giden kullanıclarönceden hazırlanmış sataik içerikleri görür

# Fullstack Proje

- Next.js bize hem frontend hemde backend kodlarını tek bir proje içerisinde yazmayı vaad ediyor.
- Next.js api oluştutururken klasik nodejs,express api'lardan farklı, next.js'e has routing yöntemi kullanrırız

- Backend routelarını oluşturmak için `app` klasörü içerisinde `api` klasörü oluştururuz
- Oluşturmak istediğimiz her endpoint için yeni bir klasör ve o klasör içerisinde `route.js` dosyası oluştururuz
- Oluşturduğumuz route içerisinde cevap vermek istediğimiz HTTP methodunun ismiyle bir fonksiyon oluştururuz

# Res.Json() vs NextResponse.json()

- NEXT.JS'de client'a cevap gönderirken eski res yönremi yerine nextresponse yöntemini tercih ederiz bunun sebebi:
- Typescript desteği
- Büyük veriler için streaming desteği sunar

# Middleware

- `middleware.js` dosyasını src varsa src klasörü içerisine yoksa app klasörünün hemn dışarısına oluşturururz
- İçerisinde bir ana middleware fonksiyonu export ederiz
- Config aracılığıyla middleware'in hangi endpointelerde çalışıcağınız belirleriz
- Belirlideğim endpointelere her istek deldiğinde mw devreye girer
- MW'in sonraki aşamaya geçmesi için NextResponse.next() kullanırız

# Server Actions

- Sunucu tarafında çalışan normalde frontend'in yapamayacığı backend'e doğrudan erişme gibi eylemleri gerçekleştirebileceğimiz fonksiyonlar

- server action fonksiyonları mutlaka `use server`ile işaretlenmeli
