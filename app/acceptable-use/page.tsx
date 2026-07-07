import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Acceptable Use Policy | [PROJECT_NAME]',
  description: 'Allowed and forbidden uses for [PROJECT_NAME].'
};

export default function AcceptableUsePage() {
  return <LegalPage page="acceptable-use" />;
}
