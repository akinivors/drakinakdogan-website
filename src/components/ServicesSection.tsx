import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import { motion, Variants } from 'framer-motion';

// Define the animation for each service card
const serviceVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
};

// Updated data structure with imageUrls instead of icons
const services = [
  {
    title: 'Jinekoloji',
    description: 'Kadın hastalıkları tanı, tedavi ve rutin kontrol hizmetleri.',
    imageUrl: '/service-gynecology.jpg',
    href: '/hizmetler',
  },
  {
    title: 'Gebelik Takibi',
    description: 'Hamilelik sürecinizin başından sonuna kadar kapsamlı takip.',
    imageUrl: '/service-pregnancy.jpg',
    href: '/hizmetler',
  },
  {
    title: 'Tüp Bebek',
    description: 'İleri teknoloji ve kişiye özel yaklaşımlarla IVF tedavisi.',
    imageUrl: '/service-ivf.jpg',
    href: '/hizmetler',
  },
  {
    title: 'İnfertilite',
    description: 'Kısırlık nedenlerini araştırma ve en etkili tedavi yöntemleri.',
    imageUrl: '/service-infertility.jpg',
    href: '/hizmetler',
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full bg-gradient-to-b from-white to-primary-lightest py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-serif text-4xl font-bold text-primary mb-12">
          Hizmetlerimiz
        </h2>
        <AnimatedSection
          tag="div"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={serviceVariants}>
              <Link href={service.href} className="group relative block rounded-lg overflow-hidden shadow-lg h-80">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110"
                  style={{ backgroundImage: `url(${service.imageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-6 text-white text-left">
                  <h3 className="font-serif text-2xl font-bold mb-2">
                    {service.title}
                  </h3>
                  <p className="font-sans text-white/90">
                    {service.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
} 