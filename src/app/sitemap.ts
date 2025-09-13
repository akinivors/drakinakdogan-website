// Path: src/app/sitemap.ts (Updated and Corrected)

import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabaseClient';
import { routing } from '@/i18n/routing'; // 1. Import locales

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.draysinakdogan.com';
  const { locales } = routing;

  // 2. Define static paths that should be included for every locale
  const staticPaths = [
    '', // Home page
    '/hakkimda',
    '/hizmetler',
    '/iletisim',
    '/hasta-rehberi',
    '/blog'
  ];

  // 3. Generate static URLs for both 'tr' and 'en'
  const staticUrls = locales.flatMap(locale => 
    staticPaths.map(path => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date().toISOString(),
    }))
  );

  // 4. Get all published blog posts from Supabase
  const { data: posts } = await supabase
    .from('posts')
    .select('slug, created_at')
    .eq('is_published', true);

  // 5. Generate blog post URLs for both 'tr' and 'en'
  const postUrls = posts?.flatMap(({ slug, created_at }) => 
    locales.map(locale => ({
      url: `${baseUrl}/${locale}/blog/${slug}`,
      lastModified: new Date(created_at).toISOString(),
    }))
  ) ?? [];

  // 6. Combine and return all URLs
  return [...staticUrls, ...postUrls];
} 