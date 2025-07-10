'use client';

import { useState, useEffect } from 'react';
import { Stethoscope, FlaskConical, TestTube, Syringe, Microscope, HeartHandshake, FileCheck, Baby, Activity, X } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

// --- Type definitions ---
interface JourneyStep {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// --- Data for Both Journeys from the Brochure ---
const infertilityJourney: JourneyStep[] = [
  { icon: <HeartHandshake size={28} />, title: "İlk Danışma & Anamnez", description: "Her iki eşe eş zamanlı olarak medikal öykü alınır, jinekolojik muayene yapılır ve tedavi süreci planlanır." },
  { icon: <FileCheck size={28} />, title: "Kadın & Erkek Değerlendirmesi", description: "Kadın için AMH, kan sayımı, tiroid testleri ve papsmear; erkek için ise sperm analizi gibi temel testler istenir. Gerekirse rahim filmi (HSG) veya ileri cerrahi (histeroskopi/laparoskopi) planlanır." },
  { icon: <Stethoscope size={28} />, title: "Tanı ve Sonuç Değerlendirme", description: "Test sonuçlarına göre infertilite nedeni (yumurtlama sorunları, tüp faktörü, erkek faktörü vb.) belirlenir ve size özel tedavi yol haritası çizilir." },
  { icon: <FlaskConical size={28} />, title: "Tedavi Planlaması", description: "Aşılama (IUI) veya Tüp Bebek (IVF) gibi size en uygun yönteme, başarı oranları ve bireysel durumunuz göz önünde bulundurularak birlikte karar verilir." },
];

const ivfJourney: JourneyStep[] = [
  { icon: <Syringe size={28} />, title: "1. Adım: Yumurtalıkların Uyarılması", description: "Genellikle adetin 2. veya 3. günü başlanan ve yaklaşık 8-12 gün süren hormon iğneleri ile çok sayıda kaliteli yumurta (follikül) geliştirmeyi amaçlıyoruz. Süreç, ultrason ve hormon testleriyle yakından takip edilir." },
  { icon: <TestTube size={28} />, title: "2. Adım: Yumurta Toplama (OPU)", description: "Folliküller yeterli büyüklüğe ulaştığında, olgunlaştırma iğnesi yapılır ve 35-37 saat sonra, hafif anestezi altında 15-20 dakikalık bir işlemle yumurtalar toplanır." },
  { icon: <Microscope size={28} />, title: "3. Adım: Döllenme & Embriyo Gelişimi", description: "Laboratuvarda toplanan yumurtalar, mikroenjeksiyon (ICSI) yöntemiyle sperm hücreleriyle döllenir. Döllenmiş embriyolar, 3 ila 5 gün boyunca özel inkübatörlerde (Embriyoskop) gelişimleri takip edilerek izlenir." },
  { icon: <Baby size={28} />, title: "4. Adım: Embriyo Transferi", description: "En kaliteli embriyo veya embriyolar seçilerek, ağrısız ve basit bir işlemle, ultrason eşliğinde rahim içine yerleştirilir. Bu aşamada embriyo yapıştırıcı (embryo glue) gibi ek yöntemler kullanılabilir." },
  { icon: <Activity size={28} />, title: "5. Adım: Gebelik Testi", description: "Embriyo transferinden 12-14 gün sonra kanda gebelik testi (Beta-hCG) yapılarak sonucun pozitif olup olmadığı öğrenilir. Pozitif sonuç durumunda gebelik takibi başlar." },
];

// --- Reusable Info Modal for Journey Steps ---
function JourneyStepModal({ item, onClose }: { item: JourneyStep | null; onClose: () => void; }) {
  if (!item) return null;
  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg shadow-2xl w-full max-w-lg p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"><X size={24} /></button>
        <div className="flex items-center gap-4 mb-4">
          <div className="text-primary">{item.icon}</div>
          <h2 className="font-serif text-3xl font-bold text-primary">{item.title}</h2>
        </div>
        <p className="font-sans text-text-light leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
}


export default function PatientJourneyMap() {
  const [activeTab, setActiveTab] = useState<'infertility' | 'ivf'>('infertility');
  const [selectedStep, setSelectedStep] = useState<JourneyStep | null>(null);

  // Detect URL hash on component mount and set appropriate tab
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#ivf-journey') {
      setActiveTab('ivf');
    } else if (hash === '#infertility-journey') {
      setActiveTab('infertility');
    }
  }, []);

  const JourneyCard = ({ item }: { item: JourneyStep }) => (
    <button onClick={() => setSelectedStep(item)} className="bg-gradient-to-b from-white to-primary-lightest p-6 rounded-lg shadow-md flex items-center gap-6 w-full text-left hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <div className="text-primary flex-shrink-0">{item.icon}</div>
      <div>
        <h3 className="font-serif text-xl font-bold text-text-main">{item.title}</h3>
      </div>
    </button>
  );

  const JourneyFlowchart = ({ steps }: { steps: JourneyStep[] }) => (
    <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="flex flex-col items-center w-full md:w-2/3 lg:w-1/2 mx-auto">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center w-full">
          <JourneyCard item={step} />
          {index < steps.length - 1 && (<div className="h-12 w-px bg-gray-300 my-2"></div>)}
        </div>
      ))}
    </motion.div>
  );

  return (
    <>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-primary mb-4">Tedavi Yolculuğunuz</h2>
          <p className="font-sans text-lg text-text-light max-w-2xl mx-auto">Her hastamızın hikayesi ve ihtiyaçları farklıdır. Size en uygun tedavi yolunu birlikte çizelim.</p>
        </div>
        <div className="flex justify-center border-b border-gray-200 mb-12">
          <button onClick={() => setActiveTab('infertility')} className={clsx("font-serif text-lg px-6 py-3 transition-all duration-200", activeTab === 'infertility' ? 'border-b-2 border-primary text-primary' : 'text-text-light hover:text-primary')}>İnfertilite Değerlendirmesi</button>
          <button onClick={() => setActiveTab('ivf')} className={clsx("font-serif text-lg px-6 py-3 transition-all duration-200", activeTab === 'ivf' ? 'border-b-2 border-primary text-primary' : 'text-text-light hover:text-primary')}>Tüp Bebek (IVF) Süreci</button>
        </div>
        <AnimatePresence mode="wait">
          <motion.div id={activeTab === 'infertility' ? 'infertility-journey' : 'ivf-journey'}>
            {activeTab === 'infertility' && <JourneyFlowchart steps={infertilityJourney} />}
            {activeTab === 'ivf' && <JourneyFlowchart steps={ivfJourney} />}
          </motion.div>
        </AnimatePresence>
      </div>
      <JourneyStepModal item={selectedStep} onClose={() => setSelectedStep(null)} />
    </>
  );
} 