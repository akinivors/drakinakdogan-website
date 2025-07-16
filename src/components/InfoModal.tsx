'use client';

import { X } from 'lucide-react';
import Image from 'next/image'; // Import the Next.js Image component

interface InfoModalProps {
  item: {
    title: string;
    longDescription: string;
    imageSrc: string;
  } | null;
  onClose: () => void;
}

export default function InfoModal({ item, onClose }: InfoModalProps) {
  if (!item) return null;

  return (
    // Backdrop
    <div 
      onClick={onClose} 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      {/* Modal Panel */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-2xl w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 overflow-hidden"
      >
        {/* --- UPDATED IMAGE SECTION --- */}
        <div className="relative w-full h-64 md:h-full bg-secondary">
           <Image
              src={item.imageSrc}
              alt={item.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 40vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
           />
        </div>

        {/* Content */}
        <div className="p-8 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800">
            <X size={24} />
          </button>
          <h2 className="font-serif text-3xl font-bold text-primary mb-4">{item.title}</h2>
          <p className="font-sans text-text-light leading-relaxed">{item.longDescription}</p>
        </div>
      </div>
    </div>
  );
} 