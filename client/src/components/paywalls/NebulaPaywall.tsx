import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

interface Props { userName?: string; onBuy: () => void; }

export function NebulaPaywall({ userName, onBuy }: Props) {
  const [seconds, setSeconds] = useState(300);
  const progress = Math.max(0, (seconds / 300) * 251);
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const sections = [
    { title: 'Your Body Type Analysis', locked: false },
    { title: 'Your Color Palette Guide', locked: false },
    { title: 'Wardrobe Audit Results', locked: true },
    { title: 'Your 11 Outfit Formulas', locked: true },
    { title: 'Shopping Gap Analysis', locked: true },
    { title: 'Daily Outfit Plan (28 days)', locked: true },
    { title: 'Style System Reference Card', locked: true },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background pb-8">
      <div className="max-w-md mx-auto w-full px-4">

        {/* NOT a subscription callout */}
        <div className="mt-5 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-2xl p-3 text-center">
          <p className="text-sm font-black text-green-700 dark:text-green-400">✅ NOT a subscription</p>
          <p className="text-xs text-muted-foreground mt-0.5">One payment. Yours forever. No monthly fees.</p>
        </div>

        {/* Headline */}
        <div className="mt-5 text-center">
          <h1 className="text-xl font-black text-foreground leading-tight">
            {userName ? `${userName}'s` : 'Your'} Personal Style Report
          </h1>
          <p className="text-sm text-muted-foreground mt-2">24-page personalized report · 11 outfit formulas · One-time purchase</p>
        </div>

        {/* Circular countdown */}
        <div className="mt-5 flex flex-col items-center">
          <div className="relative w-28 h-28">
            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 112 112">
              <circle cx="56" cy="56" r="40" fill="none" stroke="hsl(341 91% 58% / 0.15)" strokeWidth="8" />
              <motion.circle
                cx="56" cy="56" r="40"
                fill="none"
                stroke="hsl(341 91% 58%)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={251}
                animate={{ strokeDashoffset: 251 - progress }}
                transition={{ duration: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-black text-foreground">{mm}:{ss}</span>
              <span className="text-[10px] text-muted-foreground">report price held</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">Price locked at $19.99 for the duration of this timer</p>
        </div>

        {/* Report table of contents — some blurred */}
        <div className="mt-5 bg-card rounded-2xl border border-border p-5">
          <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-3">Your Report Contents</p>
          <div className="space-y-2">
            {sections.map((section, i) => (
              <div key={i} className={`flex items-center gap-3 rounded-xl p-3 ${section.locked ? 'border border-border' : 'border border-primary/20 bg-primary/5'}`}>
                {section.locked ? (
                  <Lock size={16} className="text-muted-foreground shrink-0" />
                ) : (
                  <span className="text-primary font-bold text-sm shrink-0">✓</span>
                )}
                <p className={`text-sm ${section.locked ? 'blur-[2px] text-muted-foreground select-none' : 'text-foreground font-medium'}`}>
                  {section.title}
                </p>
                {section.locked && (
                  <span className="ml-auto text-[10px] text-muted-foreground shrink-0">Locked</span>
                )}
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground text-center mt-3">Unlock all 7 sections for $19.99 — one time, yours forever</p>
        </div>

        {/* One-time price */}
        <div className="mt-5 bg-primary/5 border-2 border-primary rounded-2xl p-5 text-center">
          <p className="text-xs font-black text-primary uppercase tracking-widest mb-2">One-Time Purchase</p>
          <div className="flex items-baseline justify-center gap-2 mb-1">
            <span className="text-sm text-muted-foreground line-through">$39.99</span>
            <span className="text-4xl font-black text-foreground">$19.99</span>
          </div>
          <p className="text-xs text-muted-foreground mb-1">NOT a subscription · Never charged again</p>

          <motion.button
            data-testid="buy-button"
            className="w-full mt-3 py-4 rounded-xl font-black text-white text-base"
            style={{ background: 'hsl(341 91% 58%)' }}
            onClick={onBuy}
            whileTap={{ scale: 0.98 }}
          >
            Unlock My Full Report →
          </motion.button>
          <p className="text-[10px] text-muted-foreground mt-2">Secure payment · Instant delivery · 30-day satisfaction guarantee</p>
        </div>

        {/* Post-purchase upsell note */}
        <div className="mt-3 bg-card rounded-xl p-3 border border-border text-center">
          <p className="text-xs text-muted-foreground">After purchase, you'll be offered optional monthly outfit tracking at $4.99/mo — entirely optional, never automatic.</p>
        </div>
      </div>
    </div>
  );
}
