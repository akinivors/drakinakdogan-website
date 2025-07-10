import Image from 'next/image';
import Button from '@/components/Button';
import Link from 'next/link';

interface AboutSectionProps {
  showButton?: boolean;
}

export default function AboutSection({ showButton = false }: AboutSectionProps) {
  return (
    <section className="w-full bg-white py-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center px-6">
        
        {/* Image Content - Using a consistent, professional photo */}
        <div className="w-full h-[450px] rounded-lg shadow-xl overflow-hidden relative">
          <Image
            src="/dr-aysin-akdogan-standingnextodesk.jpg" 
            alt="Op. Dr. Ayşin Akdoğan"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-6">
          <h2 className="font-serif text-3xl font-bold text-text-main mb-2">
            Bir Hekimden Daha Fazlası: Bir Rehber, Bir Dost
          </h2>
          <div className="font-sans text-text-light leading-relaxed space-y-4">
            <p>
              1971 yılının 10 Ekim sabahı Mersin&apos;de başlayan hayat yolculuğum, beni insanlara yardım etme ve en büyük mutluluklarına tanıklık etme arzusuna götürdü. İki çocuk annesi olarak, bir ailenin kurulmasındaki o tarifsiz heyecanı ve her çocuğun bir mucize olduğunu kalbimin en derinlerinde hissediyorum. Bu his, mesleğime olan tutkumun ve hastalarıma olan bağlılığımın temelini oluşturuyor.
            </p>
            <p>
              Hacettepe Üniversitesi&apos;nde başlayan tıp eğitimim ve Ege Üniversitesi&apos;nde tamamladığım uzmanlığım, bana bilimin ışığında yürüme fırsatı verdi. Ancak biliyorum ki, tıp sadece bilimden ibaret değildir; aynı zamanda şefkat, anlayış ve güvendir.
            </p>
          </div>
          {/* Conditionally render the button */}
          {showButton && (
            <Link href="/hakkimda" className="mt-4">
              <Button variant="secondary">Daha Fazlasını Oku</Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
} 