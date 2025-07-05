import Button from '@/components/Button';
import HeroCarousel from './HeroCarousel'; // Import the new carousel component

export default function Hero() {
  return (
    <section className="w-full bg-gradient-to-b from-white to-primary-lightest">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6 py-20">
        {/* Text Content */}
        <div className="flex flex-col gap-6 items-start z-10">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-primary leading-tight">
            Doğurganlık Yolculuğunuzda Güvenilir Rehberiniz
          </h1>
          <p className="font-sans text-lg text-text-light">
            İleri teknoloji ve kişiye özel tedavi yöntemleriyle, yeni bir başlangıç yapmanız için size ve ailenize destek oluyoruz.
          </p>
          <a 
            href="https://mobil.mph.com.tr/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="primary">Randevu Al</Button>
          </a>
        </div>

        {/* Image Carousel - Now visible on all screen sizes for testing */}
        <div className="w-full h-96 md:h-[500px]">
          <HeroCarousel />
        </div>
      </div>
    </section>
  );
} 