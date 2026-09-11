'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

const images = [
  { src: '/dr-aysin-akdogan-standingbackgroundhospital.jpg', alt: 'Op. Dr. Ayşin Akdoğan hastane binası önünde' },
  { src: '/dr-aysin-akdogan-smilingatthedesk.jpg', alt: 'Op. Dr. Ayşin Akdoğan masasında gülümserken' },
  { src: '/dr-aysin-akdogan-lab1.jpg', alt: 'Op. Dr. Ayşin Akdoğan tüp bebek laboratuvarında' },
  { src: '/dr-aysin-akdogan.png', alt: 'Op. Dr. Ayşin Akdoğan ameliyat sırasında' },
  { src: '/dr-aysin-akdogan-standinginsidehospital.jpg', alt: 'Op. Dr. Ayşin Akdoğan klinik içerisinde' },
  { src: '/dr-aysin-akdogan-staringatthecomputer.jpg', alt: 'Op. Dr. Ayşin Akdoğan hasta dosyalarını incelerken' },
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'start', 
    dragFree: false 
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-play functionality
  useEffect(() => {
    if (!emblaApi) return;
    
    const timer = setInterval(() => {
      emblaApi.scrollNext();
    }, 8000);

    return () => clearInterval(timer);
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  }, [emblaApi]);

  return (
    <div className="w-full h-full rounded-lg shadow-lg relative overflow-hidden bg-gray-200">
      <div className="embla overflow-hidden h-full" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {images.map((image, index) => (
            <div key={index} className="embla__slide flex-[0_0_100%] min-w-0 relative">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 33vw, 512px"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
} 