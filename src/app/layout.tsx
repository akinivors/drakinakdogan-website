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

// The metadata object correctly handles all favicons and icons
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${lora.variable}`} suppressHydrationWarning>
      <head>
        {/* Google Tag Manager Script - Placed in the <head> as recommended */}
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
        {/* Google Tag Manager (noscript) - Placed immediately after <body> */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-T6TFV75V"
            height="0" 
            width="0" 
            style={{display:'none',visibility:'hidden'}}
          />
        </noscript>
        
        {/* The old Google Analytics scripts have been REMOVED to prevent double counting */}

        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingActionHub />
      </body>
    </html>
  );
}
