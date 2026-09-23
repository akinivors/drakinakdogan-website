// Adapts this project's own Supabase `testimonials` table into the flat
// Testimonial[] shape the chatbot's flow graph shows as a single "what our
// patients say" node. Query mirrors src/app/[lang]/page.tsx's own homepage
// query exactly - same `.eq('is_approved', true)` filter (a submission
// defaults to unapproved; showing unapproved quotes in the chatbot would
// bypass the same moderation gate the real site itself respects), same
// locale-suffixed quote column with a fallback chain (quote_{locale} ->
// quote_tr -> the older unsuffixed `quote` column, for rows predating the
// bilingual columns).
import { supabase, queryWithRetry } from '@/lib/supabaseClient'

export interface Testimonial {
  id: string
  author: string
  quote: string
}

export async function buildTestimonials(locale: string): Promise<Testimonial[]> {
  const quoteColumn = locale === 'en' ? 'quote_en' : 'quote_tr'

  const { data, error } = await queryWithRetry(() =>
    supabase
      .from('testimonials')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
  )

  if (error || !data) {
    console.error('chatbot: could not fetch testimonials:', error)
    return []
  }

  return data.map(row => {
    const r = row as Record<string, unknown>
    return {
      id: String(r.id),
      author: r.author as string,
      quote: (r[quoteColumn] as string) || (r.quote_tr as string) || (r.quote as string)
    }
  })
}
