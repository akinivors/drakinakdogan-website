// Path: src/components/LanguageSwitcher.tsx (NEW FILE)

'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  // Remove the current locale from the pathname to get the base path
  const basePath = pathname.replace(`/${locale}`, '') || '/';

  return (
    <div className="flex items-center space-x-1 rounded-full border border-gray-200 p-1">
      <Link
        href={`/tr${basePath}`}
        className={clsx(
          'px-3 py-1 text-sm font-medium rounded-full transition-colors',
          locale === 'tr' ? 'bg-primary text-white' : 'text-text-light hover:bg-gray-100'
        )}
      >
        TR
      </Link>
      <Link
        href={`/en${basePath}`}
        className={clsx(
          'px-3 py-1 text-sm font-medium rounded-full transition-colors',
          locale === 'en' ? 'bg-primary text-white' : 'text-text-light hover:bg-gray-100'
        )}
      >
        EN
      </Link>
    </div>
  );
}