# Kullanılan Teknolojiler

- prisma (sql)
- class-transformer
- class-validator
- passport
- passport-jwt
- uuid
- argon2

# API Endpoints

-- Auth Endpoints
--- POST /auth/signup > yeni kullanıcı oluştur
--- POST /auth/login > kullanıcı girişi
--- POST /auth/logout > kullanıcı çıkışı
--- POST /auth/refresh > token yenileme

-- User Endpoints (JWT Kontrolü)
--- GET /user/profile > kullanıcı profili
--- PUT /user/update > kullanıcı profili güncelle

-- Bookmark Endpoints (JWT Kontrolü)
--- GET /bookmarks > bookmark listesi
--- GET /bookmarks/:id > bookmark detayı
--- POST /bookmarks > bookmark oluştur
--- PUT /bookmarks/:id > bookmark güncelle
--- DELETE /bookmarks/:id > bookmark sil

# Prisma

- Modern web uygulamarı için bir ORM (Object-Relational Mapping)
- Normal şartlarda her veritbanını kendine özgü methodları vardır prisma ise bunları tek noktada birleştirmeye yarar.
- Prismanın kendi vt methodlarını kullanırsak devamında hangi veritbanını bağlarsak bağlayalım kodda değişme gitmemize gerek kalmıyor.
- Bir nevi kendi methodlarını kullandığımız veritbanını anlayacığı şekilde tercüme ediyor.

## Prisma Model

- Hangi VT kullanırsak kullanalım prismanın kendi model oluşturma yönetmini kullanırız

### Prisma Özel Dekaratörler

- @id: primary key
- @default() varsayılan değer
- @unique: benzersiz değer
- @updatedAt: belge/satır her güncellendiğinde tarihi otmatik kaydeder
- @relation(): İlişki kurarız
- fields: mevcut tablodaki alanın adı
- refrences: ilşki kuracağımız tablodaki karşılığı olan alanın adı

### İlişki Yapısı

- User (1) > Bookmar (Many)
- Bir kullanıcının birden azla bookmark'ı olabilir.
- Her bookmark sadece bir kullanaca ait
- One to many

# Passport Nedir?

- Node.js için en popüler authentication middleware'dir. Kendi içersisinde 100'lerce kimlik doğrulama stratejesi doğrudur.

- Her kimlik doğrulama yöntemi için ayrı strateji
- jwt, oauth, google ,facebook vb.
- modüler yapı
- express.js entegrasyonu
- nestjs/passport pakedi ile nest'e entgre edilebilir
