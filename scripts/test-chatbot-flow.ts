// Exhaustive structural verification of the click-only conversation graph,
// for both locales this site serves. Unlike a free-text engine (whose
// input space is infinite, so testing is necessarily sampling), a click-
// only graph's input space is exactly its own set of nodes and options -
// this walks all of it and checks every node/link is sound, not a sample.
//
// Usage: npm run test:chatbot
// (needs NEXT_PUBLIC_SUPABASE_URL/ANON_KEY - loaded via `tsx --env-file`)
import { createTranslator } from 'use-intl/core'
import { buildFlow, ROOT_NODE_ID, type FlowNode } from '../src/lib/chatbot/flow'
import { buildCatalogFromServicesPage } from '../src/lib/chatbot/catalogAdapter'
import { buildFaqItems } from '../src/lib/chatbot/faqAdapter'
import { buildBlogPosts } from '../src/lib/chatbot/blogAdapter'
import { buildTestimonials } from '../src/lib/chatbot/testimonialAdapter'
import { buildJourneyData, buildChecklistData } from '../src/lib/chatbot/journeyAdapter'
import trMessages from '../messages/tr.json'
import enMessages from '../messages/en.json'

type Locale = 'tr' | 'en'
const MESSAGES = { tr: trMessages, en: enMessages } satisfies Record<Locale, typeof trMessages>

interface Issue {
  locale: Locale
  group: string
  detail: string
}
const issues: Issue[] = []
let totalChecks = 0

async function buildLocaleFlow(locale: Locale) {
  const messages = MESSAGES[locale]
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const chatbotT = createTranslator<any, any>({ locale, messages, namespace: 'Chatbot' })
  const servicesT = createTranslator<any, any>({ locale, messages, namespace: 'ServicesPage' })
  const guideT = createTranslator<any, any>({ locale, messages, namespace: 'PatientGuidePage' })
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const catalog = buildCatalogFromServicesPage({
    conditions: servicesT.raw('conditions') as Record<string, string>,
    treatments: servicesT.raw('treatments') as Record<string, string>,
    descriptions: servicesT.raw('descriptions') as Record<string, string>
  })
  const faqItems = await buildFaqItems(locale)
  const blogPosts = await buildBlogPosts(locale)
  const testimonials = await buildTestimonials(locale)
  const journeyData = buildJourneyData(guideT)
  const checklistData = buildChecklistData(guideT)
  const flow = buildFlow(locale, (key: string) => chatbotT(key), { catalog, faqItems, blogPosts, journeyData, checklistData, testimonials })
  return { flow, catalog, faqItems, blogPosts, testimonials }
}

// Every option.target must resolve to a real node - a typo'd or stale id
// here is a silent dead click (nothing happens, or a crash, depending on
// how the widget handles a missing node).
function checkLinksResolve(locale: Locale, flow: Record<string, FlowNode>) {
  for (const node of Object.values(flow)) {
    for (const option of node.options) {
      totalChecks++
      if (!flow[option.target]) {
        issues.push({
          locale,
          group: 'dangling-option-target',
          detail: `node "${node.id}" has an option "${option.label}" -> "${option.target}", which does not exist`
        })
      }
    }
  }
}

// Every node must be reachable from root by clicking through options -
// content nobody can ever click into is as broken as a dangling link, just
// silent instead of a crash.
function checkAllReachable(locale: Locale, flow: Record<string, FlowNode>) {
  totalChecks++
  const visited = new Set<string>([ROOT_NODE_ID])
  const queue = [ROOT_NODE_ID]
  while (queue.length > 0) {
    const current = queue.shift()!
    for (const option of flow[current]?.options ?? []) {
      if (!visited.has(option.target)) {
        visited.add(option.target)
        queue.push(option.target)
      }
    }
  }
  const unreachable = Object.keys(flow).filter(id => !visited.has(id))
  if (unreachable.length > 0) {
    issues.push({ locale, group: 'unreachable-node', detail: `${unreachable.length} node(s) unreachable from root: ${unreachable.join(', ')}` })
  }
}

// A node with no forward options is only escapable via Back/Main Menu
// (always available in the widget once history.length > 1) - but it should
// still give the visitor something concrete to DO, not just a way out.
function checkLeavesHaveCta(locale: Locale, flow: Record<string, FlowNode>) {
  for (const node of Object.values(flow)) {
    totalChecks++
    if (node.options.length === 0 && !node.cta) {
      issues.push({ locale, group: 'dead-end-no-cta', detail: `node "${node.id}" has no options and no cta` })
    }
  }
}

