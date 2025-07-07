'use client';

import dynamic from 'next/dynamic';
import { Award, BookOpen, Users, FileText, Globe } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// --- DYNAMIC IMPORTS ---
const Button = dynamic(() => import('@/components/Button'));
const AnimatedSection = dynamic(() => import('@/components/AnimatedSection'));
const HeroCarousel = dynamic(() => import('@/components/HeroCarousel'));

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
      {/* Section 1: Page Header with Personal Bio */}
      <section className="w-full bg-gradient-to-b from-white to-primary-lightest py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-28 md:mb-36">
            <h1 className="font-serif text-5xl font-bold text-primary">
              Dr. Ayşin Akdoğan&apos;ı Yakından Tanıyın
            </h1>
            <p className="font-sans text-lg text-text-light mt-4 max-w-3xl mx-auto">
              Yardımcı üreme teknikleri, infertilite tedavisi ve kadın sağlığında 25+ yıllık deneyim ile modern tıbbın ışığında, her hastam için kişiselleştirilmiş, şefkatli ve kapsamlı bir sağlık hizmeti sunuyorum.
            </p>
          </div>

          {/* Personal Bio Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
            <div className="md:col-span-1">
              <div className="w-full h-[400px] rounded-lg shadow-xl overflow-hidden relative">
                <Image
                  src="/dr-aysin-akdogan.png"
                  alt="Dr. Ayşin Akdoğan"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col gap-6">
              <AnimatedSection>
                <h2 className="font-serif text-3xl font-bold text-text-main mb-6">
                  Bir Hekimden Daha Fazlası: Bir Rehber, Bir Dost
                </h2>
                <div className="font-sans text-text-light leading-relaxed space-y-4">
                  <p>
                    1971 yılının 10 Ekim sabahı Mersin&apos;de başlayan hayat yolculuğum, beni insanlara yardım etme ve en büyük mutluluklarına tanıklık etme arzusuna götürdü. İki çocuk annesi olarak, bir ailenin kurulmasındaki o tarifsiz heyecanı ve her çocuğun bir mucize olduğunu kalbimin en derinlerinde hissediyorum. Bu his, mesleğime olan tutkumun ve hastalarıma olan bağlılığımın temelini oluşturuyor.
                  </p>
                  <p>
                    Hacettepe Üniversitesi&apos;nde başlayan tıp eğitimim ve Ege Üniversitesi&apos;nde tamamladığım uzmanlığım, bana bilimin ışığında yürüme fırsatı verdi. Ancak biliyorum ki, tıp sadece bilimden ibaret değildir; aynı zamanda şefkat, anlayış ve güvendir. 25 yılı aşan kariyerim boyunca, her hastamı kendi ailemden biri gibi gördüm; onların endişelerini paylaştım ve sevinçlerine ortak oldum. Amacım, sadece en güncel tedavi yöntemlerini uygulamak değil, aynı zamanda bu hassas yolculukta size kendinizi güvende ve anlaşılmış hissettirmektir.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Career Timeline */}
      <section className="w-full bg-white pt-24 md:pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
            {/* Photo Column */}
            <div className="lg:col-span-1">
              <div className="w-full h-[500px] rounded-lg shadow-xl overflow-hidden relative sticky top-24">
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

      {/* Section 4: Research & Publications */}
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
            <motion.div className="bg-gradient-to-b from-white to-primary-lightest p-6 rounded-lg text-center" variants={itemVariants}>
              <FileText className="mx-auto mb-4 text-primary" size={40} />
              <h3 className="font-serif text-xl font-bold text-text-main mb-2">15+ Uluslararası Yayın</h3>
              <p className="font-sans text-text-light">Fertility & Sterility, European Journal of Obstetrics & Gynecology gibi prestijli dergilerde</p>
            </motion.div>
            
            <motion.div className="bg-gradient-to-b from-white to-primary-lightest p-6 rounded-lg text-center" variants={itemVariants}>
              <Globe className="mx-auto mb-4 text-primary" size={40} />
              <h3 className="font-serif text-xl font-bold text-text-main mb-2">5+ Kitap Bölümü</h3>
              <p className="font-sans text-text-light">Kadın sağlığı ve infertilite konularında akademik eserler</p>
            </motion.div>
            
            <motion.div className="bg-gradient-to-b from-white to-primary-lightest p-6 rounded-lg text-center" variants={itemVariants}>
              <BookOpen className="mx-auto mb-4 text-primary" size={40} />
              <h3 className="font-serif text-xl font-bold text-text-main mb-2">Klinik Araştırmalar</h3>
              <p className="font-sans text-text-light">Yeni tedavi yöntemleri ve hasta bakım protokolleri geliştirme</p>
            </motion.div>
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
            <Button variant="primary">İletişime Geçin</Button>
          </Link>
        </div>
      </section>
    </>
  );
} 