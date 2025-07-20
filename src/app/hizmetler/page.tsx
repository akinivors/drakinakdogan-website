import { Metadata } from 'next';
import ServicesPageClient from './ServicesPageClient';
import Breadcrumbs from '@/components/Breadcrumbs'; // --- 1. Import Breadcrumbs ---

export const metadata: Metadata = {
  title: 'İleri İnfertilite & Tüp Bebek Tedavileri | Dr. Ayşin Akdoğan, İzmir',
  description: 'Yapay zeka ile embriyo seçimi, PGT, yumurta dondurma ve kişiye özel IVF protokolleri gibi en güncel tedavi yöntemlerimiz hakkında bilgi alın.'
};

export default function Page() {
  
  // --- 2. Define the breadcrumb path for this page ---
  const breadcrumbItems = [
    { name: "Anasayfa", href: "/" },
    { name: "Hizmetler", href: "/hizmetler" }
  ];

  // --- 3. Create the BreadcrumbList schema ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://www.draysinakdogan.com${item.href}`
    }))
  };

  return (
    <>
      {/* This script tag injects our breadcrumb schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* We add a container to place the breadcrumbs before your main content */}
      <div className="container mx-auto px-6 pt-16">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <ServicesPageClient />
    </>
  );
} 