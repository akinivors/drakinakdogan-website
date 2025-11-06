// Path: src/components/ServicesSection.tsx (Fully Refactored)

'use client';

import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

export default function ServicesSection() {
  const t = useTranslations('ServicesSection');

  const services = [
    {
      title: t('ivfTitle'),
      description: t('ivfDescription'),
      imageUrl: '/service-ivf.jpg',
      href: '/hizmetler#tup-bebek',
    },
    {
      title: t('infertilityTitle'),
      description: t('infertilityDescription'),
      imageUrl: '/service-infertility.jpg',
      href: '/hizmetler#infertilite',
    },
    {
      title: t('endometriosisTitle'),
      description: t('endometriosisDescription'),
      imageUrl: '/endometriozis.jpg',
      href: '/hizmetler#endometriozis',
    },
    {
      title: t('pcosTitle'),
      description: t('pcosDescription'),
      imageUrl: '/pcos-sendromu.jpeg',
      href: '/hizmetler#polikistik-over-sendromu',
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-white to-primary-lightest py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-serif text-4xl font-bold text-primary mb-12">
          {t('title')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Link href={service.href} key={index} className="group relative block rounded-lg overflow-hidden shadow-lg h-80">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110"
                style={{ backgroundImage: `url(${service.imageUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-6 text-white text-left">
                <h3 className="font-serif text-2xl font-bold mb-2 flex-grow">
                  {service.title}
                </h3>
                <p className="font-sans text-white/90">
                  {service.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}