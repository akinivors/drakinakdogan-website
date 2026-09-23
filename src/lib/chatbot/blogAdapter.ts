// Adapts this project's own Supabase `posts` table into the flat shape the
// chatbot's flow graph groups by category. Query + _tr-fallback pattern
// mirrors faqAdapter.ts exactly - same locale-suffixed columns
// (title_tr/en, excerpt_tr/en, category_tr/en), same fallback to the _tr
// column when _en is null. No RLS change needed: the anon key already has
// SELECT on all of `posts` (the public blog list/detail pages use it the
// same way). Only published posts are returned, matching
// src/app/[lang]/blog/page.tsx's own `.eq('is_published', true)` filter.
import { supabase } from '@/lib/supabaseClient'

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
}

// The live table has category_tr values that are ALL-CAPS ("TÜP BEBEK")
// except two rows using mixed case ("Tüp Bebek") for the same real
// category - the site's own category-filter buttons dedupe on the raw
// string, so that inconsistency already renders as two separate filter
// buttons there. Normalizing to uppercase (locale-aware, so a Turkish 'i'
// becomes 'İ' not 'I') folds that back into one category everywhere a
// consumer groups posts by it, matching the casing every OTHER category
// already uses.
function normalizeCategory(locale: string, category: string): string {
  return locale === 'en' ? category.toUpperCase() : category.toLocaleUpperCase('tr')
}

export async function buildBlogPosts(locale: string): Promise<BlogPost[]> {
  const titleColumn = locale === 'en' ? 'title_en' : 'title_tr'
  const excerptColumn = locale === 'en' ? 'excerpt_en' : 'excerpt_tr'
  const categoryColumn = locale === 'en' ? 'category_en' : 'category_tr'

  const { data: posts, error } = await supabase
    .from('posts')
    .select(`id, slug, ${titleColumn}, ${excerptColumn}, ${categoryColumn}`)
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (error || !posts) {
    console.error('chatbot: could not fetch blog posts:', error)
    return []
  }

  return posts.map(post => {
    const row = post as Record<string, unknown>
    return {
      id: String(row.id),
      slug: row.slug as string,
      title: (row[titleColumn] as string) || (row.title_tr as string),
      excerpt: (row[excerptColumn] as string) || (row.excerpt_tr as string),
      category: normalizeCategory(locale, (row[categoryColumn] as string) || (row.category_tr as string))
    }
  })
}
