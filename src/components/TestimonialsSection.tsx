'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "İlk andan itibaren kendimi güvende hissettim. Dr. Akdoğan'ın profesyonelliği ve samimiyeti sayesinde tüm süreci rahatlıkla atlattım.",
    author: "E. Yılmaz",
  },
  {
    quote: "Yıllardır süren problemimize Dr. Ayşin Hanım sayesinde çözüm bulduk. Kendisine ve ekibine minnettarız. Herkese tavsiye ederim.",
    author: "S. Kaya",
  },
  {
    quote: "Gebelik sürecim boyunca gösterdiği ilgi ve uzmanlıkla, bu özel dönemi huzur içinde geçirmemi sağladı. Sonsuz teşekkürler.",
    author: "A. Demir",
  },
  {
    quote: "En karmaşık konularda bile anlaşılır açıklamaları ve pozitif yaklaşımıyla bize her zaman umut verdi. Harika bir doktor.",
    author: "F. Çetin",
  },
];

export default function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    
    const timer = setInterval(() => {
      emblaApi.scrollNext();
    }, 6000); // Change testimonial every 6 seconds

    return () => clearInterval(timer);
  }, [emblaApi, onSelect]);

  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="font-serif text-4xl font-bold text-primary mb-4">
            Hastalarımız Ne Diyor?
          </h2>
          <p className="font-sans text-lg text-text-light mb-12 max-w-2xl mx-auto">
            Tedavi sürecinde hastalarımızın memnuniyeti ve sağlığı bizim için her zaman önceliklidir.
          </p>
        </div>

        {/* --- Carousel Implementation --- */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex-grow-0 flex-shrink-0 w-full">
                <div className="bg-gradient-to-b from-white to-primary-lightest p-8 rounded-lg relative max-w-3xl mx-auto text-center">
                  <Quote className="absolute top-4 left-4 text-primary/10" size={60} />
                  <p className="font-sans text-xl text-text-light italic relative z-10 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <p className="font-serif font-bold text-text-main text-right mt-6">
                    - {testimonial.author}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Navigation Dots --- */}
        <div className="flex justify-center gap-3 mt-8">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === selectedIndex ? 'bg-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 