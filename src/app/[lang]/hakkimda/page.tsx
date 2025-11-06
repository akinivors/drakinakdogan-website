import { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';
import Breadcrumbs from '@/components/Breadcrumbs'; // --- 1. Import Breadcrumbs ---
import { getTranslations } from 'next-intl/server';

// Define schema types for clarity
type PhysicianSchema = { "@type": "Physician"; name: string; image: string; url: string; telephone: string; medicalSpecialty: string[]; address: object; alumniOf: string; knowsAbout: string[]; };
type BreadcrumbSchema = { "@type": "BreadcrumbList"; itemListElement: Array<{ "@type": "ListItem"; position: number; name: string; item: string; }>; };

export async function generateMetadata({params}: {params: Promise<{lang: string}>}): Promise<Metadata> {
  const {lang} = await params;
  const t = await getTranslations({locale: lang, namespace: 'AboutPage'});
  return {
    title: t('headerTitle'),
    description: t('headerDescription')
  };
}

export default async function Page({params}: {params: Promise<{lang: string}>}) {
  const {lang: locale} = await params;
  const t = await getTranslations({locale, namespace: 'Navigation'});
  
  // --- 2. Define the breadcrumb path for this page ---
  const breadcrumbItems = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/hakkimda" }
  ];

  // --- 3. Restructure the schema to include both types ---
  const physicianSchema: PhysicianSchema = {
    "@type": "Physician",
    "name": "Op. Dr. Ayşin Akdoğan",
    "image": "https://www.draysinakdogan.com/dr-aysin-akdogan-standingbackgroundhospital.jpg",
    "url": "https://www.draysinakdogan.com/hakkimda",
    "telephone": "+90-554-871-0590",
    "medicalSpecialty": [
      "Tüp Bebek (IVF)",
      "İnfertilite",
      "Üreme Endokrinolojisi",
      "Kadın Hastalıkları ve Doğum"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Yeni Girne Bulvarı, 1825. Sk. No:12",
      "addressLocality": "Karşıyaka",
      "addressRegion": "İzmir",
      "postalCode": "35575",
      "addressCountry": "TR"
    },
    "alumniOf": "Hacettepe Üniversitesi Tıp Fakültesi",
    "knowsAbout": [
      "Tüp Bebek (IVF)",
      "Polikistik Over Sendromu (PCOS)",
      "Endometriozis",
      "Yumurta Dondurma",
      "Aşılama (IUI)"
    ]
  };

  const breadcrumbSchema: BreadcrumbSchema = {
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
    "@graph": [physicianSchema, breadcrumbSchema] // Combine both schemas in a graph
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* --- 4. Add the visible Breadcrumbs component --- */}
      {/* We wrap the content in a standard container for layout consistency */}
      <div className="container mx-auto px-6 pt-16">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <AboutPageClient />
    </>
  );
} 