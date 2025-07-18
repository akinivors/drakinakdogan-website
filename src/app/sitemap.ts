import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabaseClient';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.draysinakdogan.com';

  // 1. Get all published blog posts from Supabase to add them dynamically
  const { data: posts } = await supabase
    .from('posts')
    .select('slug, created_at')
    .eq('is_published', true);

  const postUrls = posts?.map(({ slug, created_at }) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(created_at).toISOString(),
  })) ?? [];

  // 2. Add your static pages manually
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/hakkimda`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/hizmetler`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/hasta-rehberi`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
    }
  ];

  // 3. Combine and return all URLs
  return [...staticUrls, ...postUrls];
} 