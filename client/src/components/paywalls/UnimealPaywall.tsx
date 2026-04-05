import { motion } from 'framer-motion';

interface Props {
  userName?: string;
  onBuy: () => void;
}

export function UnimealPaywall({ userName, onBuy }: Props) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const now = new Date();
  const projectedMonths = [0,1,2,3,4,5].map(i => {
    const d = new Date(now);
    d.setMonth(d.getMonth() + i);
    return months[d.getMonth()];
  });
  const savings = [0, 180, 400, 650, 900, 1200];

  return (
    <div className="flex flex-col min-h-screen bg-background pb-8">
      <div className="max-w-md mx-auto w-full px-4">

        {/* Hero */}
        <div className="pt-8 text-center">
          <div className="text-5xl mb-3">✨</div>
          <p className="text-xs font-black tracking-widest text-primary uppercase mb-1">
            {userName ? `${userName}'s PLAN IS READY` : 'YOUR PLAN IS READY'}
          </p>
          <h1 className="text-2xl font-black text-foreground leading-tight">
            Your personalized outfit formula plan is ready.
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Based on your answers, we've built a formula system specifically for your wardrobe and life.
          </p>
        </div>

        {/* Savings graph */}
        <div className="mt-6 bg-card rounded-2xl border border-border p-5">
          <p className="text-sm font-bold text-foreground mb-1">Your projected savings in 6 months:</p>
          <p className="text-xs text-muted-foreground mb-4">Women with your profile save an average of $1,200 in impulse clothing over 6 months.</p>

          <div className="flex items-end justify-between h-24 gap-1">
            {projectedMonths.map((month, i) => (
              <div key={i} className="flex flex-col items-center gap-1 flex-1">
                <div
                  className="w-full rounded-t-md transition-all"
                  style={{
                    height: `${(savings[i] / 1200) * 88}px`,
                    background: i === 0 ? 'hsl(0 0% 80%)' : 'hsl(340 100% 58%)',
                    minHeight: '4px'
                  }}
                />
                <span className="text-[9px] text-muted-foreground">{month}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
            <span>$0 savings</span>
            <span className="text-primary font-bold">$1,200+ savings</span>
          </div>
        </div>

        {/* Sunk cost copy */}
        <div className="mt-4 bg-accent rounded-xl p-4 border border-primary/20">
          <p className="text-sm font-bold text-foreground">You've already done the hardest part.</p>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            You took the quiz. You identified the problem. Women who complete this assessment and don't start their plan spend an average of $420 more on unsuccessful clothing purchases in the next 3 months.
          </p>
        </div>

        {/* What's included */}
        <div className="mt-5 space-y-2">
          <p className="text-sm font-bold text-foreground">Your plan includes:</p>
          {[
            'Your personalized outfit formula system',
            'Daily outfit suggestions from your current wardrobe',
            'Wardrobe audit — what to keep, what to let go',
            'Shopping guide — only what you actually need',
            'Access to 1,000+ tested outfit combinations',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-foreground">
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="text-[9px] text-white font-bold">✓</span>
              </div>
              {item}
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="mt-6 bg-card rounded-2xl border-2 border-primary p-5">
          <div className="text-center mb-4">
            <p className="text-xs font-black text-primary tracking-widest uppercase mb-1">Your personalized plan</p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-sm text-muted-foreground line-through">$19.99</span>
              <span className="text-3xl font-black text-foreground">$9.99</span>
              <span className="text-sm text-muted-foreground">/month</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Just $0.33/day · Cancel anytime</p>
          </div>

          <motion.button
            data-testid="buy-button"
            className="w-full py-4 rounded-xl font-black text-white text-base"
            style={{ background: 'hsl(340 100% 58%)' }}
            onClick={onBuy}
            whileTap={{ scale: 0.98 }}
          >
            Start My Plan →
          </motion.button>
          <p className="text-[10px] text-muted-foreground text-center mt-2">Secure checkout · Cancel anytime · 30-day guarantee</p>
        </div>

        {/* Trust */}
        <div className="mt-4 text-center">
          <div className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐</div>
          <p className="text-xs text-muted-foreground mt-1">4.8 stars · 147,000+ women · Featured in Vogue, Real Simple, Good Housekeeping</p>
        </div>
      </div>
    </div>
  );
}
