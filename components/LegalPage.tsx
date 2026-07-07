'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FALLBACK_LOCALE, getInitialLocale, type Locale } from '@/lib/i18n';
import { getLegalLocale, legalContent, type LegalPageKey } from '@/lib/legalContent';

type Props = {
  page: LegalPageKey;
};

const legalLinks: { href: string; page: LegalPageKey }[] = [
  { href: '/privacy', page: 'privacy' },
  { href: '/terms', page: 'terms' },
  { href: '/cookies', page: 'cookies' },
  { href: '/acceptable-use', page: 'acceptable-use' },
  { href: '/abuse', page: 'abuse' },
  { href: '/contact', page: 'contact' }
];

export default function LegalPage({ page }: Props) {
  const [locale, setLocale] = useState<Locale>(FALLBACK_LOCALE);

  useEffect(() => {
    setLocale(getInitialLocale());
  }, []);

  const legalLocale = getLegalLocale(locale);
  const content = legalContent[legalLocale];
  const pageContent = content.pages[page];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1d4ed8_0,#0f172a_38%,#020617_100%)] px-4 py-8 text-white">
      <div className="mx-auto max-w-4xl space-y-6">
        <header className="space-y-5">
          <Link href="/" className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-cyan-100 hover:bg-white/15">
            {content.backHome}
          </Link>
          <div className="space-y-3">
            <p className="text-sm font-bold uppercase tracking-widest text-cyan-100">{content.kicker}</p>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">{pageContent.title}</h1>
            <p className="max-w-3xl text-lg text-white/70">{pageContent.description}</p>
          </div>
          <nav className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3" aria-label={content.kicker}>
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/15">
                {content.nav[link.page]}
              </Link>
            ))}
          </nav>
        </header>

        <article className="glass space-y-8 rounded-3xl p-5 shadow-2xl md:p-8">
          {pageContent.sections.map((section) => (
            <section
              key={section.title}
              className={section.highlight ? 'space-y-3 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4' : 'space-y-3'}
            >
              <h2 className="text-2xl font-black">{section.title}</h2>
              {section.body?.map((paragraph) => (
                <p key={paragraph} className="text-white/75">
                  {paragraph}
                </p>
              ))}
              {section.items && (
                <ul className="list-disc space-y-2 pl-6 text-white/75">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}
