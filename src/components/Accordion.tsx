'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import clsx from 'clsx';

// Animation variants for staggered items
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
};

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <AnimatedSection tag="div" className="w-full max-w-3xl mx-auto space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <motion.div key={index} className="bg-gradient-to-b from-white to-primary-lightest rounded-lg transition-all duration-300" variants={itemVariants}>
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex justify-between items-center text-left p-6"
            >
              <span className="font-serif text-lg font-medium text-text-main">{item.question}</span>
              <ChevronDown
                className={clsx('transform transition-transform duration-300 flex-shrink-0', {
                  'rotate-180': isOpen,
                })}
              />
            </button>
            <div
              className={clsx('overflow-hidden transition-[max-height] duration-500 ease-in-out', {
                'max-h-screen': isOpen,
                'max-h-0': !isOpen,
              })}
            >
              <div className="px-6 pb-6">
                <p className="font-sans text-text-light leading-relaxed">{item.answer}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </AnimatedSection>
  );
} 