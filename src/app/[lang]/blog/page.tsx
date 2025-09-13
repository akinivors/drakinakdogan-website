import { supabase } from '@/lib/supabaseClient';
import BlogPageClient from './page_client';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getTranslations } from 'next-intl/server';
import { getLocale } from 'next-intl/server';

export async function generateMetadata({params}: {params: Promise<{lang: string}>}): Promise<Metadata> {
  const {lang} = await params;
  const t = await getTranslations({locale: lang, namespace: 'BlogPage'});
  return {
    title: t('metaTitle'),
    description: t('metaDescription')
  };
}

export default async function BlogPage({params}: {params: Promise<{lang: string}>}) {
  const {lang: locale} = await params;
  const t = await getTranslations({locale, namespace: 'Navigation'});

  const titleColumn = locale === 'en' ? 'title_en' : 'title_tr';
  const excerptColumn = locale === 'en' ? 'excerpt_en' : 'excerpt_tr';
  const categoryColumn = locale === 'en' ? 'category_en' : 'category_tr';

  const { data: posts, error } = await supabase
    .from('posts')
    .select(`id, slug, ${categoryColumn}, ${titleColumn}, ${excerptColumn}, image_url, created_at`)
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
  }

  console.log("Blog page locale:", locale);
  console.log("Using category column:", categoryColumn);
  if (posts && posts.length > 0) {
    console.log("Sample post structure:", posts[0]);
  }

  const formattedPosts = posts?.map(post => ({
    id: post.id.toString(),
    slug: post.slug,
    category: (post as any)[categoryColumn] || (post as any).category_tr, // Fallback to TR category if EN is null
    title: (post as any)[titleColumn] || (post as any).title_tr, // Fallback to TR title
    excerpt: (post as any)[excerptColumn] || (post as any).excerpt_tr, // Fallback to TR excerpt
    image_url: post.image_url,
    created_at: post.created_at,
  })) || [];

  if (formattedPosts.length > 0) {
    console.log("Sample formatted post:", formattedPosts[0]);
    console.log("All categories found:", [...new Set(formattedPosts.map(p => p.category))]);
  }

  const breadcrumbItems = [
    { name: t("home"), href: `/${locale}` },
    { name: t("blog"), href: `/${locale}/blog` }
  ];
  

  // --- 3. Create the BreadcrumbList schema ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://www.draysinakdogan.com${item.href}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* --- 4. Add the visible Breadcrumbs component --- */}
      {/* We add a container to place the breadcrumbs before your client component */}
      <div className="container mx-auto px-6 pt-16">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <BlogPageClient initialPosts={formattedPosts} />
    </>
  );
} 