'use client'; // This page is now fully interactive

import { useState } from 'react';
import Accordion from '@/components/Accordion';
import PatientCalculators from '@/components/PatientCalculators';
import PatientJourneyMap from '@/components/PatientJourneyMap';
import { HelpCircle } from 'lucide-react';
import { clsx } from 'clsx';

// --- New, Categorized FAQ Data ---
const faqCategories = [
  {
    name: "Tedavi Süreci",
    questions: [
      { question: "İnfertilitede ilk başvurulacak tedavi tüp bebek midir?", answer: "Hayır, her zaman ilk seçenek tüp bebek değildir. Öncelik, infertilite nedeninin doğru bir şekilde ortaya konmasıdır. Ancak azospermi veya her iki tüpün tamamen tıkalı olması gibi durumlarda tüp bebek ilk tedavi seçeneği olabilir." },
      { question: "Tüp bebek tedavisine ne zaman karar verilir?", answer: "Karar; kadının yaşı, erkeğin sperm durumu ve önceki tedavi geçmişi gibi faktörlere bağlıdır. Cerrahi veya ilaçla tedavi şansı olmayan veya daha basit yöntemlerle sonuç alınamayan çiftlerde tüp bebek tedavisine geçilir." },
      { question: "Yumurta toplama (OPU) işlemi ne kadar sürer?", answer: "İşlem, yumurtalıklardaki folikül sayısına bağlı olarak ortalama 15-30 dakika sürer. Hafif anestezi altında yapıldığı için ağrısız bir işlemdir." },
      { question: "Embriyo transferi sonrası istirahat gerekli midir?", answer: "Transfer sonrası uzun süreli yatak istirahati önermiyoruz. Genellikle ilk iki gün ağır kaldırmamak ve ani hareketlerden kaçınmak yeterlidir. Normal günlük aktivitelere dönülebilir." },
      { question: "İlk tüp bebek denemesi başarısız olursa, ne kadar süre sonra tekrar deneyebiliriz?", answer: "Kesin bir kural olmamakla birlikte, ikinci deneme için genellikle 1-2 aylık aralık yeterlidir. Kısa ve uzun aralıklar arasında tedavi başarısı açısından fark yoktur. Önemli faktörler çiftin psikolojik ve mali hazırlığıdır." }
    ]
  },
  {
    name: "Medikal & Teknik Sorular",
    questions: [
      { question: "Her yumurta döllenir mi?", answer: "Hayır. Bir yumurtanın döllenebilmesi için olgun ve yapısal olarak normal olması gerekir. Ayrıca, döllenen her yumurta da sağlıklı bir embriyo olarak gelişimini sürdüremeyebilir." },
      { question: "Tüp bebek tedavisi yumurtalık rezervini tüketir mi?", answer: "Hayır. Tüp bebek amacıyla yumurtalıkların uyarılması, o ay zaten kaybolacak olan folikül grubunu hedefler ve yumurtalık rezervini azaltmaz." },
      { question: "Transfer sonrası kalan kaliteli embriyolara ne olur?", answer: "Kalan kaliteli embriyolar dondurularak saklanabilir (vitrifikasyon). Bu, gelecekteki denemeler için yumurtalık uyarımı ve yumurta toplama sürecini tekrar geçirmekten sizi kurtarır ve hatta ikinci çocuk için bile kullanılabilir." },
      { question: "Tedavide kullanılan ilaçların yan etkileri var mıdır?", answer: "En önemli yan etki, genellikle bol yumurta veren hastalarda görülen OHSS (Aşırı Uyarılma Sendromu) riskidir. Bu risk, modern tedavi protokolleri ve embriyo dondurma teknikleri ile büyük oranda yönetilebilmektedir." },
      { question: "Tüp bebek ile normal gebelik arasında bir fark var mı?", answer: "Doğan bebekler arasında herhangi bir fark yoktur. Sadece testisten sperm alınması gereken bazı özel durumlarda genetik anormalliklerde çok az bir artış olabilir." }
    ]
  },
  {
    name: "İdari & Finansal",
    questions: [
      { question: "SGK tüp bebek masraflarını karşılar mı?", answer: "Evet, merkezimizin SGK ile anlaşması bulunmaktadır. SGK&apos;nın belirlediği koşulları sağlayan çiftler için Tüp Bebek Raporu çıkararak SGK desteğinden faydalanmalarını sağlayabiliyoruz." },
      { question: "SGK Raporu için temel kriterler nelerdir?", answer: "Genel kriterler arasında kadının 40 yaş altında olması, belirli bir evlilik süresi, önceki tedaviler ve spesifik tıbbi durumlar (sperm sayısı, tüplerin durumu vb.) bulunmaktadır. Detaylı bilgi için kliniğimizle iletişime geçebilirsiniz." },
      { question: "İlk randevuma gelirken ne getirmeliyim?", answer: "İlk randevunuza gelirken lütfen daha önce yapılmış tüm test sonuçlarınızı, raporlarınızı ve kullandığınız ilaçların bir listesini yanınızda getiriniz. Bu, durumunuzu daha hızlı ve doğru bir şekilde değerlendirmemize yardımcı olacaktır." },
      { question: "Randevu iptalini ne kadar süre önce yapmalıyım?", answer: "Randevunuzu iptal etmeniz veya değiştirmeniz gerekirse, en az 24 saat öncesinden bize bildirmenizi rica ederiz. Bu, başka bir hastaya yardımcı olabilmemiz için bize zaman tanıyacaktır." }
    ]
  }
];