// Forward options must form a DAG rooted at root, with exactly one
// deliberate exception: every content-bearing node's own "I have another
// question" option, which always targets root by design (see flow.ts) -
// excluded here, not treated as a cycle. Anything else looping back to an
// ancestor is a real bug (e.g. a node accidentally pointing at a category
// list instead of a specific item), distinct from that one intentional
// edge type and from the widget's Back/Main-Menu controls, which live
// outside node.options entirely.
function checkNoForwardCycles(locale: Locale, flow: Record<string, FlowNode>) {
  totalChecks++
  const cycles: string[] = []
  const WHITE = 0, GRAY = 1, BLACK = 2
  const color = new Map<string, number>(Object.keys(flow).map(id => [id, WHITE]))

  function visit(id: string, path: string[]) {
    color.set(id, GRAY)
    for (const option of flow[id]?.options ?? []) {
      if (option.target === ROOT_NODE_ID) continue // the intentional "another question" edge
      if (!flow[option.target]) continue // reported separately by checkLinksResolve
      const c = color.get(option.target)
      if (c === GRAY) cycles.push(`${[...path, id, option.target].join(' -> ')}`)
      else if (c === WHITE) visit(option.target, [...path, id])
    }
    color.set(id, BLACK)
  }
  visit(ROOT_NODE_ID, [])

  if (cycles.length > 0) {
    issues.push({ locale, group: 'forward-option-cycle', detail: cycles.join(' | ') })
  }
}

// Content completeness: every real catalog item / FAQ / published blog
// post must have exactly one corresponding node, so a 20th blog post added
// later (or a service/FAQ removed) is caught rather than silently drifting
// out of sync with what buildFlow actually produced.
function checkContentCompleteness(
  locale: Locale,
  flow: Record<string, FlowNode>,
  data: { catalog: { slug: string }[]; faqItems: { id: string }[]; blogPosts: { id: string }[]; testimonials: { id: string; quote: string }[] }
) {
  for (const item of data.catalog) {
    totalChecks++
    if (!flow[`service-${item.slug}`]) issues.push({ locale, group: 'missing-service-node', detail: `catalog item "${item.slug}" has no service-${item.slug} node` })
  }
  for (const faq of data.faqItems) {
    totalChecks++
    if (!flow[`faq-${faq.id}`]) issues.push({ locale, group: 'missing-faq-node', detail: `FAQ id ${faq.id} has no faq-${faq.id} node` })
  }
  for (const post of data.blogPosts) {
    totalChecks++
    if (!flow[`blog-post-${post.id}`]) issues.push({ locale, group: 'missing-blog-post-node', detail: `blog post id ${post.id} has no blog-post-${post.id} node` })
  }
  // Testimonials share one node (capped at 5, newest first - see flow.ts) -
  // completeness here means every one of the first 5 approved quotes
  // actually appears in that node's content, not one node per item.
  for (const testimonial of data.testimonials.slice(0, 5)) {
    totalChecks++
    if (!flow['testimonials']?.content.includes(testimonial.quote)) {
      issues.push({ locale, group: 'missing-testimonial-quote', detail: `testimonial id ${testimonial.id} not found in the testimonials node` })
    }
  }
}

const BAD_TOKENS = ['undefined', 'null', 'NaN', '[object Object]']
// The exact symptom seen (and fixed) multiple times this session when a
// dev-server message cache went stale: next-intl falls through to printing
// the literal lookup key instead of throwing, so nothing crashes - only a
// content scan like this catches it if it ever reached shipped data instead
// of just a local dev artifact.
const UNRESOLVED_KEY_PATTERN = /\b(Chatbot|PatientGuidePage|ServicesPage)\.[a-zA-Z]/

// Per-node content well-formedness: non-empty content/labels/cta text, no
// stray "undefined"/"null"/etc. from a bad interpolation, no unresolved
// translation-key artifacts, and every cta.href is a real link shape (an
// internal path, a tel: link, or genuinely external) rather than an empty
// or malformed string.
function checkContentWellFormed(locale: Locale, flow: Record<string, FlowNode>) {
  for (const node of Object.values(flow)) {
    totalChecks++
    if (!node.content || node.content.trim().length === 0) {
      issues.push({ locale, group: 'empty-node-content', detail: `node "${node.id}" has empty content` })
    } else {
      for (const token of BAD_TOKENS) {
        totalChecks++
        if (node.content.includes(token)) {
          issues.push({ locale, group: 'bad-token-in-content', detail: `node "${node.id}" content contains "${token}"` })
        }
      }
      totalChecks++
      if (UNRESOLVED_KEY_PATTERN.test(node.content)) {
        issues.push({ locale, group: 'unresolved-translation-key', detail: `node "${node.id}" content looks like an unresolved key: ${node.content.slice(0, 80)}` })
      }
    }

    for (const option of node.options) {
      totalChecks++
      if (!option.label || option.label.trim().length === 0) {
        issues.push({ locale, group: 'empty-option-label', detail: `node "${node.id}" has an option with an empty label (target: ${option.target})` })
      }
    }

    if (node.cta) {
      totalChecks++
      if (!node.cta.text || node.cta.text.trim().length === 0) {
        issues.push({ locale, group: 'empty-cta-text', detail: `node "${node.id}" has a cta with empty text` })
      }
      totalChecks++
      const href = node.cta.href
      if (!href || !(href.startsWith('/') || href.startsWith('tel:') || href.startsWith('http'))) {
        issues.push({ locale, group: 'malformed-cta-href', detail: `node "${node.id}" has a malformed cta href: "${href}"` })
      }
    }
  }
}

