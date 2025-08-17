# NEST.js

- Nest.js modern api'lar geliştirmek için kullanılan açık kaynaklı ve typescript tabanlı bir framework.

# Neden NODE.js yerine NEST.js

- Modüler mimari: Kodun yönetebilirliğini kolaylaştırır.
- Dependency Injection: Bağımlılıkların yönetilmesini kolaylaştırır.
- Entegre typescript desteği
- Express entegre olarak gelir
- Ölçeklenbilir.
- Kapsamlı eksistem ve dökümantasyon

## Nest CLI Komutları

## Kurulum

```bash
 # nest cli'ı dahil et
 $ npm i -g @nestjs/cli

 # proje oluşturma
 $ nest new project-name
```

## Projeyi Ayağa Kaldırma

```bash
 # geliştirici modu
 $ npm run start

 # geliştirici modu (dosya değişliklerini anlık algılar: nodemon)
 $ npm run start:dev

 # buildi alınan projeyi ayağa kaldırır
 $ npm run start:prod

 # debug modunu çalıştırır
 $ npm run start:debug
```

## Oluşturma Komutları - Generate Commands

```bash
 # yeni bir modül oluştruma konutu
 $ nest g module module_ismi

 # ilgili modüle bir controller oluşturma konutu
 $ nest g controller/co module_ismi

 # ilgili modüle bir service oluşturma konutu
 $ nest g service/s module_ismi

```

# Nest Temel Kavramlar

## Controller

- Next.js de controller'lar HTTP isteklerini alan ve yanıt tveren sınıflardır.
- Controller içerisinde tanımlanan route'lar uygulamamızın endpointlerini oluşturur.

## Service

- Veritabanı ile iletişime geçtiğimiz katman

## Route Params

- Route parametreleri, URL içerisinde değişkenleri dinamik olarak yakalamak için kullanılır
- `users/:id` şeklinde tanımlanan router'da ide değerini yakalamak için `@Param("id")`ifadesini kullanırız
- Birden fazla parametre olursa parametreler nesne formatında gelir

## Query Params

- URL içerisinde arama parametrelerini yakalamak için kullanılır
- `users/?sort=artan&id=1234` şeklinde tanımlanan router'da parametleri yakalamak için `@QueryParam()`ifadesini kullanırız
- Birden fazla parametre olursa parametreler nesne formatında gelir

## Body

- İsteğin body kısmında gönderilen veriye erişmek için @Body() ifadesini kullanırız.
- @Body() fonksiyonu verileri getirir ardından bir değişkene aktarır

```typescript
  @Post()
  create(@Body() body) {
    return { message: 'Mülk oluşturuldu', body };
  }
```

## Status Code

- Nest.js'in varsayılan http status codeları vardır ama bunları değiştirmek istersek http methodunun hem en ardından `@HTTPCode(204)` ifadesiyle client'a göndeirlecek cevabın kodunu belirlyebiliyoruz

```typescript
  @Post()
  @HttpCode(201)
  create(@Body() body) {
    return { message: 'Mülk oluşturuldu', body };
  }
```

## Transform Pipe

- Gelen verleri belirli bi formata dönüştürmek için kullanılır.
- Örn: String tipinde geln id parametresini number'a çevirmek için kullanabiliriz.

## Validation Pipe

- Validation pipe, geşen verilerin istenilem formata uygun olup olmadığını kontrol eder.
- NESTJS `class-validator` ve `class-transformer` kütüphaneleri ile birlikte çalışarak (DTO - Data Transfor Object) bazlı doğrulama yapmamıza olanak sağlar.

```tsx
  @UsePipes(new ValidationPipe({ groups: ['update'], always: true }))
  update(@Param('id') id, @Body() body: CreatePropertyDTO) {}
```

## Validation Groups

- Aynı DTO içerisinde farklı durumlar için validasyon kuralları belirlememizi sağlar

```tsx
  @IsString()
  @Length(2, 20, { groups: ['create'] })
  @Length(4, 40, { groups: ['update'] })
```

# Global ve Module Level Validasyon

## Global Level: Tüm Modüllere Etki Eder

```tsx
// projedeki türm modüller için ortak bir valiadasyon tanımladık.
// global pipe'ın dezavantajı validation ayalarını kullandığımız yere göre yapamıyoruz
app.useGlobalPipes(
  new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
);
```

## Module Level: Tek bir Modüle Etki Eder

```tsx
  // sadece property modülü içierisnde devreye girecek bir validation pipe tanımladık.
  providers: [{
    provide:APP_PIPE,
    useValue: new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  }],
```

## Param Validation

- Class-Validator veya Custom-Transform-Pipe kullanaraka gelen parametreyi doğrulayabiliriz.

## Dependency Injection

- Bir sınıfın ihtiyaç duyduğu bağımlılıkları sınıfın kendi içerisinde oluşturmak yerine, otomatik olarak nestjs tarafından sağlanması
- Örn: Servis katmanın doğrudan controller'ın construc'ına iletilmesi
- Örn: Veritbanı bağlantısnın servis katmanına iletilmesi

* Daha Modüler ve Temiz Kod
* Test süreçlerini kolylaştırır
* Esnek

## Veritabanı Bağlama
