// Path: src/components/TestimonialFormModal.tsx

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/Button';

// 1. Define the validation schema
const testimonialSchema = z.object({
  author: z.string().min(2, { message: "İsim en az 2 karakter olmalıdır." }),
  quote: z.string().min(10, { message: "Yorumunuz en az 10 karakter olmalıdır." }),
});

type TestimonialFormInputs = z.infer<typeof testimonialSchema>;

interface TestimonialFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TestimonialFormModal({ isOpen, onClose }: TestimonialFormModalProps) {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TestimonialFormInputs>({
    resolver: zodResolver(testimonialSchema),
  });

  const onSubmit = async (data: TestimonialFormInputs) => {
    setFormState('loading');
    try {
      const response = await fetch('/api/testimonials/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Form gönderimi başarısız oldu.');
      }
      
      setFormState('success');
      reset();
    } catch (error) {
      console.error('Testimonial submission error:', error);
      setFormState('error');
    }
  };

  const handleClose = () => {
    setFormState('idle'); // Reset form state on close
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-2xl w-full max-w-lg relative"
          >
            <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors">
              <X size={24} />
            </button>
            
            {formState === 'success' ? (
              <div className="p-12 text-center flex flex-col items-center">
                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                <h2 className="font-serif text-2xl font-bold text-primary">Teşekkür Ederiz!</h2>
                <p className="font-sans text-text-light mt-2 mb-6">Yorumunuz onaylandıktan sonra sitemizde yayınlanacaktır.</p>
                <Button onClick={handleClose} variant="secondary">Kapat</Button>
              </div>
            ) : (
              <div className="p-8">
                <h2 className="font-serif text-3xl font-bold text-primary mb-6">Yorum Bırakın</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="author" className="font-sans text-sm font-bold text-text-light mb-2 block">Adınız Soyadınız</label>
                    <input 
                      {...register('author')} 
                      id="author"
                      className="block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 text-text-main focus:border-primary focus:ring-primary"
                      placeholder="Örn: Ayşe Yılmaz , Ayşe Y. , A.Yılmaz" 
                    />
                    {errors.author && <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="quote" className="font-sans text-sm font-bold text-text-light mb-2 block">Yorumunuz</label>
                    <textarea 
                      {...register('quote')} 
                      id="quote"
                      rows={5}
                      className="block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 text-text-main focus:border-primary focus:ring-primary"
                      placeholder="Deneyimlerinizi paylaşın..."
                    />
                    {errors.quote && <p className="mt-1 text-sm text-red-600">{errors.quote.message}</p>}
                  </div>
                  <Button type="submit" disabled={formState === 'loading'} className="w-full">
                    {formState === 'loading' ? 'Gönderiliyor...' : 'Yorumu Gönder'}
                  </Button>
                  {formState === 'error' && <p className="text-red-600 text-sm text-center">Bir hata oluştu. Lütfen tekrar deneyin.</p>}
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}