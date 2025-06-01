# Docker

- Docker, uygulamarın taşınabilir, hafif ve bağımsız şekilde çalıştırmak için kullanılan açık kaynaklı bir kapsayıcı (container) platformudur.

## Docker'ın Temel Avantajları

- Taşınabilirlik:
- Bir container her yerde aynı şekilde çalışrı (geliştirici bilgisayarın, test ortamında, sunucuda, bulutta, kütüphanedeki bilgisiyar)

- Hafiflik:
- Container'lar, sanal makinelerden farklı olarak sadece gerekli dosyaları içerir, bu da onları çok daha hızlı ve hafif yapar.

- Versiyon Kontrolü:
- Docker ile uygulamamızın hangi sürümde hangi ayarlala çalıştığınız her zaman bilebilyoruz.

- Kolay Yayınlama
- Docker container'ları CI/CD süreçlerine entegre edilerek hızlı ve güvenli bir yayınlama süreci sağlanabilir

### CI - Continuous Integration (Sürekli Entegrasyon)

- Geliştiricelerin yaptığı kod değişikliklerinin sık sık (genelellikle her committ'te) bir github reposuna entegre edilmesini sağlar.
- Otomatik olarak testler çalıştırılır
- Hatalar yayına çıkmadan önce yakalnmış olur

### CD - Continuous Delivery - (Sürekli Yayınlama)

- Testlerden başarıyla geçen kod otomatik olarak yayınlamaya hazır hale gelir ve direkt sunucuya yüklenir

## Docker Nasıl Çalışır

- Docker üç temel bileşen üzerine kuruludur.

1. Dockerfile:
   Bir container'ın nasıl inşa edileceğini tanımlar (örn: hangi nodejs sürümü, mongodb mi sql mi)

2. Docker Image (Imaj):
   Dockerfile'dan oluşturulan sabit bir kalıptur. Bu kalıp çalıştırıldığında container oluşur.

3. Docker Container:
   Image'ın çalışna halidir. İçinde uygulamamız vardır ve sistemizin belirli donanımını kullanarak bilgisayarımızdan bağımsız bir şekilde çalışır.

4. Docker Compose:
   Birden fazla docker container'ını birlikte tanımlayıp çalışmasını sağlayan bir araçtur. Sayesinde, türm servisleri (frontend, backend, veritabanı) tek bir dosyada tanımlayıp tek bir komutla hepsini başlatabilirsin

# 🐳 Docker Setup ve Kullanım Rehberi

Bu rehber, Full Stack Fiverr projemizi Docker ile nasıl çalıştıracağınızı adım adım açıklar.

## 📋 Proje Yapısı

```
7_fullstack_fiverr/
├── api/                    # Backend (Node.js + Express + TypeScript)
│   ├── src/
│   ├── package.json
│   └── Dockerfile
├── client/                 # Frontend (React + Vite + TypeScript)
│   ├── src/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml      # Docker Compose konfigürasyonu
├── .dockerignore          # Docker build'de hariç tutulacak dosyalar
└── env.example            # Environment variables örneği
```

## 🛠️ Gereksinimler

- Docker Desktop (Windows/Mac) veya Docker Engine (Linux)
- Docker Compose (genellikle Docker Desktop ile birlikte gelir)

### Docker Kurulumu Kontrolü

```bash
# Docker version kontrolü
docker --version

# Docker Compose version kontrolü (yeni format)
docker compose version
```

## 🚀 Hızlı Başlangıç

### 1. Environment Variables Ayarlama

```bash
# Örnek dosyayı kopyalayın
cp env.example .env

# .env dosyasını editleyerek gerçek değerleri ekleyin
# (Özellikle JWT_SECRET ve COOKIE_SECRET değerlerini değiştirin)
```

### 2. Projeyi Başlatma

```bash
# Tüm servisleri build edip başlatın
docker compose up --build

# Arka planda çalıştırmak için
docker compose up -d --build
```

### 3. Erişim URL'leri

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **MongoDB**: mongodb://localhost:27017

## 📝 Detaylı Komutlar

### 🏗️ Build Komutları

```bash
# Tüm servisleri build et
docker compose build

# Sadece belirli bir servisi build et
docker compose build api      # Backend
docker compose build client   # Frontend

# Cache kullanmadan build et
docker compose build --no-cache
```

### ▶️ Çalıştırma Komutları

```bash
# Tüm servisleri başlat (foreground)
docker compose up

# Tüm servisleri başlat (background)
docker compose up -d

# Belirli servisleri başlat
docker compose up mongodb api

# Build edip başlat
docker compose up --build
```

### ⏹️ Durdurma Komutları

```bash
# Servisleri durdur
docker compose stop

# Servisleri durdur ve container'ları sil
docker compose down

# Servisleri durdur, container'ları ve volume'ları sil
docker compose down -v

# Servisleri durdur, container'ları, network'leri ve image'ları sil
docker compose down --rmi all
```

### 🔍 Monitoring ve Debug

```bash
# Çalışan servisleri görüntüle
docker compose ps

# Log'ları izle
docker compose logs

# Belirli servisin log'larını izle
docker compose logs -f api
docker compose logs -f client
docker compose logs -f mongodb

# Container içine gir
docker compose exec api sh      # Backend container
docker compose exec client sh   # Frontend container
docker compose exec mongodb sh  # MongoDB container
```

### 🗄️ Database İşlemleri

```bash
# MongoDB container'ına bağlan
docker compose exec mongodb mongosh

# MongoDB'ye dışarıdan bağlan
mongosh "mongodb://admin:password123@localhost:27017/fiverr_db?authSource=admin"

# Database backup
docker compose exec mongodb mongodump --host localhost --port 27017 --username admin --password password123 --authenticationDatabase admin --db fiverr_db --out /data/backup

# Database restore
docker compose exec mongodb mongorestore --host localhost --port 27017 --username admin --password password123 --authenticationDatabase admin --db fiverr_db /data/backup/fiverr_db
```

## 🔧 Konfigürasyon Detayları

### Docker Compose Servisleri

#### 1. MongoDB Service

- **Port**: 27017
- **Username**: admin
- **Password**: password123
- **Database**: fiverr_db
- **Volume**: `mongodb_data` (veri kalıcılığı için)

#### 2. Backend API Service

- **Port**: 5000
- **Build**: `./api/Dockerfile`
- **Volume Mount**: Live reload için kaynak kod mount
- **Environment**: MongoDB URI, JWT secrets vs.

#### 3. Frontend Client Service

- **Port**: 5173
- **Build**: `./client/Dockerfile`
- **Volume Mount**: Live reload için kaynak kod mount
- **Environment**: API URL konfigürasyonu

### Network

Tüm servisler `fiverr_network` bridge network'ü üzerinde çalışır ve birbirleriyle iletişim kurabilir.

## 🛠️ Development Workflow

### 1. Kod Değişiklikleri

Kod değişiklikleri otomatik olarak container'lara yansır (volume mount sayesinde).

### 2. Package Değişiklikleri

Yeni package eklerseniz container'ı yeniden build etmelisiniz:

```bash
# Sadece etkilenen servisi yeniden build et
docker compose build api      # Backend'e package eklediyseniz
docker compose build client   # Frontend'e package eklediyseniz

# Servisi yeniden başlat
docker compose up -d api
```

### 3. Database Sıfırlama

```bash
# Volume'ları sil (dikkat: tüm data silinir!)
docker compose down -v

# Yeniden başlat
docker compose up -d
```

## 🐛 Troubleshooting

### ❌ `bcrypt` Hatası (Error loading shared library)

Bu hata native binaries uyumsuzluğu nedeniyle oluşur:

```bash
# Container'ları temizle ve yeniden build et
docker compose down -v
docker compose build --no-cache api
docker compose up api
```

### Port Çakışması

```bash
# Kullanılan portları kontrol et
netstat -tulpn | grep :5000
netstat -tulpn | grep :5173
netstat -tulpn | grep :27017

# Docker compose'da port değiştir
```

### Container Başlamıyor

```bash
# Log'ları kontrol et
docker compose logs <service_name>

# Container'ı manuel başlat
docker compose up <service_name>
```

### Volume Problemleri

```bash
# Tüm Docker verilerini temizle (dikkat!)
docker system prune -a --volumes
```

### Network Problemleri

```bash
# Container'lar arası iletişimi test et
docker compose exec api ping mongodb
docker compose exec client ping api
```

## 📊 Production Considerations

Bu setup development için optimizedir. Production için:

1. **Multi-stage builds** kullanın
2. **Environment variables**'ları güvenli şekilde yönetin
3. **Nginx** reverse proxy ekleyin
4. **SSL/TLS** sertifikası kullanın
5. **Database backup** stratejisi oluşturun
6. **Resource limits** tanımlayın
7. **Health checks** ekleyin

## 🔗 Yararlı Linkler

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Node.js Docker Best Practices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)
- [React Docker Best Practices](https://mherman.org/blog/dockerizing-a-react-app/)

---

## 💡 Tips

- Container'ları her zaman `docker compose down` ile düzgün kapatın
- Development sırasında `-d` flag kullanarak arka planda çalıştırın
- Log'ları düzenli olarak kontrol edin
- Disk alanını kontrol edin: `docker system df`
- Kullanılmayan image'ları temizleyin: `docker image prune`

## 🆚 Docker Compose v1 vs v2

**Eski format (deprecated):**

```bash
docker-compose up --build  # ❌ Artık kullanılmıyor
```

**Yeni format (önerilen):**

```bash
docker compose up --build  # ✅ Güncel format
```
