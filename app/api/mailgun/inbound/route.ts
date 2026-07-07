import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { verifyMailgunSignature } from '@/lib/mailgun';

function formText(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === 'string' ? value : '';
}

function formString(form: FormData, key: string) {
  return formText(form, key).trim();
}

function extractEmail(value: string) {
  const match = value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return (match?.[0] || value.trim()).toLowerCase();
}

function headerFromMessageHeaders(form: FormData, headerName: string) {
  const rawHeaders = formString(form, 'message-headers');
  if (!rawHeaders) return '';

  try {
    const headers = JSON.parse(rawHeaders) as unknown;
    if (!Array.isArray(headers)) return '';

    const wanted = headerName.toLowerCase();
    for (const header of headers) {
      if (!Array.isArray(header) || header.length < 2) continue;
      if (String(header[0]).toLowerCase() === wanted) {
        return String(header[1] || '').trim();
      }
    }
  } catch {
    return '';
  }

  return '';
}

function normalizeMessageId(value: string) {
  return value.trim().replace(/^<|>$/g, '');
}

function providerMessageId(form: FormData, timestamp: string, token: string) {
  const messageId =
    formString(form, 'Message-Id') ||
    formString(form, 'message-id') ||
    formString(form, 'message_id') ||
    headerFromMessageHeaders(form, 'message-id');

  return normalizeMessageId(messageId) || `mailgun:${timestamp}:${token}`;
}

export async function POST(req: Request) {
  let form: FormData;

  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid form data' }, { status: 400 });
  }

  const timestamp = formString(form, 'timestamp');
  const token = formString(form, 'token');
  const signature = formString(form, 'signature');

  if (!verifyMailgunSignature(timestamp, token, signature)) {
    return NextResponse.json({ ok: false, error: 'invalid mailgun signature' }, { status: 401 });
  }

  const recipient = extractEmail(formString(form, 'recipient'));
  if (!recipient || !recipient.includes('@')) {
    return NextResponse.json({ ok: false, error: 'recipient is required' }, { status: 400 });
  }

  const sender = formString(form, 'sender') || formString(form, 'from') || 'unknown';
  const subject = formString(form, 'subject') || '(no subject)';
  const text = formText(form, 'body-plain') || formText(form, 'stripped-text');
  const html = formText(form, 'body-html') || formText(form, 'stripped-html');
  const messageId = providerMessageId(form, timestamp, token);
  const supabase = supabaseAdmin();

  const { data: mailbox, error: mailboxError } = await supabase
    .from('mailboxes')
    .select('address')
    .eq('address', recipient)
    .gt('expires_at', new Date().toISOString())
    .maybeSingle();

  if (mailboxError) {
    return NextResponse.json({ ok: false, error: mailboxError.message }, { status: 500 });
  }

  if (!mailbox) {
    return NextResponse.json({ ok: true, ignored: true, reason: 'mailbox_not_found_or_expired' });
  }

  const { error } = await supabase.from('messages').insert({
    mailbox: mailbox.address,
    recipient,
    sender,
    subject,
    text,
    html,
    provider_message_id: messageId
  });

  if (error?.code === '23505') {
    return NextResponse.json({ ok: true, duplicate: true, providerMessageId: messageId });
  }

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, stored: true, providerMessageId: messageId });
}
