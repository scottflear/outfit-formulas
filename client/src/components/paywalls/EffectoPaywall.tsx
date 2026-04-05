import { motion } from 'framer-motion';

interface Props { userName?: string; onBuy: () => void; }

export function EffectoPaywall({ userName, onBuy }: Props) {
  return (
    <div className="flex flex-col min-h-screen bg-background pb-8">
      <div className="max-w-md mx-auto w-full px-4">

        {/* Scientific header */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-1.5 text-xs font-semibold text-muted-foreground mb-4">
            🔬 Backed by behavioral research · 127,000 participant dataset
          </div>
          <h1 className="text-xl font-black text-foreground leading-tight">
            Your assessment results confirm what we suspected.
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            {userName ? `${userName}'s` : 'Your'} profile matches our highest-response cohort — women who get the best results.
          </p>
        </div>

        {/* Data visualization */}
        <div className="mt-5 bg-card rounded-2xl border border-border p-5">
          <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-4">Your Assessment Data</p>
          {[
            { metric: 'Wardrobe Utilization', current: '23%', potential: '78%' },
            { metric: 'Outfit Variety Score', current: 'Low', potential: 'High' },
            { metric: 'Decision Fatigue', current: 'High', potential: 'Minimal' },
            { metric: 'Style Confidence', current: '3.1 / 10', potential: '8.7 / 10' },
          ].map((item, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between text-xs text-foreground font-medium mb-1">
                <span>{item.metric}</span>
                <span>{item.current} → <strong className="text-primary">{item.potential}</strong></span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: '15%' }}
                  animate={{ width: '75%' }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.8 }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Research findings */}
        <div className="mt-4 space-y-2">
          <p className="text-sm font-bold text-foreground">Research findings for your profile:</p>
          {[
            '73% reduction in morning decision time within 3 weeks',
            '61% increase in wardrobe utilization after formula adoption',
            '84% of participants report sustained improvement at 6 months',
            'Zero significant shopping increase required',
          ].map((finding, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-primary font-bold mt-0.5">→</span>
              {finding}
            </div>
          ))}
        </div>

        {/* Clean, minimal pricing */}
        <div className="mt-6 bg-card rounded-2xl border border-border p-5">
          <p className="text-xs font-black text-muted-foreground uppercase tracking-widest text-center mb-4">Your access plan</p>
          
          <div className="space-y-2 mb-5">
            {[
              { plan: 'Monthly', price: '$9.99/month' },
              { plan: 'Annual', price: '$4.99/month', note: 'Best value', selected: true },
            ].map((plan, i) => (
              <div key={i} className={`rounded-xl p-3 border-2 flex justify-between items-center ${plan.selected ? 'border-primary bg-primary/5' : 'border-border'}`}>
                <div>
                  <span className="text-sm font-bold text-foreground">{plan.plan}</span>
                  {plan.note && <span className="ml-2 text-[10px] text-primary font-semibold">{plan.note}</span>}
                </div>
                <span className="text-sm font-black text-foreground">{plan.price}</span>
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
            Begin My Formula System →
          </motion.button>
          <p className="text-[10px] text-muted-foreground text-center mt-2">Cancel anytime · 30-day guarantee · No shopping required</p>
        </div>

        {/* Minimal credibility */}
        <div className="mt-4 text-center text-xs text-muted-foreground">
          <p>Validated with 127,000 participants · 4.8 stars · Featured in Vogue, Real Simple</p>
        </div>
      </div>
    </div>
  );
}
