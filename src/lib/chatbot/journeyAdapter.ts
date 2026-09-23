// Adapts this project's own Patient Guide content (messages/{locale}.json,
// PatientGuidePage namespace - not chatbot-specific; the same keys feed the
// real /hasta-rehberi page) into the flow graph's journey-walkthrough and
// first-visit-checklist nodes. Pure functions over an already-bound
// translator, same reasoning as catalogAdapter.ts/buildFlow itself: this
// content is static per-locale messages data, already available client-side
// via next-intl's useTranslations - no Supabase round-trip needed, unlike
// FAQs/blog/testimonials.
export interface JourneyStep {
  title: string
  description: string
}

export interface JourneyData {
  title: string
  description: string
  infertility: { label: string; steps: JourneyStep[] }
  ivf: { label: string; steps: JourneyStep[] }
}

export interface ChecklistData {
  title: string
  description: string
  documentsTitle: string
  documents: string[]
  notesTitle: string
  notes: string[]
  finalNote: string
}

interface Translator {
  (key: string): string
  raw(key: string): unknown
}

export function buildJourneyData(t: Translator): JourneyData {
  const infertilitySteps: JourneyStep[] = [1, 2, 3, 4].map(n => ({
    title: t(`infertilityStep${n}Title`),
    description: t(`infertilityStep${n}Description`)
  }))
  const ivfSteps: JourneyStep[] = [1, 2, 3, 4, 5].map(n => ({
    title: t(`ivfStep${n}Title`),
    description: t(`ivfStep${n}Description`)
  }))
  return {
    title: t('journeyTitle'),
    description: t('journeyDescription'),
    infertility: { label: t('tabInfertility'), steps: infertilitySteps },
    ivf: { label: t('tabIvf'), steps: ivfSteps }
  }
}

export function buildChecklistData(t: Translator): ChecklistData {
  return {
    title: t('gettingStartedTitle'),
    description: t('gettingStartedDescription'),
    documentsTitle: t('documentsTitle'),
    documents: t.raw('documentsList') as string[],
    notesTitle: t('notesTitle'),
    notes: t.raw('notesList') as string[],
    finalNote: t('finalNote')
  }
}
