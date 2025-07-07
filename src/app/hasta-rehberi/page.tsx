import Accordion from '@/components/Accordion';
import PatientCalculators from '@/components/PatientCalculators';
import PatientJourneyMap from '@/components/PatientJourneyMap'; // Import new component
import { HelpCircle } from 'lucide-react';

const faqItems = [
  {
    question: "İlk randevuma gelirken ne getirmeliyim?",
    answer: "İlk randevunuza gelirken lütfen daha önce yapılmış tüm test sonuçlarınızı, raporlarınızı ve kullandığınız ilaçların bir listesini yanınızda getiriniz. Bu, durumunuzu daha hızlı ve doğru bir şekilde değerlendirmemize yardımcı olacaktır."
  },
  {
    question: "Tüp bebek tedavisi ne kadar sürer?",
    answer: "Bir tüp bebek (IVF) siklusu genellikle 4 ila 6 hafta arasında sürer. Bu süreç, yumurtalıkların uyarılması, yumurta toplanması, laboratuvarda döllenme ve embriyo transferi aşamalarını içerir. Ancak her hastanın durumu farklı olduğu için süreç kişiye özel olarak planlanır."
  },
  {
    question: "Sigorta anlaşmanız var mı?",
    answer: "Kliniğimizin anlaşmalı olduğu sigorta şirketleri hakkında en güncel bilgiyi almak için lütfen doğrudan bizimle iletişime geçiniz. Asistanlarımız size bu konuda detaylı bilgi verecektir."
  },
  {
    question: "Randevu iptalini ne kadar süre önce yapmalıyım?",
    answer: "Randevunuzu iptal etmeniz veya değiştirmeniz gerekirse, en az 24 saat öncesinden bize bildirmenizi rica ederiz. Bu, başka bir hastaya yardımcı olabilmemiz için bize zaman tanıyacaktır."
  }
];

export default function PatientGuidePage() {
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

      {/* Section 2: Patient Journey Map (NEW) */}
      <section id="journey-map" className="w-full bg-white py-20">
        <PatientJourneyMap />
      </section>

      {/* Section 3: Patient Tools (Calculators) */}
      <section id="calculators" className="w-full bg-gradient-to-b from-white to-primary-lightest py-20">
        <PatientCalculators />
      </section>

      {/* Section 4: FAQ */}
      <section id="faq" className="w-full bg-secondary py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-primary mb-4 flex items-center justify-center gap-3">
              <HelpCircle className="text-accent" size={36} />
              Sıkça Sorulan Sorular
            </h2>
          </div>
          <Accordion items={faqItems} />
        </div>
      </section>
    </>
  );
} 