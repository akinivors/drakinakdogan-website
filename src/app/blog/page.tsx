import { supabase } from '@/lib/supabaseClient';
import BlogPageClient from './page_client'; // Import the component we just created

export const metadata = {
  title: 'Tüp Bebek & İnfertilite Blogu | Güncel Bilgiler - Dr. Ayşin Akdoğan',
  description: 'Tüp bebek süreci, başarı oranları, PCOS ve endometriozis gibi konularda en güncel bilimsel makaleler ve hasta rehberleri.'
};

// This parent component fetches the data on the server
export default async function BlogPage() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, slug, category, title, excerpt, image_url, created_at') // Select only needed fields
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
  }

  // Convert id to string to match our interface
  const formattedPosts = posts?.map(post => ({
    ...post,
    id: post.id.toString()
  })) || [];

  return <BlogPageClient initialPosts={formattedPosts} />;
} 