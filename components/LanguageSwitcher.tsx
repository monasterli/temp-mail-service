'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { languageOptions, languages, saveLocale, type Locale } from '@/lib/i18n';

type Props = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
};

export default function LanguageSwitcher({ locale, onLocaleChange }: Props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const activeLanguage = languages[locale];

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  function selectLocale(nextLocale: Locale) {
    saveLocale(nextLocale);
    onLocaleChange(nextLocale);
    setOpen(false);
  }

  return (
    <div ref={wrapperRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-bold text-white shadow-lg shadow-black/10 backdrop-blur hover:bg-white/15"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span aria-hidden="true">{activeLanguage.flag}</span>
        <span>{activeLanguage.code.toUpperCase()}</span>
        <ChevronDown size={16} className={open ? 'rotate-180 transition' : 'transition'} />
      </button>

      {open && (
        <div
          className="absolute right-0 z-[60] mt-2 w-52 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 p-2 shadow-2xl backdrop-blur-md"
          role="listbox"
          aria-label="Language"
        >
          {languageOptions.map((language) => (
            <button
              key={language.code}
              type="button"
              onClick={() => selectLocale(language.code)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition ${
                language.code === locale ? 'bg-cyan-400 text-slate-950' : 'text-white hover:bg-white/10'
              }`}
              role="option"
              aria-selected={language.code === locale}
            >
              <span className="text-lg" aria-hidden="true">
                {language.flag}
              </span>
              <span className="w-7 font-black">{language.code.toUpperCase()}</span>
              <span>{language.nativeName}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
