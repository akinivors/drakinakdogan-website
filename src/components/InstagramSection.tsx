// Path: src/components/InstagramSection.tsx (Fully Refactored)

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Instagram } from 'lucide-react';
import { useTranslations } from 'next-intl';

const instagramImages = [
  { src: '/dr-aysin-akdogan-standingnextodesk.jpg', alt: 'Dr. Ayşin Akdoğan in her office' },
  { src: '/dr-aysin-akdogan-lab1.jpg', alt: 'Dr. Ayşin Akdoğan working in the lab' },
  { src: '/dr-aysin-akdogan-standinginsidehospital2.jpg', alt: 'Dr. Ayşin Akdoğan in the hospital' },
  { src: '/dr-aysin-akdogan-standingbackgroundhospital.jpg', alt: 'Dr. Ayşin Akdoğan at the hospital' },
  { src: '/dr-aysin-akdogan-staringatcomputerwithnurses.jpg', alt: 'Dr. Ayşin Akdoğan working with nurses' },
  { src: '/dr-aysin-akdogan-standinginsidehospital.jpg', alt: 'Dr. Ayşin Akdoğan in the clinic' },
];

export default function InstagramSection() {
  const t = useTranslations('InstagramSection');

  return (
    <section className="w-full bg-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-serif text-4xl font-bold text-primary mb-4">
          {t('title')}
        </h2>
        <p className="font-sans text-lg text-text-light mb-12">
          {t.rich('description', {
            link: (chunks) => <a href="https://www.instagram.com/draysinakdogan/" target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline">{chunks}</a>
          })}
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramImages.map((image, index) => (
            <div key={index} className="w-full h-48 relative rounded-lg overflow-hidden shadow-md">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16.6vw"
              />
            </div>
          ))}
        </div>
        
        <div className="mt-12">
          <Link 
            href="https://www.instagram.com/draysinakdogan/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-8 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            <Instagram size={24} />
            {t('button')}
          </Link>
        </div>
      </div>
    </section>
  );
}