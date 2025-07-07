import Button from '@/components/Button';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
      >
        <source src="/clinic-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Text Content */}
      <div className="relative z-20 container mx-auto px-6">
        <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight">
          Doğurganlık Yolculuğunuzda Güvenilir Rehberiniz
        </h1>
        <p className="font-sans text-lg md:text-xl mt-4 max-w-3xl mx-auto">
          İleri teknoloji ve kişiye özel tedavi yöntemleriyle, yeni bir başlangıç yapmanız için size ve ailenize destek oluyoruz.
        </p>
        <div className="mt-8">
          <Link href="/iletisim#form">
            <Button variant="primary">İletişime Geçin</Button>
          </Link>
        </div>
      </div>
    </section>
  );
} 