// Two buttons with the same visible label in the same menu are impossible
// for a visitor to tell apart, even if they correctly point to different
// content - a real UX bug distinct from anything already checked above.
function checkNoDuplicateLabelsInMenu(locale: Locale, flow: Record<string, FlowNode>) {
  for (const node of Object.values(flow)) {
    if (node.options.length < 2) continue
    totalChecks++
    const counts = new Map<string, number>()
    for (const option of node.options) counts.set(option.label, (counts.get(option.label) ?? 0) + 1)
    const dupes = [...counts.entries()].filter(([, count]) => count > 1)
    if (dupes.length > 0) {
      issues.push({ locale, group: 'duplicate-option-label-in-menu', detail: `node "${node.id}": ${dupes.map(([l, c]) => `"${l}" x${c}`).join(', ')}` })
    }
  }
}

// Raw data-integrity check, independent of graph structure: two blog posts
// (or FAQs, or catalog items) sharing a title/question is confusing even if
// they land in different menus, and two posts sharing a slug is worse - one
// post's "read the full article" link would silently open the wrong page.
// Source data lives in Supabase, editable outside this codebase, so this
// can't be caught by anything that only inspects the graph's own code.
function checkNoDuplicateRawContent(
  locale: Locale,
  data: { faqItems: { question: string }[]; blogPosts: { title: string; slug: string }[]; catalog: { title: string; slug: string }[] }
) {
  const checkDupes = (label: string, items: string[]) => {
    totalChecks++
    const counts = new Map<string, number>()
    for (const item of items) counts.set(item, (counts.get(item) ?? 0) + 1)
    const dupes = [...counts.entries()].filter(([, count]) => count > 1)
    if (dupes.length > 0) {
      issues.push({ locale, group: `duplicate-${label}`, detail: dupes.map(([v, c]) => `"${v}" x${c}`).join(', ') })
    }
  }
  checkDupes('faq-question', data.faqItems.map(f => f.question))
  checkDupes('blog-title', data.blogPosts.map(p => p.title))
  checkDupes('blog-slug', data.blogPosts.map(p => p.slug))
  checkDupes('catalog-title', data.catalog.map(c => c.title))
  checkDupes('catalog-slug', data.catalog.map(c => c.slug))
}

async function main() {
  for (const locale of ['tr', 'en'] as const) {
    const { flow, catalog, faqItems, blogPosts, testimonials } = await buildLocaleFlow(locale)
    console.log(`${locale}: ${Object.keys(flow).length} nodes, ${catalog.length} services, ${faqItems.length} FAQs, ${blogPosts.length} blog posts, ${testimonials.length} testimonials`)

    checkLinksResolve(locale, flow)
    checkAllReachable(locale, flow)
    checkLeavesHaveCta(locale, flow)
    checkNoForwardCycles(locale, flow)
    checkContentCompleteness(locale, flow, { catalog, faqItems, blogPosts, testimonials })
    checkContentWellFormed(locale, flow)
    checkNoDuplicateLabelsInMenu(locale, flow)
    checkNoDuplicateRawContent(locale, { faqItems, blogPosts, catalog })
  }

  console.log(`\nRan ${totalChecks} checks.\n`)

  const byGroup = new Map<string, Issue[]>()
  for (const issue of issues) {
    const key = `${issue.locale}: ${issue.group}`
    if (!byGroup.has(key)) byGroup.set(key, [])
    byGroup.get(key)!.push(issue)
  }
  for (const [group, groupIssues] of byGroup) {
    console.log(`\n=== ${group} (${groupIssues.length}) ===`)
    for (const issue of groupIssues.slice(0, 20)) console.log(`  ${issue.detail}`)
    if (groupIssues.length > 20) console.log(`  ... and ${groupIssues.length - 20} more`)
  }

  console.log(`\n${issues.length} total flagged item(s) across ${byGroup.size} group(s).`)
  if (issues.length > 0) process.exitCode = 1
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
