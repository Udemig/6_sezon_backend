import { NextResponse } from "next/server";

// ana middleware fonksiyonu
export function middleware(request) {
  const { pathname } = request.nextUrl;

  console.log("istek geldi", pathname);

  // sonraki adıma geç
  const res = NextResponse.next();
  return res;
}

// middleware hangi route'larda çalışsın
export const config = {
  matcher: "/api/:path*",
};

/*
 =========== Neler Yapılabilir ==========

 1. Rate Limiting:
 - Her IP için dakikda max 50 istek sınırı konulabilir
 - Aşılırsa 429 hatası döner

 2. CORS Headers:
 - Tüm api'dan gönderilcek cevaplara cors headerları eklenebilir

 3. Route Koruma
 - /api/admin ile başlayan route'lar korunur
 - jwt token gerekir / admin rolü kontrol edilir

 4. Güvenlik Headers:
 - Bütün sayfalar güvenlik headerları eklenir

 5. Logging:
  - Gelen bütün istekler konsola yazdırılır
 */
