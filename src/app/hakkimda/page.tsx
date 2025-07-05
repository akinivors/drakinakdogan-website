'use client';

import dynamic from 'next/dynamic';
import { Award, BookOpen, School, Users, FileText, Globe } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

// --- DYNAMIC IMPORTS ---
const Image = dynamic(() => import('next/image'));
const Button = dynamic(() => import('@/components/Button'));
const AnimatedSection = dynamic(() => import('@/components/AnimatedSection'));

// Animation variants for staggered items
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Section 1: Page Header / Introduction */}
      <section className="w-full bg-gradient-to-b from-white to-primary-lightest py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl font-bold text-primary">
            Dr. Ayşin Akdoğan'ı Yakından Tanıyın
          </h1>
          <p className="font-sans text-lg text-text-light mt-4 max-w-3xl mx-auto">
            Yardımcı üreme teknikleri, infertilite tedavisi ve kadın sağlığında 25+ yıllık deneyim ile modern tıbbın ışığında, her hastam için kişiselleştirilmiş, şefkatli ve kapsamlı bir sağlık hizmeti sunuyorum.
          </p>
        </div>
      </section>

      {/* Section 2: Career Timeline */}
      <section className="w-full bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
            {/* Photo Column */}
            <div className="lg:col-span-1">
              <div className="w-full h-[500px] rounded-lg shadow-xl overflow-hidden relative sticky top-24">
                <Image
                  src="/dr-aysin-akdogan-standingnextodesk.jpg"
                  alt="Op. Dr. Ayşin Akdoğan - Profesyonel Portre"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>

            {/* Timeline Column */}
            <div className="lg:col-span-2">
              <h2 className="font-serif text-3xl font-bold text-text-main mb-8">
                Kariyer Yolculuğu
              </h2>
              {/* The timeline container */}
              <AnimatedSection tag="div" className="relative border-l-2 border-primary/20 pl-8 space-y-12">
                {/* Timeline Item 1 - Current Position */}
                <motion.div className="relative" variants={itemVariants}>
                  <div className="absolute -left-[3.2rem] top-1 h-4 w-4 rounded-full bg-primary"></div>
                  <p className="font-sans text-sm text-accent font-medium">2025 - Günümüz</p>
                  <h3 className="font-serif text-xl font-bold text-text-main mt-1">MedicalPoint Tüpbebek Merkezi</h3>
                  <p className="font-sans text-text-light">Kadın Hastalıkları ve Doğum Uzmanı</p>
                </motion.div>
                {/* Timeline Item 2 */}
                <motion.div className="relative" variants={itemVariants}>
                  <div className="absolute -left-[3.2rem] top-1 h-4 w-4 rounded-full bg-primary"></div>
                  <p className="font-sans text-sm text-accent font-medium">2018 - 2025</p>
                  <h3 className="font-serif text-xl font-bold text-text-main mt-1">Özel Tüpbebek Merkezi</h3>
                  <p className="font-sans text-text-light">Kadın Hastalıkları ve Doğum Uzmanı</p>
                </motion.div>
                {/* Timeline Item 3 */}
                <motion.div className="relative" variants={itemVariants}>
                  <div className="absolute -left-[3.2rem] top-1 h-4 w-4 rounded-full bg-primary"></div>
                  <p className="font-sans text-sm text-accent font-medium">2001 - 2018</p>
                  <h3 className="font-serif text-xl font-bold text-text-main mt-1">Ege Üniversitesi Aile Planlaması Araştırma ve Uygulama Merkezi</h3>
                  <p className="font-sans text-text-light">Kadın Hastalıkları ve Doğum Uzmanı</p>
                </motion.div>
                {/* Timeline Item 4 - Specialization */}
                <motion.div className="relative" variants={itemVariants}>
                  <div className="absolute -left-[3.2rem] top-1 h-4 w-4 rounded-full bg-primary/70"></div>
                  <p className="font-sans text-sm text-accent font-medium">2001</p>
                  <h3 className="font-serif text-xl font-bold text-text-main mt-1">Ege Üniversitesi</h3>
                  <p className="font-sans text-text-light">Uzmanlık, Kadın Hastalıkları ve Doğum</p>
                </motion.div>
                {/* Timeline Item 5 - Medical Degree */}
                <motion.div className="relative" variants={itemVariants}>
                  <div className="absolute -left-[3.2rem] top-1 h-4 w-4 rounded-full bg-primary/50"></div>
                  <p className="font-sans text-sm text-accent font-medium">1995</p>
                  <h3 className="font-serif text-xl font-bold text-text-main mt-1">Hacettepe Üniversitesi Tıp Fakültesi</h3>
                  <p className="font-sans text-text-light">Tıp Doktoru</p>
                </motion.div>
              </AnimatedSection>

              {/* Professional Memberships */}
              <div className="mt-16">
                <h3 className="font-serif text-2xl font-bold text-text-main mb-6">
                  Mesleki Üyelikler
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Users className="text-primary" size={20} />
                    <span className="font-sans text-text-light">ÜTCD Derneği</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="text-primary" size={20} />
                    <span className="font-sans text-text-light">İzmir Tabip Odası</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Specializations & Treatments */}
      <section className="w-full bg-gradient-to-b from-white to-primary-lightest py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-primary mb-4">
              Uzmanlık Alanları ve Tedavi Yöntemleri
            </h2>
            <p className="font-sans text-lg text-text-light max-w-3xl mx-auto">
              Geniş deneyimim ile kadın sağlığı, infertilite ve yardımcı üreme teknikleri konularında kapsamlı hizmet sunuyorum.
            </p>
          </div>

          <AnimatedSection tag="div" className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Specialization Areas */}
            <motion.div className="bg-white p-8 rounded-lg shadow-md" variants={itemVariants}>
              <h3 className="font-serif text-2xl font-bold text-text-main mb-6 flex items-center gap-3">
                <Award className="text-accent" size={28} />
                Uzmanlık Alanları
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  'Endometriozis',
                  'Erkek İnfertilitesi', 
                  'İnfertilite',
                  'Konjenital Uterin Anomaliler',
                  'Miyoma Uteri',
                  'Polikistik Over Sendromu',
                  'Zayıf Over Cevabı'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="font-sans text-text-light">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Treatment Methods */}
            <motion.div className="bg-white p-8 rounded-lg shadow-md" variants={itemVariants}>
              <h3 className="font-serif text-2xl font-bold text-text-main mb-6 flex items-center gap-3">
                <BookOpen className="text-accent" size={28} />
                Tedavi Yöntemleri
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  'Embriyo Transferi',
                  'Histerektomi',
                  'İntrauterin İnseminasyon (Aşılama)',
                  'Laparoskopi',
                  'Tüp Bebek'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="font-sans text-text-light">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 4: Research & Publications */}
      <section className="w-full bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-primary mb-4">
              Araştırma ve Akademik Katkılar
            </h2>
            <p className="font-sans text-lg text-text-light max-w-3xl mx-auto">
              Uluslararası alanda tanınan yayınlar, kitap bölümleri ve klinik araştırmalar ile bilimsel gelişime katkı sağlıyorum.
            </p>
          </div>

          <AnimatedSection tag="div" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div className="bg-gradient-to-b from-white to-primary-lightest p-6 rounded-lg text-center" variants={itemVariants}>
              <FileText className="mx-auto mb-4 text-primary" size={40} />
              <h3 className="font-serif text-xl font-bold text-text-main mb-2">15+ Uluslararası Yayın</h3>
              <p className="font-sans text-text-light">Fertility & Sterility, European Journal of Obstetrics & Gynecology gibi prestijli dergilerde</p>
            </motion.div>
            
            <motion.div className="bg-gradient-to-b from-white to-primary-lightest p-6 rounded-lg text-center" variants={itemVariants}>
              <BookOpen className="mx-auto mb-4 text-primary" size={40} />
              <h3 className="font-serif text-xl font-bold text-text-main mb-2">Kitap Bölümleri</h3>
              <p className="font-sans text-text-light">Yardımcı Üreme Teknikleri, İnfertilite ve Ovulasyon İnduksiyonu konularında</p>
            </motion.div>
            
            <motion.div className="bg-gradient-to-b from-white to-primary-lightest p-6 rounded-lg text-center" variants={itemVariants}>
              <Globe className="mx-auto mb-4 text-primary" size={40} />
              <h3 className="font-serif text-xl font-bold text-text-main mb-2">Uluslararası Çalışmalar</h3>
              <p className="font-sans text-text-light">Faz 3 ve Faz 4 randomize kontrollü klinik araştırmalar</p>
            </motion.div>
          </AnimatedSection>

          <div className="mt-12 bg-gradient-to-b from-white to-primary-lightest p-8 rounded-lg">
            <h3 className="font-serif text-2xl font-bold text-text-main mb-4">Seçilmiş Yayınlar</h3>
            <div className="space-y-3 font-sans text-text-light">
              <p className="text-sm leading-relaxed">
                • <strong>Fertility & Sterility (2004):</strong> "Morphometric Changes In The Endometrium And Serum Leptin Levels During The Implantation Period"
              </p>
              <p className="text-sm leading-relaxed">
                • <strong>European Journal of Obstetrics & Gynecology (2010):</strong> "Effect Of Ovarian Stimulation on Integrins Expression in Rat Endometrium"
              </p>
              <p className="text-sm leading-relaxed">
                • <strong>Turkish Journal of Medical Sciences (2011):</strong> "Comparison Of Intravenous General Anesthesia And Paracervical Block for IVF"
              </p>
              <p className="text-sm leading-relaxed">
                • <strong>Kitap Çevirileri:</strong> Yen & Yaffe Üreme Endokrinolojisi, Te Linde's Operative Gynecology
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Call to Action */}
      <AnimatedSection>
        <section className="w-full bg-gradient-to-b from-white to-primary-lightest">
          <div className="container mx-auto px-6 py-16 text-center">
            <h2 className="font-serif text-3xl font-bold text-primary mb-4">
              Sağlık Yolculuğunuza Birlikte Başlayalım
            </h2>
            <p className="font-sans text-lg text-text-light mb-8 max-w-2xl mx-auto">
              25+ yıllık deneyimim ve sürekli güncellenen bilimsel yaklaşımım ile sorularınızı yanıtlamak ve size en uygun tedavi sürecini planlamak için buradayım.
            </p>
            <a 
              href="https://mobil.mph.com.tr/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="primary">
                Randevu Almak İçin Ulaşın
              </Button>
            </a>
          </div>
        </section>
      </AnimatedSection>
    </>
  );
} 