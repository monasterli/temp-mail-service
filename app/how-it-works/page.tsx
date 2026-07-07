import type { Metadata } from 'next';
import HelpPage from '@/components/HelpPage';

export const metadata: Metadata = {
  title: 'How it works | [PROJECT_NAME]',
  description: 'How temporary inboxes are created, refreshed, extended, and cleaned up.'
};

export default function HowItWorksPage() {
  return <HelpPage page="how-it-works" />;
}
