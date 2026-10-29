'use client';

import Image from 'next/image';
import { Link } from '@/navigation';
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
        "flex items-center gap-2 sm:gap-3 text-lg sm:text-2xl leading-tight font-serif font-bold transition-colors",
        {
          // Default dark text on light backgrounds
          'text-primary hover:text-primary-dark': variant === 'dark',
          // Light text for dark backgrounds (like our footer)
          'text-white hover:text-gray-200': variant === 'light',
        },
        className
      )}
    >
      <Image
        src={variant === 'light' ? '/logo/logo-mark-white.png' : '/logo/logo-mark.png'}
        alt=""
        width={416}
        height={381}
        className="h-10 sm:h-14 w-auto flex-shrink-0"
        priority
      />
      <span>Op. Dr. Ayşin Akdoğan</span>
    </Link>
  );
}
