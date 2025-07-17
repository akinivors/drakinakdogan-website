import { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Op. Dr. Ayşin Akdoğan Hakkında | İnfertilite & Tüp Bebek Uzmanı',
  description: "Op. Dr. Ayşin Akdoğan'ın Hacettepe'den başlayan, uluslararası çalışmalarla devam eden 25+ yıllık uzmanlık kariyerini keşfedin."
};

export default function Page() {
  return (
    <>
      <Script id="physician-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Physician",
          "name": "Op. Dr. Ayşin Akdoğan",
          "image": "https://www.draysinakdogan.com/dr-aysin-akdogan-standingbackgroundhospital.jpg",
          "url": "https://www.draysinakdogan.com/hakkimda",
          "telephone": "+90 554 871 05 90",
          "medicalSpecialty": [
            "In Vitro Fertilisation(IVF)",
            "Infertility",
            "Reproductive Endocrinology",
            "Obstetrics & Gynecology"
          ],
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Yeni Girne Bulvarı, 1825. Sk. No:12",
            "addressLocality": "Karşıyaka",
            "addressRegion": "İzmir",
            "postalCode": "35575",
            "addressCountry": "TR"
          },
          "alumniOf": "Hacettepe University Faculty of Medicine",
          "knowsAbout": [
            "In Vitro Fertilisation (IVF)",
            "Polycystic Ovary Syndrome (PCOS)",
            "Endometriosis",
            "Oocyte Cryopreservation",
            "Intrauterine Insemination (IUI)"
          ]
        })}
      </Script>
      <AboutPageClient />
    </>
  );
} 