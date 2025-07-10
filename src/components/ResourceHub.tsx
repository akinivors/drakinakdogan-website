import Link from 'next/link';
import { HelpCircle, FileText, FlaskConical, Baby } from 'lucide-react';

const resources = [
  {
    icon: <FlaskConical size={32} className="text-primary" />,
    title: "İnfertilite Değerlendirmesi",
    description: "Kısırlık nedenlerini ve size en uygun tedavi yolunu adım adım keşfedin.",
    href: "/hasta-rehberi#infertility-journey"
  },
  {
    icon: <Baby size={32} className="text-primary" />,
    title: "Tüp Bebek (IVF) Süreci",
    description: "Tüp bebek tedavisinin tüm aşamalarını detaylı bir şekilde inceleyin.",
    href: "/hasta-rehberi#ivf-journey"
  },
  {
    icon: <HelpCircle size={32} className="text-primary" />,
    title: "Sıkça Sorulan Sorular",
    description: "Tedavi süreçleriyle ilgili en merak edilen soruların yanıtlarını bulun.",
    href: "/hasta-rehberi#faq"
  },
  {
    icon: <FileText size={32} className="text-primary" />,
    title: "Blog & Makaleler",
    description: "Kadın sağlığı ve infertilite üzerine en güncel bilgilere ve yazılarımıza ulaşın.",
    href: "/blog"
  }
];

export default function ResourceHub() {
  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {resources.map((resource, index) => (
            <Link href={resource.href} key={index} className="group bg-gradient-to-b from-white to-primary-lightest p-8 rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
              <div className="mb-4">{resource.icon}</div>
              <h3 className="font-serif text-xl font-bold text-text-main mb-2">
                {resource.title}
              </h3>
              <p className="font-sans text-text-light flex-grow">
                {resource.description}
              </p>
              <div className="font-sans font-bold text-primary mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Detayları Gör →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 