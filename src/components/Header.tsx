'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import Button from '@/components/Button';
import { X, Menu, Stethoscope, FlaskConical } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

// --- Data for the Mega Menu ---
const conditionsTreated = [
  'Endometriozis', 'İnfertilite', 'Polikistik Over Sendromu', 'Miyoma Uteri', 'Zayıf Over Cevabı'
];
const treatmentMethods = [
  'Tüp Bebek (IVF)', 'Aşılama (IUI)', 'Embriyo Transferi', 'Laparoskopi', 'Histerektomi'
];

// --- Main Navigation Links ---
const navLinks = [
    { href: '/hakkimda', label: 'Hakkımda' },
    // We remove "Hizmetler" here because it's a special case now
    { href: '/hasta-rehberi', label: 'Hasta Rehberi' },
    { href: '/blog', label: 'Blog' },
    { href: '/iletisim', label: 'İletişim' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsServicesMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesMenuOpen(false);
    }, 200);
  };

  return (
    // The main container for hover logic
    <div onMouseLeave={handleMouseLeave} className="relative">
      <header className="w-full bg-white/80 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Logo />

          {/* --- Desktop Navigation --- */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/hakkimda" className="font-sans text-text-main hover:text-primary transition-colors" onMouseEnter={handleMouseLeave}>Hakkımda</Link>
            
            {/* Services Mega Menu Trigger */}
            <div onMouseEnter={handleMouseEnter}>
              <Link href="/hizmetler" className="font-sans text-text-main hover:text-primary transition-colors">
                Hizmetler
              </Link>
            </div>

            {/* Other links */}
            {navLinks.slice(1).map((link) => (
                 <Link key={link.href} href={link.href} className="font-sans text-text-main hover:text-primary transition-colors" onMouseEnter={handleMouseLeave}>{link.label}</Link>
            ))}
          </div>

          <div className="hidden md:block">
            <a href="https://mobil.mph.com.tr/" target="_blank" rel="noopener noreferrer">
              <Button variant="primary">Randevu Al</Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2">
              <Menu className="h-6 w-6 text-primary" />
            </button>
          </div>
        </nav>
      </header>
      
      {/* --- Mega Menu Panel --- */}
      <AnimatePresence>
        {isServicesMenuOpen && <MegaMenu />}
      </AnimatePresence>

      {/* --- Mobile Menu Panel (Unchanged) --- */}
      <div className={clsx('fixed top-0 right-0 h-full w-full bg-primary/90 backdrop-blur-lg z-50 transition-transform duration-300 ease-in-out', isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full')}>
        <div className="flex justify-end p-6">
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
            <X className="h-8 w-8 text-white" />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center h-full -mt-16">
          <nav className="flex flex-col items-center gap-8">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-3xl text-white hover:text-accent transition-colors">Ana Sayfa</Link>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-3xl text-white hover:text-accent transition-colors">
                {link.label}
              </Link>
            ))}
            <Link href="/hizmetler" onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-3xl text-white hover:text-accent transition-colors">Hizmetler</Link>
            <div className="mt-8">
              <a 
                href="https://mobil.mph.com.tr/" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button variant="secondary">Randevu Al</Button>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

// --- The Mega Menu Component (with corrected styling) ---
function MegaMenu() {
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
          {/* Column 1: Conditions */}
          <div>
            <h3 className="font-serif text-lg font-bold text-primary mb-4 flex items-center gap-2"><Stethoscope size={20} /> Tedavisi Yapılan Hastalıklar</h3>
            <ul className="space-y-2">{conditionsTreated.map(item => (<li key={item}><Link href="/hizmetler" className="font-sans text-text-light hover:text-primary transition-colors">{item}</Link></li>))}</ul>
          </div>
          {/* Column 2: Treatments */}
          <div>
            <h3 className="font-serif text-lg font-bold text-primary mb-4 flex items-center gap-2"><FlaskConical size={20} /> Uygulanan Tedavi Yöntemleri</h3>
            <ul className="space-y-2">{treatmentMethods.map(item => (<li key={item}><Link href="/hizmetler" className="font-sans text-text-light hover:text-primary transition-colors">{item}</Link></li>))}</ul>
          </div>
          {/* Column 3: Featured Service */}
          <div className="bg-secondary p-6 rounded-lg"><h3 className="font-serif text-lg font-bold text-primary mb-2">Öne Çıkan Hizmet</h3><p className="font-sans text-2xl font-bold text-text-main mb-4">Tüp Bebek (IVF)</p><p className="font-sans text-sm text-text-light mb-4">Kişiye özel protokoller ve en güncel teknoloji ile başarıya giden yolda yanınızdayız.</p><Link href="/hizmetler"><Button variant="primary" className="w-full">Detayları İncele</Button></Link></div>
        </div>
      </div>
    </motion.div>
  );
} 