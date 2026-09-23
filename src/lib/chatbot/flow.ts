// Builds this project's entire click-only conversation graph, per locale,
// from its own content sources (ServicesPage catalog, Patient Guide
// journey/checklist copy, Supabase FAQs, blog posts, and testimonials) and
// copy (the Chatbot messages namespace). Every node is plain, serializable
// data - no matching, no typo correction, no free-text classification of
// any kind. A visitor can only ever reach a node by clicking one of the
// previous node's own listed options, so "does the right content show up"
// is a question about this file's data, not about how well some parser
// guessed at what a visitor typed.
//
// href is precomputed here (not left to the widget to branch on
// action/locale) because every CTA in this project is either a same-site
// page (needs the current locale prefixed) or a bare `tel:` link (must NOT
// be locale-prefixed) - deciding that once, here, where the locale is
// already in scope, is simpler than threading an action enum through the
// widget's render logic for a distinction that never varies by node.
import type { CatalogItem } from './catalogAdapter'
import type { FAQItem } from './faqAdapter'
import type { BlogPost } from './blogAdapter'
import type { JourneyData, ChecklistData } from './journeyAdapter'
import type { Testimonial } from './testimonialAdapter'

export interface FlowOption {
  label: string
  target: string
}

export interface FlowNode {
  id: string
  content: string
  options: FlowOption[]
  cta?: { text: string; href: string }
}

export const ROOT_NODE_ID = 'root'

interface Translator {
  (key: string): string
}

// Cross-links from a service detail screen to blog posts / FAQs actually
// about that same thing - real connections, not a generic "browse more"
// link on every item. Built by reading every blog category's real post
// titles and every FAQ's real question text (see flow.ts's own git history/
// PR description, not repeated here) rather than guessed from the slug -
// e.g. polikistik-over-sendromu -> KADIN SAĞLIĞI/WOMEN'S HEALTH is only
// listed because that category contains an actual dedicated PCOS post, not
// because the names sound related. An item with neither is left with no
// cross-link rather than a forced, inaccurate one - most of this clinic's
// more specialized conditions (uterine anomalies, tubal blockage,
// hypogonadotropic hypogonadism) simply don't have dedicated blog or FAQ
// coverage yet.
//
// Keyed per-locale (not one string reused for both): blogAdapter.ts
// normalizes category_tr/category_en into locale-appropriate display
// strings ("İNFERTİLİTE" vs "INFERTILITY"), so a single hardcoded category
// name would only ever match one locale's actual data. Found by comparing
// the built TR and EN graphs side by side - not a crash, not a dangling
// link (the graph stays fully valid either way), just a whole cross-link
// silently never appearing for one language while working in the other.
const RELATED_BLOG_CATEGORY: Record<string, { tr: string; en: string }> = {
  'tup-bebek': { tr: 'TÜP BEBEK', en: 'IVF' },
  'infertilite': { tr: 'İNFERTİLİTE', en: 'INFERTILITY' },
  'yumurta-dondurma': { tr: 'DOĞURGANLIK KORUMA', en: 'FERTILITY PRESERVATION' },
  'polikistik-over-sendromu': { tr: 'KADIN SAĞLIĞI', en: "WOMEN'S HEALTH" },
  'endometriozis': { tr: 'KADIN SAĞLIĞI', en: "WOMEN'S HEALTH" },
  'yapay-zeka-embriyo': { tr: 'TÜP BEBEK', en: 'IVF' },
  'mikroenjeksiyon': { tr: 'TÜP BEBEK', en: 'IVF' },
  'embriyoskop-takip': { tr: 'TÜP BEBEK', en: 'IVF' },
  'genetik-tani': { tr: 'TÜP BEBEK', en: 'IVF' }
}
// Whether this item's real content should also offer "Related Questions" ->
// the FAQ menu - only for items at least one real FAQ question is actually
// about (checked against the live question text, not assumed from category).
const RELATED_FAQ_SLUGS = new Set([
  'tup-bebek', 'infertilite', 'azalmis-over-rezervi', 'mikroenjeksiyon', 'embriyoskop-takip'
])

