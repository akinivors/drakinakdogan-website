'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import Button from '@/components/Button';

// Re-using the navLinks array is efficient
const navLinks = [
  { href: '/hakkimda', label: 'Hakkımda' },
  { href: '/hizmetler', label: 'Hizmetler' },
  { href: '/hasta-rehberi', label: 'Hasta Rehberi' },
  { href: '/blog', label: 'Blog' },
  { href: '/iletisim', label: 'İletişim' },
];

export default function Footer() {
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="bg-primary-dark text-white">
      <div className="container mx-auto px-6 py-12" suppressHydrationWarning>
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8" suppressHydrationWarning>
          
          {/* Column 1: Logo and Summary */}
          <div className="flex flex-col gap-4" suppressHydrationWarning>
            <Logo />
            <p className="font-sans text-white/70">
              İzmir&apos;de kadın sağlığı ve gebelik takibi üzerine uzmanlaşmış kliniğimizle hizmetinizdeyiz.
            </p>
            {/* Social media icons can be added here later */}
          </div>

          {/* Column 2: Site Links */}
          <div suppressHydrationWarning>
            <h3 className="font-serif text-lg font-bold mb-4">Site Haritası</h3>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="font-sans text-white/80 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div suppressHydrationWarning>
            <h3 className="font-serif text-lg font-bold mb-4">İletişim</h3>
            <div className="font-sans text-white/80 space-y-2">
              <p>1234 Örnek Sokak, No: 5, Daire: 6</p>
              <p>Konak, İzmir, Türkiye</p>
              <p>Telefon: +90 (555) 123 45 67</p>
              <p>E-posta: info@drakinakdogan.com</p>
            </div>
          </div>
          
          {/* Column 4: Call to Action */}
          <div suppressHydrationWarning>
            <h3 className="font-serif text-lg font-bold mb-4">Hızlı İletişim</h3>
            <p className="font-sans text-white/70 mb-4">
              Anında randevu alın veya sorularınız için bize mesaj gönderin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://mobil.mph.com.tr/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="primary" className="w-full">Hızlı Randevu Al</Button>
              </a>
              <Link href="/iletisim" className="flex-1">
                <Button variant="secondary" className="w-full">Mesaj Gönder</Button>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-white/60 font-sans" suppressHydrationWarning>
          <p>&copy; {currentYear || '2024'} Op. Dr. Ayşin Akdoğan. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
} 