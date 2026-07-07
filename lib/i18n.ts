export const SUPPORTED_LOCALES = ['en', 'ru', 'de', 'fr', 'pl'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const FALLBACK_LOCALE: Locale = 'en';
export const LANGUAGE_STORAGE_KEY = 'tempMailLocale';

export type LanguageMetadata = {
  code: Locale;
  label: string;
  nativeName: string;
  flag: string;
};

export const languages: Record<Locale, LanguageMetadata> = {
  en: { code: 'en', label: 'English', nativeName: 'English', flag: '🇬🇧' },
  ru: { code: 'ru', label: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  de: { code: 'de', label: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  fr: { code: 'fr', label: 'French', nativeName: 'Français', flag: '🇫🇷' },
  pl: { code: 'pl', label: 'Polish', nativeName: 'Polski', flag: '🇵🇱' }
};

export const languageOptions = SUPPORTED_LOCALES.map((code) => languages[code]);

export const translations = {
  en: {
    badge: 'Anonymous temporary email',
    heroSubtitle: 'Receive emails without registration. The address deletes itself automatically after 10 minutes.',
    topAdLabel: 'Top ad block / CPA / direct banner',
    emailLabel: 'Your temporary email',
    creatingAddress: 'creating address...',
    copy: 'Copy',
    refreshInbox: 'Refresh inbox',
    newAddress: 'New address',
    inboxTitle: 'Inbox',
    emptyInbox: 'No messages yet. Inbox refreshes automatically every 5 seconds.',
    from: 'From',
    htmlNoText: 'HTML email without a text version',
    selectMessage: 'Select an email to read it here.',
    monetizationTitle: 'Monetization is ready from day one',
    monetizationText:
      'The service is not tied to AdSense: you can connect direct banners, CPA partners, privacy/VPN offers, Adsterra, Monetag, or another network. Ads are not inserted into email content.',
    sidebarAdLabel: 'Sidebar ad block',
    bottomSidebarAdLabel: 'Bottom sidebar banner',
    whyTitle: 'Why use it?',
    whyText: 'Protect your main email from spam during signups, tests, and one-time confirmations.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    abuse: 'Abuse Policy',
    rewarded: {
      openButton: 'Extend by 30 minutes',
      close: 'Close',
      title: 'Extend temporary email',
      description: 'Watch the ad block or partner offer, then this mailbox will be extended for another 30 minutes.',
      adLabel: 'Ad for mailbox extension',
      extendError: 'Could not extend mailbox',
      unknownError: 'Extension error',
      continueIn: 'Continue in {seconds}s',
      extending: 'Extending...',
      getTime: 'Get +30 minutes',
      note:
        'MVP logic: this is currently a simple rewarded interstitial. For ad networks, use only formats and rules allowed by the specific network.'
    }
  },
  ru: {
    badge: 'Анонимная временная почта',
    heroSubtitle: 'Получай письма без регистрации. Адрес удалится автоматически через 10 минут.',
    topAdLabel: 'Верхний рекламный блок / CPA / direct banner',
    emailLabel: 'Твой временный email',
    creatingAddress: 'создаем адрес...',
    copy: 'Копировать',
    refreshInbox: 'Обновить inbox',
    newAddress: 'Новый адрес',
    inboxTitle: 'Входящие',
    emptyInbox: 'Писем пока нет. Inbox обновляется автоматически каждые 5 секунд.',
    from: 'От',
    htmlNoText: 'HTML-письмо без текстовой версии',
    selectMessage: 'Выбери письмо, чтобы прочитать его здесь.',
    monetizationTitle: 'Монетизация заложена с первого дня',
    monetizationText:
      'Сервис не привязан к AdSense: можно подключить прямые баннеры, CPA-партнерки, privacy/VPN-офферы, Adsterra, Monetag или другую сеть. Реклама не вставляется внутрь текста письма.',
    sidebarAdLabel: 'Боковой рекламный блок',
    bottomSidebarAdLabel: 'Нижний боковой баннер',
    whyTitle: 'Зачем это нужно?',
    whyText: 'Защити основной email от спама при регистрациях, тестах и одноразовых подтверждениях.',
    privacy: 'Политика конфиденциальности',
    terms: 'Условия использования',
    abuse: 'Правила abuse',
    rewarded: {
      openButton: 'Продлить на 30 минут',
      close: 'Закрыть',
      title: 'Продлить временную почту',
      description: 'Посмотри рекламный блок или партнерское предложение, после этого ящик будет продлен еще на 30 минут.',
      adLabel: 'Реклама за продление ящика',
      extendError: 'Не удалось продлить почту',
      unknownError: 'Ошибка продления',
      continueIn: 'Продолжить через {seconds} сек.',
      extending: 'Продлеваю...',
      getTime: 'Получить +30 минут',
      note:
        'MVP-логика: сейчас это простой rewarded-interstitial. Для рекламных сетей нужно использовать только разрешенные форматы и правила конкретной сети.'
    }
  },
  de: {
    badge: 'Anonyme temporäre E-Mail',
    heroSubtitle: 'Empfange E-Mails ohne Registrierung. Die Adresse wird nach 10 Minuten automatisch gelöscht.',
    topAdLabel: 'Oberer Anzeigenblock / CPA / Direktbanner',
    emailLabel: 'Deine temporäre E-Mail',
    creatingAddress: 'Adresse wird erstellt...',
    copy: 'Kopieren',
    refreshInbox: 'Inbox aktualisieren',
    newAddress: 'Neue Adresse',
    inboxTitle: 'Posteingang',
    emptyInbox: 'Noch keine Nachrichten. Die Inbox wird alle 5 Sekunden automatisch aktualisiert.',
    from: 'Von',
    htmlNoText: 'HTML-E-Mail ohne Textversion',
    selectMessage: 'Wähle eine E-Mail aus, um sie hier zu lesen.',
    monetizationTitle: 'Monetarisierung ist vom ersten Tag an vorbereitet',
    monetizationText:
      'Der Dienst ist nicht an AdSense gebunden: du kannst direkte Banner, CPA-Partner, Privacy/VPN-Angebote, Adsterra, Monetag oder ein anderes Netzwerk einbinden. Anzeigen werden nicht in E-Mail-Inhalte eingefügt.',
    sidebarAdLabel: 'Seitlicher Anzeigenblock',
    bottomSidebarAdLabel: 'Unteres Seitenbanner',
    whyTitle: 'Warum nutzen?',
    whyText: 'Schütze deine Hauptadresse vor Spam bei Registrierungen, Tests und einmaligen Bestätigungen.',
    privacy: 'Datenschutz',
    terms: 'Nutzungsbedingungen',
    abuse: 'Missbrauch melden',
    rewarded: {
      openButton: 'Um 30 Minuten verlängern',
      close: 'Schließen',
      title: 'Temporäre E-Mail verlängern',
      description: 'Sieh dir den Anzeigenblock oder das Partnerangebot an, danach wird das Postfach um weitere 30 Minuten verlängert.',
      adLabel: 'Anzeige für Postfachverlängerung',
      extendError: 'Postfach konnte nicht verlängert werden',
      unknownError: 'Fehler bei der Verlängerung',
      continueIn: 'Weiter in {seconds} s',
      extending: 'Wird verlängert...',
      getTime: '+30 Minuten erhalten',
      note:
        'MVP-Logik: aktuell ist dies ein einfacher Rewarded-Interstitial. Für Werbenetzwerke dürfen nur die erlaubten Formate und Regeln des jeweiligen Netzwerks genutzt werden.'
    }
  },
  fr: {
    badge: 'Email temporaire anonyme',
    heroSubtitle: 'Recevez des emails sans inscription. L’adresse se supprime automatiquement après 10 minutes.',
    topAdLabel: 'Bloc publicitaire supérieur / CPA / bannière directe',
    emailLabel: 'Votre email temporaire',
    creatingAddress: 'création de l’adresse...',
    copy: 'Copier',
    refreshInbox: 'Actualiser la boîte',
    newAddress: 'Nouvelle adresse',
    inboxTitle: 'Boîte de réception',
    emptyInbox: 'Aucun message pour le moment. La boîte se met à jour automatiquement toutes les 5 secondes.',
    from: 'De',
    htmlNoText: 'Email HTML sans version texte',
    selectMessage: 'Sélectionnez un email pour le lire ici.',
    monetizationTitle: 'La monétisation est prévue dès le premier jour',
    monetizationText:
      'Le service n’est pas lié à AdSense : vous pouvez connecter des bannières directes, des partenaires CPA, des offres privacy/VPN, Adsterra, Monetag ou un autre réseau. Les publicités ne sont pas insérées dans le contenu des emails.',
    sidebarAdLabel: 'Bloc publicitaire latéral',
    bottomSidebarAdLabel: 'Bannière latérale basse',
    whyTitle: 'Pourquoi l’utiliser ?',
    whyText: 'Protégez votre email principal du spam lors des inscriptions, tests et confirmations ponctuelles.',
    privacy: 'Politique de confidentialité',
    terms: 'Conditions d’utilisation',
    abuse: 'Politique anti-abus',
    rewarded: {
      openButton: 'Prolonger de 30 minutes',
      close: 'Fermer',
      title: 'Prolonger l’email temporaire',
      description: 'Regardez le bloc publicitaire ou l’offre partenaire, puis cette boîte sera prolongée de 30 minutes.',
      adLabel: 'Publicité pour prolonger la boîte',
      extendError: 'Impossible de prolonger la boîte',
      unknownError: 'Erreur de prolongation',
      continueIn: 'Continuer dans {seconds} s',
      extending: 'Prolongation...',
      getTime: 'Obtenir +30 minutes',
      note:
        'Logique MVP : il s’agit actuellement d’un simple interstitiel récompensé. Pour les réseaux publicitaires, utilisez uniquement les formats et règles autorisés par le réseau concerné.'
    }
  },
  pl: {
    badge: 'Anonimowy tymczasowy email',
    heroSubtitle: 'Odbieraj wiadomości bez rejestracji. Adres usunie się automatycznie po 10 minutach.',
    topAdLabel: 'Górny blok reklamowy / CPA / baner bezpośredni',
    emailLabel: 'Twój tymczasowy email',
    creatingAddress: 'tworzenie adresu...',
    copy: 'Kopiuj',
    refreshInbox: 'Odśwież inbox',
    newAddress: 'Nowy adres',
    inboxTitle: 'Odebrane',
    emptyInbox: 'Nie ma jeszcze wiadomości. Inbox odświeża się automatycznie co 5 sekund.',
    from: 'Od',
    htmlNoText: 'Email HTML bez wersji tekstowej',
    selectMessage: 'Wybierz wiadomość, aby przeczytać ją tutaj.',
    monetizationTitle: 'Monetyzacja jest gotowa od pierwszego dnia',
    monetizationText:
      'Serwis nie jest powiązany z AdSense: możesz podłączyć banery bezpośrednie, partnerów CPA, oferty privacy/VPN, Adsterra, Monetag albo inną sieć. Reklamy nie są wstawiane do treści wiadomości.',
    sidebarAdLabel: 'Boczny blok reklamowy',
    bottomSidebarAdLabel: 'Dolny baner boczny',
    whyTitle: 'Po co tego używać?',
    whyText: 'Chroń główny email przed spamem podczas rejestracji, testów i jednorazowych potwierdzeń.',
    privacy: 'Polityka prywatności',
    terms: 'Warunki korzystania',
    abuse: 'Zasady nadużyć',
    rewarded: {
      openButton: 'Przedłuż o 30 minut',
      close: 'Zamknij',
      title: 'Przedłuż tymczasowy email',
      description: 'Obejrzyj blok reklamowy lub ofertę partnerską, a skrzynka zostanie przedłużona o kolejne 30 minut.',
      adLabel: 'Reklama za przedłużenie skrzynki',
      extendError: 'Nie udało się przedłużyć skrzynki',
      unknownError: 'Błąd przedłużenia',
      continueIn: 'Kontynuuj za {seconds} s',
      extending: 'Przedłużanie...',
      getTime: 'Odbierz +30 minut',
      note:
        'Logika MVP: obecnie jest to prosty rewarded interstitial. Dla sieci reklamowych używaj tylko formatów i zasad dozwolonych przez konkretną sieć.'
    }
  }
};

export type AppTranslations = (typeof translations)['en'];
export type RewardedExtendTranslations = AppTranslations['rewarded'];

export function isSupportedLocale(value: string | null | undefined): value is Locale {
  return Boolean(value && SUPPORTED_LOCALES.includes(value as Locale));
}

function normalizeLanguageTag(languageTag: string): Locale | null {
  const language = languageTag.toLowerCase().split('-')[0];

  if (['ru', 'be', 'uk', 'kk', 'uz', 'ky'].includes(language)) return 'ru';
  if (language === 'de') return 'de';
  if (language === 'fr') return 'fr';
  if (language === 'pl') return 'pl';
  if (language === 'en') return 'en';

  return null;
}

export function detectBrowserLocale(): Locale {
  if (typeof navigator === 'undefined') return FALLBACK_LOCALE;

  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];

  for (const language of browserLanguages) {
    const locale = normalizeLanguageTag(language);
    if (locale) return locale;
  }

  return FALLBACK_LOCALE;
}

export function getSavedLocale(): Locale | null {
  if (typeof window === 'undefined') return null;

  try {
    const savedLocale = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isSupportedLocale(savedLocale) ? savedLocale : null;
  } catch {
    return null;
  }
}

export function saveLocale(locale: Locale) {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
  } catch {
    // Ignore private-mode storage errors; the UI can still switch instantly.
  }
}

export function getInitialLocale(): Locale {
  return getSavedLocale() ?? detectBrowserLocale();
}
