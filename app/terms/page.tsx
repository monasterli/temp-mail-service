import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Service | [PROJECT_NAME]',
  description: 'Terms for using [PROJECT_NAME], a temporary email service at [DOMAIN].'
};

export default function TermsPage() {
  return <LegalPage page="terms" />;
}
