// Path: src/components/AboutSection.tsx (Fully Refactored)

'use client';

import Image from 'next/image';
import Button from '@/components/Button';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

interface AboutSectionProps {
  showButton?: boolean;
}

export default function AboutSection({ showButton = false }: AboutSectionProps) {
  const t = useTranslations('AboutSection');
  const locale = useLocale();

  return (
    <section className="w-full bg-white py-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center px-6">
        
        <div className="w-full h-[450px] rounded-lg shadow-xl overflow-hidden relative">
          <Image
            src="/dr-aysin-akdogan-standingnextodesk.jpg" 
            alt="Op. Dr. Ayşin Akdoğan"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="font-serif text-3xl font-bold text-text-main mb-2">
            {t('title')}
          </h2>
          <div className="font-sans text-text-light leading-relaxed space-y-4">
            <p>
              {t('p1')}
            </p>
            <p>
              {t('p2')}
            </p>
          </div>
          {showButton && (
            <Link href={`/${locale}/hakkimda`} className="mt-4">
              <Button variant="secondary">{t('readMore')}</Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}