// Path: src/components/Header.tsx (Fully Refactored)

'use client';

import { useState, useRef, useEffect } from 'react';
import { Link } from '@/navigation';
import Logo from '@/components/Logo';
import Button from '@/components/Button';
import { X, Menu, Home, User, Stethoscope, BookOpen, MessageSquare, Briefcase, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('Header');
  const tNav = useTranslations('Navigation');
  const tCta = useTranslations('CTA');

  // --- Data for the Mega Menu (NOW TRANSLATED) ---
  const conditionsTreated = [
    { slug: 'infertilite', title: t('conditions.infertility') },
    { slug: 'polikistik-over-sendromu', title: t('conditions.pcos') },
    { slug: 'endometriozis', title: t('conditions.endometriosis') },
    { slug: 'azalmis-over-rezervi', title: t('conditions.diminishedOvarianReserve') },
    { slug: 'tuplerin-tikali-olmasi', title: t('conditions.tubalBlockage') },
    { slug: 'rahim-anomalileri', title: t('conditions.uterineAnomalies') },
    { slug: 'hipogonadotropik-hipogonadizm', title: t('conditions.hypogonadotropicHypogonadism') }
  ];
  const treatmentMethods = [
    { slug: 'tup-bebek', title: t('treatments.ivf') },
    { slug: 'yapay-zeka-embriyo', title: t('treatments.aiEmbryoSelection') },
    { slug: 'mikroenjeksiyon', title: t('treatments.icsi') },
    { slug: 'embriyoskop-takip', title: t('treatments.embryoscope') },
    { slug: 'genetik-tani', title: t('treatments.pgt') },
    { slug: 'yumurta-dondurma', title: t('treatments.eggFreezing') }
  ];

  // --- Main Navigation Links with ICONS (NOW TRANSLATED) ---
  const navLinks = [
    { href: '/', label: tNav('home'), icon: <Home size={24} /> },
    { href: '/hakkimda', label: tNav('about'), icon: <User size={24} /> },
    { href: '/hizmetler', label: tNav('services'), icon: <Briefcase size={24} /> },
    { href: '/hasta-rehberi', label: tNav('patientGuide'), icon: <BookOpen size={24} /> },
    { href: '/blog', label: tNav('blog'), icon: <Stethoscope size={24} /> },
    { href: '/iletisim', label: tNav('contact'), icon: <MessageSquare size={24} /> },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsServicesMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsServicesMenuOpen(false), 200);
  };

  return (
    <div onMouseLeave={handleMouseLeave} className="sticky top-0 z-40">
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Logo />
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="p-2 text-text-main hover:text-primary transition-colors rounded-lg hover:bg-primary/10" onMouseEnter={handleMouseLeave} title={tNav('home')}>
              <Home size={20} />
            </Link>
            <Link href="/hakkimda" className="font-sans text-text-main hover:text-primary transition-colors" onMouseEnter={handleMouseLeave}>{tNav('about')}</Link>
            <div onMouseEnter={handleMouseEnter} className="relative">
              <Link href="/hizmetler" className="font-sans text-text-main hover:text-primary transition-colors">
                {tNav('services')}
              </Link>
            </div>
            <Link href="/hasta-rehberi" className="font-sans text-text-main hover:text-primary transition-colors" onMouseEnter={handleMouseLeave}>{tNav('patientGuide')}</Link>
            <Link href="/blog" className="font-sans text-text-main hover:text-primary transition-colors" onMouseEnter={handleMouseLeave}>{tNav('blog')}</Link>
            <Link href="/iletisim" className="font-sans text-text-main hover:text-primary transition-colors" onMouseEnter={handleMouseLeave}>{tNav('contact')}</Link>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Link href="/iletisim#form">
              <Button variant="primary">{tCta('getInTouch')}</Button>
            </Link>
          </div>
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2">
              <Menu className="h-6 w-6 text-primary" />
            </button>
          </div>
        </nav>
      </header>
      
      <AnimatePresence>
        {isServicesMenuOpen && <MegaMenu conditions={conditionsTreated} treatments={treatmentMethods} />}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary/90 backdrop-blur-lg z-50 p-6 flex flex-col"
          >
            <div className="flex justify-between items-center">
              <Logo variant="light" />
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                <X className="h-8 w-8 text-white" />
              </button>
            </div>
            <nav className="flex flex-col items-center justify-center flex-grow gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 w-full justify-center font-serif text-3xl text-white hover:text-accent transition-colors"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
            <div className="py-6 text-center">
              <Link href="/iletisim#form" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="secondary" className="w-full max-w-xs mx-auto">{tCta('getInTouch')}</Button>
              </Link>
              <div className="flex justify-center mt-6">
                <a href="https://www.instagram.com/draysinakdogan/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
                  <Instagram size={28} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MegaMenu({ conditions, treatments }: { conditions: {slug: string, title: string}[], treatments: {slug: string, title: string}[] }) {
  const t = useTranslations('Header');
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="absolute top-full left-0 right-0 w-full bg-white shadow-lg border-t border-gray-200 z-30"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-3 gap-8 py-8">
          <div>
            <h3 className="font-serif text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <Stethoscope size={20} /> {t('conditionsTitle')}
            </h3>
            <ul className="space-y-2">
              {conditions.map(item => (
                <li key={item.slug}>
                  <Link href={`/hizmetler#${item.slug}`} className="font-sans text-text-light hover:text-primary transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <Stethoscope size={20} /> {t('treatmentsTitle')}
            </h3>
            <ul className="space-y-2">
              {treatments.map(item => (
                <li key={item.slug}>
                  <Link href={`/hizmetler#${item.slug}`} className="font-sans text-text-light hover:text-primary transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-secondary p-6 rounded-lg">
            <h3 className="font-serif text-lg font-bold text-primary mb-2">{t('featuredTitle')}</h3>
            <p className="font-sans text-2xl font-bold text-text-main mb-4">{t('featuredService')}</p>
            <p className="font-sans text-sm text-text-light mb-4">{t('featuredDescription')}</p>
            <Link href="/hizmetler#tup-bebek">
              <Button variant="primary" className="w-full">{t('featuredButton')}</Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}