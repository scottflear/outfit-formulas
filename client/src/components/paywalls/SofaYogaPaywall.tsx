import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

interface Props { userName?: string; onBuy: () => void; }

export function SofaYogaPaywall({ userName, onBuy }: Props) {
  const [seconds, setSeconds] = useState(900);
  const [copied, setCopied] = useState(false);
  const promoCode = `${userName?.toUpperCase() || 'SARAH'}_STYLE`;
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const copyCode = () => {
    navigator.clipboard.writeText(promoCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const bonuses = [
    { name: '5-Day Style Reset Guide', value: '$19.99' },
    { name: 'Body Type Formula Workbook', value: '$14.99' },
    { name: 'Color Confidence Cheatsheet', value: '$12.99' },
    { name: '30-Day Outfit Challenge Calendar', value: '$8.99' },
  ];
  const totalBonusValue = '$56.96';

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Triple urgency — sticky header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white text-center py-2 px-4 text-xs font-bold flex items-center justify-center gap-2">
        ⏱ PRICE EXPIRES: <strong>{mm}:{ss}</strong>
        <span className="mx-1">·</span>
        Code: <strong>{promoCode}</strong>
        <span className="mx-1">·</span>
        SAVE 60%
      </div>

      <div className="pt-12 pb-28 px-4 max-w-md mx-auto w-full">

        {/* Headline */}
        <div className="mt-4 text-center">
          <h1 className="text-xl font-black text-foreground leading-tight">
            {userName ? `${userName}'s` : 'Your'} Style Transformation Plan
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Your personalized promo code is active for {mm}:{ss}</p>
        </div>

        {/* Personalized promo code block */}
        <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400 rounded-2xl p-4">
          <p className="text-xs font-black text-yellow-700 dark:text-yellow-400 uppercase tracking-widest mb-1">Your personalized promo code</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 bg-white dark:bg-background border border-border rounded-lg px-3 py-2 font-black text-foreground text-sm tracking-wider">
              {promoCode}
            </div>
            <motion.button
              className="p-2 rounded-lg bg-primary text-white"
              onClick={copyCode}
              whileTap={{ scale: 0.95 }}
              data-testid="copy-code-button"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </motion.button>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">Applied automatically at checkout · Expires when timer runs out</p>
        </div>

        {/* Annual pricing */}
        <div className="mt-4 bg-card rounded-2xl border-2 border-primary p-4 text-center">
          <div className="bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded-full inline-block mb-2">SAVE 60%</div>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-sm text-muted-foreground line-through">$49.99</span>
            <span className="text-3xl font-black text-foreground">$19.99</span>
            <span className="text-sm text-muted-foreground">/year</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Just $1.67/month — code auto-applied</p>
        </div>

        {/* FREE Bonus stack */}
        <div className="mt-4 bg-card rounded-2xl border border-border p-4">
          <p className="text-xs font-black text-primary uppercase tracking-widest mb-3">🎁 FREE BONUSES — Today Only</p>
          {bonuses.map((b, i) => (
            <div key={i} className="flex justify-between items-center py-2 border-b border-border last:border-0">
              <div className="flex items-center gap-2">
                <span className="text-green-500 font-bold text-xs">FREE</span>
                <p className="text-xs text-foreground font-medium">{b.name}</p>
              </div>
              <p className="text-xs text-muted-foreground line-through">{b.value}</p>
            </div>
          ))}
          <div className="flex justify-between items-center pt-2 mt-1">
            <p className="text-xs font-bold text-foreground">Total Bonus Value</p>
            <div className="text-right">
              <p className="text-xs text-muted-foreground line-through">{totalBonusValue}</p>
              <p className="text-xs font-black text-green-600">FREE</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.button
          data-testid="buy-button"
          className="w-full mt-5 py-4 rounded-xl font-black text-white text-base"
          style={{ background: 'hsl(341 91% 58%)' }}
          onClick={onBuy}
          whileTap={{ scale: 0.98 }}
        >
          Claim My Plan + Bonuses →
        </motion.button>

        {/* Security badges */}
        <div className="mt-3 flex justify-center gap-4 flex-wrap">
          {[['🔒', 'Norton Secured'], ['🛡️', 'McAfee Safe'], ['✓', 'SSL Protected'], ['↩️', '30-Day Refund']].map(([icon, label]) => (
            <div key={label} className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <span>{icon}</span><span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky countdown footer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-foreground dark:bg-card text-background dark:text-foreground border-t border-border px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-wide opacity-60">Offer expires</span>
          <span className="text-lg font-black">{mm}:{ss}</span>
        </div>
        <motion.button
          className="flex-1 py-3 rounded-xl font-black text-white text-sm"
          style={{ background: 'hsl(341 91% 58%)' }}
          onClick={onBuy}
          whileTap={{ scale: 0.97 }}
          data-testid="sticky-buy-button"
        >
          Claim {promoCode} →
        </motion.button>
      </div>
    </div>
  );
}
