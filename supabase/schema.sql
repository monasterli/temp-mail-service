create extension if not exists pgcrypto;

create table if not exists mailboxes (
  address text primary key,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  mailbox text not null references mailboxes(address) on delete cascade,
  recipient text not null,
  provider_message_id text not null,
  sender text not null,
  subject text not null default '(no subject)',
  text text not null default '',
  html text not null default '',
  created_at timestamptz not null default now()
);

alter table mailboxes alter column created_at set not null;

alter table messages add column if not exists recipient text;
alter table messages add column if not exists provider_message_id text;

delete from messages where mailbox is null;
update messages set recipient = mailbox where recipient is null;
update messages set provider_message_id = id::text where provider_message_id is null;
update messages set sender = 'unknown' where sender is null;
update messages set subject = '(no subject)' where subject is null;
update messages set text = '' where text is null;
update messages set html = '' where html is null;

alter table messages alter column mailbox set not null;
alter table messages alter column recipient set not null;
alter table messages alter column provider_message_id set not null;
alter table messages alter column sender set not null;
alter table messages alter column subject set default '(no subject)';
alter table messages alter column subject set not null;
alter table messages alter column text set default '';
alter table messages alter column text set not null;
alter table messages alter column html set default '';
alter table messages alter column html set not null;
alter table messages alter column created_at set not null;

create index if not exists messages_mailbox_created_idx on messages(mailbox, created_at desc);
create index if not exists messages_recipient_created_idx on messages(recipient, created_at desc);
create unique index if not exists messages_mailbox_provider_message_id_uidx on messages(mailbox, provider_message_id);
create index if not exists mailboxes_expires_idx on mailboxes(expires_at);

alter table mailboxes enable row level security;
alter table messages enable row level security;
-- The API uses the service role key on the server. Public policies are not needed.
