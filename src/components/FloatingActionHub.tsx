'use client';

import { Link } from '@/navigation';
import Image from 'next/image';
import { usePathname } from '@/navigation';
import { useEffect, useState } from 'react';
import { ChevronUp, Calendar } from 'lucide-react';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';

// --- Sub-component for the Back to Top button ---
function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) setIsVisible(true);
    else setIsVisible(false);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={clsx(
        'bg-primary hover:bg-primary-dark text-white rounded-full p-3 shadow-lg transition-all duration-300 ease-in-out',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'
      )}
      aria-label="Go to top"
    >
      <ChevronUp className="h-6 w-6" />
    </button>
  );
}

// --- Sub-component for the Floating Contact CTA ---
function ContactCTA() {
  const pathname = usePathname();
  const tCta = useTranslations('CTA');

  if (pathname === '/iletisim') return null;

  return (
    <Link href="/iletisim#form" className="flex flex-col items-end gap-1.5">
      <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-lg border-2 border-white flex-shrink-0">
        <Image
          src="/dr-aysin-akdogan-standingnextodesk.jpg"
          alt="Op. Dr. Ayşin Akdoğan ile iletişime geçin"
          fill
          className="object-cover"
          sizes="64px"
        />
        {/* Booking badge - distinct from the chatbot's message-circle icon
            so the two floating buttons don't read as duplicate chat launchers. */}
        <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-accent border-2 border-white shadow-sm flex items-center justify-center">
          <Calendar className="h-3.5 w-3.5 text-white" />
        </div>
      </div>
      {/* Always-visible label (not hover-only) so it still shows on touch devices. */}
      <span className="bg-white text-accent text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm border border-accent/15 whitespace-nowrap">
        {tCta('getInTouch')}
      </span>
    </Link>
  );
}


// --- Main Hub Component ---
export default function FloatingActionHub() {
    return (
        <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-4">
            <ContactCTA />
            <BackToTop />
        </div>
    )
} 