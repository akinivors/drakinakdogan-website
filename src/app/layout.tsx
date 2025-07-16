import type { Metadata } from "next";
import { Inter, Lora } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActionHub from '@/components/FloatingActionHub';
import Script from 'next/script';
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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HNR7LXKP66"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HNR7LXKP66');
          `}
        </Script>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingActionHub />
      </body>
    </html>
  );
}
