import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Cookie Policy | [PROJECT_NAME]',
  description: 'Cookie and localStorage information for [PROJECT_NAME].'
};

export default function CookiesPage() {
  return <LegalPage page="cookies" />;
}
