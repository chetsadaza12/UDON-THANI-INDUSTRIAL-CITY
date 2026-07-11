import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProgressBar from "./components/ProgressBar";

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "เมืองอุตสาหกรรมอุดรธานี | Udon Thani Industrial City",
  description:
    "เมืองอุตสาหกรรมอุดรธานี ประตูการลงทุนสู่ภูมิภาคลุ่มแม่น้ำโขง รองรับอุตสาหกรรมยุคใหม่ พร้อมโครงสร้างพื้นฐานครบวงจร",
  openGraph: {
    title: "เมืองอุตสาหกรรมอุดรธานี | Udon Thani Industrial City",
    description:
      "ประตูการลงทุนสู่ภูมิภาคลุ่มแม่น้ำโขง รองรับอุตสาหกรรมยุคใหม่ พร้อมโครงสร้างพื้นฐานครบวงจร",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${notoSansThai.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ProgressBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
