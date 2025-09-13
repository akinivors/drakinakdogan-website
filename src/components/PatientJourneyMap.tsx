// Path: src/components/PatientJourneyMap.tsx (Fully Refactored)

'use client';

import { useState } from 'react';
import { Stethoscope, FlaskConical, TestTube, Syringe, Microscope, HeartHandshake, FileCheck, Baby, Activity, X } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface JourneyStep {
  icon: React.ReactNode;
  title: string;
  description: string;
}

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
  const t = useTranslations('PatientGuidePage');
  const [activeTab, setActiveTab] = useState<'infertility' | 'ivf'>('infertility');
  const [selectedStep, setSelectedStep] = useState<JourneyStep | null>(null);

  const infertilityJourney: JourneyStep[] = [
    { icon: <HeartHandshake size={28} />, title: t('infertilityStep1Title'), description: t('infertilityStep1Description') },
    { icon: <FileCheck size={28} />, title: t('infertilityStep2Title'), description: t('infertilityStep2Description') },
    { icon: <Stethoscope size={28} />, title: t('infertilityStep3Title'), description: t('infertilityStep3Description') },
    { icon: <FlaskConical size={28} />, title: t('infertilityStep4Title'), description: t('infertilityStep4Description') },
  ];

  const ivfJourney: JourneyStep[] = [
    { icon: <Syringe size={28} />, title: t('ivfStep1Title'), description: t('ivfStep1Description') },
    { icon: <TestTube size={28} />, title: t('ivfStep2Title'), description: t('ivfStep2Description') },
    { icon: <Microscope size={28} />, title: t('ivfStep3Title'), description: t('ivfStep3Description') },
    { icon: <Baby size={28} />, title: t('ivfStep4Title'), description: t('ivfStep4Description') },
    { icon: <Activity size={28} />, title: t('ivfStep5Title'), description: t('ivfStep5Description') },
  ];

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
          <h2 className="font-serif text-4xl font-bold text-primary mb-4">{t('journeyTitle')}</h2>
          <p className="font-sans text-lg text-text-light max-w-2xl mx-auto">{t('journeyDescription')}</p>
        </div>
        <div className="flex justify-center border-b border-gray-200 mb-12">
          <button onClick={() => setActiveTab('infertility')} className={clsx("font-serif text-lg px-6 py-3 transition-all duration-200", activeTab === 'infertility' ? 'border-b-2 border-primary text-primary' : 'text-text-light hover:text-primary')}>{t('tabInfertility')}</button>
          <button onClick={() => setActiveTab('ivf')} className={clsx("font-serif text-lg px-6 py-3 transition-all duration-200", activeTab === 'ivf' ? 'border-b-2 border-primary text-primary' : 'text-text-light hover:text-primary')}>{t('tabIvf')}</button>
        </div>
        <AnimatePresence mode="wait">
          <motion.div>
            {activeTab === 'infertility' && <JourneyFlowchart steps={infertilityJourney} />}
            {activeTab === 'ivf' && <JourneyFlowchart steps={ivfJourney} />}
          </motion.div>
        </AnimatePresence>
      </div>
      <JourneyStepModal item={selectedStep} onClose={() => setSelectedStep(null)} />
    </>
  );
}