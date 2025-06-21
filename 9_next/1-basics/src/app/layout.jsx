import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// font tanımı
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// font tanımı
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// metadata içeriği
export const metadata = {
  title: { default: "Amazon", template: "%s - Amazon" },
  description: "Dünyanın en iyi alışveirş sitesi..",
  keywords: ["alışveriş", "ürün", "amazon"],
  author: "yapımcı",
};

// Layout component
// HOC: higher order component
// Projedeki bütün sayfları kapsayan en kapsyıcı component. Children propu kullancının bulunduğu sayfaının içeriğini denk gelir.
// Layout children ile aldığı sayfa içeriğini html body etiketi içerisinde ekrana basar
// Layout üzerinden bütün sayfalarda ortak olarak kullanıcak component'ları belirleyebiliriz

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <header className="text-center p-4 font-semibold">HEADER</header>

        <main className="flex-1 grid place-items-center text-4xl">{children}</main>

        <footer className="text-center p-4 font-semibold">FOOTER</footer>
      </body>
    </html>
  );
}
