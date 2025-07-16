'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronUp, MessageCircle } from 'lucide-react'; // Import the MessageCircle icon
import { clsx } from 'clsx';

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

// --- Sub-component for the Floating Contact CTA (with new icon) ---
function ContactCTA() {
  const pathname = usePathname();
  if (pathname === '/iletisim') return null;

  return (
    <Link href="/iletisim#form" className="group">
      <div className="flex items-center justify-end">
        <div className="bg-primary text-white font-bold text-sm px-6 py-3 rounded-l-full -mr-8 opacity-0 group-hover:opacity-100 group-hover:-mr-0 transition-all duration-300">
          İletişime Geçin
        </div>
        
        <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-lg border-2 border-white flex-shrink-0">
          <Image
            src="/dr-aysin-akdogan-standingnextodesk.jpg"
            alt="Op. Dr. Ayşin Akdoğan ile iletişime geçin"
            fill
            className="object-cover"
          />
          {/* --- MESSAGE ICON OVERLAY --- */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <MessageCircle className="h-7 w-7 text-white/80" />
          </div>
        </div>
      </div>
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