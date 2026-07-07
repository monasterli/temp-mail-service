import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Contact | [PROJECT_NAME]',
  description: 'Contact information for [PROJECT_NAME].'
};

export default function ContactPage() {
  return <LegalPage page="contact" />;
}
