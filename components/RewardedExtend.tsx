'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Clock, X } from 'lucide-react';
import AdSlot from '@/components/AdSlot';
import type { RewardedExtendTranslations } from '@/lib/i18n';

type Props = {
  address: string;
  onExtended: (expiresAt: string) => void;
  copy: RewardedExtendTranslations;
};

export default function RewardedExtend({ address, onExtended, copy }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [seconds, setSeconds] = useState(7);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    setSeconds(7);
    const timer = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(timer);
  }, [open]);

  async function extendMailbox() {
    if (!address || seconds > 0) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/mailbox/extend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, adViewed: true })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || copy.extendError);
      onExtended(json.expiresAt);
      setOpen(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : copy.unknownError);
    } finally {
      setLoading(false);
    }
  }

  const modal = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-slate-950/90 p-4 backdrop-blur-md">
      <div className="relative z-[10000] w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
        <button onClick={() => setOpen(false)} className="absolute right-4 top-4 text-white/60 hover:text-white" aria-label={copy.close}>
          <X size={22} />
        </button>
        <h2 className="pr-8 text-2xl font-black">{copy.title}</h2>
        <p className="mt-2 text-sm text-white/65">{copy.description}</p>

        <div className="my-5">
          <AdSlot placement="reward" label={copy.adLabel} />
        </div>

        {error && <div className="mb-3 rounded-xl border border-red-400/30 bg-red-500/15 p-3 text-sm text-red-100">{error}</div>}

        <button
          disabled={seconds > 0 || loading}
          onClick={extendMailbox}
          className="w-full rounded-2xl bg-cyan-400 px-5 py-4 font-bold text-slate-950 disabled:bg-white/15 disabled:text-white/45"
        >
          {seconds > 0 ? copy.continueIn.replace('{seconds}', String(seconds)) : loading ? copy.extending : copy.getTime}
        </button>

        <p className="mt-3 text-[11px] text-white/35">{copy.note}</p>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 font-bold text-slate-950 hover:bg-emerald-300"
      >
        <Clock size={18} /> {copy.openButton}
      </button>

      {open && mounted ? createPortal(modal, document.body) : null}
    </>
  );
}
