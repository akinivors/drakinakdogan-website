// Path: src/app/[lang]/layout.tsx (Corrected Version)

import type { Metadata } from "next";
import { Inter, Lora } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActionHub from '@/components/FloatingActionHub';
import Script from 'next/script';
import "./globals.css";
// --- THIS IS THE FIX ---
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
// --------------------

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
  description: "İzmir'de kadın sağlığı, gebelik takibi, infertilite ve tüp bebek tedavisi üzerine uzmanlaşmış Op. Dr. Ayşin Akdoğan.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  
  
  // Load messages for the specific locale
  const messages = (await import(`../../../messages/${lang}.json`)).default;

  return (
    <html lang={lang} className={`${inter.variable} ${lora.variable}`} suppressHydrationWarning>
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-T6TFV75V');
          `}
        </Script>
      </head>
      <body suppressHydrationWarning>
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-T6TFV75V"
            height="0" 
            width="0" 
            style={{display:'none',visibility:'hidden'}}
          />
        </noscript>
        
        <NextIntlClientProvider locale={lang} messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingActionHub />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}