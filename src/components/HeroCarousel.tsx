'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const images = [
  '/dr-aysin-akdogan-standingbackgroundhospital.jpg',
  '/dr-aysin-akdogan-smilingatthedesk.jpg',
  '/dr-aysin-akdogan-lab1.jpg',
  '/dr-aysin-akdogan.png', // The surgery photo
  '/dr-aysin-akdogan-standinginsidehospital.jpg',
  '/dr-aysin-akdogan-staringatthecomputer.jpg',
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 8000); // Change image every 8 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-96 md:h-full rounded-lg shadow-lg relative overflow-hidden bg-gray-200">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`Hero image ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority={currentIndex === 0}
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Optional: Add dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
} 