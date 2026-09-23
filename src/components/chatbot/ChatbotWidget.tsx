'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { MessageCircle, X, ArrowLeft, Home } from 'lucide-react';
import { clsx } from 'clsx';
import { useChatbotFlow } from './ChatbotFlowProvider';
import { ROOT_NODE_ID, type FlowOption } from '../../lib/chatbot/flow';

// Renders the limited markdown subset used in generated content
// (**bold** and "* " bullet lines). No dangerouslySetInnerHTML - this only
// ever runs on our own generated/canned text, never on arbitrary HTML.
function renderMessageContent(content: string) {
  const withBullets = content.replace(/^[*-] /gm, '• ');
  const segments = withBullets.split(/(\*\*[^*]+\*\*)/g);
  return segments.map((segment, index) =>
    segment.startsWith('**') && segment.endsWith('**')
      ? <strong key={index}>{segment.slice(2, -2)}</strong>
      : <span key={index}>{segment}</span>
  );
}

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  options?: FlowOption[];
  cta?: { text: string; href: string };
}

// Once-per-session greeting bubble so the launcher isn't just an unlabeled
// icon on first paint - shown once, since a returning-later session (new tab)
// still deserves the nudge, but repeat page navigations within one visit don't.
const TEASER_SESSION_KEY = 'chatbotTeaserShown';
const TEASER_AUTO_DISMISS_MS = 8000;

