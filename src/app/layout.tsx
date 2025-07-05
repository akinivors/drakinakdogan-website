import type { Metadata } from "next";
import { Inter, Lora } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTopButton from '@/components/BackToTopButton';
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
});

export const metadata: Metadata = {
  title: "Op. Dr. Ayşin Akdoğan | Kadın Hastalıkları ve Doğum Uzmanı",
  description: "İzmir&apos;de kadın sağlığı, gebelik takibi, infertilite ve tüp bebek tedavisi üzerine uzmanlaşmış Op. Dr. Ayşin Akdoğan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${lora.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
        <BackToTopButton />
      </body>
    </html>
  );
}
