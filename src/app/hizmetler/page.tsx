'use client'; 

import { useState, useEffect } from 'react';
import { Stethoscope, FlaskConical } from 'lucide-react';
import InfoModal from '@/components/InfoModal';

// --- Type definitions ---
interface ServiceItem {
  slug: string;
  title: string;
  longDescription: string;
  imageSrc: string;
}

// --- Final, Medically Accurate Data Arrays with Slugs ---
const conditionsTreated: ServiceItem[] = [
  { slug: 'infertilite', title: 'İnfertilite (Kısırlık)', longDescription: 'Bir yıl (35 yaş üstü kadınlarda 6 ay) boyunca korunmasız ve düzenli cinsel ilişkiye rağmen gebelik oluşmaması durumudur. Çiftlerin yaklaşık %20\'sini etkileyebilir.', imageSrc: '/infertilite.jpg' },
  { slug: 'polikistik-over-sendromu', title: 'Polikistik Over Sendromu (PCOS)', longDescription: 'Yumurtlama problemlerinin en sık nedenlerinden biridir. Adet düzensizliği, hormonal dengesizlikler ve yumurtalıklarda çok sayıda küçük kist oluşumu ile karakterizedir.', imageSrc: '/pcos-sendromu.jpeg' },
  { slug: 'endometriozis', title: 'Endometriozis (Çikolata Kisti)', longDescription: 'Rahim içini döşeyen endometrium dokusunun, rahim dışında (yumurtalıklar, tüpler vb.) yerleşmesi durumudur. Kronik ağrı ve infertiliteye neden olabilir.', imageSrc: '/pcos-sendromu.jpeg' },
  { slug: 'azalmis-over-rezervi', title: 'Azalmış Over Rezervi', longDescription: 'Genellikle ileri yaşa bağlı olarak kadının yumurtalıklarındaki yumurta sayısı ve kalitesinin azalmasıdır. Bu durum, gebelik şansını doğal olarak düşürebilir.', imageSrc: '/service-infertility.jpg' },
  { slug: 'tuplerin-tikali-olmasi', title: 'Tüplerin Tıkalı Olması', longDescription: 'Geçirilmiş enfeksiyonlar veya cerrahiler sonucu fallop tüplerinin tıkanması, sperm ve yumurtanın buluşmasını engelleyerek infertiliteye neden olur.', imageSrc: '/dr-aysin-akdogan-lab1.jpg' },
  { slug: 'rahim-anomalileri', title: 'Rahim Anomalileri', longDescription: 'Myom, polip, rahim içi yapışıklıklar veya perde gibi doğuştan gelen ya da sonradan oluşan yapısal bozukluklardır. Embriyonun tutunmasını engelleyebilir.', imageSrc: '/service-gynecology.jpg' },
  { slug: 'hipogonadotropik-hipogonadizm', title: 'Hipogonadotropik Hipogonadizm', longDescription: 'Beyinden (hipofiz ve hipotalamus) yumurtalıkları uyaran FSH ve LH hormonlarının yetersiz salgılanması sonucu yumurtlama fonksiyonlarının olmaması durumudur.', imageSrc: '/service-infertility.jpg' }
];

const treatmentMethods: ServiceItem[] = [
  { slug: 'tup-bebek', title: 'Tüp Bebek (IVF)', longDescription: 'Vücut dışında döllenme işlemi olan IVF, birçok çift için en etkili tedavi yöntemidir. Laboratuvarda embriyo oluşturulup rahime transfer edilmesi esasına dayanır.', imageSrc: '/service-ivf.jpg' },
  { slug: 'yapay-zeka-embriyo', title: 'Yapay Zeka ile Embriyo Seçimi', longDescription: 'Embriyoskop ile elde edilen binlerce görüntü, yapay zeka algoritmaları ile analiz edilerek tutunma potansiyeli en yüksek olan embriyonun seçilmesini sağlayan en ileri teknolojidir.', imageSrc: '/dr-aysin-akdogan-lab1.jpg' },
  { slug: 'mikroenjeksiyon', title: 'Mikroenjeksiyon (ICSI)', longDescription: 'Tek bir spermin doğrudan yumurta içine enjekte edildiği bu yöntem, özellikle erkek faktörlü infertilitede döllenme oranlarını büyük ölçüde artırır.', imageSrc: '/infertilite.jpg' },
  { slug: 'embriyoskop-takip', title: 'Embriyoskop ile Takip', longDescription: 'Embriyoların gelişimini 7/24 kesintisiz olarak izleyen özel inkübatör sistemidir. En sağlıklı embriyonun seçilmesine olanak tanır.', imageSrc: '/service-ivf.jpg' },
  { slug: 'genetik-tani', title: 'Genetik Tanı İşlemleri (PGT)', longDescription: 'Genetik hastalık riski taşıyan çiftlerde veya tekrarlayan tüp bebek başarısızlıklarında, embriyoların genetik olarak incelenerek sağlıklı olanların transfer edilmesidir.', imageSrc: '/service-ivf.jpg' },
  { slug: 'yumurta-dondurma', title: 'Yumurta Dondurma', longDescription: 'Over rezervi düşük olan veya kanser tedavisi görecek kadınların doğurganlıklarını gelecekte korumak için yumurtalarının dondurularak saklanmasıdır.', imageSrc: '/dr-aysin-akdogan-lab1.jpg' }
];

const allServices = [...conditionsTreated, ...treatmentMethods];

export default function ServicesPage() {
  const [selectedItem, setSelectedItem] = useState<ServiceItem | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const itemToOpen = allServices.find(item => item.slug === hash);
      if (itemToOpen) {
        setSelectedItem(itemToOpen);
      }
    }
  }, []);

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

      {/* The Modal Component */}
      <InfoModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  );
} 