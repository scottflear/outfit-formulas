import { useState } from 'react';
import { motion } from 'framer-motion';

interface Props { userName?: string; onBuy: () => void; }

export function TodayIsTheDayPaywall({ userName, onBuy }: Props) {
  const [selected, setSelected] = useState(1);

  const plans = [
    { label: '1-Month Intro', price: '$7.99', full: '$14.99', note: null, perDay: '$0.26/day' },
    { label: '3-Month Plan', price: '$4.99', full: '$9.99', note: '⭐ RECOMMENDED FOR YOUR PROFILE', perDay: '$0.16/day' },
    { label: '6-Month Plan', price: '$3.99', full: '$7.99', note: 'Best value', perDay: '$0.13/day' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background pb-8">
      <div className="max-w-md mx-auto w-full px-4">

        {/* Emotional before/after cards */}
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 border border-border">
              <p className="text-[10px] font-black uppercase tracking-wide text-muted-foreground mb-2">NOW</p>
              <div className="text-2xl mb-2">😔</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Avoid mirrors. Wear the same things. Skip social events. Feel invisible.
              </p>
            </div>
            <div className="bg-primary/5 rounded-2xl p-4 border-2 border-primary">
              <p className="text-[10px] font-black uppercase tracking-wide text-primary mb-2">YOUR GOAL ✨</p>
              <div className="text-2xl mb-2">😊</div>
              <p className="text-xs text-foreground leading-relaxed font-medium">
                Get dressed in 5 minutes. Feel like yourself. Show up fully. Look incredible.
              </p>
            </div>
          </div>
        </div>

        {/* Headline */}
        <div className="mt-5 text-center">
          <h1 className="text-xl font-black text-foreground leading-tight">
            Today is the day {userName ? `${userName}` : 'you'} stops waiting.
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            The transformation from LEFT to RIGHT starts today. Not when you lose weight. Not when you have more time. Today.
          </p>
        </div>

        {/* What changes */}
        <div className="mt-4 space-y-2">
          <p className="text-sm font-bold text-foreground">In the next 28 days:</p>
          {[
            ['Week 1', 'Foundation formulas — 5 outfits you\'ll wear this week'],
            ['Week 2', 'Expanding your range — 15 more combinations revealed'],
            ['Week 3', 'Body-forward dressing — what flatters you specifically'],
            ['Week 4', 'Confidence locked in — you won\'t need to think about this anymore'],
          ].map(([week, desc], i) => (
            <div key={i} className="flex items-start gap-3 bg-card rounded-xl p-3 border border-border">
              <div className="shrink-0 bg-primary text-white text-[10px] font-black px-2 py-1 rounded-lg">{week}</div>
              <p className="text-xs text-foreground mt-0.5">{desc}</p>
            </div>
          ))}
        </div>

        {/* Plans with intro pricing */}
        <div className="mt-5">
          <p className="text-sm font-bold text-foreground mb-3">Choose your plan — intro pricing active:</p>
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
                {plan.note && (
                  <div className="text-[9px] font-black text-primary uppercase tracking-wide mb-1">{plan.note}</div>
                )}
                <div className="flex justify-between items-center">
                  <p className="text-sm font-bold text-foreground">{plan.label}</p>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground line-through mr-1">{plan.full}</span>
                    <span className="text-lg font-black text-foreground">{plan.price}</span>
                    <span className="text-xs text-muted-foreground">/mo</span>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5">{plan.perDay}</p>
              </motion.button>
            ))}
          </div>
        </div>

        <motion.button
          data-testid="buy-button"
          className="w-full mt-5 py-4 rounded-xl font-black text-white text-base"
          style={{ background: 'hsl(340 100% 58%)' }}
          onClick={onBuy}
          whileTap={{ scale: 0.98 }}
        >
          Start My Transformation Today →
        </motion.button>
        <p className="text-xs text-muted-foreground text-center mt-1">Intro pricing · Cancel anytime · 30-day guarantee</p>

        {/* Second before/after testimonial */}
        <div className="mt-4 bg-card rounded-xl p-4 border border-border">
          <div className="text-yellow-500 text-sm mb-1">⭐⭐⭐⭐⭐</div>
          <p className="text-xs text-foreground italic">"I was in the NOW picture for 4 years. Menopause changed my body and I stopped looking in mirrors. 28 days later I'm back. Not the old me — a better version who actually dresses for who I am now."</p>
          <p className="text-[10px] text-muted-foreground font-semibold mt-1">— Kate M., 53</p>
        </div>
      </div>
    </div>
  );
}
