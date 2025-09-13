// Path: src/app/[lang]/blog/page_client.tsx (Fully Refactored)

'use client';

import { useState, useMemo } from 'react';
import BlogPostCard from '@/components/BlogPostCard';
import AnimatedSection from '@/components/AnimatedSection';
import { motion, Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';

type Post = {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  image_url: string;
  created_at: string;
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: 'easeOut',
      delay: 0.1
    }
  },
};

export default function BlogPageClient({ initialPosts }: { initialPosts: Post[] }) {
  const t = useTranslations('BlogPage');
  const [activeCategory, setActiveCategory] = useState(t('allCategories'));

  const categories = [t('allCategories'), ...Array.from(new Set(initialPosts.map(p => p.category)))];

  const filteredPosts = useMemo(() => {
    if (activeCategory === t('allCategories')) return initialPosts;
    return initialPosts.filter(post => post.category === activeCategory);
  }, [activeCategory, initialPosts, t]);

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  return (
    <>
      <section className="w-full bg-gradient-to-b from-white to-primary-lightest py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl font-bold text-primary">{t('title')}</h1>
          <p className="font-sans text-lg text-text-light mt-4 max-w-3xl mx-auto">
            {t('description')}
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

          {featuredPost && (
            <AnimatedSection className="mb-16">
               <motion.div variants={itemVariants}>
                  <BlogPostCard post={featuredPost} isFeatured={true} />
               </motion.div>
            </AnimatedSection>
          )}

          <AnimatedSection
            tag="div"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {otherPosts.map((post, index) => (
              <motion.div 
                key={post.id} 
                variants={itemVariants}
                custom={index}
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