import AdSlot from '@/components/AdSlot';

export const metadata = {
  title: 'Одноразовая почта — временный email без регистрации',
  description: 'Одноразовая почта помогает быстро получить письмо и защитить основной email от спама.'
};

export default function OneTimeMailRuPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 py-10">
      <article className="mx-auto max-w-3xl glass rounded-3xl p-6 space-y-5">
        <h1 className="text-3xl font-black">Одноразовая почта</h1>
        <p className="text-white/70">
          Одноразовая почта подходит для быстрых регистраций, тестов и подтверждений, когда не хочется указывать основной email.
        </p>
        <AdSlot placement="content" label="Одноразовая почта: рекламный блок" />
        <h2 className="text-2xl font-bold">Когда это удобно</h2>
        <p>Используйте временный адрес для проверки сервисов, скачивания материалов и защиты от лишних рассылок.</p>
        <h2 className="text-2xl font-bold">Когда лучше не использовать</h2>
        <p>Не создавайте через одноразовую почту важные аккаунты, банковские профили и сервисы для восстановления доступа.</p>
        <a href="/" className="text-cyan-300">Создать одноразовый email</a>
      </article>
    </main>
  );
}
