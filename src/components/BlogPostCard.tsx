import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogPostCardProps {
  post: {
    id: string;
    slug: string;
    category: string;
    title: string;
    excerpt: string;
    image_url: string;
    created_at: string;
  };
  isFeatured?: boolean;
}

export default function BlogPostCard({ post, isFeatured = false }: BlogPostCardProps) {
  if (isFeatured) {
    return (
      <motion.div className="bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl">
        <Link href={`/blog/${post.slug}`} className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative w-full h-64 md:h-full min-h-[300px]">
            <Image src={post.image_url || '/placeholder-image-1.jpg'} alt={post.title} fill className="object-cover" />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <p className="font-sans text-sm font-medium text-accent mb-2">{post.category}</p>
            <h3 className="font-serif text-3xl font-bold text-text-main mb-4">{post.title}</h3>
            <p className="font-sans text-text-light mb-6">{post.excerpt}</p>
            <div className="font-sans font-bold text-primary flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
              Daha Fazla Oku <ArrowRight size={16} />
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Regular Card
  return (
    <motion.div className="bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl h-full">
      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
        <div className="relative w-full h-56">
          <Image src={post.image_url || '/placeholder-image-1.jpg'} alt={post.title} fill className="object-cover" />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <p className="font-sans text-sm font-medium text-accent mb-2">{post.category}</p>
          <h3 className="font-serif text-xl font-bold text-text-main mb-3">{post.title}</h3>
          <p className="font-sans text-text-light mb-4 flex-grow">{post.excerpt}</p>
          <div className="font-sans font-bold text-primary flex items-center gap-2 group-hover:gap-3 transition-all duration-300 mt-auto">
            Daha Fazla Oku <ArrowRight size={16} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 