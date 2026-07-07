import './globals.css';
import type { Metadata } from 'next';
import CookieConsent from '@/components/CookieConsent';

export const metadata: Metadata = {
  title: '10 Minute Mail — временная почта',
  description: 'Бесплатная временная почта на 10 минут: получайте письма без регистрации.',
  keywords: ['10 minute mail', 'temporary email', 'временная почта', 'одноразовая почта', 'temp mail'],
  openGraph: { title: '10 Minute Mail', description: 'Быстрая временная почта на 10 минут', type: 'website' },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
