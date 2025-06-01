# Backend Dockerfile - Node.js + Express + TypeScript
FROM node:18-alpine

# Alpine Linux için gerekli build dependencies
RUN apk add --no-cache python3 make g++

# Çalışma dizinini ayarla
WORKDIR /app

# Package.json ve package-lock.json dosyalarını kopyala
# Bu sayede dependencies değişmediğinde Docker cache kullanılabilir
COPY package*.json ./

# Dependencies'leri yükle
RUN npm install

# Kaynak kodları kopyala
COPY . .

# TypeScript'i derle (eğer build script'i varsa)
# Şu an için development modunda çalışacağız
# RUN npm run build

# Port'u expose et (Express genellikle 3000, 5000 veya 8000 kullanır)
EXPOSE 4000

# Development modunda çalıştır
CMD ["npm", "run", "dev"] 