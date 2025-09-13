// Path: src/app/hizmetler/ServicesPageClient.tsx (Fully Refactored)

'use client';

import { useState, useEffect } from 'react';
import { Stethoscope, FlaskConical } from 'lucide-react';
import InfoModal from '@/components/InfoModal';
import { useTranslations } from 'next-intl';

interface ServiceItem {
  slug: string;
  title: string;
  longDescription: string;
  imageSrc: string;
}

export default function ServicesPageClient() {
  const t = useTranslations('ServicesPage');
  const tHeader = useTranslations('Header');

  // Rebuild the services arrays using translations
  const conditionsTreated: ServiceItem[] = [
    { slug: 'infertilite', title: tHeader('conditions.infertility'), longDescription: t('descriptions.infertility'), imageSrc: '/service-infertility.jpg' },
    { slug: 'polikistik-over-sendromu', title: tHeader('conditions.pcos'), longDescription: t('descriptions.pcos'), imageSrc: '/pcos-sendromu.jpeg' },
    { slug: 'endometriozis', title: tHeader('conditions.endometriosis'), longDescription: t('descriptions.endometriosis'), imageSrc: '/endometriozis.jpg' },
    { slug: 'azalmis-over-rezervi', title: tHeader('conditions.diminishedOvarianReserve'), longDescription: t('descriptions.diminishedOvarianReserve'), imageSrc: '/azalmışover.png' },
    { slug: 'tuplerin-tikali-olmasi', title: tHeader('conditions.tubalBlockage'), longDescription: t('descriptions.tubalBlockage'), imageSrc: '/tüplerin-tıkalı.jpg' },
    { slug: 'rahim-anomalileri', title: tHeader('conditions.uterineAnomalies'), longDescription: t('descriptions.uterineAnomalies'), imageSrc: '/rahim-anomalileri.webp' },
    { slug: 'hipogonadotropik-hipogonadizm', title: tHeader('conditions.hypogonadotropicHypogonadism'), longDescription: t('descriptions.hypogonadotropicHypogonadism'), imageSrc: '/hipogonadotropik-hipogonadizm.webp' }
  ];

  const treatmentMethods: ServiceItem[] = [
    { slug: 'tup-bebek', title: tHeader('treatments.ivf'), longDescription: t('descriptions.ivf'), imageSrc: '/service-ivf.jpg' },
    { slug: 'yapay-zeka-embriyo', title: tHeader('treatments.aiEmbryoSelection'), longDescription: t('descriptions.aiEmbryoSelection'), imageSrc: '/yapay-zeka-embriyo.jpg' },
    { slug: 'mikroenjeksiyon', title: tHeader('treatments.icsi'), longDescription: t('descriptions.icsi'), imageSrc: '/mikroenjeksiyon.jpeg' },
    { slug: 'embriyoskop-takip', title: tHeader('treatments.embryoscope'), longDescription: t('descriptions.embryoscope'), imageSrc: '/embriyoskop.jpg' },
    { slug: 'genetik-tani', title: tHeader('treatments.pgt'), longDescription: t('descriptions.pgt'), imageSrc: '/pgt.jpg' },
    { slug: 'yumurta-dondurma', title: tHeader('treatments.eggFreezing'), longDescription: t('descriptions.eggFreezing'), imageSrc: '/yumurta-dondurma.jpg' }
  ];

  const allServices = [...conditionsTreated, ...treatmentMethods];
  const [selectedItem, setSelectedItem] = useState<ServiceItem | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const itemToOpen = allServices.find(item => item.slug === hash);
      if (itemToOpen) {
        setSelectedItem(itemToOpen);
      }
    }
  }, [allServices]);

  return (
    <>
      <section className="w-full bg-gradient-to-b from-white to-primary-lightest py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl font-bold text-primary">
            {t('title')}
          </h1>
          <p className="font-sans text-lg text-text-light mt-4 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>
      </section>

      <section className="w-full bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-text-main mb-4 flex items-center justify-center gap-3">
              <Stethoscope className="text-accent" size={36} />
              {t('conditionsTitle')}
            </h2>
            <p className="font-sans text-text-light max-w-2xl mx-auto">
              {t('conditionsDescription')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {conditionsTreated.map((item) => (
              <button key={item.title} onClick={() => setSelectedItem(item)} className="bg-gradient-to-b from-white to-primary-lightest p-6 rounded-lg shadow-sm text-left hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <p className="font-sans font-medium text-text-main">{item.title}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
      
      <section className="w-full bg-gradient-to-b from-white to-primary-lightest py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-primary mb-4 flex items-center justify-center gap-3">
              <FlaskConical className="text-accent" size={36} />
              {t('treatmentsTitle')}
            </h2>
             <p className="font-sans text-text-light max-w-2xl mx-auto">
              {t('treatmentsDescription')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {treatmentMethods.map((item) => (
              <button key={item.title} onClick={() => setSelectedItem(item)} className="bg-white p-6 rounded-lg shadow-sm text-left hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <p className="font-sans font-medium text-text-main">{item.title}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <InfoModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  );
}