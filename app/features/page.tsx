import type { Metadata } from 'next';
import HelpPage from '@/components/HelpPage';

export const metadata: Metadata = {
  title: 'Features | [PROJECT_NAME]',
  description: 'Core temporary email MVP features for inboxes, mailbox lifetime, cleanup, privacy, and monetization.'
};

export default function FeaturesPage() {
  return <HelpPage page="features" />;
}
