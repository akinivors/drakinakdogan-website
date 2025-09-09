'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Loader2 } from 'lucide-react';
import Button from '@/components/Button';
import TestimonialFormModal from './TestimonialFormModal';
import { supabase } from '@/lib/supabaseClient';
import TestimonialCard from './TestimonialCard'; // 1. Import the new component

// 1. Define the Testimonial type
type Testimonial = {
  id: number;
  created_at: string;
  author: string;
  quote: string;
};

export default function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 2. Add state for testimonials and loading
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 3. Fetch data from Supabase
  useEffect(() => {
    const fetchTestimonials = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching testimonials:', error);
      } else {
        setTestimonials(data);
      }
      setIsLoading(false);
    };

    fetchTestimonials();
  }, []);

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    
    if (testimonials.length > 1) {
      const timer = setInterval(() => {
        emblaApi.scrollNext();
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [emblaApi, onSelect, testimonials.length]);

  return (
    <>
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="font-serif text-4xl font-bold text-primary mb-4">
            Hastalarımız Ne Diyor?
          </h2>
          <p className="font-sans text-lg text-text-light mb-8 max-w-2xl mx-auto">
            Tedavi sürecinde hastalarımızın memnuniyeti ve sağlığı bizim için her zaman önceliklidir.
          </p>
          {/* --- ADD THIS BUTTON --- */}
          <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
            Deneyiminizi Paylaşın
          </Button>
        </div>

          <div className="mt-12">
            {isLoading ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="animate-spin text-primary" size={40} />
                <p className="ml-4 font-sans text-text-light">Yorumlar Yükleniyor...</p>
              </div>
            ) : testimonials.length === 0 ? (
              <div className="text-center h-48 flex items-center justify-center">
                <p className="font-sans text-text-light italic">Henüz onaylanmış bir yorum bulunmamaktadır.</p>
              </div>
            ) : (
              <>
                <div className="overflow-hidden" ref={emblaRef}>
                  {/* Add items-stretch here */}
                  <div className="flex items-stretch">
                    {testimonials.map((testimonial) => (
                      <div key={testimonial.id} className="flex-grow-0 flex-shrink-0 w-full h-full">
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

    {/* --- RENDER THE MODAL --- */}
    <TestimonialFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
} 