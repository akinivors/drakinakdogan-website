// Adapts this project's own ServicesPage content (messages/{locale}.json,
// under ServicesPage.conditions/treatments/descriptions - not chatbot-
// specific; the same keys feed the real /hizmetler page) into the flat
// CatalogItem[] shape the chatbot's flow graph groups into conditions vs.
// treatments. Slugs aren't derivable from the English JSON keys (e.g.
// "infertility" -> "infertilite"), so this reuses the same key -> slug map
// already duplicated in Header.tsx/ServicesPageClient.tsx - a third copy in
// the same established convention, not a new one.
import { getTranslations } from 'next-intl/server'

export interface CatalogItem {
  slug: string
  title: string
  what?: string
  group: 'condition' | 'treatment'
}

const CONDITION_SLUGS: Record<string, string> = {
  infertility: 'infertilite',
  pcos: 'polikistik-over-sendromu',
  endometriosis: 'endometriozis',
  diminishedOvarianReserve: 'azalmis-over-rezervi',
  tubalBlockage: 'tuplerin-tikali-olmasi',
  uterineAnomalies: 'rahim-anomalileri',
  hypogonadotropicHypogonadism: 'hipogonadotropik-hipogonadizm'
}

const TREATMENT_SLUGS: Record<string, string> = {
  ivf: 'tup-bebek',
  aiEmbryoSelection: 'yapay-zeka-embriyo',
  icsi: 'mikroenjeksiyon',
  embryoscope: 'embriyoskop-takip',
  pgt: 'genetik-tani',
  eggFreezing: 'yumurta-dondurma'
}

// Pure, synchronous half of catalog-building - split out from buildCatalog
// so the test harness can supply ServicesPage data itself (e.g. from the
// raw imported messages JSON via use-intl's createTranslator) without
// going through getTranslations, which only resolves inside a Next.js
// request - it's bundled behind the "react-server" export condition, so
// it fails even outside a request when run standalone (e.g. via tsx).
export function buildCatalogFromServicesPage(servicesPage: {
  conditions: Record<string, string>
  treatments: Record<string, string>
  descriptions: Record<string, string>
}): CatalogItem[] {
  const { conditions, treatments, descriptions } = servicesPage
  const items: CatalogItem[] = []

  for (const [group, slugMap, groupTag] of [
    [conditions, CONDITION_SLUGS, 'condition'],
    [treatments, TREATMENT_SLUGS, 'treatment']
  ] as const) {
    for (const [itemKey, title] of Object.entries(group)) {
      const slug = slugMap[itemKey]
      if (!slug) continue
      items.push({ slug, title, what: descriptions[itemKey], group: groupTag })
    }
  }

  return items
}

export async function buildCatalog(locale: string): Promise<CatalogItem[]> {
  const t = await getTranslations({ locale, namespace: 'ServicesPage' })
  return buildCatalogFromServicesPage({
    conditions: t.raw('conditions') as Record<string, string>,
    treatments: t.raw('treatments') as Record<string, string>,
    descriptions: t.raw('descriptions') as Record<string, string>
  })
}
