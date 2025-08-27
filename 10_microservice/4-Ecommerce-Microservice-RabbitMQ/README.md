# Food Delivery Microservice Backend

- Yemek sipariş işlemlerini desteleyen mikroservis mimarisi geliştirilmiş backend sistemi. Kullanıcı kimlik doğrulama, restoran işlemleri, sipariş takibi, ve teslimat yönetimi sağlar.

## Sistem Ypısı

### Servisler

- **API Gateway** (port: 3000) : Merkezi giriş noktası
- **Auth Service** (port: 3001) : Kullanıcı girişi ve yetkilendirme
- **Delivery Service** (port: 3002) : Kurye ve teslimat takibi
- **Order Service** (port: 3003) : Sipariş İşlemleri
- **Restaurant Service** (port: 3004) : Restoran ve menü yönetimi

## Teknolojiler

- nodejs
- express
- mongodb - mongoose
- jsonwebtoken
- rabbitmq - amqplib
- typescript
- bcrypt
- express-http-proxy
- express-rate-limit
- zod
- dotenv
- cookie-parser
- morgan
- helmet
- nodemon

## API Endpoints

### Auth Service

```
POST /api/auth/register  - Kullanıcı Kaydı
POST /api/auth/login     - Kullanıcı Girişi
GET /api/auth/profile    - Profil Bilgileri
POST /api/auth/refresh   - Token Yenile
POST /api/auth/logout    - Çıkış Yap
POST /api/auth/address   - Adres Ekleme
```

### Restaurant Service

```
GET /api/restaurants           - Restoranları Listele
GET /api/restaurants/:id       - Restoran Detayı
GET /api/restaurants/:id/menu  - Restoran Menüsü
POST /api/restaurants/:id/menu - Menü Ürünü Ekle
POST /api/restaurants          - Yeni Restoran (admin)
```

### Order Service

```
POST /api/orders                    - Sipariş Oluştur
GET /api/orders/:orderId            - Sipariş Detayı
GET /api/orders/user/:userId        - Kullanıcı Siparişleri
PATCH /api/orders/:orderId/:status  - Sipariş Durumu Güncelle
```

### Delivery Service

```
POST /api/delivery/couriers/register         - Kurye Kayıt
POST /api/delivery/couriers/login            - Kurye Giriş
GET /api/delivery/orders                     - Mevcut Teslimatlar
POST /api/delivery/orders/:orderId/accept    - Teslimat Kabul Et
PATCH /api/delivery/orders/:orderId/status   - Teslimat Durumunu Güncelle
GET /api/delivery/orders/:orderId/tracking   - Teslimat Takibi
```

## Kurulum

### Gereksinimler

- Nodejs
- MongoDB
- RabbitMQ

### Ortam Değişkenleri

```
PORT=3001
MONGODB_URI=mongodb://localhost:50000/food_delivery_auth
JWT_SECRET=uzun-benzersiz-anahtar-kelime
RABBITMQ_URL=amqp://localhost:5672
```

# Kurulum Komutları

- `npx tsc --init`
- `npm i express mongoose jsonwebtoken amqplib bcrypt express-rate-limit zod dotenv cookie-parser morgan helmet `
- `npm i typescript @types/amqplib @types/bcrypt @types/cookie-parser @types/express @types/jsonwebtoken @types/mongoose @types/morgan @types/node @types/cors tsx nodemon -D`
