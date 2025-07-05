'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { clsx } from 'clsx';

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // This function will be called when the user scrolls
  const toggleVisibility = () => {
    // Show button if page is scrolled more than 300px
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // This function will be called when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // This makes the scrolling smooth
    });
  };

  useEffect(() => {
    // Add event listener when the component loads
    window.addEventListener('scroll', toggleVisibility);

    // Clean up the event listener when the component unloads
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        type="button"
        onClick={scrollToTop}
        className={clsx(
          'bg-primary hover:bg-primary-dark text-white rounded-full p-3 shadow-lg transition-all duration-300 ease-in-out',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
          // Conditionally apply classes for visibility and animation
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        )}
        aria-label="Go to top"
      >
        <ChevronUp className="h-6 w-6" />
      </button>
    </div>
  );
} 