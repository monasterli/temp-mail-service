import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const EXTEND_MINUTES = 30;
const MAX_LIFETIME_MINUTES = 120;

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const address = String(body.address || '').trim().toLowerCase();
  const adViewed = Boolean(body.adViewed);

  if (!address) return NextResponse.json({ error: 'address is required' }, { status: 400 });
  if (!adViewed) return NextResponse.json({ error: 'ad confirmation is required' }, { status: 400 });

  const supabase = supabaseAdmin();
  const now = new Date();

  const { data: mailbox, error: selectError } = await supabase
    .from('mailboxes')
    .select('address, created_at, expires_at')
    .eq('address', address)
    .single();

  if (selectError || !mailbox) return NextResponse.json({ error: 'mailbox not found' }, { status: 404 });
  if (new Date(mailbox.expires_at).getTime() <= now.getTime()) return NextResponse.json({ error: 'mailbox expired' }, { status: 410 });

  const createdAt = new Date(mailbox.created_at);
  const currentExpiresAt = new Date(mailbox.expires_at);
  const base = currentExpiresAt.getTime() > now.getTime() ? currentExpiresAt : now;
  const extended = new Date(base.getTime() + EXTEND_MINUTES * 60 * 1000);
  const maxExpiresAt = new Date(createdAt.getTime() + MAX_LIFETIME_MINUTES * 60 * 1000);
  const nextExpiresAt = extended.getTime() > maxExpiresAt.getTime() ? maxExpiresAt : extended;

  const { error: updateError } = await supabase
    .from('mailboxes')
    .update({ expires_at: nextExpiresAt.toISOString() })
    .eq('address', address);

  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });

  return NextResponse.json({ address, expiresAt: nextExpiresAt.toISOString() });
}
