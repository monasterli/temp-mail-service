'use client';

import { useEffect, useMemo, useState } from 'react';
import { Copy, RefreshCw, Mail, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import AdSlot from '@/components/AdSlot';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import RewardedExtend from '@/components/RewardedExtend';
import { FALLBACK_LOCALE, getInitialLocale, translations, type Locale } from '@/lib/i18n';

type Msg = { id: string; sender: string; subject: string; text: string; html?: string; created_at: string };

export default function Home() {
  const [locale, setLocale] = useState<Locale>(FALLBACK_LOCALE);
  const [address, setAddress] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Msg | null>(null);
  const t = translations[locale] ?? translations.en;

  const secondsLeft = useMemo(
    () => Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000)),
    [expiresAt, messages]
  );

  async function createMailbox() {
    setLoading(true);
    const res = await fetch('/api/mailbox', { method: 'POST' });
    const json = await res.json();
    setAddress(json.address);
    setExpiresAt(json.expiresAt);
    setMessages([]);
    setSelected(null);
    localStorage.setItem('tempMail', JSON.stringify(json));
    setLoading(false);
  }

  async function loadInbox(addr = address) {
    if (!addr) return;
    const res = await fetch(`/api/mailbox?address=${encodeURIComponent(addr)}`);
    const json = await res.json();
    if (json.expired) return createMailbox();
    setMessages(json.messages || []);
  }

  function handleExtended(nextExpiresAt: string) {
    setExpiresAt(nextExpiresAt);
    localStorage.setItem('tempMail', JSON.stringify({ address, expiresAt: nextExpiresAt }));
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

          <div className="glass rounded-3xl p-5 shadow-2xl md:p-8">
            <div className="mb-3 flex items-center gap-3 text-white/70">
              <Mail size={20} /> {t.emailLabel}
            </div>
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="flex-1 break-all rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-xl font-bold md:text-2xl">
                {address || t.creatingAddress}
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(address)}
                className="flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-5 py-4 font-bold text-slate-950"
              >
                <Copy size={18} /> {t.copy}
              </button>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button onClick={() => loadInbox()} className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 hover:bg-white/15">
                <RefreshCw size={18} /> {t.refreshInbox}
              </button>
              <button onClick={createMailbox} disabled={loading} className="rounded-xl bg-white/10 px-4 py-3 hover:bg-white/15">
                {t.newAddress}
              </button>
              <RewardedExtend address={address} onExtended={handleExtended} copy={t.rewarded} />
              <div className="ml-auto flex items-center gap-2 text-cyan-100">
                <Clock size={18} /> {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-[360px_1fr]">
            <div className="glass min-h-[360px] rounded-3xl p-4">
              <h2 className="mb-4 text-xl font-bold">{t.inboxTitle}</h2>
              {!messages.length && (
                <div className="rounded-2xl border border-dashed border-white/20 p-6 text-center text-white/55">
                  {t.emptyInbox}
                </div>
              )}
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
            </div>

            <article className="glass min-h-[360px] rounded-3xl p-5">
              {selected ? (
                <>
                  <div className="text-sm text-white/60">
                    {t.from}: {selected.sender}
                  </div>
                  <h2 className="my-2 text-2xl font-bold">{selected.subject}</h2>
                  <pre className="whitespace-pre-wrap font-sans text-white/80">{selected.text || t.htmlNoText}</pre>
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
          <footer className="space-y-2 px-2 text-xs text-white/40">
            <a className="block hover:text-white" href="/privacy">
              {t.privacy}
            </a>
            <a className="block hover:text-white" href="/terms">
              {t.terms}
            </a>
            <a className="block hover:text-white" href="/abuse">
              {t.abuse}
            </a>
          </footer>
        </aside>
      </div>
    </main>
  );
}
