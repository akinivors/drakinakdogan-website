'use client';

import { clsx } from 'clsx';

// Define the props for our button
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  className,
  onClick,
  type = 'button',
  disabled = false
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        // Base styles
        'px-6 py-3 font-sans font-medium rounded-lg transition-colors duration-200',
        
        // Variant styles
        {
          'bg-primary text-white hover:bg-primary-dark': variant === 'primary' && !disabled,
          'bg-secondary text-text-main hover:bg-gray-200': variant === 'secondary' && !disabled,
          'bg-gray-400 text-gray-600 cursor-not-allowed': disabled,
        },
        
        // Custom className override
        className
      )}
    >
      {children}
    </button>
  );
}