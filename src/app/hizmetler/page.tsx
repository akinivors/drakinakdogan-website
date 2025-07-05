'use client'; // Required for state management (useState)

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Stethoscope, FlaskConical } from 'lucide-react';

// --- DYNAMIC IMPORTS ---
const InfoModal = dynamic(() => import('@/components/InfoModal'));
const AnimatedSection = dynamic(() => import('@/components/AnimatedSection'));

// Define a specific type for our service items
interface ServiceItem {
  title: string;
  longDescription: string;
  imageSrc: string;
}

// Updated data structure with more details for the modal
const conditionsTreated: ServiceItem[] = [
  { 
    title: 'Endometriozis', 
    longDescription: 'Endometriozis, rahim içini döşeyen dokunun rahim dışında büyümesidir. Bu durum ağrıya ve kısırlığa neden olabilir. Modern laparoskopik cerrahi ve medikal tedavilerle etkili sonuçlar alıyoruz. Tanı ve tedavide 25 yılı aşkın deneyimimle bireysel yaklaşım uyguluyorum.',
    imageSrc: '/pcos-sendromu.jpeg' // Related visual
  },
  { 
    title: 'Erkek İnfertilitesi', 
    longDescription: 'Erkek faktörlü infertilite, çiftlerin %40\'ında görülen bir durumdur. Sperm sayısı, hareketlilik ve morfoloji analizleriyle detaylı değerlendirme yapılır. Mikroenjeksiyon (ICSI) tekniği ile başarılı sonuçlar elde edilmektedir.',
    imageSrc: '/service-infertility.jpg' // Shows a couple in consultation
  },
  { 
    title: 'İnfertilite', 
    longDescription: 'Bir yıl boyunca korunmasız ilişkiye rağmen gebelik oluşmaması durumudur. Hem kadın hem de erkek faktörlerini detaylıca araştırarak kişiye özel tedavi planları oluşturuyoruz. Modern üreme tekniklerini deneyimle birleştiriyoruz.',
    imageSrc: '/infertilite.jpg' // Specific infertility graphic
  },
  { 
    title: 'Konjenital Uterin Anomaliler', 
    longDescription: 'Doğumsal rahim anomalileri, gebelik kayıplarına ve infertiliteye neden olabilir. Histeroskopi ve laparoskopi teknikleriyle cerrahi düzeltme işlemleri gerçekleştiriliyor. Her hasta için uygun tedavi yöntemi belirleniyor.',
    imageSrc: '/service-gynecology.jpg' // Professional ultrasound visual
  },
  { 
    title: 'Miyoma Uteri', 
    longDescription: 'Rahim kasından kaynaklanan iyi huylu tümörlerdir. Adet düzensizliği, ağrı ve infertiliteye neden olabilir. Laparoskopik miyomektomi ile minimal invaziv cerrahi yaklaşım uyguluyoruz. Doğurganlık korunarak tedavi edilir.',
    imageSrc: '/dr-aysin-akdogan-lab1.jpg' // Professional lab setting
  },
  { 
    title: 'Polikistik Over Sendromu', 
    longDescription: 'PCOS, üreme çağındaki kadınları etkileyen hormonal bir bozukluktur. Adet düzensizliği, kilo artışı ve infertiliteye neden olur. Yaşam tarzı değişiklikleri ve medikal tedavi ile etkin yönetim sağlanır.',
    imageSrc: '/pcos-sendromu.jpeg' // Specific PCOS graphic
  },
  { 
    title: 'Zayıf Over Cevabı', 
    longDescription: 'Yumurtalıkların stimülasyon tedavilerine yetersiz cevap vermesi durumudur. Özel protokoller ve bireyselleştirilmiş tedavi yaklaşımları ile over rezervini optimize ediyoruz. Deneyimli yaklaşımla başarı oranlarını artırıyoruz.',
    imageSrc: '/dr-aysin-akdogan-staringatthecomputer.jpg' // Professional focus/analysis
  }
];

