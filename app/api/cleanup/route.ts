import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return NextResponse.json({ ok: false, error: 'CRON_SECRET is not configured' }, { status: 500 });
  }

  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  const supabase = supabaseAdmin();
  const now = new Date().toISOString();

  const { data: expired, error: selectError } = await supabase
    .from('mailboxes')
    .select('address')
    .lt('expires_at', now);

  if (selectError) {
    return NextResponse.json({ ok: false, error: selectError.message }, { status: 500 });
  }

  const addresses = (expired || []).map((m) => m.address);
  let deletedMessages = 0;

  if (addresses.length) {
    const { count, error } = await supabase
      .from('messages')
      .delete({ count: 'exact' })
      .in('mailbox', addresses);

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    deletedMessages = count || 0;
  }

  const { count: deletedMailboxes, error: mailboxError } = await supabase
    .from('mailboxes')
    .delete({ count: 'exact' })
    .lt('expires_at', now);

  if (mailboxError) {
    return NextResponse.json({ ok: false, error: mailboxError.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    checkedAt: now,
    deletedMailboxes: deletedMailboxes || 0,
    deletedMessages
  });
}
