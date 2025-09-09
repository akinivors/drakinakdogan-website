'use client';

import { useState, useMemo } from 'react';
import BlogPostCard from '@/components/BlogPostCard';
import AnimatedSection from '@/components/AnimatedSection';
import { motion, Variants } from 'framer-motion';

type Post = {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  image_url: string;
  created_at: string;
};

// Define the animation for each individual item in the grid
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, // Slightly longer duration for smoother mobile animation
      ease: 'easeOut',
      delay: 0.1 // Small delay to ensure proper triggering
    }
  },
};

export default function BlogPageClient({ initialPosts }: { initialPosts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState('Tümü');

  const categories = ['Tümü', ...Array.from(new Set(initialPosts.map(p => p.category)))];

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'Tümü') return initialPosts;
    return initialPosts.filter(post => post.category === activeCategory);
  }, [activeCategory, initialPosts]);

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  return (
    <>
      {/* Section 1: Page Header */}
      <section className="w-full bg-gradient-to-b from-white to-primary-lightest py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl font-bold text-primary">Blog & Makaleler</h1>
          <p className="font-sans text-lg text-text-light mt-4 max-w-3xl mx-auto">
            Kadın sağlığı, gebelik ve infertilite üzerine güncel bilgiler, ipuçları ve bilimsel gelişmeleri takip edin.
          </p>
        </div>
      </section>

      <section className="w-full bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="flex justify-center flex-wrap gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`font-sans font-medium px-4 py-2 rounded-full transition-colors duration-200 ${
                  activeCategory === category 
                    ? 'bg-primary text-white' 
                    : 'bg-gradient-to-b from-white to-primary-lightest text-text-main hover:bg-primary/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Post with its own animation */}
          {featuredPost && (
            <AnimatedSection className="mb-16">
               <motion.div variants={itemVariants}>
                  <BlogPostCard post={featuredPost} isFeatured={true} />
               </motion.div>
            </AnimatedSection>
          )}

          {/* Regular Post Grid with staggered animation */}
          <AnimatedSection
            tag="div"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {otherPosts.map((post, index) => (
              <motion.div 
                key={post.id} 
                variants={itemVariants}
                custom={index} // Pass index for potential custom animation timing
              >
                <BlogPostCard post={post} />
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </section>
    </>
  );
} 