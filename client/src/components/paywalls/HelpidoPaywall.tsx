import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Props { userName?: string; onBuy: () => void; }

export function HelpidoPaywall({ userName, onBuy }: Props) {
  const [seconds, setSeconds] = useState(600);
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 77% DISCOUNT sticky banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white text-center py-3 px-4">
        <p className="text-sm font-black">🔥 77% DISCOUNT — TODAY ONLY</p>
        <p className="text-[10px] font-semibold mt-0.5">Expires in {mm}:{ss} · For quiz completers only</p>
      </div>

      <div className="pt-16 pb-28 px-4 max-w-md mx-auto w-full">

        {/* Full-width emotional before/after */}
        <div className="space-y-2">
          <div className="w-full bg-gray-100 dark:bg-gray-900 rounded-2xl p-6 border border-border">
            <p className="text-xs font-black uppercase text-muted-foreground tracking-widest mb-3">Before Outfit Formulas</p>
            <div className="text-4xl mb-3">😔</div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              "Every morning I'd try on five things and hate them all. I felt invisible at work, I dreaded photos, I stopped going to events because I couldn't figure out what to wear. I thought something was wrong with me."
            </p>
          </div>

          <div className="w-full bg-primary/5 rounded-2xl p-6 border-2 border-primary">
            <p className="text-xs font-black uppercase text-primary tracking-widest mb-3">After Outfit Formulas ✨</p>
            <div className="text-4xl mb-3">💃</div>
            <p className="text-sm text-foreground leading-relaxed font-medium">
              "I get dressed in 5 minutes and actually feel like myself. I go to events. I'm in photos. I wore the same clothes — I just finally knew what to do with them."
            </p>
            <p className="text-xs text-muted-foreground mt-2">— Rachel G., 44, teacher · 3 months after starting</p>
          </div>
        </div>

        {/* Headline */}
        <div className="mt-5 text-center">
          <h1 className="text-xl font-black text-foreground leading-tight">
            {userName ? `${userName}, this` : 'This'} is your turn.
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            The same formula. Your wardrobe. This week.
          </p>
        </div>

        {/* What you get — minimal */}
        <div className="mt-4 space-y-2">
          {[
            'Daily outfit from what you already own',
            'Never stand at a full closet feeling stuck again',
            'Find 50+ outfits in your wardrobe this week',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-foreground bg-card rounded-xl p-3 border border-border">
              <span className="text-primary font-bold shrink-0">✓</span>
              {item}
            </div>
          ))}
        </div>

        {/* Aggressive pricing */}
        <div className="mt-5 bg-primary/5 border-2 border-primary rounded-2xl p-5 text-center">
          <div className="inline-block bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full mb-3">77% DISCOUNT APPLIED</div>
          <div className="flex items-center justify-center gap-3 mb-1">
            <span className="text-sm text-muted-foreground line-through">$14.99</span>
            <span className="text-4xl font-black text-foreground">$3.49</span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">for your first 2 weeks · Then $9.99/month · Cancel anytime</p>

          <motion.button
            data-testid="buy-button"
            className="w-full py-4 rounded-xl font-black text-white text-base"
            style={{ background: 'hsl(340 100% 58%)' }}
            onClick={onBuy}
            whileTap={{ scale: 0.98 }}
          >
            Get My Style Freedom →
          </motion.button>
        </div>

        {/* Trust */}
        <div className="mt-3 flex justify-center gap-4 flex-wrap">
          {[['🔒', 'Secure'], ['✓', 'Cancel Anytime'], ['🛡️', '30-Day Guarantee']].map(([icon, label]) => (
            <div key={label} className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <span>{icon}</span><span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky countdown footer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-red-600 text-white px-4 py-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold">77% OFF expires</p>
          <p className="text-lg font-black">{mm}:{ss}</p>
        </div>
        <motion.button
          className="flex-1 py-3 rounded-xl font-black text-red-600 bg-white text-sm"
          onClick={onBuy}
          whileTap={{ scale: 0.97 }}
          data-testid="sticky-buy-button"
        >
          Get $3.49 Offer →
        </motion.button>
      </div>
    </div>
  );
}
