import Image from 'next/image';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import ReactMarkdown from 'react-markdown';
import { Metadata } from 'next';
import Accordion from '@/components/Accordion';

// Define the shape of a single FAQ item stored in your JSONB column
type FaqItem = {
  question: string;
  answer: string;
};

// Define the complete shape of a Post from your Supabase table
type Post = {
  id: number;
  created_at: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  image_url: string;
  content: string;
  is_published: boolean;
  faqs?: FaqItem[];
};

// Define JSON-LD schema types
type ArticleSchema = {
  "@type": "Article";
  "headline": string;
  "author": {
    "@type": "Person";
    "name": string;
    "url": string;
  };
  "image": string;
  "publisher": {
    "@type": "Organization";
    "name": string;
    "logo": {
      "@type": "ImageObject";
      "url": string;
    };
  };
  "datePublished": string;
};

type FaqSchema = {
  "@type": "FAQPage";
  "mainEntity": Array<{
    "@type": "Question";
    "name": string;
    "acceptedAnswer": {
      "@type": "Answer";
      "text": string;
    };
  }>;
};

type JsonLdSchema = {
  "@context": string;
  "@graph": Array<ArticleSchema | FaqSchema>;
};

// Define the props passed by Next.js to the page and metadata function
type Props = {
  params: Promise<{ slug: string }>;
};

// --- DYNAMIC METADATA FUNCTION ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await supabase
    .from('posts')
    .select('title, excerpt')
    .eq('slug', slug)
    .single();

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

// --- THE MAIN PAGE COMPONENT ---
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single<Post>();

  if (error || !post) {
    notFound();
  }
  
  // --- DYNAMIC JSON-LD SCHEMA GENERATION ---
  const articleSchema: ArticleSchema = {
    "@type": "Article",
    "headline": post.title,
    "author": { "@type": "Person", "name": "Op. Dr. Ayşin Akdoğan", "url": "https://www.drayinakdogan.com/hakkimda" },
    "image": post.image_url,
    "publisher": { "@type": "Organization", "name": "Op. Dr. Ayşin Akdoğan Kliniği", "logo": { "@type": "ImageObject", "url": "https://www.drayinakdogan.com/path-to-your-logo.png" }},
    "datePublished": new Date(post.created_at).toISOString()
  };

  const jsonLd: JsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [articleSchema]
  };
  
  if (post.faqs && post.faqs.length > 0) {
    const faqSchema: FaqSchema = {
      "@type": "FAQPage",
      "mainEntity": post.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
    jsonLd["@graph"].push(faqSchema);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
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
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-8">{post.title}</h1>
            <div className="prose prose-lg max-w-none prose-h2:font-serif prose-h2:text-primary prose-blockquote:border-accent prose-blockquote:text-text-light">
              <ReactMarkdown>{post.content || ''}</ReactMarkdown>
            </div>
            
            {post.faqs && post.faqs.length > 0 && (
              <div className="mt-16">
                <h2 className="font-serif text-3xl font-bold text-primary mb-8">Sıkça Sorulan Sorular</h2>
                <Accordion items={post.faqs} />
              </div>
            )}
          </div>
        </div>
      </article>
    </>
  );
} 