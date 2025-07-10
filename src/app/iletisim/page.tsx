'use client';

import { useForm, Controller } from 'react-hook-form'; // Import Controller
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Phone, Mail, MapPin, Loader2, CheckCircle, AlertTriangle, HelpCircle, X } from 'lucide-react';
import Button from '@/components/Button';

// --- Helper function to format the phone number ---
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

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isInfoVisible, setInfoVisible] = useState(false);
  const [isTopInfoVisible, setTopInfoVisible] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, control } = useForm<ContactFormInputs>({ // Add 'control'
    resolver: zodResolver(contactFormSchema),
    defaultValues: { countryCode: "+90" }
  });

  const onSubmit = async (data: ContactFormInputs) => {
    setFormState('loading');
    setErrorMessage('');
    const submissionData = { ...data, phone: `${data.countryCode} ${data.phoneNumber}` };
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
      if (error instanceof Error) { setErrorMessage(error.message); } 
      else { setErrorMessage('Bilinmeyen bir hata oluştu.'); }
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

      {/* Section 2: Info, Hours, and Form Grid */}
      <section className="w-full bg-white pb-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-b from-white to-primary-lightest p-8 rounded-lg">
                <h2 className="font-serif text-2xl font-bold text-text-main mb-6">İletişim Bilgileri</h2>
                <div className="space-y-4">
                    <div className="flex items-start gap-4"><MapPin size={24} className="text-primary flex-shrink-0 mt-1" /><span className="font-sans text-text-light">Yeni Girne Bulvarı, 1825. Sk. No:12, 35575 Karşıyaka/İzmir</span></div>
                    <div className="flex items-center gap-4"><Phone size={20} className="text-primary" /><span className="font-sans text-text-light">+90 554 871 05 90</span></div>
                    <div className="flex items-center gap-4"><Mail size={20} className="text-primary" /><span className="font-sans text-text-light">info@drakinakdogan.com</span></div>
                    <div className="flex items-center gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                        <a href="https://www.instagram.com/draysinakdogan/" target="_blank" rel="noopener noreferrer" className="font-sans text-text-light hover:underline">
                            @draysinakdogan
                        </a>
                    </div>
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
            
            <div id="form" className="bg-gradient-to-b from-white to-primary-lightest p-8 rounded-lg relative">
              <div className="absolute top-4 right-4">
                <button 
                  type="button" 
                  onClick={() => setTopInfoVisible(true)} 
                  className="text-gray-400 hover:text-primary transition-colors"
                  title="Yardım"
                >
                  <HelpCircle size={20} />
                </button>
              </div>
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
                  
                  {/* --- UPDATED PHONE NUMBER INPUT --- */}
                  <div>
                    <label className="font-sans text-sm font-bold text-text-light">Telefon Numarası</label>
                    <div className="flex gap-2 mt-2">
                      <div className="relative w-1/4">
                          <input {...register('countryCode')} type="tel" id="countryCode" className="block w-full rounded-md border-gray-300 shadow-sm px-3 py-3 text-text-main bg-white peer focus:border-primary focus:ring-primary placeholder-transparent" placeholder="Kod" />
                          <label htmlFor="countryCode" className="absolute left-3 -top-2.5 bg-secondary px-1 text-sm text-text-light transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary">Kod</label>
                      </div>
                      <div className="relative w-3/4">
                          <Controller
                            name="phoneNumber"
                            control={control}
                            render={({ field }) => (
                                <input 
                                    {...field}
                                    onChange={(e) => {
                                        const formatted = formatPhoneNumber(e.target.value);
                                        field.onChange(formatted);
                                    }}
                                    type="tel"
                                    id="phoneNumber"
                                    className="block w-full rounded-md border-gray-300 shadow-sm px-3 py-3 text-text-main bg-white peer focus:border-primary focus:ring-primary placeholder-transparent"
                                    placeholder="5xx-xxx-xx-xx"
                                />
                            )}
                          />
                          <label htmlFor="phoneNumber" className="absolute left-3 -top-2.5 bg-secondary px-1 text-sm text-text-light transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary">Telefon Numarası</label>
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

                  {/* Submit Button */}
                  <Button type="submit" variant="primary" disabled={formState === 'loading'} className="w-full">
                    {formState === 'loading' ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Gönderiliyor...
                      </>
                    ) : (
                      'Mesaj Gönder'
                    )}
                  </Button>

                  {formState === 'error' && (
                    <div className="p-4 bg-red-100 text-red-800 rounded-lg flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                      <p className="text-sm">{errorMessage}</p>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Full-Width Map */}
      <section className="w-full h-96">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11154.842329601834!2d27.0972082289955!3d38.47535426031171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd9d85530f323%3A0xf4e3a7e795bf6df7!2sMedical%20Point!5e0!3m2!1str!2str!4v1751388098424!5m2!1str!2str" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade" 
          className="w-full h-full"
        ></iframe>
      </section>

      {/* Info Modal */}
      {isInfoVisible && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-xl font-bold text-text-main">Mesaj İpuçları</h3>
              <button onClick={() => setInfoVisible(false)} className="text-gray-400 hover:text-gray-800">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-3 text-sm text-text-light">
              <p><strong>Randevu için:</strong> Tercih ettiğiniz tarih ve saati belirtin.</p>
              <p><strong>Tıbbi sorular için:</strong> Kısa ve net şekilde durumunuzu açıklayın.</p>
              <p><strong>Genel bilgi için:</strong> Hangi konuda bilgi almak istediğinizi yazın.</p>
            </div>
          </div>
        </div>
      )}

      {/* Top Info Modal */}
      {isTopInfoVisible && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-xl font-bold text-text-main">İletişim Rehberi</h3>
              <button onClick={() => setTopInfoVisible(false)} className="text-gray-400 hover:text-gray-800">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4 text-sm text-text-light">
              <div>
                <h4 className="font-semibold text-text-main mb-2">Hızlı İletişim</h4>
                <p><strong>Acil durumlar:</strong> Telefon ile arayın (+90 554 871 05 90)</p>
                <p><strong>Randevu:</strong> Online form doldurarak randevu talep edin</p>
                <p><strong>Sorularınız:</strong> E-posta ile detaylı sorularınızı iletebilirsiniz</p>
              </div>
              <div>
                <h4 className="font-semibold text-text-main mb-2">Dönüş Süreleri</h4>
                <p><strong>Mesaj:</strong> 24 saat içinde</p>
                <p><strong>E-posta:</strong> 48 saat içinde</p>
                <p><strong>Randevu:</strong> 2-3 iş günü içinde</p>
              </div>
              <div>
                <h4 className="font-semibold text-text-main mb-2">Klinik Bilgileri</h4>
                <p><strong>Adres:</strong> Yeni Girne Bulvarı, 1825. Sk. No:12, Karşıyaka/İzmir</p>
                <p><strong>Otopark:</strong> Ücretsiz hasta otoparkı mevcuttur</p>
                <p><strong>Ulaşım:</strong> Toplu taşıma duraklarına 5 dk yürüme mesafesi</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 