import AdSlot from '@/components/AdSlot';

export const metadata = {
  title: 'Burner Email — short-lived email address',
  description: 'Use a burner email address when you need a temporary inbox for low-risk messages.'
};

export default function BurnerEmailPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 py-10">
      <article className="mx-auto max-w-3xl glass rounded-3xl p-6 space-y-5">
        <h1 className="text-3xl font-black">Burner Email</h1>
        <p className="text-white/70">
          A burner email is a temporary address you can use once and then leave behind when the task is finished.
        </p>
        <AdSlot placement="content" label="Burner email page ad slot" />
        <h2 className="text-2xl font-bold">Good examples</h2>
        <p>Use a burner email for demo accounts, app testing, trial forms, and websites that might send marketing mail.</p>
        <h2 className="text-2xl font-bold">Important warning</h2>
        <p>Never use a burner email for accounts where losing access would cause problems later.</p>
        <a href="/" className="text-cyan-300">Create burner email</a>
      </article>
    </main>
  );
}
