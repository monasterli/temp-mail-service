import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | [PROJECT_NAME]',
  description: 'Privacy information for [PROJECT_NAME], a temporary email service at [DOMAIN].'
};

export default function PrivacyPage() {
  return <LegalPage page="privacy" />;
}
