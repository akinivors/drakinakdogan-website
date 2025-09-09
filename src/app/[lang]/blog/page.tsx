import { supabase } from '@/lib/supabaseClient';
import BlogPageClient from './page_client';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs'; // --- 1. Import Breadcrumbs ---

export const metadata: Metadata = {
  title: 'Tüp Bebek & İnfertilite Blogu | Güncel Bilgiler - Dr. Ayşin Akdoğan',
  description: 'Tüp bebek süreci, başarı oranları, PCOS ve endometriozis gibi konularda en güncel bilimsel makaleler ve hasta rehberleri.'
};

export default async function BlogPage() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, slug, category, title, excerpt, image_url, created_at')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
  }

  const formattedPosts = posts?.map(post => ({
    ...post,
    id: post.id.toString()
  })) || [];

  // --- 2. Define the breadcrumb path for this page ---
  const breadcrumbItems = [
    { name: "Anasayfa", href: "/" },
    { name: "Blog", href: "/blog" }
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