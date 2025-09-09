'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';
import Button from '@/components/Button';
import { Instagram } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navigation');
  const locale = useLocale();

  // Translate the navigation links with locale prefix
  const siteLinks = [
    { href: `/${locale}/hakkimda`, label: tNav('about') },
    { href: `/${locale}/hizmetler`, label: tNav('services') },
    { href: `/${locale}/hasta-rehberi`, label: tNav('patientGuide') },
    { href: `/${locale}/blog`, label: tNav('blog') },
    { href: `/${locale}/iletisim`, label: tNav('contact') },
  ];

  const contactDetails = (
    <div className="font-sans space-y-3 text-white">
        <p>Yeni Girne Bulvarı, 1825. Sk. No:12,<br/>35575 Karşıyaka/İzmir</p>
        <p>Telefon: +90 554 871 05 90</p>
        <p>E-posta: aysinakdogan@draysinakdogan.com</p>
        <div className="flex items-center gap-3 pt-2">
            <Instagram size={20} />
            <a href="https://www.instagram.com/draysinakdogan/" target="_blank" rel="noopener noreferrer" className="hover:underline">@draysinakdogan</a>
        </div>
    </div>
  );

  return (
    <footer className="bg-primary-dark text-white">
      <div className="container mx-auto px-6 py-12">
        {/* --- DESKTOP VIEW: 4-COLUMN GRID --- */}
        <div className="hidden md:grid md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <Logo variant="light" />
            <p className="font-sans text-white">{t('description')}</p>
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">{t('sitemap')}</h3>
            <ul className="space-y-2">{siteLinks.map(link => (<li key={link.href}><Link href={link.href} className="font-sans text-white hover:underline">{link.label}</Link></li>))}</ul>
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">{t('contact')}</h3>
            {contactDetails}
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">{t('quickContact')}</h3>
            <p className="font-sans text-white mb-4">{t('quickContactDescription')}</p>
            <Link href={`/${locale}/iletisim#form`}>
              <Button variant="secondary" className="w-full">{t('getInTouch')}</Button>
              </Link>
            </div>
          </div>

        {/* --- NEW MOBILE VIEW: SECTIONED LIST --- */}
        <div className="md:hidden space-y-10">
            <div>
              <Logo variant="light" />
              <p className="font-sans text-white mt-4">{t('description')}</p>
            </div>
            
            <div className="border-t border-white/20 pt-8">
                <h3 className="font-serif text-lg font-bold mb-4">{t('sitemap')}</h3>
                <ul className="space-y-3">{siteLinks.map(link => (<li key={link.href}><Link href={link.href} className="font-sans text-white hover:underline">{link.label}</Link></li>))}</ul>
            </div>

            <div className="border-t border-white/20 pt-8">
                <h3 className="font-serif text-lg font-bold mb-4">{t('contact')}</h3>
                {contactDetails}
            </div>

            <div className="border-t border-white/20 pt-8">
                <h3 className="font-serif text-lg font-bold mb-4">{t('quickContact')}</h3>
                 <p className="font-sans text-white mb-4">{t('quickContactDescription')}</p>
                <Link href={`/${locale}/iletisim#form`}>
                    <Button variant="secondary" className="w-full">{t('getInTouch')}</Button>
                </Link>
            </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-white/60 font-sans">
          <p>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
} 