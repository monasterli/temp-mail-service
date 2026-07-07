import type { Metadata } from 'next';
import HelpPage from '@/components/HelpPage';

export const metadata: Metadata = {
  title: 'What is temp mail? | [PROJECT_NAME]',
  description: 'A simple explanation of temporary email, when to use it, and when to avoid it.'
};

export default function WhatIsTempMailPage() {
  return <HelpPage page="what-is-temp-mail" />;
}
