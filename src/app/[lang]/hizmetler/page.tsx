import { Metadata } from 'next';
import ServicesPageClient from './ServicesPageClient';
import Breadcrumbs from '@/components/Breadcrumbs'; // --- 1. Import Breadcrumbs ---
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({params}: {params: Promise<{lang: string}>}): Promise<Metadata> {
  const {lang} = await params;
  const t = await getTranslations({locale: lang, namespace: 'ServicesPage'});
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
    { name: t("services"), href: "/hizmetler" }
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