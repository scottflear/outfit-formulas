import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Props { userName?: string; onBuy: () => void; }

export function SlowdivePaywall({ userName, onBuy }: Props) {
  const [seconds, setSeconds] = useState(1800);
  const [buyerCount, setBuyerCount] = useState(147);
  const [selected, setSelected] = useState(1);
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000);
    const b = setInterval(() => setBuyerCount(130 + Math.floor(Math.random() * 40)), 5000);
    return () => { clearInterval(t); clearInterval(b); };
  }, []);

  const plans = [
    { label: 'Weekly', price: '$2.99', perDay: '$0.43/day', was: '$11.99' },
    { label: 'Monthly', price: '$7.99', perDay: '$0.27/day', was: '$29.99', popular: true },
    { label: 'Annual', price: '$3.99', perDay: '$0.13/day', was: '$47.99', value: true },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="pb-28 px-4 max-w-md mx-auto w-full">

        {/* LIMITED TIME banner */}
        <div className="mt-4 bg-red-500 text-white rounded-xl px-4 py-2 text-center text-xs font-black tracking-wide">
          ⏰ LIMITED TIME OFFER — Expires in {mm}:{ss}
        </div>

        {/* Live buyer counter */}
        <div className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-foreground bg-card border border-border rounded-xl px-4 py-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
          <span><strong className="text-primary">{buyerCount} women</strong> unlocked their blueprint in the last hour</span>
        </div>

        {/* Headline */}
        <div className="mt-5 text-center">
          <h1 className="text-xl font-black text-foreground leading-tight">
            {userName ? `${userName}'s` : 'Your'} Style Blueprint is ready.
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            53 outfit combinations. 9 core formulas. Built from what you already own.
          </p>
        </div>

        {/* Per-day pricing plans */}
        <div className="mt-5">
          <p className="text-sm font-bold text-foreground mb-3">Choose your plan:</p>
          <div className="space-y-2">
            {plans.map((plan, i) => (
              <motion.button
                key={i}
                data-testid={`plan-${i}`}
                className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
                  selected === i ? 'border-primary bg-primary/5' : 'border-border bg-card'
                }`}
                onClick={() => setSelected(i)}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    {plan.popular && <div className="text-[9px] font-black text-primary uppercase tracking-wide mb-0.5">⭐ MOST POPULAR</div>}
                    {plan.value && <div className="text-[9px] font-black text-green-600 uppercase tracking-wide mb-0.5">🏆 BEST VALUE</div>}
                    <p className="text-sm font-bold text-foreground">{plan.label}</p>
                    <p className="text-xs font-semibold text-primary">{plan.perDay}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground line-through block">{plan.was}</span>
                    <span className="text-xl font-black text-foreground">{plan.price}</span>
                    <span className="text-xs text-muted-foreground">/period</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-4 space-y-2">
          {[
            { t: '"I did the weekly plan first to test it, then immediately went annual. 53 outfits from what I already owned. Actual magic."', a: 'Helen K., 44' },
          ].map((item, i) => (
            <div key={i} className="bg-card rounded-xl p-3 border border-border">
              <div className="text-yellow-500 text-xs mb-1">⭐⭐⭐⭐⭐</div>
              <p className="text-xs text-foreground italic">{item.t}</p>
              <p className="text-[10px] text-muted-foreground font-semibold mt-1">— {item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky footer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t-2 border-primary px-4 py-3 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-muted-foreground font-semibold">{buyerCount} unlocked this hour</span>
          </div>
          <span className="text-xs font-black text-primary">⏱ {mm}:{ss}</span>
        </div>
        <motion.button
          className="flex-1 py-3 rounded-xl font-black text-white text-sm"
          style={{ background: 'hsl(341 91% 58%)' }}
          onClick={onBuy}
          whileTap={{ scale: 0.97 }}
          data-testid="buy-button"
        >
          Unlock My Blueprint →
        </motion.button>
      </div>
    </div>
  );
}
