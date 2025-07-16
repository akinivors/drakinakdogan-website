'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import Button from '@/components/Button';
import { X, Menu, Home, User, Stethoscope, BookOpen, MessageSquare, Briefcase, FlaskConical, Instagram } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

// --- Data for the Mega Menu (Updated to match hizmetler page) ---
const conditionsTreated = [
  { slug: 'infertilite', title: 'İnfertilite (Kısırlık)' },
  { slug: 'polikistik-over-sendromu', title: 'Polikistik Over Sendromu (PCOS)' },
  { slug: 'endometriozis', title: 'Endometriozis (Çikolata Kisti)' },
  { slug: 'azalmis-over-rezervi', title: 'Azalmış Over Rezervi' },
  { slug: 'tuplerin-tikali-olmasi', title: 'Tüplerin Tıkalı Olması' },
  { slug: 'rahim-anomalileri', title: 'Rahim Anomalileri' },
  { slug: 'hipogonadotropik-hipogonadizm', title: 'Hipogonadotropik Hipogonadizm' }
];
const treatmentMethods = [
  { slug: 'tup-bebek', title: 'Tüp Bebek (IVF)' },
  { slug: 'yapay-zeka-embriyo', title: 'Yapay Zeka ile Embriyo Seçimi' },
  { slug: 'mikroenjeksiyon', title: 'Mikroenjeksiyon (ICSI)' },
  { slug: 'embriyoskop-takip', title: 'Embriyoskop ile Takip' },
  { slug: 'genetik-tani', title: 'Genetik Tanı İşlemleri (PGT)' },
  { slug: 'yumurta-dondurma', title: 'Yumurta Dondurma' }
];

// --- Main Navigation Links with ICONS ---
const navLinks = [
  { href: '/', label: 'Ana Sayfa', icon: <Home size={24} /> },
  { href: '/hakkimda', label: 'Hakkımda', icon: <User size={24} /> },
  { href: '/hizmetler', label: 'Hizmetler', icon: <Briefcase size={24} /> },
  { href: '/hasta-rehberi', label: 'Hasta Rehberi', icon: <BookOpen size={24} /> },
  { href: '/blog', label: 'Blog', icon: <Stethoscope size={24} /> },
  { href: '/iletisim', label: 'İletişim', icon: <MessageSquare size={24} /> },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Add effect to prevent scrolling when mobile menu is open
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
    <div 
      onMouseLeave={handleMouseLeave} 
      className="sticky top-0 z-40"
    >
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Logo />

          {/* --- Desktop Navigation --- */}
          <div className="hidden md:flex items-center gap-8">
            {/* Home Icon Button */}
            <Link href="/" className="p-2 text-text-main hover:text-primary transition-colors rounded-lg hover:bg-primary/10" onMouseEnter={handleMouseLeave} title="Ana Sayfa">
              <Home size={20} />
            </Link>
            
            {/* Hakkımda */}
            <Link href="/hakkimda" className="font-sans text-text-main hover:text-primary transition-colors" onMouseEnter={handleMouseLeave}>Hakkımda</Link>
            
            {/* Services Mega Menu Trigger */}
            <div onMouseEnter={handleMouseEnter} className="relative">
              <Link href="/hizmetler" className="font-sans text-text-main hover:text-primary transition-colors">
                Hizmetler
              </Link>
            </div>
            
            {/* Hasta Rehberi */}
            <Link href="/hasta-rehberi" className="font-sans text-text-main hover:text-primary transition-colors" onMouseEnter={handleMouseLeave}>Hasta Rehberi</Link>
            
            {/* Blog */}
            <Link href="/blog" className="font-sans text-text-main hover:text-primary transition-colors" onMouseEnter={handleMouseLeave}>Blog</Link>
            
            {/* İletişim */}
            <Link href="/iletisim" className="font-sans text-text-main hover:text-primary transition-colors" onMouseEnter={handleMouseLeave}>İletişim</Link>
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

      {/* --- REBUILT MOBILE MENU PANEL --- */}
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
                <Button variant="secondary" className="w-full max-w-xs mx-auto">İletişime Geçin</Button>
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

// --- The Mega Menu Component (Updated to match hizmetler page) ---
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
            <h3 className="font-serif text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <Stethoscope size={20} /> Tanı ve Tedavisi Yapılan Hastalıklar
            </h3>
            <ul className="space-y-2">
              {conditionsTreated.map(item => (
                <li key={item.slug}>
                  <Link href={`/hizmetler#${item.slug}`} className="font-sans text-text-light hover:text-primary transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Column 2: Treatments */}
          <div>
            <h3 className="font-serif text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <Stethoscope size={20} /> Uygulanan Tedavi Yöntemleri
            </h3>
            <ul className="space-y-2">
              {treatmentMethods.map(item => (
                <li key={item.slug}>
                  <Link href={`/hizmetler#${item.slug}`} className="font-sans text-text-light hover:text-primary transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Column 3: Featured Service */}
          <div className="bg-secondary p-6 rounded-lg">
            <h3 className="font-serif text-lg font-bold text-primary mb-2">Öne Çıkan Hizmet</h3>
            <p className="font-sans text-2xl font-bold text-text-main mb-4">Tüp Bebek (IVF)</p>
            <p className="font-sans text-sm text-text-light mb-4">Kişiye özel protokoller ve en güncel teknoloji ile başarıya giden yolda yanınızdayız.</p>
            <Link href="/hizmetler#tup-bebek">
              <Button variant="primary" className="w-full">Detayları İncele</Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 