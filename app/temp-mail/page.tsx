import AdSlot from '@/components/AdSlot';

export const metadata = {
  title: 'Temp Mail — free temporary email inbox',
  description: 'Create a temp mail inbox to receive short-term messages without registration.'
};

export default function TempMailPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 py-10">
      <article className="mx-auto max-w-3xl glass rounded-3xl p-6 space-y-5">
        <h1 className="text-3xl font-black">Temp Mail</h1>
        <p className="text-white/70">
          Temp mail gives you a short-lived email address for one-time messages, confirmations, and quick tests.
        </p>
        <AdSlot placement="content" label="Temp mail page ad slot" />
        <h2 className="text-2xl font-bold">Why use temp mail?</h2>
        <p>It keeps spam away from your personal mailbox and lets you test email flows without creating a permanent account.</p>
        <h2 className="text-2xl font-bold">Simple privacy rule</h2>
        <p>Temporary inboxes are public to anyone who has the address, so avoid sensitive personal or financial messages.</p>
        <a href="/" className="text-cyan-300">Open temp mail inbox</a>
      </article>
    </main>
  );
}
