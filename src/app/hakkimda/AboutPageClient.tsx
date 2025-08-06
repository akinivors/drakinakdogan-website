'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Award, BookOpen, Users, FileText, Globe } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import PublicationModal from '@/components/PublicationModal';

const Button = dynamic(() => import('@/components/Button'));
const AnimatedSection = dynamic(() => import('@/components/AnimatedSection'));
const AboutSection = dynamic(() => import('@/components/AboutSection'));
const HeroCarousel = dynamic(() => import('@/components/HeroCarousel'));

interface PublicationData {
  title: string;
  items: string[];
}

const publicationsData = {
  uluslararasi: {
    title: "Uluslararası Yayınlar",
    items: [
      "Morphometric Changes In The Endometrium And Serum Leptin Levels During The Implantation Period Of Teh Embriyo In The Rat In Response To Exogenous Ovarian Stimulation. A. Dursun, F. Sendag, M.C. Terek, H. Yılmaz, K. Öztekin, M. Baka And T. Tanyalcin. Fertil Steril; 2004: 82 Sup 3. 1121-1126",
      "Effect Of Ovarian Stimulation With Human Menopausal Gonadotropin And Recombinant Follicle Stimulating Hormone On The Expression Of Integrins Alpha(3), Beta(1) In The Rat Endometrium During The Implantation Period. Fatih Sendag , Aysin Akdogan, Kemal Ozbilgin , Gulsen Giray , Kemal Oztekin European Journal Of Obstetrics & Gynecology And Reproductive Biology 150 (2010) 57–60",
      "A Comparison Of Intravenous General Anesthesia And Paracervical Block For In Vitro Fertilization: Eff Ects On Oocytes Using The Transvaginal Technique. Sevil Bumen, İlkben Gunüşen, Vicdan Firat, Semra Karaman, Ayşin Akdoğan, Ege Nazan Tavmergen Goker. Turk J Med Sci 2011; 41 (5): 801-808",
      "Reproductive Outcomes After Progestin Therapy In Infertile Women With Endometrial Atypical Hyperplasia. Akman L, Akdogan A, Sahin G, Terek MC, Ozsaran A, Dikmen Y, Tavmergen Goker EN, Tavmergen E. Eur J Obstet Gynecol Reprod Biol. 2013 Dec;171(2):390-1",
      "Ligneous Cervicovaginitis Associated With Plasminogen Deficiency: A Rare Cause Of Infertility. Aysin Akdogan, Gulnaz Sahin, Levent Akman, Deniz Simsek, Osman Zekioglu, Ege NT Goker, Erol Tavmergen. Uluslararası Hematoloji-Onkoloji Dergisi. Number: 1 Volume: 25 Year: 2015."
    ]
  },
  ulusal: {
    title: "Ulusal Yayınlar",
    items: [
      "Servikal Yetmezlik Tedavisinde Serklajin Yeri Cerclage Operation In The Treatment Of Cervical Incompetencyrafael Levi, Ayşin Akdoğan, Pınar Solmaz Yildiz,Ege Nazan Tavmergen Goker, Şefik Eser Özyürek, Erol Tavmergen, Ege Tıp Dergisi 43 (2) : 87-89 2004",
      "Ovulasyon İndukisyonunda Gonadotropinler .Ayşin Akdoğan , Erol Tavmergen. Türkiye Klinikleri Jinekoloji Obstretrik Dergisi . 2012.",
      "Yardımcı Üreme Teknikleri Öncesi Cerrahi .Ayşin Akdoğan , Erol Tavmergen . Türkiye Klinikleri Jinekoloji Obsteterik Dergisi. İnfertil Hastalarda Yardımcı Üreme Teknikleri Özel Sayısı .2013",
      "Hepatit Ve Viral Enfeksiyonlar İçin Önemli Bir Risk Grubunda Tarama Screening For Hepatitis And Viral Infections In A Significant Risk Group Mustafa Yamazhan, Serhat Uysal, Muhammet Soylar, Gülnaz Şahin, Ayşin Akdoğan, Ege Nazan Tavmergen Goker, Meltem Taşbakan, Rüçhan Yazan Sertöz, Hüsnü Pullukçu, Erol Tavmergen. Mediterr J Infect Microb Antimicrob 2014;3:11",
      "REVIEW: Antioksidan İlaçların İnfertil Çiftin Geleneksel Tedavisine Katkısı Var Mıdır? . Ayşin AKDOĞAN. Turkiye Klinikleri J Gynecol Obst-Special Topics 2012;5(2):1-5"
    ]
  },
  kitaplar: {
    title: "Kitap Bölümleri ve Çeviriler",
    items: [
      "Yardımcı Üreme Teknikleri (IVF/ICSI Hangisi ?) Ege Goker-Ayşin Akdoğan(2010)",
      "İnfertilite Ve Yardımla Üreme Teknikleri – Ovulasyon İnduksiyonu (Ayşin Akdoğan,Erol Tavmergen(2012)",
      "Telesağlık Ve Online Hasta Görüşmesi.2020 Telejinokoloji Ve Online Gebelik Takibi(Ayşin Akdoğan, Gülnaz Şahin, Ferruh Acet)",
      "Çeviri: Üreme Endokrinolojisi . Yen &Yaffe 5. Basım: Bölüm 8: Over Yaşam Siklusu Erol Tavmergen, Ayşin Akdoğan(213-254)(2006)",
      "Çeviri Editör Yardımcılığı: Te Linde's Operative Gynecology Dokuzuncu Basım .(2005)"
    ]
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
};

export default function AboutPageClient() {
  const [modalContent, setModalContent] = useState<PublicationData | null>(null);

  return (
    <>
      {/* Section 1: Page Header */}
      <section className="w-full bg-gradient-to-b from-white to-primary-lightest py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="font-serif text-5xl font-bold text-primary">
              Dr. Ayşin Akdoğan&apos;ı Yakından Tanıyın
            </h1>
            <p className="font-sans text-lg text-text-light mt-4 max-w-3xl mx-auto">
              Yardımcı üreme teknikleri, infertilite tedavisi ve kadın sağlığında 25+ yıllık deneyim ile modern tıbbın ışığında, her hastam için kişiselleştirilmiş, şefkatli ve kapsamlı bir sağlık hizmeti sunuyorum.
            </p>
          </div>
        </div>
      </section>

      {/* --- REUSABLE ABOUT SECTION --- */}
      <AboutSection />

      {/* Section 2: Career Timeline */}
      <section className="w-full bg-white pt-24 md:pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
            {/* Photo Column */}
            <div className="lg:col-span-1">
              <div className="w-full h-[400px] md:h-[500px] rounded-lg shadow-xl overflow-hidden relative md:sticky md:top-24">
                <HeroCarousel />
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
                  <h3 className="font-serif text-xl font-bold text-text-main mt-1">Özel Tavmergen Tüpbebek Merkezi</h3>
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
                <h3 className="font-serif text-2xl font-bold text-text-main mb-8">
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
            <h2 className="font-serif text-4xl font-bold text-primary mb-8">
              Uzmanlık Alanları ve Tedavi Yöntemleri
            </h2>
            <p className="font-sans text-lg text-text-light max-w-3xl mx-auto">
              Geniş deneyimim ile kadın sağlığı, infertilite ve yardımcı üreme teknikleri konularında kapsamlı hizmet sunuyorum.
            </p>
          </div>

          <AnimatedSection tag="div" className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Specialization Areas */}
            <motion.div className="bg-white p-8 rounded-lg shadow-md" variants={itemVariants}>
              <h3 className="font-serif text-2xl font-bold text-text-main mb-8 flex items-center gap-3">
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
              <h3 className="font-serif text-2xl font-bold text-text-main mb-8 flex items-center gap-3">
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

      {/* Section 4: Research & Publications (NOW INTERACTIVE) */}
      <section className="w-full bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-primary mb-8">
              Araştırma ve Akademik Katkılar
            </h2>
            <p className="font-sans text-lg text-text-light max-w-3xl mx-auto">
              Uluslararası alanda tanınan yayınlar, kitap bölümleri ve klinik araştırmalar ile bilimsel gelişime katkı sağlıyorum.
            </p>
          </div>

          <AnimatedSection tag="div" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* International Publications Card */}
            <motion.button onClick={() => setModalContent(publicationsData.uluslararasi)} className="bg-gradient-to-b from-white to-primary-lightest p-6 rounded-lg text-center hover:shadow-xl transition-shadow" variants={itemVariants}>
              <FileText className="mx-auto mb-4 text-primary" size={40} />
              <h3 className="font-serif text-xl font-bold text-text-main mb-2">Uluslararası Yayınlar</h3>
              <p className="font-sans text-text-light">Fertility & Sterility ve European Journal of Obstetrics & Gynecology gibi prestijli dergilerde yayınlanmış makaleler.</p>
            </motion.button>
            
            {/* National Publications Card */}
            <motion.button onClick={() => setModalContent(publicationsData.ulusal)} className="bg-gradient-to-b from-white to-primary-lightest p-6 rounded-lg text-center hover:shadow-xl transition-shadow" variants={itemVariants}>
              <Globe className="mx-auto mb-4 text-primary" size={40} />
              <h3 className="font-serif text-xl font-bold text-text-main mb-2">Ulusal Yayınlar</h3>
              <p className="font-sans text-text-light">Türkiye Klinikleri ve Ege Tıp Dergisi gibi ulusal tıp literatürüne katkıda bulunan araştırmalar.</p>
            </motion.button>
            
            {/* Books Card */}
            <motion.button onClick={() => setModalContent(publicationsData.kitaplar)} className="bg-gradient-to-b from-white to-primary-lightest p-6 rounded-lg text-center hover:shadow-xl transition-shadow" variants={itemVariants}>
              <BookOpen className="mx-auto mb-4 text-primary" size={40} />
              <h3 className="font-serif text-xl font-bold text-text-main mb-2">Kitap Bölümleri & Çeviriler</h3>
              <p className="font-sans text-text-light">Alanında öncü ders kitaplarına yazılan bölümler ve yapılan önemli çeviriler.</p>
            </motion.button>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 5: Contact CTA */}
      <section className="w-full bg-gradient-to-b from-white to-primary-lightest py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl font-bold text-primary mb-8">
            Sağlık Yolculuğunuzda Yanınızdayım
          </h2>
          <p className="font-sans text-lg text-text-light mb-8 max-w-2xl mx-auto">
            25 yıllık deneyimim ve modern tıp yaklaşımımla, her hastam için en uygun tedavi planını oluşturuyor ve bu yolculukta yanınızda olmaya devam ediyorum.
          </p>
          <Link href="/iletisim#form">
            <Button variant="primary">
              İletişime Geçin
            </Button>
          </Link>
        </div>
      </section>
      
      {/* --- The Modal will appear here when content is set --- */}
      <PublicationModal content={modalContent} onClose={() => setModalContent(null)} />
    </>
  );
} 