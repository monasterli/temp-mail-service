import AdSlot from '@/components/AdSlot';

export const metadata = { title: 'Временная почта — одноразовый email без регистрации', description: 'Что такое временная почта, для чего нужна и как безопасно использовать одноразовый email.' };

export default function RuSeoPage() {
  return <main className="min-h-screen bg-slate-950 text-white px-4 py-10"><article className="mx-auto max-w-3xl glass rounded-3xl p-6 space-y-5"><h1 className="text-3xl font-black">Временная почта</h1><p className="text-white/70">Временная почта помогает получить письмо без регистрации и не раскрывать основной email на случайных сайтах.</p><AdSlot placement="content" label="SEO-страница: рекламный блок в статье" /><h2 className="text-2xl font-bold">Когда использовать</h2><p>Для тестов, одноразовых подтверждений, защиты от спама и проверки сервисов, которым вы пока не доверяете.</p><h2 className="text-2xl font-bold">Когда не использовать</h2><p>Не используйте временную почту для важных аккаунтов, банков, восстановления доступа и долгосрочной переписки.</p><a href="/" className="text-cyan-300">Создать временный email</a></article></main>;
}
