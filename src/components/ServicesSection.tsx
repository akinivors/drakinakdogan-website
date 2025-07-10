import Link from 'next/link';

// The new, focused list of services for the homepage
const services = [
  {
    title: 'Tüp Bebek (IVF)',
    description: 'İleri teknoloji ve kişiye özel yaklaşımlarla IVF tedavisi.',
    imageUrl: '/service-ivf.jpg',
    href: '/hizmetler#tup-bebek', // Links to the specific modal
  },
  {
    title: 'İnfertilite',
    description: 'Kısırlık nedenlerini araştırma ve en etkili tedavi yöntemleri.',
    imageUrl: '/service-infertility.jpg',
    href: '/hizmetler#infertilite', // Links to the specific modal
  },
  {
    title: 'Endometriozis (Çikolata Kisti)',
    description: 'Ağrı ve infertiliteye neden olabilen bu kronik durum için modern tanı ve tedavi.',
    imageUrl: '/pcos-sendromu.jpeg',
    href: '/hizmetler#endometriozis', // Links to the specific modal
  },
  {
    title: 'Polikistik Over Sendromu (PCOS)',
    description: 'Yumurtlama sorunlarının en sık nedeninin yönetimi ve tedavisi.',
    imageUrl: '/pcos-sendromu.jpeg',
    href: '/hizmetler#polikistik-over-sendromu', // Links to the specific modal
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full bg-gradient-to-b from-white to-primary-lightest py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-serif text-4xl font-bold text-primary mb-12">
          Hizmetlerimiz
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Link href={service.href} key={index} className="group relative block rounded-lg overflow-hidden shadow-lg h-80">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110"
                style={{ backgroundImage: `url(${service.imageUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-6 text-white text-left">
                <h3 className="font-serif text-2xl font-bold mb-2 flex-grow">
                  {service.title}
                </h3>
                <p className="font-sans text-white/90">
                  {service.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 