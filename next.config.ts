import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 1. Force the root domain to permanently redirect
      {
        source: '/',
        destination: '/tr',
        permanent: true,
      },
      // 2. Map legacy URLs
      {
        source: '/hakkimda',
        destination: '/tr/hakkimda',
        permanent: true,
      },
      {
        source: '/iletisim',
        destination: '/tr/iletisim',
        permanent: true,
      },
      {
        source: '/hizmetler',
        destination: '/tr/hizmetler',
        permanent: true,
      },
      {
        source: '/hasta-rehberi',
        destination: '/tr/hasta-rehberi',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/tr/blog',
        permanent: true,
      }
    ];
  }
};

export default withNextIntl(nextConfig);