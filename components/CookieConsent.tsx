'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FALLBACK_LOCALE, getInitialLocale, translations, type Locale } from '@/lib/i18n';

export const COOKIE_CONSENT_STORAGE_KEY = 'tempMailCookieConsent';

type CookieConsentChoice = 'essential' | 'all';

type StoredCookieConsent = {
  choice: CookieConsentChoice;
  acceptedAt: string;
};

export default function CookieConsent() {
  const [locale, setLocale] = useState<Locale>(FALLBACK_LOCALE);
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const copy = translations[locale]?.cookieConsent ?? translations.en.cookieConsent;

  useEffect(() => {
    setLocale(getInitialLocale());

    try {
      setIsVisible(!window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY));
    } catch {
      setIsVisible(true);
    }

    setIsReady(true);
  }, []);

  function saveConsent(choice: CookieConsentChoice) {
    const consent: StoredCookieConsent = {
      choice,
      acceptedAt: new Date().toISOString()
    };

    try {
      window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(consent));
      window.dispatchEvent(new CustomEvent('tempMailCookieConsentChanged', { detail: consent }));
    } catch {
      // If storage is unavailable, hide the banner for the current page view.
    }

    setIsVisible(false);
  }

  if (!isReady || !isVisible) return null;

  return (
    <section aria-label={copy.title} className="fixed inset-x-0 bottom-0 z-[10001] px-4 pb-4 sm:pb-6">
      <div className="mx-auto max-w-4xl rounded-2xl border border-white/15 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-md sm:flex sm:items-start sm:justify-between sm:gap-5">
        <div className="space-y-2">
          <h2 className="text-base font-black text-white">{copy.title}</h2>
          <p className="text-sm leading-6 text-white/70">{copy.description}</p>
          <Link href="/cookies" className="inline-flex text-sm font-bold text-cyan-200 hover:text-cyan-100">
            {copy.policyLink}
          </Link>
        </div>

        <div className="mt-4 grid gap-2 sm:mt-0 sm:min-w-[220px]">
          <button
            type="button"
            onClick={() => saveConsent('essential')}
            className="rounded-xl border border-white/15 px-4 py-2 text-sm font-bold text-white hover:bg-white/10"
          >
            {copy.essentialOnly}
          </button>
          <button
            type="button"
            onClick={() => saveConsent('all')}
            className="rounded-xl bg-cyan-300 px-4 py-2 text-sm font-black text-slate-950 hover:bg-cyan-200"
          >
            {copy.acceptAll}
          </button>
        </div>
      </div>
    </section>
  );
}
