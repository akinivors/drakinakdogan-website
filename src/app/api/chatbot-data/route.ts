// Path: src/app/api/chatbot-data/route.ts
//
// Server-side assembly of this locale's catalog (from next-intl messages),
// FAQ list, blog posts, and testimonials (all three from Supabase) - plain,
// genuinely JSON-serializable data only. The client provider builds the
// full conversation flow graph itself (see ChatbotFlowProvider.tsx) from
// the plain data this route returns, plus its own separate
// useTranslations('PatientGuidePage') for the journey/checklist content
// (static per-locale messages data, no Supabase involved, so no reason to
// round-trip it through this route too).
//
// Isolating the data-fetch behind its own route - rather than fetching in
// [lang]/layout.tsx, which wraps every page on the site - keeps the
// chatbot's DB dependency contained to its own component subtree; a
// Supabase hiccup here can't affect any other page's render.
import { buildCatalog } from '@/lib/chatbot/catalogAdapter'
import { buildFaqItems } from '@/lib/chatbot/faqAdapter'
import { buildBlogPosts } from '@/lib/chatbot/blogAdapter'
import { buildTestimonials } from '@/lib/chatbot/testimonialAdapter'

export const revalidate = 300

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lang = searchParams.get('lang')
  const locale = lang === 'en' ? 'en' : 'tr'

  try {
    const [catalog, faqItems, blogPosts, testimonials] = await Promise.all([
      buildCatalog(locale),
      buildFaqItems(locale),
      buildBlogPosts(locale),
      buildTestimonials(locale)
    ])
    return Response.json({ catalog, faqItems, blogPosts, testimonials })
  } catch (error) {
    console.error('chatbot-data route failed:', error)
    // Degrade to empty content rather than a hard error - the flow graph's
    // menu nodes simply get zero options under them if content is briefly
    // unavailable, rather than the whole widget breaking.
    return Response.json({ catalog: [], faqItems: [], blogPosts: [], testimonials: [] })
  }
}
