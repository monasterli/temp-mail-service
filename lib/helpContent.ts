import type { Locale } from '@/lib/i18n';

export type HelpContentLocale = 'en' | 'ru';
export type HelpPageKey = 'faq' | 'how-it-works' | 'what-is-temp-mail' | 'features';

type HelpSection = {
  title: string;
  body?: string[];
  items?: string[];
  highlight?: boolean;
};

type HelpPageContent = {
  title: string;
  description: string;
  sections: HelpSection[];
};

type HelpLocaleContent = {
  backHome: string;
  kicker: string;
  nav: Record<HelpPageKey, string>;
  pages: Record<HelpPageKey, HelpPageContent>;
};

export function getHelpLocale(locale: Locale): HelpContentLocale {
  return locale === 'ru' ? 'ru' : 'en';
}

export const helpContent: Record<HelpContentLocale, HelpLocaleContent> = {
  en: {
    backHome: 'Back to 10 Minute Mail',
    kicker: 'Help and FAQ',
    nav: {
      faq: 'FAQ',
      'how-it-works': 'How it works',
      'what-is-temp-mail': 'What is temp mail?',
      features: 'Features'
    },
    pages: {
      faq: {
        title: 'Frequently Asked Questions',
        description: 'Quick answers about using temporary email addresses, inbox lifetime, message deletion, and common limitations.',
        sections: [
          {
            title: 'What is temp mail?',
            body: [
              'Temp mail is a short-lived email address that lets you receive messages without sharing your main inbox. It is useful for testing, one-time confirmations, and reducing spam exposure.'
            ]
          },
          {
            title: 'How long do addresses live?',
            body: [
              'A new temporary address starts with a 10-minute lifetime. The app shows a countdown timer, and extensions can add 30 minutes when accepted by the backend, subject to the service-side maximum lifetime.'
            ]
          },
          {
            title: 'How can I extend mailbox life?',
            body: [
              'Use the extension button in the app. After viewing the advertising or partner-offer screen, the mailbox can be extended by 30 minutes when the backend accepts the request and the mailbox has not reached the service limit.'
            ]
          },
          {
            title: 'Is sending mail supported?',
            body: ['No. This service is receive-only. It does not support sending emails from temporary addresses.']
          },
          {
            title: 'Are attachments supported?',
            body: [
              'Attachment handling is not part of the basic MVP experience. If an email provider forwards attachment metadata or content, the current UI is still focused on sender, recipient, subject, text, and HTML body display.'
            ]
          },
          {
            title: 'When are messages deleted?',
            body: [
              'Messages are designed to expire with the temporary mailbox. Cleanup removes expired mailboxes and their messages, so important information should not be stored here.'
            ]
          },
          {
            title: 'Why do some websites block temp mail?',
            body: [
              'Some websites block disposable email domains to reduce spam, fraud, repeated trials, fake signups, or account abuse. This is a policy choice made by those websites.'
            ]
          },
          {
            title: 'Should I use temp mail for important accounts?',
            highlight: true,
            body: [
              'No. Do not use temporary email for banking, healthcare, government services, password recovery, legal matters, or any account you need long-term access to. Mailboxes expire and may not be recoverable.'
            ]
          }
        ]
      },
      'how-it-works': {
        title: 'How it works',
        description: 'A simple overview of how temporary inboxes are created, refreshed, extended, and cleaned up.',
        sections: [
          {
            title: 'Create a mailbox',
            body: [
              'When you open the app, it creates a temporary address with a 10-minute lifetime and stores the current mailbox state in your browser so the interface can keep showing it while it is still valid.'
            ]
          },
          {
            title: 'Receive incoming messages',
            body: [
              'Inbound email is processed by the configured email provider and stored for the matching temporary mailbox. The inbox refreshes automatically, and you can also refresh it manually.'
            ]
          },
          {
            title: 'Read messages',
            body: [
              'The inbox shows message previews. Selecting a message opens the readable text body when available. HTML-only messages may not always have a clean text version.'
            ]
          },
          {
            title: 'Extend mailbox lifetime',
            body: [
              'The extension flow shows a generic advertising or partner-offer screen. After the short wait, the app can request a 30-minute extension for the mailbox.'
            ]
          },
          {
            title: 'Automatic cleanup',
            body: [
              'Expired mailboxes and their messages are removed by cleanup logic. This keeps the service lightweight and reinforces that the inbox is temporary.'
            ]
          }
        ]
      },
      'what-is-temp-mail': {
        title: 'What is temp mail?',
        description: 'Temp mail is a disposable inbox for short-term receiving, testing, and privacy protection.',
        sections: [
          {
            title: 'Disposable by design',
            body: [
              'A temporary email address is meant to be used briefly and then discarded. It helps you avoid giving your main email address to every form, test account, or low-risk signup.'
            ]
          },
          {
            title: 'Good use cases',
            items: [
              'Testing signup and email-delivery flows.',
              'Receiving one-time confirmation messages where temporary email is allowed.',
              'Reducing spam exposure for low-risk websites.',
              'Trying a service before deciding whether to use your permanent email.'
            ]
          },
          {
            title: 'Bad use cases',
            highlight: true,
            items: [
              'Important accounts you need to recover later.',
              'Banking, healthcare, government, legal, or workplace accounts.',
              'Anything that may receive sensitive personal data.',
              'Services where disposable email is forbidden by the platform rules.'
            ]
          }
        ]
      },
      features: {
        title: 'Features',
        description: 'The core MVP features available in the temporary email service.',
        sections: [
          {
            title: 'Inbox features',
            items: [
              'Generate a temporary email address.',
              'Copy the address quickly.',
              'See a countdown timer for mailbox lifetime.',
              'Refresh incoming messages manually or automatically.',
              'Open message details from the inbox list.'
            ]
          },
          {
            title: 'Lifecycle features',
            items: [
              'Start each new mailbox with a 10-minute lifetime.',
              'Extend mailbox lifetime by 30 minutes through the rewarded extension flow.',
              'Automatically clean up expired mailboxes and messages.',
              'Keep the MVP focused on receiving mail, not sending mail.'
            ]
          },
          {
            title: 'Privacy and monetization features',
            items: [
              'No requirement for Google AdSense to run the project.',
              'Support for placeholder, direct, CPA, Adsterra, Monetag, and optional AdSense providers.',
              'Ads are not inserted inside email message content.',
              'Language preference can be saved locally in the browser.'
            ]
          }
        ]
      }
    }
  },
  ru: {
    backHome: 'Назад к 10 Minute Mail',
    kicker: 'Справка и FAQ',
    nav: {
      faq: 'FAQ',
      'how-it-works': 'Как это работает',
      'what-is-temp-mail': 'Что такое temp mail?',
      features: 'Возможности'
    },
    pages: {
      faq: {
        title: 'Частые вопросы',
        description: 'Короткие ответы о временных email-адресах, сроке жизни ящика, удалении писем и основных ограничениях.',
        sections: [
          {
            title: 'Что такое temp mail?',
            body: [
              'Temp mail — это временный email-адрес, который позволяет получать письма без использования основного почтового ящика. Он подходит для тестов, одноразовых подтверждений и снижения спама.'
            ]
          },
          {
            title: 'Сколько живут адреса?',
            body: [
              'Новый временный адрес создается на 10 минут. В приложении виден таймер, а продление может добавить 30 минут, если backend принимает запрос и ящик не достиг сервисного лимита.'
            ]
          },
          {
            title: 'Как продлить срок жизни ящика?',
            body: [
              'Используйте кнопку продления в приложении. После просмотра рекламного экрана или партнерского предложения ящик может быть продлен на 30 минут, если backend принимает запрос и ящик не достиг сервисного лимита.'
            ]
          },
          {
            title: 'Можно ли отправлять письма?',
            body: ['Нет. Сервис работает только на прием писем и не поддерживает отправку писем с временных адресов.']
          },
          {
            title: 'Поддерживаются ли вложения?',
            body: [
              'Работа с вложениями не входит в базовый MVP. Даже если email-провайдер передает метаданные или содержимое вложений, текущий интерфейс ориентирован на отправителя, получателя, тему, текст и HTML письма.'
            ]
          },
          {
            title: 'Когда удаляются сообщения?',
            body: [
              'Сообщения рассчитаны на удаление вместе с временным ящиком. Cleanup удаляет истекшие ящики и их письма, поэтому важную информацию здесь хранить нельзя.'
            ]
          },
          {
            title: 'Почему некоторые сайты блокируют temp mail?',
            body: [
              'Некоторые сайты блокируют одноразовые домены, чтобы снизить спам, мошенничество, повторные пробные периоды, фейковые регистрации и злоупотребление аккаунтами.'
            ]
          },
          {
            title: 'Можно ли использовать temp mail для важных аккаунтов?',
            highlight: true,
            body: [
              'Нет. Не используйте временную почту для банков, медицины, госуслуг, восстановления паролей, юридических сервисов или аккаунтов, к которым нужен долгосрочный доступ. Ящик истекает и может быть невосстановим.'
            ]
          }
        ]
      },
      'how-it-works': {
        title: 'Как это работает',
        description: 'Простое объяснение того, как создаются, обновляются, продлеваются и очищаются временные ящики.',
        sections: [
          {
            title: 'Создание ящика',
            body: [
              'Когда вы открываете приложение, оно создает временный адрес на 10 минут и сохраняет состояние текущего ящика в браузере, чтобы интерфейс мог показывать его, пока он действителен.'
            ]
          },
          {
            title: 'Получение входящих писем',
            body: [
              'Входящая почта обрабатывается настроенным email-провайдером и сохраняется для подходящего временного ящика. Inbox обновляется автоматически, а также вручную по кнопке.'
            ]
          },
          {
            title: 'Чтение сообщений',
            body: [
              'Inbox показывает превью писем. При выборе письма открывается читаемая текстовая версия, если она доступна. У HTML-писем не всегда есть чистая текстовая версия.'
            ]
          },
          {
            title: 'Продление срока жизни',
            body: [
              'Флоу продления показывает универсальный рекламный экран или партнерское предложение. После короткого ожидания приложение может запросить продление ящика на 30 минут.'
            ]
          },
          {
            title: 'Автоматическая очистка',
            body: [
              'Истекшие ящики и их письма удаляются cleanup-логикой. Это сохраняет сервис легким и подчеркивает, что inbox временный.'
            ]
          }
        ]
      },
      'what-is-temp-mail': {
        title: 'Что такое temp mail?',
        description: 'Temp mail — это одноразовый inbox для краткосрочного приема писем, тестирования и защиты приватности.',
        sections: [
          {
            title: 'Одноразовый по смыслу',
            body: [
              'Временный email-адрес нужен для короткого использования и последующего удаления. Он помогает не указывать основной email в каждой форме, тестовом аккаунте или низкорисковой регистрации.'
            ]
          },
          {
            title: 'Подходящие сценарии',
            items: [
              'Тестирование регистрации и доставки писем.',
              'Получение одноразовых подтверждений там, где временная почта разрешена.',
              'Снижение спама на низкорисковых сайтах.',
              'Проба сервиса перед использованием постоянного email.'
            ]
          },
          {
            title: 'Неподходящие сценарии',
            highlight: true,
            items: [
              'Важные аккаунты, доступ к которым нужно восстановить позже.',
              'Банковские, медицинские, государственные, юридические или рабочие аккаунты.',
              'Любые сервисы, где могут приходить чувствительные персональные данные.',
              'Платформы, где одноразовая почта запрещена правилами.'
            ]
          }
        ]
      },
      features: {
        title: 'Возможности',
        description: 'Основные MVP-возможности сервиса временной почты.',
        sections: [
          {
            title: 'Возможности inbox',
            items: [
              'Создание временного email-адреса.',
              'Быстрое копирование адреса.',
              'Таймер срока жизни ящика.',
              'Ручное и автоматическое обновление входящих писем.',
              'Открытие деталей письма из списка inbox.'
            ]
          },
          {
            title: 'Жизненный цикл',
            items: [
              'Новый ящик создается с 10-минутным сроком жизни.',
              'Продление срока жизни ящика на 30 минут через rewarded extension flow.',
              'Автоматическая очистка истекших ящиков и сообщений.',
              'Фокус MVP на приеме писем, а не на отправке.'
            ]
          },
          {
            title: 'Приватность и монетизация',
            items: [
              'Проект не требует Google AdSense для работы.',
              'Поддержка placeholder, direct, CPA, Adsterra, Monetag и optional AdSense providers.',
              'Реклама не вставляется внутрь содержимого писем.',
              'Выбор языка может сохраняться локально в браузере.'
            ]
          }
        ]
      }
    }
  }
};
