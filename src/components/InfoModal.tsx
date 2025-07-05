import { X } from 'lucide-react';
import Image from 'next/image';

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
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
        className="bg-white rounded-lg shadow-2xl w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 overflow-hidden"
      >
        {/* Image */}
        <div className="w-full h-64 md:h-full bg-secondary relative">
          <Image
            src={item.imageSrc}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
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