import { motion } from 'framer-motion';

interface Props { userName?: string; onBuy: () => void; }

export function ParentingLeaderPaywall({ userName, onBuy }: Props) {
  return (
    <div className="flex flex-col min-h-screen bg-background pb-8">
      <div className="max-w-md mx-auto w-full px-4">

        {/* Gift notification */}
        <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400 rounded-2xl p-4 text-center">
          <div className="text-3xl mb-2">🎁</div>
          <p className="text-sm font-black text-foreground">Your free guide is on its way!</p>
          <p className="text-xs text-muted-foreground mt-1">Check your inbox for your Style Identity Guide — a gift, just for completing the quiz.</p>
        </div>

        {/* Trust badges dominate */}
        <div className="mt-6">
          <p className="text-xs font-black text-center text-muted-foreground uppercase tracking-widest mb-3">As Seen In & Awarded By</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: '⭐', label: 'App Store', sub: "Editor's Choice" },
              { icon: '📰', label: 'Vogue', sub: 'Featured' },
              { icon: '🏠', label: 'Good\nHousekeeping', sub: 'Approved' },
              { icon: '📖', label: 'Real Simple', sub: 'Best App' },
              { icon: '💫', label: 'InStyle', sub: 'Must-Have' },
              { icon: '🌟', label: 'Well+Good', sub: 'Top Pick' },
            ].map((b, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-3 text-center">
                <div className="text-2xl">{b.icon}</div>
                <p className="text-[10px] font-bold text-foreground mt-1 whitespace-pre-line leading-tight">{b.label}</p>
                <p className="text-[9px] text-muted-foreground">{b.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Headline */}
        <div className="mt-6 text-center">
          <h1 className="text-xl font-black text-foreground leading-tight">
            {userName ? `${userName}, you deserve` : 'You deserve'} to feel like yourself again.
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Join 147,000+ women — many of them moms — who rediscovered their style identity with Outfit Formulas.
          </p>
        </div>

        {/* Social proof stat */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[['147K+', 'Women'], ['4.8★', 'Rating'], ['21 days', 'To Results']].map(([val, label]) => (
            <div key={label} className="bg-card rounded-xl p-3 border border-border">
              <p className="text-lg font-black text-primary">{val}</p>
              <p className="text-[10px] text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        {/* What's included */}
        <div className="mt-5 bg-card rounded-2xl border border-border p-5">
          <p className="text-sm font-bold text-foreground mb-3">Your Outfit Formulas membership:</p>
          {[
            'Personalized outfit formulas for your exact life stage',
            'Daily outfit suggestions from your wardrobe',
            'Style identity guide (sent to your inbox)',
            'Wardrobe audit and planning tools',
            'Community of 147,000+ women',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[8px] text-white font-bold">✓</span>
              </div>
              <p className="text-sm text-foreground">{item}</p>
            </div>
          ))}
        </div>

        {/* Simple pricing */}
        <div className="mt-5 bg-primary/5 border-2 border-primary rounded-2xl p-5 text-center">
          <p className="text-xs font-black text-primary tracking-widest uppercase mb-2">Start today</p>
          <div className="flex items-baseline justify-center gap-2 mb-1">
            <span className="text-sm text-muted-foreground line-through">$19.99</span>
            <span className="text-3xl font-black text-foreground">$9.99</span>
            <span className="text-sm text-muted-foreground">/month</span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Cancel anytime · 30-day money-back guarantee</p>

          <motion.button
            data-testid="buy-button"
            className="w-full py-4 rounded-xl font-black text-white text-base"
            style={{ background: 'hsl(341 91% 58%)' }}
            onClick={onBuy}
            whileTap={{ scale: 0.98 }}
          >
            Start My Membership →
          </motion.button>
        </div>

        {/* Testimonial */}
        <div className="mt-4 bg-card rounded-xl p-4 border border-border">
          <div className="text-yellow-500 text-sm mb-1">⭐⭐⭐⭐⭐</div>
          <p className="text-xs text-foreground italic">"I'd completely lost myself after having my kids. I didn't even know what my style was anymore. Outfit Formulas gave me back the permission to care about how I looked. It sounds small. It changed everything."</p>
          <p className="text-[10px] text-muted-foreground font-semibold mt-1">— Emma D., 39, mum of three</p>
        </div>
      </div>
    </div>
  );
}
