'use client';

import { useState } from 'react';
import { Stethoscope, FlaskConical, TestTube, Syringe, Microscope, HeartHandshake, FileCheck, Baby, Activity } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

// --- Updated and Expanded Data for Both Journeys ---
const infertilityJourney = [
  { icon: <HeartHandshake size={28} />, title: "İlk Danışma & Anamnez", description: "Hikayenizi dinliyor, yaşam tarzınızı ve medikal geçmişinizi detaylıca anlıyoruz." },
  { icon: <FileCheck size={28} />, title: "Kadın & Erkek Değerlendirmesi", description: "Hormon testleri, ultrasonografi ve sperm analizi ile kapsamlı bir sağlık taraması yapıyoruz." },
  { icon: <Stethoscope size={28} />, title: "Tanı ve Sonuç Değerlendirme", description: "Test sonuçlarınıza göre infertilite nedenini belirliyor ve size özel olası tedavi yollarını çiziyoruz." },
  { icon: <FlaskConical size={28} />, title: "Tedavi Planlaması", description: "Aşılama (IUI) veya Tüp Bebek (IVF) gibi size en uygun yönteme birlikte karar veriyoruz." },
];

const ivfJourney = [
  { icon: <Syringe size={28} />, title: "1. Adım: Yumurtalıkların Uyarılması", description: "Yaklaşık 10-12 gün süren hormon iğneleri ile çok sayıda kaliteli yumurta elde etmeyi amaçlıyoruz." },
  { icon: <TestTube size={28} />, title: "2. Adım: Yumurta Toplama (OPU)", description: "Hafif anestezi altında, olgunlaşan yumurtalarınızı 15-20 dakikalık bir işlemle topluyoruz." },
  { icon: <Microscope size={28} />, title: "3. Adım: Döllenme & Embriyo Gelişimi", description: "Toplanan yumurtalar ile sperm hücrelerini laboratuvarda birleştirerek embriyo gelişimini takip ediyoruz." },
  { icon: <Baby size={28} />, title: "4. Adım: Embriyo Transferi", description: "En kaliteli embriyoyu seçerek, ağrısız ve basit bir işlemle rahminize yerleştiriyoruz." },
  { icon: <Activity size={28} />, title: "5. Adım: Gebelik Testi", description: "Transferden yaklaşık 12 gün sonra kanda gebelik testi (Beta-hCG) yaparak sonucunu heyecanla bekliyoruz." },
];

// --- Reusable Card Component (Unchanged) ---
const JourneyCard = ({ item }: { item: typeof infertilityJourney[0] }) => (
    <div className="bg-gradient-to-b from-white to-primary-lightest p-6 rounded-lg shadow-md flex items-center gap-6 w-full">
      <div className="text-primary flex-shrink-0">{item.icon}</div>
      <div>
        <h3 className="font-serif text-xl font-bold text-text-main text-left">{item.title}</h3>
        <p className="font-sans text-text-light text-left">{item.description}</p>
      </div>
    </div>
  );

// --- NEW Vertical Flowchart Component ---
const JourneyFlowchart = ({ steps }: { steps: typeof infertilityJourney }) => (
  <motion.div
    key={steps.length} // Use key to trigger animation on change
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center w-full md:w-2/3 lg:w-1/2 mx-auto"
  >
    {steps.map((step, index) => (
      <div key={index} className="flex flex-col items-center w-full">
        <JourneyCard item={step} />
        {/* Don't show a connector after the last item */}
        {index < steps.length - 1 && (
          <div className="h-12 w-px bg-gray-300 my-4"></div>
        )}
      </div>
    ))}
  </motion.div>
);


export default function PatientJourneyMap() {
  const [activeTab, setActiveTab] = useState<'infertility' | 'ivf'>('infertility');

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl font-bold text-primary mb-4">
          Tedavi Yolculuğunuz
        </h2>
        <p className="font-sans text-lg text-text-light max-w-2xl mx-auto">
          Her hastamızın hikayesi ve ihtiyaçları farklıdır. Size en uygun tedavi yolunu birlikte çizelim.
        </p>
      </div>

      {/* --- Tab Selector (Unchanged) --- */}
      <div className="flex justify-center border-b border-gray-200 mb-12">
        <button onClick={() => setActiveTab('infertility')} className={clsx("font-serif text-lg px-6 py-3 transition-all duration-200", activeTab === 'infertility' ? 'border-b-2 border-primary text-primary' : 'text-text-light hover:text-primary')}>
          İnfertilite Değerlendirmesi
        </button>
        <button onClick={() => setActiveTab('ivf')} className={clsx("font-serif text-lg px-6 py-3 transition-all duration-200", activeTab === 'ivf' ? 'border-b-2 border-primary text-primary' : 'text-text-light hover:text-primary')}>
          Tüp Bebek (IVF) Süreci
        </button>
      </div>

      {/* --- Display Active Timeline --- */}
      <AnimatePresence mode="wait">
        {activeTab === 'infertility' && <JourneyFlowchart steps={infertilityJourney} />}
        {activeTab === 'ivf' && <JourneyFlowchart steps={ivfJourney} />}
      </AnimatePresence>
    </div>
  );
} 