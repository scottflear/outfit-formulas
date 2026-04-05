import { motion } from 'framer-motion';

interface Props { userName?: string; onBuy: () => void; }

export function NervaPaywall({ userName, onBuy }: Props) {
  const resultsDate = new Date();
  resultsDate.setDate(resultsDate.getDate() + 21);
  const dateStr = resultsDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="flex flex-col min-h-screen bg-background pb-8">
      <div className="max-w-md mx-auto w-full px-4">

        {/* Clinical header */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-1.5 text-xs font-semibold text-muted-foreground mb-4">
            Developed by professional stylists & behavioral researchers
          </div>
          <h1 className="text-xl font-black text-foreground leading-tight">
            {userName ? `${userName}'s` : 'Your'} personalized style plan is ready.
          </h1>
        </div>

        {/* Results date — featured prominently */}
        <div className="mt-5 bg-primary/5 border-2 border-primary rounded-2xl p-5 text-center">
          <p className="text-xs font-black text-primary tracking-widest uppercase mb-1">Your Results Date</p>
          <p className="text-2xl font-black text-foreground">{dateStr}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Women who start today see measurable style confidence improvement within 21 days.
          </p>
        </div>

        {/* Expert panel */}
        <div className="mt-5">
          <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-3">Expert Panel</p>
          <div className="space-y-3">
            {[
              { name: 'Dr. Sarah Chen', role: 'Behavioral Psychologist, Style Researcher', fact: '12 years studying wardrobe behavior' },
              { name: 'Miranda Cole', role: 'Professional Stylist, Former Vogue Consultant', fact: '18,000+ clients across 20 countries' },
              { name: 'Dr. Priya Kapoor', role: 'Color Theory & Body Proportion Expert', fact: 'Author of The Visual Wardrobe Framework' },
            ].map((expert, i) => (
              <div key={i} className="flex items-center gap-3 bg-card rounded-xl p-3 border border-border">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                  <span className="text-lg">👩</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{expert.name}</p>
                  <p className="text-[10px] text-muted-foreground">{expert.role}</p>
                  <p className="text-[10px] text-primary font-semibold">{expert.fact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Press logos */}
        <div className="mt-5">
          <p className="text-xs font-black text-muted-foreground uppercase tracking-widest text-center mb-3">As Featured In</p>
          <div className="flex justify-around items-center flex-wrap gap-2">
            {['Vogue', 'Real Simple', 'Well+Good', 'InStyle'].map(press => (
              <div key={press} className="bg-card border border-border rounded-lg px-3 py-1.5">
                <span className="text-xs font-bold text-muted-foreground">{press}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Social proof stats */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          {[['85K+', 'Program completions'], ['34%', 'Confidence increase'], ['21 days', 'Average result time']].map(([val, label]) => (
            <div key={label} className="bg-card rounded-xl p-3 border border-border text-center">
              <p className="text-lg font-black text-primary">{val}</p>
              <p className="text-[9px] text-muted-foreground leading-tight">{label}</p>
            </div>
          ))}
        </div>

        {/* Free trial offer */}
        <div className="mt-5 bg-card rounded-2xl border-2 border-primary p-5">
          <p className="text-xs font-black text-primary tracking-widest uppercase text-center mb-3">Start Free — 7 Days</p>
          <div className="space-y-2 mb-4">
            {['Free 7-day trial — full access', 'Cancel before day 7 and pay nothing', 'Then $9.99/month — cancel anytime'].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                <span className="text-primary font-bold">✓</span>
                {item}
              </div>
            ))}
          </div>

          <motion.button
            data-testid="buy-button"
            className="w-full py-4 rounded-xl font-black text-white text-base"
            style={{ background: 'hsl(340 100% 58%)' }}
            onClick={onBuy}
            whileTap={{ scale: 0.98 }}
          >
            Start My Free 7-Day Trial →
          </motion.button>
          <p className="text-[10px] text-muted-foreground text-center mt-2">Secure checkout · No payment until day 7 · 30-day guarantee</p>
        </div>
      </div>
    </div>
  );
}