export default function PatientGuidePage() {
  const [activeFaqCategory, setActiveFaqCategory] = useState(faqCategories[0].name);

  const activeQuestions = faqCategories.find(cat => cat.name === activeFaqCategory)?.questions || [];

  return (
    <>
      {/* Section 1: Page Header */}
      <section className="w-full bg-secondary py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl font-bold text-primary">Hasta Rehberi</h1>
          <p className="font-sans text-lg text-text-light mt-4 max-w-3xl mx-auto">
            Tedavi sürecinizle ilgili kaynaklar, araçlar ve sıkça sorulan soruların yanıtları.
          </p>
        </div>
      </section>

      {/* Section 2: Patient Journey Map */}
      <section className="w-full bg-white py-20">
        <PatientJourneyMap />
      </section>

      {/* --- NEW SECTION: Treatment Prerequisites --- */}
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
            {/* Left Column: Required Documents */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="font-serif text-2xl font-bold text-text-main mb-6">Gerekli Belgeler</h3>
              <ul className="space-y-4 font-sans text-text-light">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✔</span>
                  <span>Nüfus cüzdan fotokopileri</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✔</span>
                  <span>Evlilik cüzdanı fotokopisi</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✔</span>
                  <span>Çiftlere ait birer adet vesikalık fotoğraf</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✔</span>
                  <span>Kliniğimizde okunup imzalanacak olan rıza formları</span>
                </li>
              </ul>
            </div>

            {/* Right Column: Important Reminders */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="font-serif text-2xl font-bold text-text-main mb-6">Önemli Notlar</h3>
              <ul className="space-y-4 font-sans text-text-light">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">!</span>
                  <span>Size verilen muayene randevularına uyunuz.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">!</span>
                  <span>Önerilen ilaç ve diğer uygulamaları titizlikle yerine getiriniz.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">!</span>
                  <span>İlaçlarınızı tedaviden önce temin etmeniz önemlidir.</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-12 font-sans text-sm text-gray-500 italic">
            <p>Unutmayın; tüm çabamız sağlıklı bir gebeliğe ulaşmanız içindir. Her türlü bilgilendirme hakkınıza saygılı bir &apos;Hasta Dostu&apos; tedavi politikası izlemek bizim için önemlidir.</p>
          </div>
        </div>
      </section>

      {/* Section 4: Patient Tools (Calculators) */}
      <section className="w-full bg-gradient-to-b from-white to-primary-lightest py-20">
        <PatientCalculators />
      </section>

      {/* Section 5: FAQ (NOW WITH TABS) */}
      <section id="faq" className="w-full bg-secondary py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-primary mb-4 flex items-center justify-center gap-3">
              <HelpCircle className="text-accent" size={36} />
              Sıkça Sorulan Sorular
            </h2>
          </div>
          
          {/* FAQ Filter Tabs */}
          <div className="flex justify-center border-b border-gray-200 mb-12">
            {faqCategories.map(category => (
              <button
                key={category.name}
                onClick={() => setActiveFaqCategory(category.name)}
                className={clsx(
                  "font-serif text-lg px-6 py-3 transition-all duration-200",
                  activeFaqCategory === category.name 
                    ? 'border-b-2 border-primary text-primary' 
                    : 'text-text-light hover:text-primary'
                )}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <Accordion items={activeQuestions} />
        </div>
      </section>
    </>
  );
} 