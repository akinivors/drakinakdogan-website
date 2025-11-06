import { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';
import Breadcrumbs from '@/components/Breadcrumbs'; // --- 1. Import Breadcrumbs ---
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({params}: {params: Promise<{lang: string}>}): Promise<Metadata> {
  const {lang} = await params;
  const t = await getTranslations({locale: lang, namespace: 'ContactPage'});
  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function Page({params}: {params: Promise<{lang: string}>}) {
  const {lang: locale} = await params;
  const t = await getTranslations({locale, namespace: 'Navigation'});
  
  // --- 2. Define the breadcrumb path for this page ---
  const breadcrumbItems = [
    { name: t("home"), href: "/" },
    { name: t("contact"), href: "/iletisim" }
  ];

  // --- 3. Restructure the schema to include both types ---
  const medicalClinicSchema = {
    "@type": "MedicalClinic",
    "name": "Op. Dr. Ayşin Akdoğan | Tüp Bebek ve İnfertilite Kliniği",
    "description": "Op. Dr. Ayşin Akdoğan liderliğinde, İzmir'de kişiye özel tüp bebek, kısırlık ve jinekolojik tedaviler sunan uzman klinik.",
    "image": "https://www.draysinakdogan.com/dr-aysin-akdogan-lab1.jpg",
    "url": "https://www.drayinakdogan.com",
    "telephone": "+90-554-871-0590",
    "medicalSpecialty": ["İnfertilite", "Tüp Bebek (IVF)" ],
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
        "dayOfWeek": [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday" ],
        "opens": "09:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [ "Saturday" ],
        "opens": "09:00",
        "closes": "13:00"
      }
    ]
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://www.draysinakdogan.com${item.href}`
    }))
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [medicalClinicSchema, breadcrumbSchema] // Combine both schemas
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* --- 4. Add the visible Breadcrumbs component --- */}
      <div className="container mx-auto px-6 pt-16">
        <Breadcrumbs items={breadcrumbItems} />
                  </div>
                  
      <ContactPageClient />
    </>
  );
} 