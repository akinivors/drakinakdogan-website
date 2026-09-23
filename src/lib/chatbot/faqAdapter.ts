// Adapts this project's own Supabase `faqs` table into the flat FAQItem[]
// shape the chatbot's flow graph groups by category. Query + _tr-fallback
// pattern mirrors src/app/[lang]/hasta-rehberi/page.tsx exactly - same
// locale-suffixed columns (question_tr/en, answer_tr/en, category_tr/en),
// same fallback to the _tr column when _en is null (English coverage on
// this table isn't guaranteed complete). No RLS change needed: the anon
// key already has SELECT on all of `faqs`.
import { supabase } from '@/lib/supabaseClient'

export interface FAQItem {
  id: string
  category: string
  question: string
  answer: string
}

export async function buildFaqItems(locale: string): Promise<FAQItem[]> {
  const questionColumn = locale === 'en' ? 'question_en' : 'question_tr'
  const answerColumn = locale === 'en' ? 'answer_en' : 'answer_tr'
  const categoryColumn = locale === 'en' ? 'category_en' : 'category_tr'

  const { data: faqs, error } = await supabase
    .from('faqs')
    .select(`*, ${questionColumn}, ${answerColumn}, ${categoryColumn}`)
    .order('id', { ascending: true })

  if (error || !faqs) {
    console.error('chatbot: could not fetch FAQs:', error)
    return []
  }

  return faqs.map(faq => {
    const row = faq as Record<string, unknown>
    return {
      id: String(row.id),
      question: (row[questionColumn] as string) || (row.question_tr as string),
      answer: (row[answerColumn] as string) || (row.answer_tr as string),
      category: (row[categoryColumn] as string) || (row.category_tr as string)
    }
  })
}
