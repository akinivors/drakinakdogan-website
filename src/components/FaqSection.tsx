'use client';

import { useState } from 'react';
import Accordion from '@/components/Accordion';
import { HelpCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';

// Define the shape of an FAQ item from Supabase
type Faq = {
  question: string;
  answer: string;
  category: string;
};

// Define the shape for our categorized data
type FaqCategory = {
  name: string;
  questions: { question: string, answer: string }[];
};

export default function FaqSection({ faqs }: { faqs: Faq[] }) {
  const t = useTranslations('PatientGuidePage');
  
  // Group the flat array of FAQs from Supabase into categories
  const faqCategories = faqs.reduce<FaqCategory[]>((acc, faq) => {
    let category = acc.find(c => c.name === faq.category);
    if (!category) {
      category = { name: faq.category, questions: [] };
      acc.push(category);
    }
    category.questions.push({ question: faq.question, answer: faq.answer });
    return acc;
  }, []);

  const [activeFaqCategory, setActiveFaqCategory] = useState(faqCategories[0]?.name || '');

  const activeQuestions = faqCategories.find(cat => cat.name === activeFaqCategory)?.questions || [];

  return (
    <section id="faq" className="w-full bg-secondary py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-primary mb-4 flex items-center justify-center gap-3">
            <HelpCircle className="text-accent" size={36} />
            {t('faqSectionTitle')}
          </h2>
        </div>

        {/* FAQ Filter Tabs */}
        <div className="flex justify-center border-b border-gray-200 mb-12">
          {faqCategories.map(category => (
            <button
              key={category.name}
              onClick={() => setActiveFaqCategory(category.name)}
              className={clsx(
                "font-serif text-lg px-6 py-3 transition-all duration-200",
                activeFaqCategory === category.name 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-text-light hover:text-primary'
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <Accordion items={activeQuestions} />
      </div>
    </section>
  );
} 