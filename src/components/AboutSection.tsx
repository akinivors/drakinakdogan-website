import Image from 'next/image';
import Button from '@/components/Button';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6">
        
        {/* Image Content */}
        <div>
          <div className="w-full h-[450px] rounded-lg shadow-lg overflow-hidden relative">
            <Image
              src="/dr-aysin-akdogan-standingnextodesk.jpg"
              alt="Op. Dr. Ayşin Akdoğan ve Tıbbi Ekibi - Profesyonel Sağlık Hizmetleri"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-6 items-start">
          <h2 className="font-serif text-4xl font-bold text-primary">
            Hakkımda
          </h2>
          <p className="font-sans text-text-light leading-relaxed">
            1970 Denizli doğumluyum. Sırasıyla Denizli Gazi İlkokulu, Atatürk Ortaokulu ve Denizli Lisesi&apos;nde ilk ve orta öğrenimim ardından 1987-1993 yılları arasında Ege Üniversitesi Tıp Fakültesi&apos;nde Tıp eğitimimi tamamlayarak Tıp Doktoru unvanını aldım. Kadın Hastalıkları ve Doğum Uzmanlık eğitimimi 1993-1998 yılları arasında Ege Doğumevi&apos;nde yaptım.
          </p>
          <p className="font-sans text-text-light leading-relaxed">
            Alanındaki en son gelişmeleri takip ederek, hastalarıma en güncel ve etkili tedavi yöntemlerini sunmayı ilke edindim.
          </p>
          <Link href="/hakkimda">
            <Button variant="secondary">Daha Fazlasını Oku</Button>
          </Link>
        </div>

      </div>
    </section>
  );
} 