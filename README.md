# Temp Mail Service

Стартовая сборка сервиса временной почты: Next.js + Supabase + Mailgun inbound webhook + универсальный рекламный модуль.

## Что уже есть

- генерация временного email на 10 минут;
- прием писем через Mailgun webhook `/api/mailgun/inbound`;
- inbox с автообновлением каждые 5 секунд;
- продление ящика на 30 минут через rewarded-interstitial;
- автоочистка истекших ящиков через `/api/cleanup`;
- рекламный модуль без жесткой привязки к AdSense;
- SEO-страницы `/temporary-email`, `/disposable-email`, `/temp-mail`, `/burner-email`, `/ru/vremennaya-pochta`, `/ru/odnorazovaya-pochta`;
- базовые страницы Privacy / Terms / Abuse;
- `ads.txt` шаблон.

## Архитектура

```txt
Пользователь -> Next.js сайт на Vercel
Mailgun -> /api/mailgun/inbound -> Supabase
Vercel Cron или внешний scheduler -> /api/cleanup -> Supabase
AdSlot -> direct / cpa / adsterra / monetag / adsense / placeholder
```

## Переменные окружения

Скопируйте `.env.example` в `.env.local` для локального запуска и добавьте эти же переменные в Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
TEMP_MAIL_DOMAIN=your-domain.com
MAILGUN_WEBHOOK_SIGNING_KEY=YOUR_MAILGUN_WEBHOOK_SIGNING_KEY
CRON_SECRET=CHANGE_ME_RANDOM_32_CHARS
NEXT_PUBLIC_AD_PROVIDER=placeholder
NEXT_PUBLIC_DIRECT_AD_URL=
NEXT_PUBLIC_CPA_OFFER_URL=
NEXT_PUBLIC_ADSTERRA_KEY=
NEXT_PUBLIC_MONETAG_KEY=
NEXT_PUBLIC_ADSENSE_CLIENT=
```

Секретные ключи `SUPABASE_SERVICE_ROLE_KEY`, `MAILGUN_WEBHOOK_SIGNING_KEY`, `CRON_SECRET` нельзя выкладывать в GitHub.

## Монетизация

В этой версии проект не зависит от Google AdSense. Основная логика:

- `placeholder` — рекламные места-заглушки для разработки;
- `direct` / `cpa` — прямой баннер или партнерский оффер;
- `adsterra` — место под Adsterra-код;
- `monetag` / `propeller` — место под Monetag/PropellerAds;
- `adsense` — оставлен только как опциональный режим для безопасных SEO-страниц, не для inbox и текста письма.

### Рекомендуемый старт

```env
NEXT_PUBLIC_AD_PROVIDER=direct
NEXT_PUBLIC_DIRECT_AD_TITLE=VPN / privacy offer
NEXT_PUBLIC_DIRECT_AD_URL=https://example.com/affiliate-link
NEXT_PUBLIC_DIRECT_AD_IMAGE=
```

Для Adsterra/Monetag после создания площадки вставьте официальный script-код сети в `components/AdSlot.tsx`.

## Продление ящика через рекламу

Компонент `RewardedExtend` показывает рекламный экран 7 секунд и затем вызывает:

```txt
POST /api/mailbox/extend
```

Ящик продлевается на 30 минут. Максимальная жизнь одного ящика ограничена 120 минутами. Это защита от бесконечного накопления данных.

Важно: для реальной рекламной сети используйте только форматы, разрешенные правилами конкретной сети. Не заставляйте пользователя кликать по рекламе.

## Supabase

В Supabase откройте SQL Editor и выполните:

```txt
supabase/schema.sql
```

Таблицы:

- `mailboxes`
- `messages`

В `messages` есть `provider_message_id` и уникальный индекс по `mailbox + provider_message_id`, чтобы повторная доставка webhook от Mailgun не создавала дубли писем.

## Mailgun

В Mailgun настройте receiving route:

```txt
match_recipient(".*@your-domain.com")
forward("https://your-domain.com/api/mailgun/inbound")
stop()
```

В DNS должны быть MX/TXT/CNAME-записи, которые покажет Mailgun.

## Cleanup

В проекте уже есть `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cleanup",
      "schedule": "*/5 * * * *"
    }
  ]
}
```

Endpoint `/api/cleanup` работает через `GET` и проверяет заголовок:

```txt
Authorization: Bearer CRON_SECRET
```

На Vercel Hobby cron может быть ограничен. Для публичного проекта лучше Vercel Pro или внешний scheduler/GitHub Actions.

## Страницы

- `/` — основной сервис;
- `/temporary-email` — SEO-страница на английском;
- `/disposable-email` — SEO-страница на английском;
- `/temp-mail` — SEO-страница на английском;
- `/burner-email` — SEO-страница на английском;
- `/ru/vremennaya-pochta` — SEO-страница на русском;
- `/ru/odnorazovaya-pochta` — SEO-страница на русском;
- `/privacy` — шаблон политики конфиденциальности;
- `/terms` — шаблон условий;
- `/abuse` — шаблон abuse policy.

## Дальше улучшать

1. Подключить Cloudflare Turnstile перед созданием ящика.
2. Добавить rate limits через Cloudflare.
3. Добавить несколько доменов для email.
4. Добавить Telegram-бота.
5. Добавить premium: 24 часа, несколько адресов, без рекламы.
6. Добавить Supabase Realtime вместо polling.
7. Добавить обработку вложений.
8. Добавить логи безопасности и базовую аналитику abuse-событий.
