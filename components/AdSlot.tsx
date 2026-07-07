'use client';

import Script from 'next/script';

type AdPlacement = 'top' | 'sidebar' | 'content' | 'inbox' | 'reward';

type Props = {
  placement?: AdPlacement;
  label?: string;
  compact?: boolean;
};

const provider = process.env.NEXT_PUBLIC_AD_PROVIDER || 'placeholder';
const adsterraKey = process.env.NEXT_PUBLIC_ADSTERRA_KEY || process.env.NEXT_PUBLIC_ADSTERRA_BANNER_KEY;
const monetagZone = process.env.NEXT_PUBLIC_MONETAG_KEY || process.env.NEXT_PUBLIC_MONETAG_ZONE_ID;
const cpaOfferUrl = process.env.NEXT_PUBLIC_CPA_OFFER_URL;
const directImage = process.env.NEXT_PUBLIC_DIRECT_AD_IMAGE;
const directUrl = provider === 'cpa'
  ? cpaOfferUrl || process.env.NEXT_PUBLIC_DIRECT_AD_URL
  : process.env.NEXT_PUBLIC_DIRECT_AD_URL || cpaOfferUrl;
const directTitle = process.env.NEXT_PUBLIC_DIRECT_AD_TITLE || 'Рекламное предложение';
const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

function Placeholder({ placement, label, compact }: Required<Props>) {
  return (
    <div className={`glass rounded-2xl p-4 text-center text-sm text-white/60 ${compact ? 'min-h-[80px]' : 'min-h-[120px]'} flex items-center justify-center`}>
      <div>
        <div className="font-bold text-white/75">{label}</div>
        <div className="mt-1 text-xs text-white/45">Зона: {placement}. Сюда можно подключить CPA, прямой баннер, Adsterra, Monetag или другую сеть.</div>
      </div>
    </div>
  );
}

function DirectAd({ placement, label, compact }: Required<Props>) {
  if (!directUrl) return <Placeholder placement={placement} label={label} compact={compact} />;

  return (
    <a
      href={directUrl}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className={`glass rounded-2xl p-4 text-center text-sm text-white/75 ${compact ? 'min-h-[80px]' : 'min-h-[120px]'} flex items-center justify-center hover:bg-white/12 transition`}
    >
      {directImage ? (
        <img src={directImage} alt={directTitle} className="max-h-28 w-full object-contain rounded-xl" />
      ) : (
        <div>
          <div className="font-bold text-cyan-100">{directTitle}</div>
          <div className="mt-1 text-xs text-white/55">Рекламный блок / CPA-оффер</div>
        </div>
      )}
    </a>
  );
}

function AdsterraAd({ placement, label, compact }: Required<Props>) {
  if (!adsterraKey) return <Placeholder placement={placement} label={label} compact={compact} />;

  return (
    <div className={`glass rounded-2xl overflow-hidden p-3 ${compact ? 'min-h-[80px]' : 'min-h-[120px]'}`}>
      <div className="text-[10px] uppercase tracking-widest text-white/35 mb-2">Реклама</div>
      <div id={`adsterra-${placement}`} className="min-h-[90px] flex items-center justify-center text-white/45 text-xs">
        Adsterra zone: {adsterraKey}
      </div>
      {/* Вставьте официальный script-код Adsterra для нужного формата в этот компонент после создания площадки. */}
    </div>
  );
}

function MonetagAd({ placement, label, compact }: Required<Props>) {
  if (!monetagZone) return <Placeholder placement={placement} label={label} compact={compact} />;

  return (
    <div className={`glass rounded-2xl overflow-hidden p-3 ${compact ? 'min-h-[80px]' : 'min-h-[120px]'}`}>
      <div className="text-[10px] uppercase tracking-widest text-white/35 mb-2">Реклама</div>
      <div id={`monetag-${placement}`} className="min-h-[90px] flex items-center justify-center text-white/45 text-xs">
        Monetag zone: {monetagZone}
      </div>
      {/* Вставьте официальный script-код Monetag/PropellerAds после создания площадки. */}
    </div>
  );
}

function AdsenseAd({ placement, label, compact }: Required<Props>) {
  if (!adsenseClient) return <Placeholder placement={placement} label={label} compact={compact} />;

  return (
    <div className={`glass rounded-2xl p-4 text-center text-sm text-white/60 ${compact ? 'min-h-[80px]' : 'min-h-[120px]'}`}>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <ins
        className="adsbygoogle block w-full"
        data-ad-client={adsenseClient}
        data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT || '0000000000'}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <div className="text-xs text-white/40 mt-2">AdSense включать только на безопасных страницах: SEO, FAQ, статьи, не внутри письма.</div>
    </div>
  );
}

export default function AdSlot({ placement = 'content', label = 'Рекламное место', compact = false }: Props) {
  const safeProps = { placement, label, compact } as Required<Props>;

  if (provider === 'direct' || provider === 'cpa') return <DirectAd {...safeProps} />;
  if (provider === 'adsterra') return <AdsterraAd {...safeProps} />;
  if (provider === 'monetag' || provider === 'propeller') return <MonetagAd {...safeProps} />;
  if (provider === 'adsense') return <AdsenseAd {...safeProps} />;

  return <Placeholder {...safeProps} />;
}
