import { Metadata } from 'next';
import HastaRehberiClient from './HastaRehberiClient';

export const metadata: Metadata = {
  title: 'Tüp Bebek Tedavi Rehberleri ve Hasta Bilgileri | Dr. Ayşin Akdoğan',
  description: "Tüp bebek tedavi sürecinin her adımında yanınızdayız. İlaç kullanımı, embriyo transferi sonrası ve sıkça sorulan sorular hakkında Dr. Ayşin Akdoğan'ın hazırladığı pratik hasta rehberlerini keşfedin."
};

export default function Page() {
  return <HastaRehberiClient />;
} 