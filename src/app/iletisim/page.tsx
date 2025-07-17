import { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'İletişim & Randevu | Dr. Ayşin Akdoğan Tüp Bebek Merkezi, İzmir',
  description: "Dr. Ayşin Akdoğan ile iletişime geçin. İzmir, Karşıyaka'daki kliniğimizden tüp bebek ve infertilite tedavisi için randevu alın.",
};

export default function Page() {
  return (
    <>
      <Script id="clinic-schema-contact" type="application/ld+json">
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
      <ContactPageClient />
    </>
  );
} 