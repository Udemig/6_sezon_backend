# Base image olarak Node.js kullan
FROM node:18-alpine

# Çalışma dizinini belirle
WORKDIR /app

# Bağımlılıkları yüklemek için package.json ve package-lock.json kopyala 
# ve Container içerisindeki /app diznine aktar
COPY package*.json ./

# Container içerisine bağımlılıkları yükle
RUN npm install

# Uygulama kodlarını kopyala ve Container içerisindeki /app diznine aktar
COPY . .

# Servisi çalıştırcağımız portu erşime aç
EXPOSE 3000

# Projeyi çalıştır
CMD ["npm","start"]