import { Metadata } from 'next';
import { supabase } from '@/lib/supabaseClient';
import PatientCalculators from '@/components/PatientCalculators';
import PatientJourneyMap from '@/components/PatientJourneyMap';
import FaqSection from '@/components/FaqSection';
import Breadcrumbs from '@/components/Breadcrumbs'; // --- 1. Import the Breadcrumbs component ---

// Define schema types for clarity
type FaqSchema = { "@type": "FAQPage"; "mainEntity": Array<{ "@type": "Question"; "name": string; "acceptedAnswer": { "@type": "Answer"; "text": string; }; }>; };
type BreadcrumbSchema = { "@type": "BreadcrumbList"; "itemListElement": Array<{ "@type": "ListItem"; "position": number; "name": string; "item": string; }>; };

export const metadata: Metadata = {
  title: "Hasta Rehberi & Sıkça Sorulan Sorular | Dr. Ayşin Akdoğan",
  description: "Tüp bebek tedavi süreci, maliyetler ve teknik detaylar hakkında sıkça sorulan soruların yanıtları. Tedavi yolculuğunuza bilinçli başlayın."
};

export default async function HastaRehberiPage() {
  const { data: faqs, error } = await supabase
    .from('faqs')
    .select('question, answer, category')
    .order('id', { ascending: true });

  if (error || !faqs) {
    console.error("Could not fetch FAQs:", error);
  }
  
  // --- 2. Define the breadcrumb path for this specific page ---
  const breadcrumbItems = [
    { name: "Anasayfa", href: "/" },
    { name: "Hasta Rehberi", href: "/hasta-rehberi" }
  ];

  // --- 3. Create the schema for BOTH Breadcrumbs and FAQs ---
  const breadcrumbSchema: BreadcrumbSchema = {
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://www.draysinakdogan.com${item.href}`
    }))
  };

  const faqSchema: FaqSchema = {
    "@type": "FAQPage",
    "mainEntity": faqs ? faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
    })) : []
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, faqSchema] // Add both schemas to the graph
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="w-full bg-secondary py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl font-bold text-primary">Hasta Rehberi</h1>
          <p className="font-sans text-lg text-text-light mt-4 max-w-3xl mx-auto">
            Tedavi sürecinizle ilgili kaynaklar, araçlar ve sıkça sorulan soruların yanıtları.
          </p>
        </div>
      </section>

      {/* --- 4. Add the visible Breadcrumbs component --- */}
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
              Tedaviye Başlarken
            </h2>
            <p className="font-sans text-lg text-text-light">
              Tedavinizde herhangi bir aksama olmaması için lütfen aşağıdaki adımları dikkatlice takip ediniz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="font-serif text-2xl font-bold text-text-main mb-6">Gerekli Belgeler</h3>
              <ul className="space-y-4 font-sans text-text-light">
                <li className="flex items-start gap-3"><span className="text-primary mt-1">✔</span><span>Nüfus cüzdan fotokopileri</span></li>
                <li className="flex items-start gap-3"><span className="text-primary mt-1">✔</span><span>Evlilik cüzdanı fotokopisi</span></li>
                <li className="flex items-start gap-3"><span className="text-primary mt-1">✔</span><span>Çiftlere ait birer adet vesikalık fotoğraf</span></li>
                <li className="flex items-start gap-3"><span className="text-primary mt-1">✔</span><span>Kliniğimizde okunup imzalanacak olan rıza formları</span></li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="font-serif text-2xl font-bold text-text-main mb-6">Önemli Notlar</h3>
              <ul className="space-y-4 font-sans text-text-light">
                <li className="flex items-start gap-3"><span className="text-accent mt-1">!</span><span>Size verilen muayene randevularına uyunuz.</span></li>
                <li className="flex items-start gap-3"><span className="text-accent mt-1">!</span><span>Önerilen ilaç ve diğer uygulamaları titizlikle yerine getiriniz.</span></li>
                <li className="flex items-start gap-3"><span className="text-accent mt-1">!</span><span>İlaçlarınızı tedaviden önce temin etmeniz önemlidir.</span></li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-12 font-sans text-sm text-gray-500 italic">
            <p>Unutmayın; tüm çabamız sağlıklı bir gebeliğe ulaşmanız içindir. Her türlü bilgilendirme hakkınıza saygılı bir &apos;Hasta Dostu&apos; tedavi politikası izlemek bizim için önemlidir.</p>
          </div>
        </div>
      </section>

      <section className="w-full bg-gradient-to-b from-white to-primary-lightest py-20">
        <PatientCalculators />
      </section>

      {faqs && <FaqSection faqs={faqs} />}
    </>
  );
} 