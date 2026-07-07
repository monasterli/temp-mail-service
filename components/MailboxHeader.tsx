'use client';

import type { ReactNode } from 'react';
import { Clock, Copy, Mail, RefreshCw } from 'lucide-react';

export type MailboxStatus = 'loading' | 'active' | 'expiring' | 'expired';

type Props = {
  address: string;
  secondsLeft: number;
  loading: boolean;
  status: MailboxStatus;
  statusLabel: string;
  title: string;
  helperText: string;
  creatingAddress: string;
  copyLabel: string;
  refreshLabel: string;
  newAddressLabel: string;
  extendAction: ReactNode;
  onCopy: () => void;
  onRefresh: () => void;
  onNewMailbox: () => void;
};

const statusStyles: Record<MailboxStatus, string> = {
  loading: 'border-cyan-300/30 bg-cyan-400/15 text-cyan-50',
  active: 'border-emerald-300/30 bg-emerald-400/15 text-emerald-50',
  expiring: 'border-amber-300/30 bg-amber-400/15 text-amber-50',
  expired: 'border-red-300/30 bg-red-400/15 text-red-50'
};

function formatSeconds(secondsLeft: number) {
  return `${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, '0')}`;
}

export default function MailboxHeader({
  address,
  secondsLeft,
  loading,
  status,
  statusLabel,
  title,
  helperText,
  creatingAddress,
  copyLabel,
  refreshLabel,
  newAddressLabel,
  extendAction,
  onCopy,
  onRefresh,
  onNewMailbox
}: Props) {
  const canUseMailbox = Boolean(address) && status !== 'expired';

  return (
    <div className="glass rounded-3xl p-5 shadow-2xl md:p-8">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3 text-white/70">
            <Mail size={20} /> {title}
          </div>
          <p className="max-w-2xl text-sm text-white/55">{helperText}</p>
        </div>
        <div className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-sm font-bold ${statusStyles[status]}`}>
          <span className="h-2 w-2 rounded-full bg-current" />
          {statusLabel}
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row">
        <div className="flex-1 break-all rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-xl font-bold md:text-2xl">
          {address || creatingAddress}
        </div>
        <button
          type="button"
          onClick={onCopy}
          disabled={!address}
          className="flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-5 py-4 font-bold text-slate-950 disabled:bg-white/15 disabled:text-white/45"
        >
          <Copy size={18} /> {copyLabel}
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button type="button" onClick={onRefresh} disabled={!canUseMailbox} className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 hover:bg-white/15 disabled:text-white/35">
          <RefreshCw size={18} /> {refreshLabel}
        </button>
        <button type="button" onClick={onNewMailbox} disabled={loading} className="rounded-xl bg-white/10 px-4 py-3 hover:bg-white/15 disabled:text-white/35">
          {newAddressLabel}
        </button>
        {canUseMailbox ? extendAction : null}
        <div className="ml-auto flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-cyan-100">
          <Clock size={18} /> {formatSeconds(secondsLeft)}
        </div>
      </div>
    </div>
  );
}
