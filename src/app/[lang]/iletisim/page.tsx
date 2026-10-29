import { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';
import Breadcrumbs from '@/components/Breadcrumbs'; // --- 1. Import Breadcrumbs ---
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({params}: {params: Promise<{lang: string}>}): Promise<Metadata> {
  const {lang} = await params;
  const t = await getTranslations({locale: lang, namespace: 'ContactPage'});
  const title = t('metaTitle');
  const description = t('description');
  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/iletisim`,
      languages: {
        tr: '/tr/iletisim',
        en: '/en/iletisim',
        'x-default': '/tr/iletisim',
      },
    },
    openGraph: {
      siteName: 'Op. Dr. Ayşin Akdoğan',
      title,
      description,
      url: `/${lang}/iletisim`,
      type: 'website',
      locale: lang === 'en' ? 'en_US' : 'tr_TR',
      images: [{ url: '/dr-aysin-akdogan-lab1.jpg', width: 640, height: 798 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/dr-aysin-akdogan-lab1.jpg'],
    },
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
    "url": "https://www.draysinakdogan.com",
    "telephone": "+90-232-463-4672",
    "medicalSpecialty": ["İnfertilite", "Tüp Bebek (IVF)" ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ali Çetinkaya Bulvarı, Havuz Apt. No:66 D:16",
      "addressLocality": "Konak",
      "addressRegion": "İzmir",
      "postalCode": "35220",
      "addressCountry": "TR"
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