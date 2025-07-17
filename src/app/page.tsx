import { Metadata } from 'next';
import HomePageClient from './HomePageClient';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'İzmir Tüp Bebek ve İnfertilite Uzmanı | Op. Dr. Ayşin Akdoğan',
  description: "25+ yıllık deneyimle, İzmir Karşıyaka'daki kliniğimizde kişiye özel tüp bebek, aşılama ve ileri infertilite tedavileri sunuyoruz.",
};

export default function Page() {
  return (
    <>
      <Script id="clinic-schema-home" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalClinic",
          "name": "Op. Dr. Ayşin Akdoğan | Tüp Bebek ve İnfertilite Kliniği",
          "description": "Op. Dr. Ayşin Akdoğan liderliğinde, İzmir'de kişiye özel tüp bebek, kısırlık ve jinekolojik tedaviler sunan uzman klinik.",
          "image": "https://www.draysinakdogan.com/dr-aysin-akdogan-lab1.jpg",
          "url": "https://www.draysinakdogan.com",
          "telephone": "+90 554 871 05 90",
          "medicalSpecialty": "Infertility",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Yeni Girne Bulvarı, 1825. Sk. No:12",
            "addressLocality": "Karşıyaka",
            "addressRegion": "İzmir",
            "postalCode": "35575",
            "addressCountry": "TR"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "38.4550",
            "longitude": "27.1550"
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "opens": "09:00",
              "closes": "18:00"
            }
          ]
        })}
      </Script>
      <HomePageClient />
    </>
  );
}
