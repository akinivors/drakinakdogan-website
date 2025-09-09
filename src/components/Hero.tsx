// Path: src/components/Hero.tsx (Fully Refactored)

'use client';

import Button from '@/components/Button';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function Hero() {
  const t = useTranslations('Hero');
  const tCta = useTranslations('CTA');
  const locale = useLocale();

  return (
    <section className="relative h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
      >
        <source src="/clinic-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="relative z-20 container mx-auto px-6">
        <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight">
          {t('title')}
        </h1>
        <p className="font-sans text-lg md:text-xl mt-4 max-w-3xl mx-auto">
          {t('subtitle')}
        </p>
        <div className="mt-8">
          <Link href={`/${locale}/iletisim#form`}>
            <Button variant="primary">{tCta('getInTouch')}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}