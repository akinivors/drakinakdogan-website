'use client';

import { X } from 'lucide-react';

interface PublicationModalProps {
  content: {
    title: string;
    items: string[];
  } | null;
  onClose: () => void;
}

export default function PublicationModal({ content, onClose }: PublicationModalProps) {
  if (!content) return null;

  return (
    // Backdrop
    <div 
      onClick={onClose} 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      {/* Modal Panel */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col"
      >
        <div className="p-6 border-b flex justify-between items-center">
            <h2 className="font-serif text-3xl font-bold text-primary">{content.title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-800">
                <X size={24} />
            </button>
        </div>
        <div className="p-6 overflow-y-auto">
            <ul className="space-y-4">
                {content.items.map((item, index) => (
                    <li key={index} className="font-sans text-text-light border-b border-gray-200 pb-2">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </div>
  );
} 