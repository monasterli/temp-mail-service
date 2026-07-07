'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';
import AdSlot from '@/components/AdSlot';
import InboxState from '@/components/InboxState';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import MailboxHeader, { type MailboxStatus } from '@/components/MailboxHeader';
import RewardedExtend from '@/components/RewardedExtend';
import Toast, { type ToastTone } from '@/components/Toast';
import { FALLBACK_LOCALE, getInitialLocale, translations, type Locale } from '@/lib/i18n';

type Msg = { id: string; sender: string; subject: string; text: string; html?: string; created_at: string };
type ToastState = { message: string; tone: ToastTone } | null;

export default function Home() {
  const [locale, setLocale] = useState<Locale>(FALLBACK_LOCALE);
  const [address, setAddress] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);
  const [inboxLoading, setInboxLoading] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const [selected, setSelected] = useState<Msg | null>(null);
  const [toast, setToast] = useState<ToastState>(null);
  const t = translations[locale] ?? translations.en;

  const secondsLeft = useMemo(() => {
    const expiresAtMs = new Date(expiresAt).getTime();
    if (!expiresAt || Number.isNaN(expiresAtMs)) return 0;
    return Math.max(0, Math.floor((expiresAtMs - Date.now()) / 1000));
  }, [expiresAt, messages]);

  const mailboxStatus: MailboxStatus = useMemo(() => {
    if (!address || loading) return 'loading';
    if (secondsLeft <= 0) return 'expired';
    if (secondsLeft <= 120) return 'expiring';
    return 'active';
  }, [address, loading, secondsLeft]);

  const mailboxStatusLabel = {
    loading: t.loadingMailbox,
    active: t.mailboxReady,
    expiring: t.mailboxExpiringSoon,
    expired: t.mailboxExpired
  }[mailboxStatus];

  const selectedMessage = useMemo(
    () => (selected ? messages.find((message) => message.id === selected.id) ?? null : null),
    [messages, selected]
  );

  const closeToast = useCallback(() => setToast(null), []);

  async function createMailbox(reason?: 'expired') {
    setLoading(true);
    setRateLimited(false);
    try {
      const res = await fetch('/api/mailbox', { method: 'POST' });
      if (res.status === 429) {
        setRateLimited(true);
        setToast({ message: t.rateLimitNewMailbox, tone: 'warning' });
        return;
      }

      const json = await res.json();
      setAddress(json.address);
      setExpiresAt(json.expiresAt);
      setMessages([]);
      setSelected(null);
      localStorage.setItem('tempMail', JSON.stringify(json));

      if (reason === 'expired') {
        setToast({ message: t.newMailboxGenerated, tone: 'info' });
      }
    } finally {
      setLoading(false);
    }
  }

  async function loadInbox(addr = address) {
    if (!addr) return;
    setInboxLoading(true);
    try {
      const res = await fetch(`/api/mailbox?address=${encodeURIComponent(addr)}`);
      if (res.status === 429) {
        setRateLimited(true);
        setToast({ message: t.rateLimitNewMailbox, tone: 'warning' });
        return;
      }

      const json = await res.json();
      if (json.expired) {
        await createMailbox('expired');
        return;
      }

      setRateLimited(false);
      setMessages(json.messages || []);
    } finally {
      setInboxLoading(false);
    }
  }

  async function copyAddress() {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    setToast({ message: t.copySuccess, tone: 'success' });
  }

  function handleExtended(nextExpiresAt: string) {
    setExpiresAt(nextExpiresAt);
    localStorage.setItem('tempMail', JSON.stringify({ address, expiresAt: nextExpiresAt }));
    setToast({ message: t.extendMailbox, tone: 'success' });
  }

  useEffect(() => {
    setLocale(getInitialLocale());
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('tempMail');
    if (saved) {
      const j = JSON.parse(saved);
      if (new Date(j.expiresAt).getTime() > Date.now()) {
        setAddress(j.address);
        setExpiresAt(j.expiresAt);
        loadInbox(j.address);
        return;
      }
      createMailbox('expired');
      return;
    }
    createMailbox();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => loadInbox(), 5000);
    return () => clearInterval(timer);
  }, [address]);

  useEffect(() => {
    const timer = setInterval(() => setMessages((currentMessages) => [...currentMessages]), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1d4ed8_0,#0f172a_38%,#020617_100%)] px-4 py-8">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_320px]">
        <section className="space-y-6">
          <header className="py-8 text-center">
            <div className="mb-5 flex justify-end">
              <LanguageSwitcher locale={locale} onLocaleChange={setLocale} />
            </div>
            <div className="glass mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-cyan-100">
              <ShieldCheck size={16} /> {t.badge}
            </div>
            <h1 className="text-4xl font-black tracking-tight md:text-6xl">10 Minute Mail</h1>
            <p className="mt-4 text-lg text-white/70">{t.heroSubtitle}</p>
          </header>

          <AdSlot placement="top" label={t.topAdLabel} compact />

          <MailboxHeader
            address={address}
            secondsLeft={secondsLeft}
            loading={loading}
            status={mailboxStatus}
            statusLabel={mailboxStatusLabel}
            title={t.emailLabel}
            helperText={t.addressHelper}
            creatingAddress={t.creatingAddress}
            copyLabel={t.copy}
            refreshLabel={t.refreshInbox}
            newAddressLabel={t.newAddress}
            onCopy={copyAddress}
            onRefresh={() => loadInbox()}
            onNewMailbox={() => createMailbox()}
            extendAction={<RewardedExtend address={address} onExtended={handleExtended} copy={t.rewarded} />}
          />

          <div className="grid gap-5 md:grid-cols-[360px_1fr]">
            <div className="glass min-h-[360px] rounded-3xl p-4">
              <h2 className="mb-4 text-xl font-bold">{t.inboxTitle}</h2>
              {inboxLoading && !messages.length ? (
                <InboxState kind="loading" title={t.loadingInbox} message={t.inboxEmptyHint} />
              ) : rateLimited ? (
                <InboxState kind="rate-limit" title={t.rateLimitNewMailbox} message={t.inboxEmptyHint} />
              ) : !messages.length ? (
                <InboxState kind="empty" title={t.emptyInbox} message={t.inboxEmptyHint} />
              ) : (
                <div className="space-y-3">
                  {messages.map((message) => (
                    <button
                      key={message.id}
                      onClick={() => setSelected(message)}
                      className="w-full rounded-2xl bg-white/10 p-4 text-left hover:bg-white/15"
                    >
                      <div className="truncate font-bold">{message.subject}</div>
                      <div className="truncate text-sm text-white/60">{message.sender}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <article className="glass min-h-[360px] rounded-3xl p-5">
              {selected && !selectedMessage ? (
                <InboxState kind="message-unavailable" title={t.messageUnavailable} message={t.messageUnavailableHint} />
              ) : selectedMessage ? (
                <>
                  <div className="text-sm text-white/60">
                    {t.from}: {selectedMessage.sender}
                  </div>
                  <h2 className="my-2 text-2xl font-bold">{selectedMessage.subject}</h2>
                  <pre className="whitespace-pre-wrap font-sans text-white/80">{selectedMessage.text || t.htmlNoText}</pre>
                </>
              ) : (
                <div className="flex h-full items-center justify-center text-center text-white/55">{t.selectMessage}</div>
              )}
            </article>
          </div>

          <div className="glass rounded-3xl p-5">
            <div className="mb-2 flex items-center gap-2 font-bold text-cyan-100">
              <Sparkles size={18} /> {t.monetizationTitle}
            </div>
            <p className="text-sm text-white/65">{t.monetizationText}</p>
          </div>
        </section>

        <aside className="space-y-6 lg:pt-32">
          <AdSlot placement="sidebar" label={t.sidebarAdLabel} />
          <div className="glass rounded-3xl p-5">
            <h3 className="mb-2 text-lg font-bold">{t.whyTitle}</h3>
            <p className="text-white/70">{t.whyText}</p>
          </div>
          <AdSlot placement="sidebar" label={t.bottomSidebarAdLabel} />
          <a
            href="/abuse"
            className="block rounded-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm font-black text-amber-100 hover:bg-amber-300/15"
          >
            {t.reportAbuse}
          </a>
          <footer className="space-y-2 px-2 text-xs text-white/40">
            <a className="block hover:text-white" href="/faq">
              {t.faq}
            </a>
            <a className="block hover:text-white" href="/how-it-works">
              {t.howItWorks}
            </a>
            <a className="block hover:text-white" href="/features">
              {t.features}
            </a>
            <a className="block hover:text-white" href="/privacy">
              {t.privacy}
            </a>
            <a className="block hover:text-white" href="/terms">
              {t.terms}
            </a>
            <a className="block hover:text-white" href="/cookies">
              {t.cookies}
            </a>
            <a className="block hover:text-white" href="/acceptable-use">
              {t.acceptableUse}
            </a>
            <a className="block hover:text-white" href="/abuse">
              {t.abuse}
            </a>
            <a className="block hover:text-white" href="/contact">
              {t.contact}
            </a>
          </footer>
        </aside>
      </div>

      {toast ? <Toast message={toast.message} tone={toast.tone} onClose={closeToast} /> : null}
    </main>
  );
}
