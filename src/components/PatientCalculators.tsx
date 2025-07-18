'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import Button from '@/components/Button';
import AnimatedSection from '@/components/AnimatedSection';
import { Calculator, Calendar as CalendarIcon, HelpCircle, X } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { tr } from 'date-fns/locale';
import { format } from 'date-fns';
import { clsx } from 'clsx';

// Animation variants for staggered items
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
};

// --- Reusable Info Modal ---
function InfoPopup({ content, onClose }: { content: { title: string; body: string; }; onClose: () => void; }) {
  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"><X size={24} /></button>
        <h3 className="font-serif text-2xl text-primary mb-4">{content.title}</h3>
        <p className="font-sans text-text-light" dangerouslySetInnerHTML={{ __html: content.body }} />
      </div>
    </div>
  );
}

// --- Validation Schemas ---
const commonSchema = {
  lmp: z.date({ required_error: "Tarih seçmek zorunludur." }),
  cycleLength: z.number({ invalid_type_error: "Sayı girin."}).min(20, "Döngü 20 günden kısa olamaz.").max(50, "Döngü 50 günden uzun olamaz."),
};
const dueDateSchema = z.object(commonSchema);
type DueDateInputs = z.infer<typeof dueDateSchema>;
const ovulationSchema = z.object(commonSchema);
type OvulationInputs = z.infer<typeof ovulationSchema>;

// --- Reusable Date Picker Component ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DatePickerField({ control, name, id }: { control: any, name: string, id?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Controller name={name} control={control}
      render={({ field }) => (
        <div className="relative">
          <button
            type="button"
            id={id}
            className={clsx("w-full rounded-md border border-gray-300 shadow-sm bg-white px-3 py-2 text-left font-sans flex justify-between items-center h-10", "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary", !field.value && "text-gray-500")}
            onClick={() => setIsOpen(!isOpen)}
          >
            {field.value ? format(field.value, 'PPP', { locale: tr }) : <span>Tarih seçin...</span>}
            <CalendarIcon className="h-4 w-4 text-gray-400" />
          </button>
          {isOpen && (
            <><div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} /><div className="absolute z-20 mt-2 bg-white rounded-md shadow-lg border">
              <DayPicker mode="single" selected={field.value} onSelect={(date) => { field.onChange(date); setIsOpen(false); }} initialFocus locale={tr} />
            </div></>
          )}
        </div>
      )}
    />
  );
}

