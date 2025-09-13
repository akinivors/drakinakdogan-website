// Path: src/components/TestimonialsSection.tsx (Updated)

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Loader2 } from 'lucide-react';
import Button from '@/components/Button';
import TestimonialFormModal from './TestimonialFormModal';
import { supabase } from '@/lib/supabaseClient';
import TestimonialCard from './TestimonialCard';
import { useLocale, useTranslations } from 'next-intl';

type Testimonial = {
  id: number;
  created_at: string;
  author: string;
  quote: string;
};

export default function TestimonialsSection() {
  const t = useTranslations('TestimonialsSection');
  const locale = useLocale();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setIsLoading(true);

      // First, fetch all columns to see what's available
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching testimonials:', error);
        setTestimonials([]);
      } else if (data) {
        console.log('Testimonials fetched successfully:', data.length);
        if (data.length > 0) {
          console.log('Sample testimonial structure:', data[0]);
        }

        const quoteColumn = locale === 'en' ? 'quote_en' : 'quote_tr';
        
        const formattedData = data.map(item => ({
            id: item.id,
            created_at: item.created_at,
            author: item.author, // Single author column for all languages
            quote: (item as Record<string, unknown>)[quoteColumn] as string || (item as Record<string, unknown>).quote_tr as string || (item as Record<string, unknown>).quote as string // Fallback chain
        }));
        setTestimonials(formattedData);
      }
      setIsLoading(false);
    };

    fetchTestimonials();
  }, [locale]); // Add locale to the dependency array

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi || testimonials.length === 0) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    
    if (testimonials.length > 1) {
      const timer = setInterval(() => {
        emblaApi.scrollNext();
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [emblaApi, onSelect, testimonials]);

  return (
    <>
      <section className="w-full bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="font-serif text-4xl font-bold text-primary mb-4">
              {t('title')}
            </h2>
            <p className="font-sans text-lg text-text-light mb-8 max-w-2xl mx-auto">
              {t('description')}
            </p>
            <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
              {t('shareExperience')}
            </Button>
          </div>

          <div className="mt-12">
            {isLoading ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="animate-spin text-primary" size={40} />
                <p className="ml-4 font-sans text-text-light">{t('loading')}</p>
              </div>
            ) : testimonials.length === 0 ? (
              <div className="text-center h-48 flex items-center justify-center">
                <p className="font-sans text-text-light italic">{t('noComments')}</p>
              </div>
            ) : (
              <>
                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="embla__container flex items-stretch"> 
                    {testimonials.map((testimonial) => (
                      <div key={testimonial.id} className="embla__slide flex-[0_0_100%] min-w-0 h-full">
                        <TestimonialCard testimonial={testimonial} />
                      </div>
                    ))}
                  </div>
                </div>

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
              </>
            )}
          </div>
        </div>
      </section>

      <TestimonialFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}