export default function ChatbotWidget() {
  const t = useTranslations('Chatbot');
  const { flow, status, locale } = useChatbotFlow();

  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  // Stack of visited node ids - the conceptual "depth" the Back/Main Menu
  // controls operate on. Separate from `messages`, which is only ever
  // appended to (a full visible log), so navigating back still *shows* a
  // fresh bubble instead of scrolling to/re-revealing an old one.
  const [history, setHistory] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // `Date.now()` alone collided when two messages were created within the
  // same millisecond (found via a rapid double-click on an option: React
  // logged "two children with the same key" and, with a colliding key,
  // could in principle mis-attribute which DOM node belongs to which
  // message). A monotonic counter can never collide, regardless of timing.
  const messageIdCounter = useRef(0);
  const nextMessageId = () => `msg_${++messageIdCounter.current}`;

  // A locale switch gets a fresh graph (from the provider) - reset the
  // visible conversation too, rather than mixing old-language history into
  // a new-language graph.
  useEffect(() => {
    setHistory([]);
    setMessages([]);
  }, [locale]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'instant', block: 'end' });
  }, [messages]);

  useEffect(() => {
    let alreadyShown = true;
    try {
      alreadyShown = sessionStorage.getItem(TEASER_SESSION_KEY) === '1';
    } catch {
      alreadyShown = false;
    }
    if (alreadyShown) return;

    setShowTeaser(true);
    try {
      sessionStorage.setItem(TEASER_SESSION_KEY, '1');
    } catch {
      // Private-browsing/storage-disabled - the teaser just shows again
      // next load, which is harmless.
    }
  }, []);

  useEffect(() => {
    if (!showTeaser) return;
    const hideTimer = setTimeout(() => setShowTeaser(false), TEASER_AUTO_DISMISS_MS);
    return () => clearTimeout(hideTimer);
  }, [showTeaser]);

  const showNode = (nodeId: string, userLabel?: string) => {
    if (!flow) return;
    const node = flow[nodeId];
    if (!node) return;
    setMessages(prev => [
      ...prev,
      ...(userLabel ? [{ id: `${nextMessageId()}_u`, type: 'user' as const, content: userLabel }] : []),
      { id: `${nextMessageId()}_b`, type: 'bot' as const, content: node.content, options: node.options, cta: node.cta }
    ]);
  };

  // Opens on the root node once the graph is ready - if the widget opens
  // before the fetch finishes, this fires as soon as `flow` arrives.
  useEffect(() => {
    if (isOpen && flow && history.length === 0) {
      setHistory([ROOT_NODE_ID]);
      showNode(ROOT_NODE_ID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, flow]);

  const selectOption = (option: FlowOption) => {
    setHistory(prev => [...prev, option.target]);
    showNode(option.target, option.label);
  };

  const goBack = () => {
    if (history.length <= 1) return;
    const next = history.slice(0, -1);
    setHistory(next);
    showNode(next[next.length - 1]);
  };

  const goToMainMenu = () => {
    setHistory([ROOT_NODE_ID]);
    showNode(ROOT_NODE_ID);
  };

  const currentNodeId = history[history.length - 1];

  return (
    <div className="fixed bottom-8 left-8 z-40 flex flex-col items-start gap-4">
      {isOpen && (
        <div className="w-[calc(100vw-4rem)] max-w-sm h-[520px] max-h-[70vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100">
          <div className="bg-primary text-white px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
              <MessageCircle size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-serif font-bold text-sm truncate">{t('title')}</p>
              <p className="text-xs text-white/70 truncate">{t('subtitle')}</p>
            </div>
            {history.length > 1 && (
              <button
                type="button"
                onClick={goBack}
                aria-label={t('backButtonLabel')}
                title={t('backButtonLabel')}
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center flex-shrink-0 transition-colors"
              >
                <ArrowLeft size={15} />
              </button>
            )}
            {currentNodeId !== ROOT_NODE_ID && (
              <button
                type="button"
                onClick={goToMainMenu}
                aria-label={t('mainMenuButtonLabel')}
                title={t('mainMenuButtonLabel')}
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center flex-shrink-0 transition-colors"
              >
                <Home size={15} />
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-secondary/40">
            {messages.map((message, index) => {
              const isLatest = index === messages.length - 1;
              return (
                <div key={message.id} className={clsx('flex flex-col', message.type === 'user' ? 'items-end' : 'items-start')}>
                  <div className={clsx(
                    'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm font-sans leading-relaxed whitespace-pre-line',
                    message.type === 'user' ? 'bg-primary text-white' : 'bg-white text-text-main shadow-sm'
                  )}>
                    {renderMessageContent(message.content)}
                  </div>
                  {/* Only the latest bot message stays interactive - older
                      ones are a plain visible log, not live navigation. */}
                  {message.type === 'bot' && isLatest && message.options && message.options.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2 max-w-[95%]">
                      {message.options.map((option, i) => (
                        <button
                          key={i}
                          onClick={() => selectOption(option)}
                          className="text-xs font-sans text-primary bg-primary-lightest hover:bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5 transition-colors"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                  {message.type === 'bot' && isLatest && message.cta && (
                    <a
                      href={message.cta.href}
                      className="mt-2 inline-block text-xs font-sans font-semibold bg-accent text-white rounded-full px-4 py-2 hover:bg-accent-light transition-colors"
                    >
                      {message.cta.text}
                    </a>
                  )}
                </div>
              );
            })}
            {status === 'error' && (
              <div className="flex items-start">
                <div className="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm font-sans leading-relaxed bg-white text-text-main shadow-sm border border-red-100">
                  {t('connectionError')}
                </div>
              </div>
            )}
            {status === 'loading' && messages.length === 0 && (
              <div className="flex items-start">
                <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-text-light/40 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-text-light/40 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-text-light/40 animate-bounce" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      {!isOpen && showTeaser && (
        <div className="relative max-w-[220px] bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3 text-sm text-text-main animate-teaser-in">
          <button
            type="button"
            onClick={() => setShowTeaser(false)}
            aria-label={t('dismissGreetingLabel')}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-text-light hover:text-text-main"
          >
            <X size={11} />
          </button>
          {t('greetingTeaser')}
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          setIsOpen(prev => !prev);
          setShowTeaser(false);
        }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className="w-16 h-16 rounded-full bg-primary hover:bg-primary-dark text-white shadow-lg flex items-center justify-center transition-colors"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
