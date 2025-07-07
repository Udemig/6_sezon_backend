import type { Metadata } from "next";
import { Geist, Geist_Mono, Smooch } from "next/font/google";
import "./globals.css";

// relative import
import Header from "../components/header";

// absolute import
import Sidebar from "@/components/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const smooch = Smooch({
  weight: "400",
  variable: "--font-smooch",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rudder",
  description: "Bir support ticket projesi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${smooch.variable} antialiased`}>
        <div className="flex h-full">
          <Sidebar />

          <div className="min-h-screen w-full">
            <Header />

            <main className="h-[calc(100vh-189px)] overflow-y-auto p-4 md:px-8 pb-10">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
