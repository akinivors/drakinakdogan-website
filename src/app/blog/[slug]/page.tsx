import Image from 'next/image';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import ReactMarkdown from 'react-markdown';

// This is also a Server Component
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug) // Find the post with the matching slug
    .single(); // Expect only one result

  if (error || !post) {
    notFound(); // If no post is found, show a 404 page
  }

  return (
    <article className="bg-white">
      <div className="relative w-full h-80 md:h-96">
        <Image
          src={post.image_url || '/placeholder-image-1.jpg'}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <p className="font-sans text-base font-medium text-accent mb-2">{post.category}</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-8">
            {post.title}
          </h1>
          {/* Use ReactMarkdown to safely render the content */}
          <div className="prose prose-lg max-w-none prose-h2:font-serif prose-h2:text-primary prose-blockquote:border-accent prose-blockquote:text-text-light">
            <ReactMarkdown>{post.content || ''}</ReactMarkdown>
          </div>
        </div>
      </div>
    </article>
  );
} 