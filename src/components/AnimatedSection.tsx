'use client';

import { motion, Variants } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  tag?: keyof React.JSX.IntrinsicElements;
  variants?: Variants;
}

// Default variants for the container
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // This will make children animate in 0.2s after each other
    },
  },
};

export default function AnimatedSection({ 
  children, 
  className,
  tag = 'div', // Default to a div tag
  variants = containerVariants 
}: AnimatedSectionProps) {
  const MotionComponent = motion[tag as 'div'];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ 
        once: true, 
        amount: isMobile ? 0.05 : 0.1, // Lower threshold for mobile
        margin: isMobile ? "-100px 0px -100px 0px" : "-50px 0px -50px 0px" // Larger margin for mobile
      }}
      variants={variants}
      className={className}
    >
      {children}
    </MotionComponent>
  );
} 