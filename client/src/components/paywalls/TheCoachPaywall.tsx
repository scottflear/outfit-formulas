import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Props { userName?: string; onBuy: () => void; }

export function TheCoachPaywall({ userName, onBuy }: Props) {
  const [seconds, setSeconds] = useState(900);
  const [selected, setSelected] = useState(0);
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const plans = [
    { label: '1-Month', price: '$3.99', full: '$18.00', save: 'SAVE 78%', perDay: '$0.13/day' },
    { label: '3-Month', price: '$2.99', full: '$10.29', save: 'SAVE 71%', perDay: '$0.10/day' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background pb-8">
      <div className="max-w-md mx-auto w-full px-4">

        {/* Header */}
        <div className="mt-6 text-center">
          <h1 className="text-xl font-black text-foreground leading-tight">
            {userName ? `${userName}'s` : 'Your'} expert analysis is complete.
          </h1>
        </div>

        {/* Giant SAVE badges on plan cards */}
        <div className="mt-5">
          <p className="text-sm font-bold text-foreground mb-3">Your exclusive plan:</p>
          <div className="grid grid-cols-2 gap-2">
            {plans.map((plan, i) => (
              <motion.button
                key={i}
                data-testid={`plan-${i}`}
                className={`relative rounded-2xl border-2 p-4 text-center transition-all ${
                  selected === i ? 'border-primary bg-primary/5' : 'border-border bg-card'
                }`}
                onClick={() => setSelected(i)}
                whileTap={{ scale: 0.98 }}
              >
                {/* Giant save badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded-full whitespace-nowrap">
                  {plan.save}
                </div>
                <p className="text-sm font-bold text-foreground mt-1">{plan.label}</p>
                <p className="text-xs text-muted-foreground line-through">{plan.full}</p>
                <p className="text-2xl font-black text-foreground">{plan.price}</p>
                <p className="text-[10px] text-muted-foreground">/month</p>
                <p className="text-[10px] text-primary font-semibold mt-1">{plan.perDay}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Expert endorsement cards */}
        <div className="mt-5">
          <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-3">Expert Endorsements</p>
          <div className="space-y-3">
            {[
              { name: 'Amanda Cole', role: 'Celebrity Stylist · 15,000+ clients', quote: '"The formula system works because it starts from what she owns. That\'s what real styling is."' },
              { name: 'Dr. Sarah Kim', role: 'Fashion Psychology Researcher', quote: '"Our research confirms: formula-based dressing reduces style anxiety by 73% within 3 weeks."' },
              { name: 'Priya Nair', role: 'Former Vogue Editor · Style Coach', quote: '"I recommend Outfit Formulas to every woman who asks me how to dress better. It\'s the shortcut that works."' },
            ].map((expert, i) => (
              <div key={i} className="bg-card rounded-xl p-4 border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-xl shrink-0">👩</div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{expert.name}</p>
                    <p className="text-[10px] text-muted-foreground">{expert.role}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground italic">{expert.quote}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Countdown */}
        <div className="mt-5 bg-primary/10 border border-primary/30 rounded-xl p-3 text-center">
          <p className="text-xs font-black text-primary">⏱ This price expires in {mm}:{ss}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">After timer, price returns to standard rate</p>
        </div>

        {/* CTA */}
        <motion.button
          data-testid="buy-button"
          className="w-full mt-4 py-4 rounded-xl font-black text-white text-base"
          style={{ background: 'hsl(341 91% 58%)' }}
          onClick={onBuy}
          whileTap={{ scale: 0.98 }}
        >
          Start My Expert Plan →
        </motion.button>

        {/* Promises */}
        <div className="mt-3 bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🛡️</span>
            <p className="text-sm font-bold text-foreground">100% Money-Back + 4-Week Results Promise</p>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Follow the formula for 4 weeks. If you haven't found at least 20 new outfit combinations you actually want to wear — full refund, no questions asked.
          </p>
        </div>
      </div>
    </div>
  );
}
