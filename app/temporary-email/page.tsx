import AdSlot from '@/components/AdSlot';

export const metadata = { title: 'Temporary Email — disposable email address', description: 'Create a temporary disposable email address for tests, signups and spam protection.' };

export default function TemporaryEmailPage() {
  return <main className="min-h-screen bg-slate-950 text-white px-4 py-10"><article className="mx-auto max-w-3xl glass rounded-3xl p-6 space-y-5"><h1 className="text-3xl font-black">Temporary Email</h1><p className="text-white/70">A temporary email address helps you receive messages without exposing your main inbox.</p><AdSlot placement="content" label="SEO page ad slot" /><h2 className="text-2xl font-bold">Use cases</h2><p>Testing, disposable signups, spam protection and quick email verification.</p><h2 className="text-2xl font-bold">Limitations</h2><p>Do not use temporary email for important accounts, finance, password recovery or long-term communication.</p><a href="/" className="text-cyan-300">Create temporary email</a></article></main>;
}
