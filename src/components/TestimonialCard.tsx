// Path: src/components/TestimonialCard.tsx

'use client';

import { Quote } from 'lucide-react';

// Define the shape of the testimonial prop
type Testimonial = {
  author: string;
  quote: string;
};

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    // The h-full class has been removed from this div
    <div className="bg-gradient-to-b from-white to-primary-lightest p-8 rounded-lg relative max-w-3xl mx-auto text-center">
      <Quote className="absolute top-4 left-4 text-primary/10" size={60} />
      <p className="font-sans text-xl text-text-light italic relative z-10 leading-relaxed break-words">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <p className="font-serif font-bold text-text-main text-right mt-6">
        - {testimonial.author}
      </p>
    </div>
  );
}