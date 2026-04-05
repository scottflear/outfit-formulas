import { useState } from 'react';
import { motion } from 'framer-motion';

interface Props { userName?: string; onBuy: () => void; }

export function HypnozioPaywall({ userName, onBuy }: Props) {
  const [selected, setSelected] = useState(1); // 6-month pre-selected

  const plans = [
    { duration: '2-Month Plan', price: '$7.99', perMonth: '/month', was: '$14.99', badge: null },
    { duration: '6-Month Plan', price: '$4.99', perMonth: '/month', was: '$9.99', badge: '⭐ MOST POPULAR' },
    { duration: '4-Month Plan', price: '$5.99', perMonth: '/month', was: '$11.99', badge: null },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background pb-8">
      <div className="max-w-md mx-auto w-full px-4">

        {/* Header */}
        <div className="mt-6 text-center">
          <h1 className="text-xl font-black text-foreground leading-tight">
            {userName ? `${userName}, your formula` : 'Your formula'} is ready.
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            No free trial. No gimmicks. Just a system that works — or your money back.
          </p>
        </div>

        {/* What you get */}
        <div className="mt-5 space-y-2">
          {[
            ['🧩', 'Your personalized outfit formula system'],
            ['📅', 'Daily outfit from your existing wardrobe'],
            ['✨', 'Style comeback plan — 3 weeks to results'],
            ['🗂️', 'Wardrobe visibility audit'],
          ].map(([emoji, text], i) => (
            <div key={i} className="flex items-center gap-3 bg-card rounded-xl p-3 border border-border">
              <span className="text-xl">{emoji}</span>
              <p className="text-sm text-foreground font-medium">{text}</p>
            </div>
          ))}
        </div>

        {/* Plans — NO free trial */}
        <div className="mt-6">
          <p className="text-sm font-bold text-foreground mb-3">Select your plan:</p>
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
                    {plan.badge && (
                      <div className="text-[10px] font-black text-primary uppercase tracking-wide mb-0.5">{plan.badge}</div>
                    )}
                    <p className="text-sm font-bold text-foreground">{plan.duration}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground line-through mr-1">{plan.was}</span>
                    <span className="text-xl font-black text-foreground">{plan.price}</span>
                    <span className="text-xs text-muted-foreground">{plan.perMonth}</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* CTA — NO free trial note */}
        <motion.button
          data-testid="buy-button"
          className="w-full mt-5 py-4 rounded-xl font-black text-white text-base"
          style={{ background: 'hsl(340 100% 58%)' }}
          onClick={onBuy}
          whileTap={{ scale: 0.98 }}
        >
          Start My Style Comeback →
        </motion.button>
        <p className="text-xs text-muted-foreground text-center mt-1">No free trial · Billed today · Conditional refund available</p>

        {/* Conditional guarantee */}
        <div className="mt-4 bg-card rounded-xl p-4 border border-border">
          <p className="text-sm font-bold text-foreground">⚠️ Conditional Guarantee</p>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Follow your outfit formulas for 28 days. If you haven't found at least 10 new outfit combinations from your existing wardrobe, contact us for a refund. We mean it — but the formula has to be used.
          </p>
        </div>

        {/* Testimonials */}
        <div className="mt-4 space-y-3">
          {[
            { t: '"I\'d lost my style completely after a difficult few years. The 6-month plan was exactly what I needed — enough time to actually rebuild something, not just a quick fix."', a: 'Joanna M., 46' },
            { t: '"I was skeptical about no free trial but the price point made it feel safe. Three months in and I actually look forward to getting dressed."', a: 'Ruth K., 41' },
          ].map((item, i) => (
            <div key={i} className="bg-card rounded-xl p-3 border border-border">
              <div className="text-yellow-500 text-xs mb-1">⭐⭐⭐⭐⭐</div>
              <p className="text-xs text-foreground italic">{item.t}</p>
              <p className="text-[10px] text-muted-foreground font-semibold mt-1">— {item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
