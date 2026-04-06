import { motion } from 'framer-motion';

interface Props { userName?: string; onBuy: () => void; }

export function KetoCyclePaywall({ userName, onBuy }: Props) {
  const previewFormulas = [
    { day: 'Week 1, Day 1', title: 'The Foundation Formula', pieces: ['Straight leg jeans', 'White fitted tee', 'Open blazer', 'White trainers'] },
    { day: 'Week 1, Day 3', title: 'The Smart Casual Formula', pieces: ['Dark jeans', 'Silk blouse', 'Loafers', 'Simple necklace'] },
    { day: 'Week 2, Day 1', title: 'The Elevated Casual', pieces: ['Tailored trousers', 'Breton stripe top', 'Ballet flats'] },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background pb-8">
      <div className="max-w-md mx-auto w-full px-4">

        {/* Conditional refund HERO */}
        <div className="mt-5 bg-primary rounded-2xl p-5 text-white text-center">
          <div className="text-3xl mb-2">🔄</div>
          <h1 className="text-xl font-black leading-tight">Follow for 28 days.<br />If it doesn't work — full refund.</h1>
          <p className="text-sm text-white/80 mt-2">
            Not a traditional guarantee. A conditional one. The formula works if you use it. If you do and it doesn't — we'll refund every penny.
          </p>
        </div>

        {/* Sub-headline */}
        <div className="mt-5 text-center">
          <p className="text-sm font-bold text-foreground">{userName ? `${userName}'s` : 'Your'} 28-Day Style Reset Challenge</p>
          <p className="text-sm text-muted-foreground mt-1">Here's a preview of what Week 1 looks like for you:</p>
        </div>

        {/* Content preview cards */}
        <div className="mt-4 space-y-3">
          {previewFormulas.map((formula, i) => (
            <motion.div
              key={i}
              className="bg-card rounded-2xl border border-border p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-[10px] font-black text-primary uppercase tracking-wide">{formula.day}</p>
                  <p className="text-sm font-bold text-foreground">{formula.title}</p>
                </div>
                <span className="text-2xl">✨</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {formula.pieces.map(piece => (
                  <span key={piece} className="bg-accent text-foreground text-[10px] font-semibold px-2 py-1 rounded-full">{piece}</span>
                ))}
              </div>
            </motion.div>
          ))}
          {/* Locked preview */}
          <div className="bg-card rounded-2xl border border-border p-4 opacity-50 relative overflow-hidden">
            <div className="blur-sm">
              <p className="text-[10px] font-black text-primary uppercase tracking-wide">Week 2, Day 1</p>
              <p className="text-sm font-bold text-foreground">The [Locked Formula]</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {['████████', '███████', '████████████'].map(b => (
                  <span key={b} className="bg-accent text-accent text-[10px] font-semibold px-2 py-1 rounded-full">{b}</span>
                ))}
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-foreground/90 text-background text-xs font-bold px-3 py-1.5 rounded-full">
                🔒 Unlock to see 25 more formulas
              </div>
            </div>
          </div>
        </div>

        {/* Press logos */}
        <div className="mt-5 flex justify-around items-center">
          {['Vogue', 'Real Simple', 'InStyle', 'Well+Good'].map(press => (
            <div key={press} className="bg-card border border-border rounded-lg px-2.5 py-1.5">
              <span className="text-[10px] font-bold text-muted-foreground">{press}</span>
            </div>
          ))}
        </div>

        {/* Weekly pricing */}
        <div className="mt-5 bg-card rounded-2xl border-2 border-primary p-5">
          <p className="text-xs font-black text-primary uppercase tracking-widest text-center mb-3">28-Day Challenge Plan</p>
          <div className="space-y-2 mb-4">
            {[
              { label: 'Weekly', price: '$4.49/week', perDay: '$0.64/day' },
              { label: 'Full 28-Day Plan', price: '$12.99 total', perDay: '$0.46/day', best: true },
            ].map((plan, i) => (
              <div key={i} className={`rounded-xl p-3 border-2 flex justify-between items-center ${plan.best ? 'border-primary bg-primary/5' : 'border-border'}`}>
                <div>
                  {plan.best && <div className="text-[9px] font-black text-primary uppercase tracking-wide mb-0.5">⭐ BEST VALUE</div>}
                  <p className="text-sm font-bold text-foreground">{plan.label}</p>
                  <p className="text-[10px] text-muted-foreground">{plan.perDay}</p>
                </div>
                <p className="text-sm font-black text-foreground">{plan.price}</p>
              </div>
            ))}
          </div>

          <motion.button
            data-testid="buy-button"
            className="w-full py-4 rounded-xl font-black text-white text-base"
            style={{ background: 'hsl(341 91% 58%)' }}
            onClick={onBuy}
            whileTap={{ scale: 0.98 }}
          >
            Start My 28-Day Challenge →
          </motion.button>
          <p className="text-[10px] text-muted-foreground text-center mt-2">28-day conditional refund · Follow it to qualify</p>
        </div>
      </div>
    </div>
  );
}
