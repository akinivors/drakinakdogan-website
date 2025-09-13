// Path: src/app/[lang]/iletisim/ContactPageClient.tsx (Corrected Version)

'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, ReactNode } from 'react';
import { Phone, Mail, MapPin, CheckCircle, HelpCircle, X, Clock, Calendar, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Button from '@/components/Button';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

const formatPhoneNumber = (value: string) => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  }
  if (phoneNumberLength < 9) {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
  }
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 8)}-${phoneNumber.slice(8, 10)}`;
};

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Ad Soyad en az 2 karakter olmalıdır." }),
  email: z.string().email({ message: "Lütfen geçerli bir e-posta adresi girin." }),
  countryCode: z.string().min(2, { message: "Kod gerekli."}).regex(/^\+[0-9]+$/, { message: "+## formatı"}),
  phoneNumber: z.string().min(10, { message: "Lütfen 10 haneli bir numara girin." }),
  message: z.string().min(10, { message: "Mesajınız en az 10 karakter olmalıdır." }),
});

type ContactFormInputs = z.infer<typeof contactFormSchema>;

export default function ContactPageClient() {
  const t = useTranslations('ContactPage');
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isMessageInfoVisible, setMessageInfoVisible] = useState(false);
  const [isTopInfoVisible, setTopInfoVisible] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, control } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { countryCode: "+90" }
  });

  const onSubmit = async (data: ContactFormInputs) => {
    setFormState('loading');
    const submissionData = { ...data, phone: `${data.countryCode} ${data.phoneNumber}` };
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) { throw new Error('Sunucu hatası. Lütfen daha sonra tekrar deneyin.'); }
      
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'contact_form_success'
        });
      }
      
      setFormState('success');
      reset();
    } catch (error: unknown) {
      setFormState('error');
    }
  };

  return (
    <>
      <section className="w-full bg-white pt-16 pb-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl font-bold text-primary">{t('title')}</h1>
          <p className="font-sans text-lg text-text-light mt-4 max-w-2xl mx-auto">{t('description')}</p>
        </div>
      </section>

      <section className="w-full bg-white pb-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-b from-white to-primary-lightest p-8 rounded-lg">
                <h2 className="font-serif text-2xl font-bold text-text-main mb-6">{t('infoTitle')}</h2>
                <div className="space-y-4">
                    <div className="flex items-start gap-4"><MapPin size={24} className="text-primary flex-shrink-0 mt-1" /><span className="font-sans text-text-light">Yeni Girne Bulvarı, 1825. Sk. No:12, 35575 Karşıyaka/İzmir</span></div>
                    <div className="flex items-center gap-4"><Phone size={20} className="text-primary" /><span className="font-sans text-text-light">+90 554 871 05 90</span></div>
                    <div className="flex items-center gap-4"><Mail size={20} className="text-primary" /><span className="font-sans text-text-light">aysinakdogan@draysinakdogan.com</span></div>
                    <div className="flex items-center gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                        <a href="https://www.instagram.com/draysinakdogan/" target="_blank" rel="noopener noreferrer" className="font-sans text-text-light hover:underline">
                            @draysinakdogan
                        </a>
                    </div>
                </div>
            </div>
            
            <div className="bg-gradient-to-b from-white to-primary-lightest p-8 rounded-lg">
                <h2 className="font-serif text-2xl font-bold text-text-main mb-6">{t('hoursTitle')}</h2>
                <div className="space-y-3 font-sans text-text-light">
                    <div className="flex justify-between border-b border-gray-300 pb-2"><span>{t('hours_weekdays')}</span><span className="font-medium">09:00 - 17:00</span></div>
                    <div className="flex justify-between border-b border-gray-300 pb-2"><span>{t('hours_saturday')}</span><span className="font-medium">09:00 - 13:00</span></div>
                    <div className="flex justify-between"><span>{t('hours_sunday')}</span><span className="font-medium text-accent">{t('hours_closed')}</span></div>
                </div>
            </div>
            
            <div id="form" className="bg-gradient-to-b from-white to-primary-lightest p-8 rounded-lg relative">
              <div className="absolute top-4 right-4">
                <button 
                  type="button" 
                  className="text-gray-400 hover:text-primary transition-colors"
                  title={t('modal_info_title')}
                  onClick={() => setTopInfoVisible(true)}
                >
                  <HelpCircle size={20} />
                </button>
              </div>
              <h2 className="font-serif text-2xl font-bold text-text-main mb-6">{t('formTitle')}</h2>
              {formState === 'success' ? (
                <div className="text-center p-4 bg-green-100 text-green-800 rounded-lg flex flex-col items-center justify-center h-full">
                  <CheckCircle className="h-12 w-12 mb-4" />
                  <h3 className="font-serif text-xl font-bold">{t('form_success_title')}</h3>
                  <p className="mt-2 text-sm">{t('form_success_description')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div className="relative">
                    <input 
                      {...register('name')} 
                      type="text" 
                      id="name"
                      className="block w-full rounded-md border-gray-300 shadow-sm px-3 py-3 text-text-main bg-white peer focus:border-primary focus:ring-primary placeholder-transparent"
                      placeholder={t('form_name')}
                      autoComplete="name"
                    />
                    <label 
                      htmlFor="name" 
                      className="absolute left-3 -top-2.5 bg-secondary px-1 text-sm text-text-light transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
                    >
                      {t('form_name')}
                    </label>
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                  </div>

                  <div className="relative">
                    <input 
                      {...register('email')} 
                      type="email" 
                      id="email" 
                      className="block w-full rounded-md border-gray-300 shadow-sm px-3 py-3 text-text-main bg-white peer focus:border-primary focus:ring-primary placeholder-transparent"
                      placeholder={t('form_email')}
                      autoComplete="email"
                    />
                    <label 
                      htmlFor="email" 
                      className="absolute left-3 -top-2.5 bg-secondary px-1 text-sm text-text-light transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
                    >
                      {t('form_email')}
                    </label>
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="countryCode" className="font-sans text-sm font-bold text-text-light">{t('form_phone')}</label>
                    <div className="flex gap-2 mt-2">
                      <div className="relative w-1/4">
                          <input {...register('countryCode')} type="tel" id="countryCode" className="block w-full rounded-md border-gray-300 shadow-sm px-3 py-3 text-text-main bg-white peer focus:border-primary focus:ring-primary placeholder-transparent" placeholder={t('form_phone_code')}
                          autoComplete="country"
                          />
                      </div>
                      <div className="relative w-3/4">
                          <Controller
                              name="phoneNumber"
                              control={control}
                              render={({ field }) => (
                                  <input
                                      {...field}
                                      type="tel"
                                      id="phoneNumber"
                                      className="block w-full rounded-md border-gray-300 shadow-sm px-3 py-3 text-text-main bg-white peer focus:border-primary focus:ring-primary placeholder-transparent"
                                      placeholder={t('form_phone')}
                                      autoComplete="tel"
                                      onChange={(e) => {
                                          const formatted = formatPhoneNumber(e.target.value);
                                          field.onChange(formatted);
                                      }}
                                  />
                              )}
                          />
                      </div>
                    </div>
                    {errors.countryCode && <p className="mt-1 text-sm text-red-600">{errors.countryCode.message}</p>}
                    {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>}
                  </div>

                  <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <label 
                        htmlFor="message" 
                        className="font-sans text-sm font-bold text-text-light"
                      >
                        {t('form_message')}
                      </label>
                      <button 
                        type="button" 
                        className="text-gray-400 hover:text-primary transition-colors"
                        title={t('modal_message_title')}
                        onClick={() => setMessageInfoVisible(true)}
                      >
                        <HelpCircle size={16} />
                      </button>
                    </div>
                    <textarea 
                      {...register('message')} 
                      id="message"
                      rows={4}
                      className="block w-full rounded-md border-gray-300 shadow-sm px-3 py-3 text-text-main bg-white peer focus:border-primary focus:ring-primary placeholder-transparent"
                      placeholder={t('form_message')}
                    />
                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
                  </div>

                  <button 
                    type="submit" 
                    disabled={formState === 'loading'}
                    className="w-full bg-primary text-white font-sans font-bold py-3 px-6 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formState === 'loading' ? t('form_button_sending') : t('form_button_send')}
                  </button>

                  {formState === 'error' && (
                    <p className="text-red-600 text-sm text-center">{t('form_error')}</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18476.09670595653!2d27.092585311822393!3d38.466520006826286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd9d85530f323%3A0xf4e3a7e795bf6df7!2sMedical%20Point!5e0!3m2!1str!2str!4v1752770818193!5m2!1str!2str"
          width="100%" 
          height="450"
          style={{ border: 0 }} 
          allowFullScreen={true}
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Klinik Konumu"
        ></iframe>
      </section>

      {isTopInfoVisible && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setTopInfoVisible(false)}
        >
          <div 
            className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-xl font-bold text-text-main">{t('modal_info_title')}</h3>
              <button 
                onClick={() => setTopInfoVisible(false)}
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Clock size={20} className="text-primary flex-shrink-0 mt-1" />
                <div className="font-sans text-text-light">
                  {t.rich('modal_info_response_time', {
                    strong: (chunks) => <strong>{chunks}</strong>
                  })}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar size={20} className="text-primary flex-shrink-0 mt-1" />
                <div className="font-sans text-text-light">
                  {t.rich('modal_info_appointments', {
                    strong: (chunks) => <strong>{chunks}</strong>
                  })}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-accent flex-shrink-0 mt-1" />
                <div className="font-sans text-text-light">
                  {t.rich('modal_info_emergency', {
                    strong: (chunks) => <strong>{chunks}</strong>
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isMessageInfoVisible && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setMessageInfoVisible(false)}
        >
          <div 
            className="bg-white rounded-lg p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-xl font-bold text-text-main">{t('modal_message_title')}</h3>
              <button 
                onClick={() => setMessageInfoVisible(false)}
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <p className="font-sans text-text-light">
              {t('modal_message_body')}
            </p>
          </div>
        </div>
      )}
    </>
  );
}