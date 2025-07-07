'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Phone, Mail, MapPin, Loader2, CheckCircle, AlertTriangle, HelpCircle, X } from 'lucide-react';
import Button from '@/components/Button';

// Updated schema with separate countryCode and phoneNumber
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Ad Soyad en az 2 karakter olmalıdır." }),
  email: z.string().email({ message: "Lütfen geçerli bir e-posta adresi girin." }),
  countryCode: z.string().min(2, { message: "Kod gerekli."}).regex(/^\+[0-9]+$/, { message: "+## formatı"}),
  phoneNumber: z.string().min(7, { message: "Numara eksik." }),
  message: z.string().min(10, { message: "Mesajınız en az 10 karakter olmalıdır." }),
});

type ContactFormInputs = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isInfoVisible, setInfoVisible] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
        countryCode: "+90" // Default to Turkey&apos;s country code
    }
  });

  const onSubmit = async (data: ContactFormInputs) => {
    setFormState('loading');
    setErrorMessage('');

    // Combine the phone number fields before sending
    const submissionData = {
        ...data,
        phone: `${data.countryCode} ${data.phoneNumber}`
    };

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) { throw new Error('Sunucu hatası. Lütfen daha sonra tekrar deneyin.'); }
      
      setFormState('success');
      reset();

    } catch (error: unknown) {
      setFormState('error');
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Bilinmeyen bir hata oluştu.');
      }
    }
  };

  return (
    <>
      {/* Section 1: Page Header */}
      <section className="w-full bg-white pt-16 pb-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl font-bold text-primary">İletişim Kurun</h1>
          <p className="font-sans text-lg text-text-light mt-4 max-w-2xl mx-auto">Sorularınız, randevu talepleriniz veya diğer konular için bize aşağıdaki bilgilerden ulaşabilirsiniz.</p>
        </div>
      </section>

      {/* Section 2: Info, Hours, and Form Grid (The Balanced Layout) */}
      <section className="w-full bg-white pb-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-b from-white to-primary-lightest p-8 rounded-lg">
                <h2 className="font-serif text-2xl font-bold text-text-main mb-6">İletişim Bilgileri</h2>
                <div className="space-y-4">
                    <div className="flex items-start gap-4"><MapPin size={24} className="text-primary flex-shrink-0 mt-1" /><span className="font-sans text-text-light">Yeni Girne Bulvarı, 1825. Sk. No:12, 35575 Karşıyaka/İzmir</span></div>
                    <div className="flex items-center gap-4"><Phone size={20} className="text-primary" /><span className="font-sans text-text-light">+90 (555) 123 45 67</span></div>
                    <div className="flex items-center gap-4"><Mail size={20} className="text-primary" /><span className="font-sans text-text-light">info@drakinakdogan.com</span></div>
                </div>
            </div>
            
            <div className="bg-gradient-to-b from-white to-primary-lightest p-8 rounded-lg">
                <h2 className="font-serif text-2xl font-bold text-text-main mb-6">Çalışma Saatleri</h2>
                <div className="space-y-3 font-sans text-text-light">
                    <div className="flex justify-between border-b border-gray-300 pb-2"><span>Pazartesi - Cuma</span><span className="font-medium">09:00 - 18:00</span></div>
                    <div className="flex justify-between border-b border-gray-300 pb-2"><span>Cumartesi</span><span className="font-medium">10:00 - 14:00</span></div>
                    <div className="flex justify-between"><span>Pazar</span><span className="font-medium text-accent">Kapalı</span></div>
                </div>
            </div>
            
            <div id="form" className="bg-gradient-to-b from-white to-primary-lightest p-8 rounded-lg">
              <h2 className="font-serif text-2xl font-bold text-text-main mb-6">Bize Mesaj Gönderin</h2>
              {formState === 'success' ? (
                <div className="text-center p-4 bg-green-100 text-green-800 rounded-lg flex flex-col items-center justify-center h-full">
                  <CheckCircle className="h-12 w-12 mb-4" />
                  <h3 className="font-serif text-xl font-bold">Mesajınız başarıyla gönderildi!</h3>
                  <p className="mt-2 text-sm">En kısa sürede size geri dönüş yapacağız.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Name Field */}
                  <div className="relative">
                    <input 
                      {...register('name')} 
                      type="text" 
                      id="name"
                      className="block w-full rounded-md border-gray-300 shadow-sm px-3 py-3 text-text-main bg-white peer focus:border-primary focus:ring-primary placeholder-transparent"
                      placeholder="Ad Soyad" 
                    />
                    <label 
                      htmlFor="name" 
                      className="absolute left-3 -top-2.5 bg-secondary px-1 text-sm text-text-light transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
                    >
                      Ad Soyad
                    </label>
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <input 
                      {...register('email')} 
                      type="email" 
                      id="email" 
                      className="block w-full rounded-md border-gray-300 shadow-sm px-3 py-3 text-text-main bg-white peer focus:border-primary focus:ring-primary placeholder-transparent"
                      placeholder="E-posta Adresi"
                    />
                    <label 
                      htmlFor="email" 
                      className="absolute left-3 -top-2.5 bg-secondary px-1 text-sm text-text-light transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
                    >
                      E-posta Adresi
                    </label>
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                  </div>
                  
                  {/* Phone Number Field */}
                  <div>
                    <div className="flex gap-2">
                      {/* Country Code */}
                      <div className="relative w-1/4">
                        <input 
                          {...register('countryCode')} 
                          type="tel" 
                          id="countryCode" 
                          className="block w-full rounded-md border-gray-300 shadow-sm px-3 py-3 text-text-main bg-white peer focus:border-primary focus:ring-primary placeholder-transparent"
                          placeholder="Kod"
                        />
                        <label 
                          htmlFor="countryCode" 
                          className="absolute left-3 -top-2.5 bg-secondary px-1 text-sm text-text-light transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
                        >
                          Kod
                        </label>
                      </div>
                      {/* Phone Number */}
                      <div className="relative w-3/4">
                        <input 
                          {...register('phoneNumber')} 
                          type="tel" 
                          id="phoneNumber"
                          className="block w-full rounded-md border-gray-300 shadow-sm px-3 py-3 text-text-main bg-white peer focus:border-primary focus:ring-primary placeholder-transparent"
                          placeholder="Telefon Numarası"
                        />
                        <label 
                          htmlFor="phoneNumber" 
                          className="absolute left-3 -top-2.5 bg-secondary px-1 text-sm text-text-light transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
                        >
                          Telefon Numarası
                        </label>
                      </div>
                    </div>
                    {(errors.countryCode || errors.phoneNumber) && <p className="mt-1 text-sm text-red-600">{errors.countryCode?.message || errors.phoneNumber?.message}</p>}
                  </div>

                  {/* Message Field */}
                  <div className="relative">
                    <div className="flex justify-end absolute -top-3 right-3">
                        <button type="button" onClick={() => setInfoVisible(true)} className="text-gray-400 hover:text-primary"><HelpCircle size={16} /></button>
                    </div>
                    <textarea 
                      {...register('message')} 
                      id="message" 
                      rows={5} 
                      className="block w-full rounded-md border-gray-300 shadow-sm px-3 py-3 text-text-main bg-white peer focus:border-primary focus:ring-primary placeholder-transparent"
                      placeholder="Mesajınız"
                    ></textarea>
                     <label 
                      htmlFor="message" 
                      className="absolute left-3 -top-2.5 bg-secondary px-1 text-sm text-text-light transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
                    >
                      Mesajınız
                    </label>
                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
                  </div>
                  
                  <div>
                    <Button type="submit" variant="primary" className="w-full" disabled={formState === 'loading'}>
                      {formState === 'loading' ? <Loader2 className="mx-auto animate-spin" /> : 'Gönder'}
                    </Button>
                  </div>
                  {formState === 'error' && <div className="text-red-600 flex items-center gap-2"><AlertTriangle size={16} />{errorMessage}</div>}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Full-Width Map */}
      <section className="w-full h-96"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11154.842329601834!2d27.0972082289955!3d38.47535426031171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd9d85530f323%3A0xf4e3a7e795bf6df7!2sMedical%20Point!5e0!3m2!1str!2str!4v1751388098424!5m2!1str!2str" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-full"></iframe></section>

      {/* Info Tooltip Modal */}
      {isInfoVisible && (
        <div onClick={() => setInfoVisible(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8 relative">
            <button onClick={() => setInfoVisible(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"><X size={24} /></button>
            <h3 className="font-serif text-2xl text-primary mb-4">Mesaj Bilgilendirmesi</h3>
            <p className="font-sans text-text-light">Bu form aracılığıyla gönderdiğiniz mesaj doğrudan Dr. Ayşin Akdoğan&apos;ın ekibine iletilir. Size en kısa sürede belirttiğiniz e-posta adresi ve telefon numarası üzerinden geri dönüş yapılacaktır.</p>
          </div>
        </div>
      )}
    </>
  );
} 