'use client';

import { useEffect } from 'react';
import { CheckCircle2, Info, TriangleAlert, X } from 'lucide-react';

export type ToastTone = 'success' | 'info' | 'warning' | 'error';

type Props = {
  message: string;
  tone?: ToastTone;
  onClose: () => void;
};

const toneStyles: Record<ToastTone, string> = {
  success: 'border-emerald-300/30 bg-emerald-400/15 text-emerald-50',
  info: 'border-cyan-300/30 bg-cyan-400/15 text-cyan-50',
  warning: 'border-amber-300/30 bg-amber-400/15 text-amber-50',
  error: 'border-red-300/30 bg-red-400/15 text-red-50'
};

export default function Toast({ message, tone = 'info', onClose }: Props) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3200);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  const Icon = tone === 'success' ? CheckCircle2 : tone === 'warning' || tone === 'error' ? TriangleAlert : Info;

  return (
    <div className={`fixed bottom-4 right-4 z-[10001] flex max-w-sm items-start gap-3 rounded-2xl border p-4 shadow-2xl backdrop-blur-md ${toneStyles[tone]}`}>
      <Icon size={20} className="mt-0.5 shrink-0" />
      <p className="text-sm font-medium">{message}</p>
      <button type="button" onClick={onClose} className="ml-1 rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white" aria-label="Close">
        <X size={16} />
      </button>
    </div>
  );
}
