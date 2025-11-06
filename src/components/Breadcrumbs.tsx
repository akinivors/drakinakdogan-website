'use client';

import { Link } from '@/navigation';

// Define the shape of a single breadcrumb item
type BreadcrumbItem = {
  name: string;
  href: string;
};

// The props for our component
type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

// This component will be used inside other pages and does not need schema itself
export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm font-sans text-gray-500">
        {items.map((item, index) => {
          return (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                // This is the ">" separator
                <svg className="w-4 h-4 mx-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {index < items.length - 1 ? (
                <Link href={item.href} className="hover:text-primary transition-colors">
                  {item.name}
                </Link>
              ) : (
                // The last item is the current page and is not a link
                <span className="font-medium text-text-main" aria-current="page">
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
} 