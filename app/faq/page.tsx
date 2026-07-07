import type { Metadata } from 'next';
import HelpPage from '@/components/HelpPage';

export const metadata: Metadata = {
  title: 'FAQ | [PROJECT_NAME]',
  description: 'Frequently asked questions about temporary email addresses, mailbox lifetime, extensions, and message deletion.'
};

export default function FaqPage() {
  return <HelpPage page="faq" />;
}
