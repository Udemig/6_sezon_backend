# Frontend Dockerfile - React + Vite + TypeScript
FROM node:18-alpine

# Çalışma dizinini ayarla
WORKDIR /app

# Package.json ve package-lock.json dosyalarını kopyala
# Bu sayede dependencies değişmediğinde Docker cache kullanılabilir
COPY package*.json ./

# Dependencies'leri temiz yükle
# npm ci, package-lock.json'a göre exact versiyonları yükler
RUN npm ci

# Kaynak kodları kopyala
COPY . .

# Vite development server için port'u expose et
EXPOSE 5173

# Development modunda çalıştır
# --host 0.0.0.0 parametresi Docker container içinden erişim için gerekli
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"] 