export default function PatientCalculators() {
  const [dueDateResult, setDueDateResult] = useState('');
  const [fertileWindowResult, setFertileWindowResult] = useState('');
  const [activeInfo, setActiveInfo] = useState<{ title: string; body: string; } | null>(null);

  const { control: dueDateControl, handleSubmit: handleDueDateSubmit, formState: { errors: dueDateErrors } } = useForm<DueDateInputs>({
    resolver: zodResolver(dueDateSchema), defaultValues: { cycleLength: 28 }
  });
  const { control: ovulationControl, handleSubmit: handleOvulationSubmit, formState: { errors: ovulationErrors } } = useForm<OvulationInputs>({
    resolver: zodResolver(ovulationSchema), defaultValues: { cycleLength: 28 }
  });

  const onDueDateSubmit = (data: DueDateInputs) => {
    const dueDateCalc = new Date(data.lmp);
    dueDateCalc.setMonth(dueDateCalc.getMonth() + 9);
    dueDateCalc.setDate(dueDateCalc.getDate() + (data.cycleLength - 21));
    setDueDateResult(dueDateCalc.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }));
  };

  const onOvulationSubmit = (data: OvulationInputs) => {
    const ovulationDate = new Date(data.lmp);
    ovulationDate.setDate(ovulationDate.getDate() + data.cycleLength - 14);
    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(fertileStart.getDate() - 4);
    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(fertileEnd.getDate() + 1);
    setFertileWindowResult(`${fertileStart.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })} - ${fertileEnd.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}`);
  };

  const infoContent = {
    dueDate: {
      title: "Doğum Tarihi Hesaplayıcı",
      body: "Bu araç, son adet tarihinize (SAT) ve ortalama adet döngüsü uzunluğunuza dayanarak tahmini doğum tarihinizi hesaplamak için geliştirilmiş <strong>Parikh Formülünü</strong> kullanır. Bu, standart 28 günlük döngüye sahip olmayan kadınlar için daha doğru bir sonuç sağlar."
    },
    ovulation: {
      title: "Yumurtlama Günü Hesaplayıcı",
      body: "Bu araç, yumurtlamanın genellikle bir sonraki adet döneminden <strong>14 gün önce</strong> gerçekleştiği ilkesine dayanarak çalışır. Girdiğiniz son adet tarihi ve döngü uzunluğuna göre en verimli olduğunuz günleri tahmin eder."
    }
  }

  return (
    <>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-text-main mb-4 flex items-center justify-center gap-3">
            <Calculator className="text-accent" size={36} /> Faydalı Araçlar
          </h2>
        </div>
        <AnimatedSection tag="div" className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
          <motion.div className="bg-gradient-to-b from-white to-primary-lightest p-8 rounded-lg shadow-sm" variants={itemVariants}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-2xl font-bold text-text-main">Tahmini Doğum Tarihi Hesaplayıcı</h3>
              <button onClick={() => setActiveInfo(infoContent.dueDate)} className="text-gray-400 hover:text-primary"><HelpCircle size={20} /></button>
            </div>
            <form onSubmit={handleDueDateSubmit(onDueDateSubmit)} className="space-y-6">
              <div className="min-h-[95px]"><label htmlFor="dueDateLmp" className="font-sans text-sm font-bold text-text-light mb-2 block">Son Adet Tarihiniz (SAT)</label><DatePickerField control={dueDateControl} name="lmp" id="dueDateLmp" />{dueDateErrors.lmp && <p className="text-red-600 text-sm mt-1">{dueDateErrors.lmp.message}</p>}</div>
              <div className="min-h-[95px]"><label htmlFor="dueDateCycle" className="font-sans text-sm font-bold text-text-light mb-2 block">Adet Döngüsü Uzunluğu (gün)</label><Controller name="cycleLength" control={dueDateControl} render={({ field }) => (<input type="number" {...field} id="dueDateCycle" onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary h-10 px-3" />)} />{dueDateErrors.cycleLength && <p className="text-red-600 text-sm mt-1">{dueDateErrors.cycleLength.message}</p>}</div>
              <Button type="submit" variant="primary" className="w-full">Hesapla</Button>
            </form>
            <div className="bg-white p-4 rounded-md text-center mt-6 min-h-[95px] flex flex-col justify-center">{dueDateResult && (<><p className="font-sans text-text-light">Tahmini Doğum Tarihi:</p><p className="font-serif text-xl font-bold text-primary">{dueDateResult}</p></>)}</div>
          </motion.div>
          <motion.div className="bg-gradient-to-b from-white to-primary-lightest p-8 rounded-lg shadow-sm" variants={itemVariants}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-2xl font-bold text-text-main">Yumurtlama Günü Hesaplayıcı</h3>
              <button onClick={() => setActiveInfo(infoContent.ovulation)} className="text-gray-400 hover:text-primary"><HelpCircle size={20} /></button>
            </div>
            <form onSubmit={handleOvulationSubmit(onOvulationSubmit)} className="space-y-6">
              <div className="min-h-[95px]"><label htmlFor="ovulationLmp" className="font-sans text-sm font-bold text-text-light mb-2 block">Son Adet Tarihiniz (SAT)</label><DatePickerField control={ovulationControl} name="lmp" id="ovulationLmp" />{ovulationErrors.lmp && <p className="text-red-600 text-sm mt-1">{ovulationErrors.lmp.message}</p>}</div>
              <div className="min-h-[95px]"><label htmlFor="ovulationCycle" className="font-sans text-sm font-bold text-text-light mb-2 block">Adet Döngüsü Uzunluğu (gün)</label><Controller name="cycleLength" control={ovulationControl} render={({ field }) => (<input type="number" {...field} id="ovulationCycle" onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary h-10 px-3" />)} />{ovulationErrors.cycleLength && <p className="text-red-600 text-sm mt-1">{ovulationErrors.cycleLength.message}</p>}</div>
              <Button type="submit" variant="primary" className="w-full">Hesapla</Button>
            </form>
            <div className="bg-white p-4 rounded-md text-center mt-6 min-h-[95px] flex flex-col justify-center">{fertileWindowResult && (<><p className="font-sans text-text-light">Tahmini Doğurganlık Pencereniz:</p><p className="font-serif text-xl font-bold text-primary">{fertileWindowResult}</p><p className="text-xs text-gray-400 mt-2">Bu hesaplama bir tahmindir. Kesin sonuçlar için ovulasyon test kitleri veya doktor muayenesi önerilir.</p></>)}</div>
          </motion.div>
        </AnimatedSection>
      </div>
      {activeInfo && <InfoPopup content={activeInfo} onClose={() => setActiveInfo(null)} />}
    </>
  );
} 