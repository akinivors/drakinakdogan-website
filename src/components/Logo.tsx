'use client';

import Link from 'next/link';
import { clsx } from 'clsx';

interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
}

export default function Logo({ variant = 'dark', className }: LogoProps) {
  return (
    <Link 
      href="/" 
      className={clsx(
        "text-2xl font-serif font-bold transition-colors",
        {
          // Default dark text on light backgrounds
          'text-primary hover:text-primary-dark': variant === 'dark',
          // Light text for dark backgrounds (like our footer)
          'text-white hover:text-gray-200': variant === 'light',
        },
        className
      )}
    >
      Op. Dr. Ayşin Akdoğan
    </Link>
  );
} 