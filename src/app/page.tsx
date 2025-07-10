'use client';

import dynamic from 'next/dynamic';
import AnimatedSection from '@/components/AnimatedSection';
import ResourceHub from '@/components/ResourceHub';
import InstagramSection from '@/components/InstagramSection';

// --- DYNAMIC IMPORTS ---
// Instead of direct imports, we now use next/dynamic to lazy-load each section.
const Hero = dynamic(() => import('@/components/Hero'));
const AboutSection = dynamic(() => import('@/components/AboutSection'));
const ServicesSection = dynamic(() => import('@/components/ServicesSection'));
const TestimonialsSection = dynamic(() => import('@/components/TestimonialsSection'));

export default function Home() {
  return (
    <>
      <Hero /> {/* No longer wrapped - visible immediately */}
      
      <AnimatedSection>
        <ResourceHub /> {/* The new section */}
      </AnimatedSection>
      <AnimatedSection>
        <AboutSection showButton={true} />
      </AnimatedSection>
      <AnimatedSection>
        <ServicesSection />
      </AnimatedSection>
      <AnimatedSection>
        <InstagramSection />
      </AnimatedSection>
      <AnimatedSection>
        <TestimonialsSection />
      </AnimatedSection>
    </>
  );
}
