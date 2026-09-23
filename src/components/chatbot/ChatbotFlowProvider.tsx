'use client';

// Fetches this locale's plain catalog+FAQ+blog+testimonial data from
// /api/chatbot-data, reads the Patient Guide journey/checklist content
// directly via next-intl (static per-locale messages data, no Supabase
// involved, so no reason to round-trip it through that route too), then
// builds the full conversation graph client-side and exposes it via
// context. Re-fetches and rebuilds whenever the locale changes, so a
// mid-conversation language switch gets a fresh graph rather than showing
// stale-language content - the widget itself is responsible for resetting
// its own visible conversation when that happens (this provider only
// tracks the graph + a status flag, not the conversation).
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { buildFlow, type FlowNode } from '../../lib/chatbot/flow';
import { buildJourneyData, buildChecklistData } from '../../lib/chatbot/journeyAdapter';
import type { CatalogItem } from '../../lib/chatbot/catalogAdapter';
import type { FAQItem } from '../../lib/chatbot/faqAdapter';
import type { BlogPost } from '../../lib/chatbot/blogAdapter';
import type { Testimonial } from '../../lib/chatbot/testimonialAdapter';

type Status = 'loading' | 'ready' | 'error';
type FetchedData = { catalog: CatalogItem[]; faqItems: FAQItem[]; blogPosts: BlogPost[]; testimonials: Testimonial[] };

const ChatbotFlowContext = createContext<{ flow: Record<string, FlowNode> | null; status: Status; locale: string }>({
  flow: null,
  status: 'loading',
  locale: 'tr'
});

export function useChatbotFlow() {
  return useContext(ChatbotFlowContext);
}

export function ChatbotFlowProvider({ children }: { children: ReactNode }) {
  const locale = useLocale();
  const t = useTranslations('Chatbot');
  const guideT = useTranslations('PatientGuidePage');
  const [data, setData] = useState<FetchedData | null>(null);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setData(null);

    fetch(`/api/chatbot-data?lang=${locale}`)
      .then(res => res.json())
      .then((result: FetchedData) => {
        if (cancelled) return;
        setData(result);
        setStatus('ready');
      })
      .catch(error => {
        console.error('Failed to load chatbot data:', error);
        if (!cancelled) setStatus('error');
      });

    return () => { cancelled = true; };
  }, [locale]);

  // Rebuilt only when the fetched data or locale changes - not on every
  // render. t/guideT are intentionally left out of the deps: they're
  // stable-enough next-intl handles for a given locale/namespace, and
  // including them would rebuild the graph on every render for no benefit.
  const flow = useMemo(
    () => (data ? buildFlow(locale, (key: string) => t(key), {
      ...data,
      journeyData: buildJourneyData(guideT),
      checklistData: buildChecklistData(guideT)
    }) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, locale]
  );

  return (
    <ChatbotFlowContext.Provider value={{ flow, status, locale }}>
      {children}
    </ChatbotFlowContext.Provider>
  );
}
