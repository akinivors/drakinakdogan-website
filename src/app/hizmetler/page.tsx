import { Metadata } from 'next';
import ServicesPageClient from './ServicesPageClient';

export const metadata: Metadata = {
  title: 'İleri İnfertilite & Tüp Bebek Tedavileri | Dr. Ayşin Akdoğan, İzmir',
  description: 'Yapay zeka ile embriyo seçimi, PGT, yumurta dondurma ve kişiye özel IVF protokolleri gibi en güncel tedavi yöntemlerimiz hakkında bilgi alın.'
};

export default function Page() {
  return <ServicesPageClient />;
} 