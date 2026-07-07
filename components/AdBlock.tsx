'use client';

import AdSlot from '@/components/AdSlot';

export default function AdBlock({ slot = 'content' }: { slot?: string }) {
  return <AdSlot placement="content" label={`Рекламная зона ${slot}`} />;
}