export function buildFlow(
  locale: string,
  t: Translator,
  data: {
    catalog: CatalogItem[]
    faqItems: FAQItem[]
    blogPosts: BlogPost[]
    journeyData: JourneyData
    checklistData: ChecklistData
    testimonials: Testimonial[]
  }
): Record<string, FlowNode> {
  const nodes: Record<string, FlowNode> = {}
  const add = (node: FlowNode) => { nodes[node.id] = node }

  const bookingCta = { text: t('defaultCtaText'), href: `/${locale}/iletisim#form` }

  // --- Root -----------------------------------------------------------
  add({
    id: ROOT_NODE_ID,
    content: t('initialGreeting'),
    options: [
      { label: t('rootOptionServices'), target: 'services' },
      { label: t('rootOptionJourney'), target: 'journey' },
      { label: t('rootOptionFaq'), target: 'faq' },
      { label: t('rootOptionBlog'), target: 'blog' },
      { label: t('rootOptionTestimonials'), target: 'testimonials' },
      { label: t('rootOptionBooking'), target: 'booking' },
      { label: t('rootOptionClinicInfo'), target: 'clinic-info' },
      { label: t('rootOptionEmergency'), target: 'emergency' }
    ]
  })

  // --- Services: conditions vs. treatments, then one screen per item,
  // plus cross-links into blog/FAQ content genuinely about that item -----
  const conditions = data.catalog.filter(item => item.group === 'condition')
  const treatments = data.catalog.filter(item => item.group === 'treatment')
  const blogCategoriesPresent = new Set(data.blogPosts.map(p => p.category))

  add({
    id: 'services',
    content: t('viewTreatmentsIntro'),
    options: [
      { label: t('servicesOptionConditions'), target: 'services-conditions' },
      { label: t('servicesOptionTreatments'), target: 'services-treatments' }
    ]
  })
  add({
    id: 'services-conditions',
    content: t('catalogNoItemPrompt'),
    options: conditions.map(item => ({ label: item.title, target: `service-${item.slug}` }))
  })
  add({
    id: 'services-treatments',
    content: t('catalogNoItemPrompt'),
    options: treatments.map(item => ({ label: item.title, target: `service-${item.slug}` }))
  })
  const localeKey = locale === 'en' ? 'en' : 'tr'
  for (const item of data.catalog) {
    const description = item.what ? `\n\n${item.what}` : ''
    const options: FlowOption[] = []
    const relatedCategory = RELATED_BLOG_CATEGORY[item.slug]?.[localeKey]
    if (relatedCategory && blogCategoriesPresent.has(relatedCategory)) {
      options.push({ label: t('relatedArticlesLabel'), target: `blog-cat-${relatedCategory}` })
    }
    if (RELATED_FAQ_SLUGS.has(item.slug) && data.faqItems.length > 0) {
      options.push({ label: t('relatedQuestionsLabel'), target: 'faq' })
    }
    add({
      id: `service-${item.slug}`,
      content: `**${item.title}**${description}\n\n${t('catalogAskConsultation')}`,
      options,
      cta: bookingCta
    })
  }

  // --- Treatment journey: infertility evaluation vs. IVF process, each a
  // menu of its real steps -----------------------------------------------
  add({
    id: 'journey',
    content: `${data.journeyData.title}\n\n${data.journeyData.description}`,
    options: [
      { label: data.journeyData.infertility.label, target: 'journey-infertility' },
      { label: data.journeyData.ivf.label, target: 'journey-ivf' }
    ]
  })
  for (const [key, journey] of [['infertility', data.journeyData.infertility], ['ivf', data.journeyData.ivf]] as const) {
    add({
      id: `journey-${key}`,
      content: t('journeyStepPrompt'),
      options: journey.steps.map((step, i) => ({ label: step.title, target: `journey-${key}-step-${i + 1}` }))
    })
    journey.steps.forEach((step, i) => {
      add({
        id: `journey-${key}-step-${i + 1}`,
        content: `**${step.title}**\n\n${step.description}\n\n${t('catalogAskConsultation')}`,
        options: [],
        cta: bookingCta
      })
    })
  }

  // --- FAQ: category, then question, then answer -----------------------
  const faqCategories = [...new Set(data.faqItems.map(faq => faq.category))]
  add({
    id: 'faq',
    content: t('faqMenuPrompt'),
    options: faqCategories.map(category => ({ label: category, target: `faq-cat-${category}` }))
  })
  for (const category of faqCategories) {
    add({
      id: `faq-cat-${category}`,
      content: t('faqCategoryPrompt'),
      options: data.faqItems
        .filter(faq => faq.category === category)
        .map(faq => ({ label: faq.question, target: `faq-${faq.id}` }))
    })
  }
  for (const faq of data.faqItems) {
    add({ id: `faq-${faq.id}`, content: faq.answer, options: [], cta: bookingCta })
  }

  // --- Blog: category, then post, then excerpt + link to the real page -
  const blogCategories = [...new Set(data.blogPosts.map(post => post.category))]
  add({
    id: 'blog',
    content: t('blogMenuPrompt'),
    options: blogCategories.map(category => ({ label: category, target: `blog-cat-${category}` }))
  })
  for (const category of blogCategories) {
    add({
      id: `blog-cat-${category}`,
      content: t('blogCategoryPrompt'),
      options: data.blogPosts
        .filter(post => post.category === category)
        .map(post => ({ label: post.title, target: `blog-post-${post.id}` }))
    })
  }
  for (const post of data.blogPosts) {
    add({
      id: `blog-post-${post.id}`,
      content: `**${post.title}**\n\n${post.excerpt}`,
      options: [],
      cta: { text: t('readFullArticleText'), href: `/${locale}/blog/${post.slug}` }
    })
  }

  // --- Testimonials: every real, moderator-approved review in one screen.
  // Capped at 5 - not a hard content limit, just keeps a single message
  // from growing unbounded as more get approved over time. ---------------
  add({
    id: 'testimonials',
    content: data.testimonials.length > 0
      ? `${t('testimonialsIntro')}\n\n${data.testimonials.slice(0, 5).map(item => `"${item.quote}"\n— ${item.author}`).join('\n\n')}`
      : t('testimonialsIntro'),
    options: [],
    cta: bookingCta
  })

  // --- Clinic info + the standalone logistics leaves --------------------
  add({
    id: 'clinic-info',
    content: t('clinicInfoMenuPrompt'),
    options: [
      { label: t('clinicInfoOptionHours'), target: 'hours-location' },
      { label: t('clinicInfoOptionContact'), target: 'contact' },
      { label: t('clinicInfoOptionDoctor'), target: 'doctor-info' },
      { label: t('clinicInfoOptionChecklist'), target: 'checklist' }
    ]
  })
  add({ id: 'booking', content: t('bookingResponse'), options: [], cta: bookingCta })
  add({ id: 'hours-location', content: t('hoursResponse'), options: [], cta: bookingCta })
  add({ id: 'contact', content: t('contactResponse'), options: [], cta: bookingCta })
  add({
    id: 'doctor-info',
    content: t('doctorResponse'),
    options: [],
    cta: { text: t('doctorCtaText'), href: `/${locale}/hakkimda` }
  })
  add({
    id: 'checklist',
    content: [
      `**${data.checklistData.title}**`,
      data.checklistData.description,
      `**${data.checklistData.documentsTitle}**`,
      data.checklistData.documents.map(d => `* ${d}`).join('\n'),
      `**${data.checklistData.notesTitle}**`,
      data.checklistData.notes.map(n => `* ${n}`).join('\n'),
      data.checklistData.finalNote
    ].join('\n\n'),
    options: [],
    cta: bookingCta
  })
  add({
    id: 'emergency',
    content: t('emergencyResponse'),
    options: [],
    cta: { text: t('emergencyCtaText'), href: 'tel:112' }
  })

  // Every content-bearing node (identified by having a cta - every such node
  // was otherwise a dead end for in-chat navigation, reachable again only
  // via the widget's header Back/Main-Menu icons) gets an explicit "I have
  // another question" option back to the main menu. Done as one pass over
  // the finished graph, not repeated on each `add()` call above, so it's
  // impossible for a future node to be added and accidentally miss it.
  // Deliberately excluded: 'emergency' - inviting a visitor mid-emergency to
  // "ask something else" undercuts the message to call 112 instead of using
  // this chat at all.
  for (const node of Object.values(nodes)) {
    if (node.cta && node.id !== 'emergency') {
      node.options = [...node.options, { label: t('anotherQuestionLabel'), target: ROOT_NODE_ID }]
    }
  }

  return nodes
}
