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
            <Logo variant="light" />
            <p className="font-sans text-white">
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
                  <Link href={link.href} className="font-sans text-white hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div suppressHydrationWarning>
            <h3 className="font-serif text-lg font-bold mb-4">İletişim</h3>
            <div className="font-sans text-white space-y-2">
              <p>Yeni Girne Bulvarı, 1825. Sk. No:12,</p>
              <p>35575 Karşıyaka/İzmir</p>
              <p>Telefon: +90 554 871 05 90</p>
              <p>E-posta: info@drakinakdogan.com</p>
              <div className="flex items-center gap-3 mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                <a href="https://www.instagram.com/draysinakdogan/" target="_blank" rel="noopener noreferrer" className="font-sans text-white hover:underline">
                  @draysinakdogan
                </a>
              </div>
            </div>
          </div>
          
          {/* Column 4: Call to Action */}
          <div suppressHydrationWarning>
            <h3 className="font-serif text-lg font-bold mb-4">Hızlı İletişim</h3>
            <p className="font-sans text-white mb-4">
              Anında randevu alın veya sorularınız için bize mesaj gönderin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/iletisim#form" className="flex-1">
                <Button variant="primary" className="w-full">İletişime Geçin</Button>
              </Link>
              <Link href="/iletisim" className="flex-1">
                <Button variant="secondary" className="w-full">Mesaj Gönder</Button>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-white font-sans" suppressHydrationWarning>
          <p>&copy; {currentYear || '2024'} Op. Dr. Ayşin Akdoğan. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
} 