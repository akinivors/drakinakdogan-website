'use client';

import { motion, Variants } from 'framer-motion';
import React from 'react';

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

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      className={className}
    >
      {children}
    </MotionComponent>
  );
} 