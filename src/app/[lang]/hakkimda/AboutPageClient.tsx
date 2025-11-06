// Path: src/app/hakkimda/AboutPageClient.tsx (Fully Refactored)

'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Award, BookOpen, Users, FileText, Globe } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { Link } from '@/navigation';
import PublicationModal from '@/components/PublicationModal';
import { useTranslations } from 'next-intl';

const Button = dynamic(() => import('@/components/Button'));
const AnimatedSection = dynamic(() => import('@/components/AnimatedSection'));
const AboutSection = dynamic(() => import('@/components/AboutSection'));
const HeroCarousel = dynamic(() => import('@/components/HeroCarousel'));

interface PublicationData {
  title: string;
  items: string[];
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
};

export default function AboutPageClient() {
  const t = useTranslations('AboutPage');
  const tCta = useTranslations('CTA');
  const [modalContent, setModalContent] = useState<PublicationData | null>(null);

  // Note: Publication data is static and doesn't need to be in the translation files
  // as it contains specific, non-translatable titles of academic works.
  const publicationsData = {
    uluslararasi: {
      title: t('internationalTitle'),
      items: [
        "Morphometric Changes In The Endometrium And Serum Leptin Levels During The Implantation Period Of Teh Embriyo In The Rat In Response To Exogenous Ovarian Stimulation. A. Dursun, F. Sendag, M.C. Terek, H. Yılmaz, K. Öztekin, M. Baka And T. Tanyalcin. Fertil Steril; 2004: 82 Sup 3. 1121-1126",
        "Effect Of Ovarian Stimulation With Human Menopausal Gonadotropin And Recombinant Follicle Stimulating Hormone On The Expression Of Integrins Alpha(3), Beta(1) In The Rat Endometrium During The Implantation Period. Fatih Sendag , Aysin Akdogan, Kemal Ozbilgin , Gulsen Giray , Kemal Oztekin European Journal Of Obstetrics & Gynecology And Reproductive Biology 150 (2010) 57–60",
        "A Comparison Of Intravenous General Anesthesia And Paracervical Block For In Vitro Fertilization: Eff Ects On Oocytes Using The Transvaginal Technique. Sevil Bumen, İlkben Gunüşen, Vicdan Firat, Semra Karaman, Ayşin Akdoğan, Ege Nazan Tavmergen Goker. Turk J Med Sci 2011; 41 (5): 801-808",
        "Reproductive Outcomes After Progestin Therapy In Infertile Women With Endometrial Atypical Hyperplasia. Akman L, Akdogan A, Sahin G, Terek MC, Ozsaran A, Dikmen Y, Tavmergen Goker EN, Tavmergen E. Eur J Obstet Gynecol Reprod Biol. 2013 Dec;171(2):390-1",
        "Ligneous Cervicovaginitis Associated With Plasminogen Deficiency: A Rare Cause Of Infertility. Aysin Akdogan, Gulnaz Sahin, Levent Akman, Deniz Simsek, Osman Zekioglu, Ege NT Goker, Erol Tavmergen. Uluslararası Hematoloji-Onkoloji Dergisi. Number: 1 Volume: 25 Year: 2015."
      ]
    },
    ulusal: {
      title: t('nationalTitle'),
      items: [
        "Servikal Yetmezlik Tedavisinde Serklajin Yeri Cerclage Operation In The Treatment Of Cervical Incompetencyrafael Levi, Ayşin Akdoğan, Pınar Solmaz Yildiz,Ege Nazan Tavmergen Goker, Şefik Eser Özyürek, Erol Tavmergen, Ege Tıp Dergisi 43 (2) : 87-89 2004",
        "Ovulasyon İndukisyonunda Gonadotropinler .Ayşin Akdoğan , Erol Tavmergen. Türkiye Klinikleri Jinekoloji Obstretrik Dergisi . 2012.",
        "Yardımcı Üreme Teknikleri Öncesi Cerrahi .Ayşin Akdoğan , Erol Tavmergen . Türkiye Klinikleri Jinekoloji Obsteterik Dergisi. İnfertil Hastalarda Yardımcı Üreme Teknikleri Özel Sayısı .2013",
        "Hepatit Ve Viral Enfeksiyonlar İçin Önemli Bir Risk Grubunda Tarama Screening For Hepatitis And Viral Infections In A Significant Risk Group Mustafa Yamazhan, Serhat Uysal, Muhammet Soylar, Gülnaz Şahin, Ayşin Akdoğan, Ege Nazan Tavmergen Goker, Meltem Taşbakan, Rüçhan Yazan Sertöz, Hüsnü Pullukçu, Erol Tavmergen. Mediterr J Infect Microb Antimicrob 2014;3:11",
        "REVIEW: Antioksidan İlaçların İnfertil Çiftin Geleneksel Tedavisine Katkısı Var Mıdır? . Ayşin AKDOĞAN. Turkiye Klinikleri J Gynecol Obst-Special Topics 2012;5(2):1-5"
      ]
    },
    kitaplar: {
      title: t('booksTitle'),
      items: [
        "Yardımcı Üreme Teknikleri (IVF/ICSI Hangisi ?) Ege Goker-Ayşin Akdoğan(2010)",
        "İnfertilite Ve Yardımla Üreme Teknikleri – Ovulasyon İnduksiyonu (Ayşin Akdoğan,Erol Tavmergen(2012)",
        "Telesağlık Ve Online Hasta Görüşmesi.2020 Telejinokoloji Ve Online Gebelik Takibi(Ayşin Akdoğan, Gülnaz Şahin, Ferruh Acet)",
        "Çeviri: Üreme Endokrinolojisi . Yen &Yaffe 5. Basım: Bölüm 8: Over Yaşam Siklusu Erol Tavmergen, Ayşin Akdoğan(213-254)(2006)",
        "Çeviri Editör Yardımcılığı: Te Linde's Operative Gynecology Dokuzuncu Basım .(2005)"
      ]
    }
  };


  return (
    <>
      <section className="w-full bg-gradient-to-b from-white to-primary-lightest py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="font-serif text-5xl font-bold text-primary">
              {t('headerTitle')}
            </h1>
            <p className="font-sans text-lg text-text-light mt-4 max-w-3xl mx-auto">
              {t('headerDescription')}
            </p>
          </div>
        </div>
      </section>

      <AboutSection />

      <section className="w-full bg-white pt-24 md:pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
            <div className="lg:col-span-1">
              <div className="w-full h-[400px] md:h-[500px] rounded-lg shadow-xl overflow-hidden relative md:sticky md:top-24">
                <HeroCarousel />
              </div>
            </div>
            <div className="lg:col-span-2">
              <h2 className="font-serif text-3xl font-bold text-text-main mb-8">
                {t('careerJourneyTitle')}
              </h2>
              <AnimatedSection tag="div" className="relative border-l-2 border-primary/20 pl-8 space-y-12">
                <motion.div className="relative" variants={itemVariants}>
                  <div className="absolute -left-[3.2rem] top-1 h-4 w-4 rounded-full bg-primary"></div>
                  <p className="font-sans text-sm text-accent font-medium">2025 - {t('timelineCurrent')}</p>
                  <h3 className="font-serif text-xl font-bold text-text-main mt-1">{t('timelineMedicalPoint')}</h3>
                  <p className="font-sans text-text-light">{t('role')}</p>
                </motion.div>
                <motion.div className="relative" variants={itemVariants}>
                  <div className="absolute -left-[3.2rem] top-1 h-4 w-4 rounded-full bg-primary"></div>
                  <p className="font-sans text-sm text-accent font-medium">2018 - 2025</p>
                  <h3 className="font-serif text-xl font-bold text-text-main mt-1">{t('timelineTavmergen')}</h3>
                  <p className="font-sans text-text-light">{t('role')}</p>
                </motion.div>
                <motion.div className="relative" variants={itemVariants}>
                  <div className="absolute -left-[3.2rem] top-1 h-4 w-4 rounded-full bg-primary"></div>
                  <p className="font-sans text-sm text-accent font-medium">2001 - 2018</p>
                  <h3 className="font-serif text-xl font-bold text-text-main mt-1">{t('timelineEge')}</h3>
                  <p className="font-sans text-text-light">{t('role')}</p>
                </motion.div>
                <motion.div className="relative" variants={itemVariants}>
                  <div className="absolute -left-[3.2rem] top-1 h-4 w-4 rounded-full bg-primary/70"></div>
                  <p className="font-sans text-sm text-accent font-medium">2001</p>
                  <h3 className="font-serif text-xl font-bold text-text-main mt-1">{t('timelineEgeSpecialization')}</h3>
                  <p className="font-sans text-text-light">{t('specialization')}</p>
                </motion.div>
                <motion.div className="relative" variants={itemVariants}>
                  <div className="absolute -left-[3.2rem] top-1 h-4 w-4 rounded-full bg-primary/50"></div>
                  <p className="font-sans text-sm text-accent font-medium">1995</p>
                  <h3 className="font-serif text-xl font-bold text-text-main mt-1">{t('timelineHacettepe')}</h3>
                  <p className="font-sans text-text-light">{t('degree')}</p>
                </motion.div>
              </AnimatedSection>
              <div className="mt-16">
                <h3 className="font-serif text-2xl font-bold text-text-main mb-8">
                  {t('membershipsTitle')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Users className="text-primary" size={20} />
                    <span className="font-sans text-text-light">{t('utcd')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="text-primary" size={20} />
                    <span className="font-sans text-text-light">{t('izmirTabip')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-gradient-to-b from-white to-primary-lightest py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-primary mb-8">
              {t('specializationsTitle')}
            </h2>
            <p className="font-sans text-lg text-text-light max-w-3xl mx-auto">
              {t('specializationsDescription')}
            </p>
          </div>
          <AnimatedSection tag="div" className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div className="bg-white p-8 rounded-lg shadow-md" variants={itemVariants}>
              <h3 className="font-serif text-2xl font-bold text-text-main mb-8 flex items-center gap-3">
                <Award className="text-accent" size={28} />
                {t('areasTitle')}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {t.raw('areasList').map((item: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="font-sans text-text-light">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div className="bg-white p-8 rounded-lg shadow-md" variants={itemVariants}>
              <h3 className="font-serif text-2xl font-bold text-text-main mb-8 flex items-center gap-3">
                <BookOpen className="text-accent" size={28} />
                {t('treatmentsTitle')}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {t.raw('treatmentsList').map((item: string, index: number) => (
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

      <section className="w-full bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-primary mb-8">
              {t('publicationsTitle')}
            </h2>
            <p className="font-sans text-lg text-text-light max-w-3xl mx-auto">
              {t('publicationsDescription')}
            </p>
          </div>
          <AnimatedSection tag="div" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.button onClick={() => setModalContent(publicationsData.uluslararasi)} className="bg-gradient-to-b from-white to-primary-lightest p-6 rounded-lg text-center hover:shadow-xl transition-shadow" variants={itemVariants}>
              <FileText className="mx-auto mb-4 text-primary" size={40} />
              <h3 className="font-serif text-xl font-bold text-text-main mb-2">{t('internationalTitle')}</h3>
              <p className="font-sans text-text-light">{t('internationalDescription')}</p>
            </motion.button>
            <motion.button onClick={() => setModalContent(publicationsData.ulusal)} className="bg-gradient-to-b from-white to-primary-lightest p-6 rounded-lg text-center hover:shadow-xl transition-shadow" variants={itemVariants}>
              <Globe className="mx-auto mb-4 text-primary" size={40} />
              <h3 className="font-serif text-xl font-bold text-text-main mb-2">{t('nationalTitle')}</h3>
              <p className="font-sans text-text-light">{t('nationalDescription')}</p>
            </motion.button>
            <motion.button onClick={() => setModalContent(publicationsData.kitaplar)} className="bg-gradient-to-b from-white to-primary-lightest p-6 rounded-lg text-center hover:shadow-xl transition-shadow" variants={itemVariants}>
              <BookOpen className="mx-auto mb-4 text-primary" size={40} />
              <h3 className="font-serif text-xl font-bold text-text-main mb-2">{t('booksTitle')}</h3>
              <p className="font-sans text-text-light">{t('booksDescription')}</p>
            </motion.button>
          </AnimatedSection>
        </div>
      </section>

      <section className="w-full bg-gradient-to-b from-white to-primary-lightest py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl font-bold text-primary mb-8">
            {t('contactTitle')}
          </h2>
          <p className="font-sans text-lg text-text-light mb-8 max-w-2xl mx-auto">
            {t('contactDescription')}
          </p>
          <Link href="/iletisim#form">
            <Button variant="primary">
              {tCta('getInTouch')}
            </Button>
          </Link>
        </div>
      </section>
      
      <PublicationModal content={modalContent} onClose={() => setModalContent(null)} />
    </>
  );
}