const treatmentMethods: ServiceItem[] = [
  {
    title: 'Embriyo Transferi',
    longDescription: 'IVF sürecinin son aşaması olan embriyo transferi, laboratuvar ortamında geliştirilen embriyoların rahim içine yerleştirilmesi işlemidir. Uygun embriyo seçimi ve transfer tekniği ile yüksek başarı oranları elde edilmektedir.',
    imageSrc: '/service-ivf.jpg' // IVF graphic
  },
  {
    title: 'Histerektomi',
    longDescription: 'Rahim alınması operasyonu olan histerektomi, çeşitli jinekolojik hastalıkların tedavisinde uygulanır. Laparoskopik yöntemlerle minimal invaziv cerrahi teknikler kullanılarak hastanın konforunu maksimize ediyoruz.',
    imageSrc: '/dr-aysin-akdogan.png' // Professional surgery setting
  },
  {
    title: 'İntrauterin İnseminasyon (Aşılama)',
    longDescription: 'İntrauterin inseminasyon (IUI), hazırlanan spermlerin doğrudan rahim içine yerleştirildiği bir yardımcı üreme tekniğidir. Özellikle açıklanamayan infertilite ve hafif erkek faktöründe tercih edilir. Doğal sürece en yakın yöntemdir.',
    imageSrc: '/service-infertility.jpg' // Shows a couple in consultation
  },
  {
    title: 'Laparoskopi',
    longDescription: 'Minimal invaziv cerrahi tekniği olan laparoskopi ile tanı ve tedavi bir arada yapılır. Endometriozis, miyoma, over kistleri ve tüp tıkanıklıklarının tedavisinde altın standart yöntemdir. Hızlı iyileşme ve minimal iz avantajı sağlar.',
    imageSrc: '/dr-aysin-akdogan-lab1.jpg' // Professional lab setting
  },
  {
    title: 'Tüp Bebek',
    longDescription: 'Vücut dışında döllenme işlemi olan IVF, birçok çift için umut olmaktadır. Laboratuvar koşullarında embriyo oluşturulup rahime transfer edilmesi esasına dayanır. Güncel protokoller ve deneyimli yaklaşımla yüksek başarı oranları elde edilmektedir.',
    imageSrc: '/service-ivf.jpg' // Specific IVF graphic
  }
];

export default function ServicesPage() {
  // Use the new type for our state
  const [selectedItem, setSelectedItem] = useState<ServiceItem | null>(null);

  return (
    <>
      {/* Section 1: Page Header */}
      <section className="w-full bg-gradient-to-b from-white to-primary-lightest py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl font-bold text-primary">
            Hizmetlerimiz
          </h1>
          <p className="font-sans text-lg text-text-light mt-4 max-w-3xl mx-auto">
            25 yılı aşkın deneyimimle, kadın sağlığı ve üreme tıbbı alanında sunduğum modern ve kişiye özel tedavi yaklaşımlarını keşfedin.
          </p>
        </div>
      </section>

      {/* Section 2: Conditions Treated */}
      <section className="w-full bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-text-main mb-4 flex items-center justify-center gap-3">
              <Stethoscope className="text-accent" size={36} />
              Tanı ve Tedavisi Yapılan Hastalıklar
            </h2>
            <p className="font-sans text-text-light max-w-2xl mx-auto">
              Aşağıdaki alanlarda ve daha fazlasında güncel tanı ve tedavi yöntemleriyle hizmetinizdeyim.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {conditionsTreated.map((item) => (
              <button key={item.title} onClick={() => setSelectedItem(item)} className="bg-gradient-to-b from-white to-primary-lightest p-6 rounded-lg shadow-sm text-left hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <p className="font-sans font-medium text-text-main">{item.title}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Section 3: Treatment Methods */}
      <AnimatedSection>
        <section className="w-full bg-gradient-to-b from-white to-primary-lightest py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-primary mb-4 flex items-center justify-center gap-3">
                <FlaskConical className="text-accent" size={36} />
                Uygulanan Tedavi Yöntemleri
              </h2>
               <p className="font-sans text-text-light max-w-2xl mx-auto">
                En güncel teknoloji ve bilimsel kanıta dayalı yaklaşımlarla uygulanan başlıca tedavi yöntemleri.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {treatmentMethods.map((item) => (
                <button key={item.title} onClick={() => setSelectedItem(item)} className="bg-white p-6 rounded-lg shadow-sm text-left hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                  <p className="font-sans font-medium text-text-main">{item.title}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* The Modal Component */}
      <InfoModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  );
} 