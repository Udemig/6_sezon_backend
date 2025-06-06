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

3. Docker Container
   Image'ın çalışna halidir. İçinde uygulamamız vardır ve sistemizin belirli donanımını kullanarak bilgisayarımızdan bağımsız bir şekilde çalışır.

## Projeyi Dockerize Etme

1. Uygulamamızı oluşturun
2. Bir `Dockerfile` oluştur ve içeriğinde uygulamanın nasıl çalışıcağınız belirle
3. Bu `Dockerfile`'ı kullanarak bir `Docker Image`'ı oluştur
4. `Docker Image`'ı çalıştırarak bir `Docker Container` oluştur.
5. `Docker Container` üzerinden uygulamayı çalıştır.
6. Docker Hub'a image'ı yükle (opsiyonel)

## Docker Komutları

- Dockerfile çalıştırma (imaj oluştur)
- `docker build -t basic-api .`

- Docker Image çalıştırma (container oluşturur)
- `docker run -p 3000:3000 basic-api`

## Docker Hub'a Proje yükleme

- Docker'a login ol
- `docker login`

- Docker huba yüklemek için repo oluştur
- `docker tag local_image:etiket username/repo:etiket`

- Okuşturduğumuz repoya image'ı pushla
- `docker push username/repo:etiket`

## Docker Hub'dan proje çekme

- Projeyi docker hub'dan image'ı çek
- `docker pull username/repo:etiket`

- Docker hubdan gelen image'ı çalıştır
- `docker run -p 3000:3000 username/repo:etiket`
