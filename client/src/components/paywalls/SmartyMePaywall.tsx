import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Star, Clock } from 'lucide-react';

interface Props {
  userName?: string;
  onBuy: () => void;
}

export function SmartyMePaywall({ userName, onBuy }: Props) {
  const [seconds, setSeconds] = useState(600);
  const [liveCount, setLiveCount] = useState(782);
  const [selected, setSelected] = useState(1);

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000);
    const l = setInterval(() => setLiveCount(n => 740 + Math.floor(Math.random() * 80)), 30000);
    return () => { clearInterval(t); clearInterval(l); };
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  const plans = [
    { label: '1-Week Trial', price: '$0.99', sub: 'for 7 days, then $9.99/mo', badge: 'TRY IT FIRST', perDay: '$0.14/day' },
    { label: '1-Month Plan', price: '$9.99', sub: 'per month', badge: '⭐ MOST POPULAR', perDay: '$0.33/day', wasPrice: '$19.99' },
    { label: '3-Month Plan', price: '$6.99', sub: 'per month, billed quarterly', badge: '🏆 BEST VALUE', perDay: '$0.22/day' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Sticky urgency header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-primary text-white text-center py-2.5 px-4 flex items-center justify-center gap-3 text-xs font-bold">
        <Clock size={14} />
        <span>Your offer expires in <strong>{mm}:{ss}</strong></span>
        <span className="hidden sm:inline">·</span>
        <span className="hidden sm:inline">{liveCount} women discovered outfits this hour</span>
      </div>

      <div className="pt-12 pb-24 px-4 max-w-md mx-auto w-full">
        {/* Red urgency banner */}
        <div className="mt-4 bg-red-500 text-white rounded-xl px-4 py-2.5 text-center text-xs font-bold">
          🔥 SPECIAL OFFER: 51% off unlocked by completing your quiz — expires with the timer above
        </div>

        {/* Headline */}
        <div className="mt-6 text-center">
          <p className="text-xs font-black tracking-widest text-primary uppercase mb-1">
            {userName ? `${userName}, YOUR SCORE IS READY` : 'YOUR SCORE IS READY'}
          </p>
          <h1 className="text-2xl font-black text-foreground leading-tight">
            You have 47 outfits hiding in your closet.
            <br />Let's go find them.
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            🟢 {liveCount} women discovered their hidden outfits this hour. Your turn.
          </p>
        </div>

        {/* What you get */}
        <div className="mt-6 space-y-2">
          <p className="text-sm font-bold text-foreground">Here's what unlocks when you start:</p>
          {[
            ['🗂️', 'Hidden Outfit Reveal', 'See all the outfit combinations in your wardrobe'],
            ['📅', 'Daily Outfit Suggestions', 'A new put-together outfit every morning'],
            ['🧩', 'Formula-Based Dressing', 'Learn the formulas so you can create outfits fast'],
            ['✨', 'Closet Audit Tool', 'Find which pieces are earning their space'],
            ['💬', 'Stylist-Level Guidance', 'The same approach that costs $1,500–$4,000'],
          ].map(([emoji, title, desc], i) => (
            <div key={i} className="flex items-start gap-3 bg-card rounded-xl p-3 border border-border">
              <span className="text-xl">{emoji}</span>
              <div>
                <p className="text-sm font-bold text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Plans */}
        <div className="mt-6">
          <p className="text-sm font-bold text-foreground mb-1">Choose your plan:</p>
          <p className="text-xs text-primary font-semibold mb-3">This price is held for the duration of your countdown.</p>
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
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-black text-primary uppercase tracking-wide">{plan.badge}</span>
                    <p className="text-sm font-bold text-foreground">{plan.label}</p>
                    <p className="text-xs text-muted-foreground">{plan.sub}</p>
                  </div>
                  <div className="text-right">
                    {plan.wasPrice && <p className="text-xs text-muted-foreground line-through">{plan.wasPrice}</p>}
                    <p className="text-lg font-black text-foreground">{plan.price}</p>
                    <p className="text-[10px] text-muted-foreground">{plan.perDay}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.button
          data-testid="buy-button"
          className="w-full mt-6 py-4 rounded-xl font-black text-white text-base"
          style={{ background: 'hsl(341 91% 58%)' }}
          onClick={onBuy}
          whileTap={{ scale: 0.98 }}
        >
          Unlock My Hidden Outfits →
        </motion.button>
        <p className="text-xs text-muted-foreground text-center mt-2">Secure checkout · Cancel anytime · 30-day money-back guarantee</p>

        {/* Social proof */}
        <div className="mt-4 flex items-center gap-2 justify-center text-xs text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>{liveCount} women discovered hidden outfits this hour</span>
        </div>

        {/* Trust badges */}
        <div className="mt-4 flex justify-center gap-4 flex-wrap">
          {[['🔒', 'SSL Secure'], ['✓', 'Cancel Anytime'], ['🛡️', '30-Day Guarantee'], ['⭐', '4.8 Stars']].map(([icon, label]) => (
            <div key={label} className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>{icon}</span><span>{label}</span>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-6 space-y-3">
          {[
            { t: '"I found outfits I\'d had for years and never put together. It felt like going shopping in my own closet."', a: 'Amanda L., 44' },
            { t: '"I got dressed in 5 minutes this morning and felt put-together for the first time in months. Worth every penny."', a: 'Clare T., 37' },
          ].map((item, i) => (
            <div key={i} className="bg-card rounded-xl p-3 border border-border">
              <div className="text-yellow-500 text-xs mb-1">⭐⭐⭐⭐⭐</div>
              <p className="text-xs text-foreground italic">{item.t}</p>
              <p className="text-[10px] text-muted-foreground font-semibold mt-1">— {item.a}</p>
            </div>
          ))}
        </div>

        {/* Guarantee stamp */}
        <div className="mt-6 border-2 border-primary rounded-2xl p-5 text-center">
          <div className="text-3xl mb-2">🛡️</div>
          <p className="text-sm font-black text-foreground">30-DAY MONEY-BACK GUARANTEE</p>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Try Outfit Formulas for 30 days. If you haven't found hidden outfits in your closet — outfits you actually want to wear — we'll refund every penny. No hoops. No questions.
          </p>
        </div>
      </div>

      {/* Sticky footer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-primary text-white px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold">
          <Clock size={14} />
          <span>Offer expires: <strong>{mm}:{ss}</strong></span>
        </div>
        <motion.button
          className="bg-white text-primary font-black text-xs px-4 py-2 rounded-lg"
          onClick={onBuy}
          whileTap={{ scale: 0.97 }}
          data-testid="sticky-buy-button"
        >
          Unlock My Outfits →
        </motion.button>
      </div>
    </div>
  );
}
