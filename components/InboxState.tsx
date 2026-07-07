'use client';

import { AlertCircle, Inbox, Loader2, SearchX } from 'lucide-react';

export type InboxStateKind = 'loading' | 'empty' | 'rate-limit' | 'message-unavailable';

type Props = {
  kind: InboxStateKind;
  title: string;
  message: string;
};

export default function InboxState({ kind, title, message }: Props) {
  const Icon = kind === 'loading' ? Loader2 : kind === 'message-unavailable' ? SearchX : kind === 'rate-limit' ? AlertCircle : Inbox;
  const iconClass = kind === 'loading' ? 'animate-spin text-cyan-200' : kind === 'rate-limit' ? 'text-amber-200' : 'text-cyan-200';

  return (
    <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-white/20 p-6 text-center">
      <div className="max-w-sm space-y-3">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
          <Icon size={24} className={iconClass} />
        </div>
        <div className="font-bold text-white">{title}</div>
        <p className="text-sm text-white/55">{message}</p>
      </div>
    </div>
  );
}
