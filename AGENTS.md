# AGENTS.md

## Project overview

This project is a temporary email service / temp mail MVP.

Stack:
- Next.js
- TypeScript
- Supabase
- Mailgun
- Vercel
- Universal ad module

The service allows users to:
- generate a temporary email address;
- receive emails;
- read emails in an inbox;
- auto-delete temporary mailboxes and messages;
- extend mailbox lifetime by watching an advertising screen.

## Main goal

Prepare the project for a real MVP launch.

The MVP should be simple, stable, secure, and understandable for a beginner.

Do not overcomplicate the architecture unless it is clearly necessary.

## Business rules

Do not build the project around Google AdSense.

Primary monetization:
- direct ads;
- CPA offers;
- Adsterra;
- Monetag / PropellerAds;
- affiliate offers;
- later premium features.

Google AdSense may only exist as an optional future provider.

Google AdSense must not be the default ad provider.

Google AdSense must not be required for the project to work.

Do not place ads inside the actual content of email messages.

Do not force Google AdSense views or clicks for mailbox extension.

The mailbox extension flow should use:
- generic advertising screen;
- direct offer;
- CPA offer;
- placeholder provider;
- or another non-AdSense provider.

## Product rules

Core MVP features:
- create temporary mailbox;
- show mailbox address;
- copy mailbox address;
- show countdown timer;
- fetch inbox messages;
- show message list;
- show message details;
- extend mailbox by 30 minutes;
- auto-clean expired mailboxes and messages;
- provide SEO pages;
- provide privacy, terms, and abuse pages.

The user is a beginner, so keep the project understandable.

Prefer simple and reliable solutions over complex abstractions.

Do not add unnecessary dependencies.

Do not rewrite the whole project unless there is a strong technical reason.

## Security rules

Never expose server secrets to the frontend.

Never expose these values:
- SUPABASE_SERVICE_ROLE_KEY
- MAILGUN_WEBHOOK_SIGNING_KEY
- CRON_SECRET
- any private API key
- any real .env value

Only variables starting with NEXT_PUBLIC_ may be used in frontend code.

Mailgun webhook must verify signatures.

Mailgun webhook should protect against duplicate message insertion when Mailgun retries delivery.

Cleanup route must use GET + CRON_SECRET for Vercel Cron compatibility.

Do not commit real .env values.

Keep .env.example safe and without real secrets.

## Environment variables

Expected variables:

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- TEMP_MAIL_DOMAIN
- MAILGUN_WEBHOOK_SIGNING_KEY
- CRON_SECRET

Optional monetization variables:

- NEXT_PUBLIC_AD_PROVIDER
- NEXT_PUBLIC_ADSENSE_CLIENT
- NEXT_PUBLIC_ADSTERRA_KEY
- NEXT_PUBLIC_MONETAG_KEY
- NEXT_PUBLIC_DIRECT_AD_URL
- NEXT_PUBLIC_CPA_OFFER_URL

Do not add real values to the repository.

## Deployment target

Target deployment:
- Vercel for the Next.js app;
- Supabase for the database;
- Mailgun for inbound email receiving;
- Cloudflare for DNS and security if used.

## Important files

Check these files carefully:

- package.json
- README.md
- MONETIZATION.md
- .env.example
- vercel.json
- supabase/schema.sql
- app/page.tsx
- app/layout.tsx
- app/api/mailbox/route.ts
- app/api/mailbox/extend/route.ts
- app/api/mailgun/inbound/route.ts
- app/api/cleanup/route.ts
- components/AdSlot.tsx
- lib/supabaseAdmin.ts
- lib/mailgun.ts

## Commands

Before making code changes, inspect the project.

After making changes, run:

- npm install
- npm run build

If tests are added, also run:

- npm test

If linting exists, also run:

- npm run lint

If a command fails, explain:
- which command failed;
- why it failed;
- which file caused the issue;
- how it was fixed or how it should be fixed.

## First task behavior

If asked to review the project, do not edit files immediately.

First provide a launch-readiness report.

The report must include:

1. Can the project be launched now or not?
2. Critical issues.
3. Non-critical improvements.
4. Files that need changes.
5. Commands executed.
6. Recommended next step.

Do not modify files during the first review unless explicitly asked.

## Coding style

Keep changes minimal and production-oriented.

Prefer small safe patches over large rewrites.

Explain important changes clearly.

Do not remove existing business logic without explaining why.

Do not change the monetization strategy without approval.

Do not add Google AdSense as the default provider.

Do not add advertising inside email message content.

## API rules

The mailbox API should support:
- creating a temporary mailbox;
- returning mailbox data;
- returning messages for a mailbox;
- extending mailbox lifetime;
- rejecting expired mailboxes where appropriate.

The cleanup API should:
- be protected by CRON_SECRET;
- use GET for Vercel Cron;
- delete expired mailboxes;
- delete messages belonging to expired mailboxes;
- return a clear JSON result.

The Mailgun inbound API should:
- verify Mailgun signature;
- parse incoming message safely;
- find the target mailbox;
- reject or ignore expired mailboxes;
- avoid duplicate messages if Mailgun retries the webhook;
- store sender, recipient, subject, plain text, HTML if available, and created_at.

## Database rules

Supabase schema should include at least:

- mailboxes table;
- messages table;
- indexes for mailbox lookup;
- indexes for expiration cleanup;
- created_at fields;
- expires_at field for mailboxes.

Recommended improvements:
- message_id or provider_message_id for duplicate protection;
- security_logs table later;
- abuse tracking later.

Do not expose database write operations directly from frontend unless RLS policies are correct.

## Advertising rules

The ad system must be provider-based.

Recommended providers:
- placeholder;
- direct;
- CPA;
- Adsterra;
- Monetag / PropellerAds;
- optional AdSense.

The project must work even if no ad network is configured.

If no provider is configured, show safe placeholder ads or internal promotional blocks.

Do not break the user experience with aggressive popups.

Do not inject ads into email message bodies.

Mailbox extension should use a generic advertising screen, not Google AdSense rewarded behavior.

## SEO rules

The project should include SEO landing pages such as:

- /temporary-email
- /disposable-email
- /temp-mail
- /burner-email
- /ru/vremennaya-pochta
- /ru/odnorazovaya-pochta

SEO pages should contain useful original text.

Avoid empty or duplicate pages.

Add metadata where appropriate.

Recommended future improvements:
- sitemap.xml;
- robots.txt;
- Open Graph metadata;
- FAQ sections;
- multilingual pages.

## Legal pages

The project should include:

- /privacy
- /terms
- /abuse
- contact or abuse email reference

Privacy policy should mention:
- temporary storage of emails;
- automatic deletion;
- technical logs;
- advertising providers;
- analytics providers if used;
- third-party services such as Supabase, Mailgun, Vercel, Cloudflare.

## Beginner-friendly behavior

When explaining changes, use clear language.

Avoid unnecessary jargon.

If jargon is necessary, briefly explain it.

Prefer step-by-step explanations.

## Final instruction

Always prioritize:
1. project stability;
2. security;
3. successful MVP launch;
4. monetization flexibility;
5. beginner-friendly maintainability.