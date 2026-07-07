import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Report Abuse | [PROJECT_NAME]',
  description: 'How to report abuse involving temporary email addresses on [PROJECT_NAME].'
};

export default function AbusePage() {
  return <LegalPage page="abuse" />;
}
