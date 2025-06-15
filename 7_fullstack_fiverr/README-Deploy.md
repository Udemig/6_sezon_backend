# Proje Yayınlama

### Build

- Derleme komutudur.
- Geliştirme ortamındaki kodları alır, yayınlama ortamı için optimize eder.
- Örn bir react projesinde:
- - tüm js dosyalarını küçültür
- - tüm css dosylarını birleştirir
- - gekresiz açıklamaları siler
- - ve sonuç olarak bir dist klasöründe tek sayfalık uygulama haline getirir

### Ortam Ayırma

- Projede geliştriem ortamında ve yayınlama ortamında genelde farklı değişkenler kullanırız bundan dolayı yayınlamdan önce bu değişkenleri ayrı .env dosyalarını ayırıp gerekli konfigrasyonları yapmalıyız

### Github / Docker Yükleme

- Modern yayınlama yöntemlerinde projenin ci/cd süreci için gitihub veya dockerhub yüklnemesi gerekir

### Hosting (Barındırma)

- Projenin sürekli çalışıcağı bir sunucuya yükleme işlemidir.
- Örnek josting servisleri:
- - vercel / netlify > daha çok frontend için ama basit destekleri var
- - render / railway / heroku / firebase-hosting / google cloud run > kullanımı kolay backend hosting
- - digital-ocean / aws ec2 / linode / hetzner > daha esnek, VPS (linuc terminal yönetimini bilmek erekli)

### Deploy

- Projenin geliştirme ortamından alınarak gerçek kullanıcnın ulaşabileceği şekilde sunuya yüklenmesidir.

### Domain

- Domain, internet üzerindeki bir websitenin adresidir. Kullanıcı bir websitesine girmek için IP adresi örneğin (192.168.11.1) yerine daha akılda kalıcı bir isim yazar: www.fiverr.com

- Domain Parçları
- www: alt alana adı (subdomain)
- fiverr: ana isim
- .com .net: üst düzel alan adı (tld)

- özetle domain sitenin internetteki adıdır.
- Domainleri kiralayabilirisiniz. (GoDady, Namecheap, İsim Tescil)

### DNS

- Domain Name System, domian adlarını IP adreslerine çeviren bir sistmedir.
- Örn: sen google.com yazdığınında

1. DNS, bu domain'in hangi IP adresine karşılık geldiğini bulur
2. Tarayıcı, o IP adresine giderek siteyi açar.

- Yapılan dns güncellemelerini bütün dünyaya yayılması max 48 saate kadar sürebilir.

## A Kaydı

- Domaine giren kullanıncın hangi ip adreisne yönlendirileceiğini belirler

## CName

- Bir alan adını farklı bir alan adına yönlendirmek için kukllanırlır

## TTL

- Time To Live: Yapılan değişkliğin kullanıcılara yansıma süresi.

## Subdomain (Alt Alan Adı)

- Sudomain, bir domainin önüne eklenen ve ana domainin bir alt bölümü gibi çalışan alan adıdır.

- `subdomain.maindomain.extension`
- `altalanadı.anaalanadı.uzantı`
- `api.amazon.com` > projenin backendi
- `admin.amazon.com` > admin paneli
