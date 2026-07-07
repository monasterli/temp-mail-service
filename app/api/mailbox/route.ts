import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { tempAddress } from '@/lib/email';

export async function POST() {
  const supabase = supabaseAdmin();
  const address = tempAddress();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
  const { error } = await supabase.from('mailboxes').insert({ address, expires_at: expiresAt });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ address, expiresAt });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address');
  if (!address) return NextResponse.json({ error: 'address is required' }, { status: 400 });
  const supabase = supabaseAdmin();
  const { data: mailbox } = await supabase.from('mailboxes').select('*').eq('address', address).gt('expires_at', new Date().toISOString()).single();
  if (!mailbox) return NextResponse.json({ expired: true, messages: [] });
  const { data, error } = await supabase.from('messages').select('*').eq('mailbox', address).order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ expired: false, messages: data || [] });
}
