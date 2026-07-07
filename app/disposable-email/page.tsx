import AdSlot from '@/components/AdSlot';

export const metadata = {
  title: 'Disposable Email — temporary inbox for quick signups',
  description: 'Use a disposable email address for short-term signups, tests, and spam protection.'
};

export default function DisposableEmailPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 py-10">
      <article className="mx-auto max-w-3xl glass rounded-3xl p-6 space-y-5">
        <h1 className="text-3xl font-black">Disposable Email</h1>
        <p className="text-white/70">
          A disposable email address is useful when you need to receive a confirmation email without sharing your main inbox.
        </p>
        <AdSlot placement="content" label="Disposable email page ad slot" />
        <h2 className="text-2xl font-bold">Best uses</h2>
        <p>Use it for temporary registrations, software testing, downloads, and services you do not fully trust yet.</p>
        <h2 className="text-2xl font-bold">When to avoid it</h2>
        <p>Do not use disposable email for banking, work accounts, password recovery, or anything you need to keep long term.</p>
        <a href="/" className="text-cyan-300">Create disposable email</a>
      </article>
    </main>
  );
}
