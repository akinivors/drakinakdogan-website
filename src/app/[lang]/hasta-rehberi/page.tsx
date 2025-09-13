// Path: src/app/[lang]/hasta-rehberi/page.tsx (Updated)

import { Metadata } from 'next';
import { supabase } from '@/lib/supabaseClient';
import PatientCalculators from '@/components/PatientCalculators';
import PatientJourneyMap from '@/components/PatientJourneyMap';
import FaqSection from '@/components/FaqSection';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getLocale, getTranslations } from 'next-intl/server';

export async function generateMetadata({params: {locale}}: {params: {locale: string}}): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: 'PatientGuidePage'});
  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function HastaRehberiPage({params}: {params: Promise<{lang: string}>}) {
  const {lang: locale} = await params;
  const t = await getTranslations({locale, namespace: 'PatientGuidePage'});
  const tNav = await getTranslations({locale, namespace: 'Navigation'});

  // --- THIS IS THE KEY CHANGE ---
  const questionColumn = locale === 'en' ? 'question_en' : 'question_tr';
  const answerColumn = locale === 'en' ? 'answer_en' : 'answer_tr';
  // Assuming you will add category_en to faqs table as well
  const categoryColumn = locale === 'en' ? 'category_en' : 'category_tr'; 

  const { data: faqs, error } = await supabase
    .from('faqs')
    .select(`*, ${questionColumn}, ${answerColumn}, ${categoryColumn}`)
    .order('id', { ascending: true });
  // -----------------------------

  if (error || !faqs) {
    console.error("Could not fetch FAQs:", error);
  }

  // Map the fetched data to a consistent structure for the client component
  const formattedFaqs = faqs?.map(faq => ({
      ...faq,
      question: (faq as any)[questionColumn] || (faq as any).question_tr, // Fallback to TR if EN is null
      answer: (faq as any)[answerColumn] || (faq as any).answer_tr,
      category: (faq as any)[categoryColumn] || (faq as any).category_tr,
  })) || [];

  // Debug: Let's see what we're actually getting
  console.log("Current locale:", locale);
  console.log("Using columns:", questionColumn, answerColumn, categoryColumn);
  if (formattedFaqs.length > 0) {
    console.log("Sample formatted FAQ:", formattedFaqs[0]);
  }
  
  const breadcrumbItems = [
    { name: tNav("home"), href: `/${locale}` },
    { name: t('title'), href: `/${locale}/hasta-rehberi` }
  ];
  

  return (
    <>
      <section className="w-full bg-secondary py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl font-bold text-primary">{t('title')}</h1>
          <p className="font-sans text-lg text-text-light mt-4 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 pt-16">
          <Breadcrumbs items={breadcrumbItems} />
      </div>

      <section className="w-full bg-white pt-6 pb-20">
        <PatientJourneyMap />
      </section>
      
      <section className="w-full bg-gradient-to-b from-white to-primary-lightest py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-primary mb-4">
              {t('gettingStartedTitle')}
            </h2>
            <p className="font-sans text-lg text-text-light">
              {t('gettingStartedDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="font-serif text-2xl font-bold text-text-main mb-6">{t('documentsTitle')}</h3>
              <ul className="space-y-4 font-sans text-text-light">
                {t.raw('documentsList').map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3"><span className="text-primary mt-1">✔</span><span>{item}</span></li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="font-serif text-2xl font-bold text-text-main mb-6">{t('notesTitle')}</h3>
              <ul className="space-y-4 font-sans text-text-light">
                {t.raw('notesList').map((item: string, index: number) => (
                   <li key={index} className="flex items-start gap-3"><span className="text-accent mt-1">!</span><span>{item}</span></li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-12 font-sans text-sm text-gray-500 italic">
            <p>{t('finalNote')}</p>
          </div>
        </div>
      </section>

      <section className="w-full bg-gradient-to-b from-white to-primary-lightest py-20">
        <PatientCalculators />
      </section>

      {/* Pass the correctly formatted, translated FAQs to the component */}
      {formattedFaqs.length > 0 && <FaqSection faqs={formattedFaqs} />}
    </>
  );
}