import { motion } from 'framer-motion';

interface Props { userName?: string; onBuy: () => void; }

export function BetterMePaywall({ userName, onBuy }: Props) {
  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a2e] text-white pb-8">
      <div className="max-w-md mx-auto w-full px-4">

        {/* Premium dark hero */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold text-white/70 mb-4">
            Join 2,000,000+ women
          </div>
          <h1 className="text-2xl font-black leading-tight text-white">
            Premium style starts here.
          </h1>
          <p className="text-sm text-white/60 mt-2">
            The system that 2 million women trust to look and feel premium — every day.
          </p>
        </div>

        {/* Social proof bar */}
        <div className="mt-5 flex justify-around border border-white/10 rounded-2xl p-4">
          {[['2M+', 'Members'], ['4.9★', 'App Rating'], ['87%', 'See results in 3 wks']].map(([val, label]) => (
            <div key={label} className="text-center">
              <p className="text-xl font-black text-[#F5326D]">{val}</p>
              <p className="text-[10px] text-white/50">{label}</p>
            </div>
          ))}
        </div>

        {/* Aspirational description */}
        <div className="mt-5 space-y-3">
          {[
            ['👑', 'Premium Wardrobe System', 'The formula behind women who always look intentional'],
            ['🎯', 'Precision Outfit Matching', 'Know exactly what works before you open the closet'],
            ['💎', 'Luxury-Level Guidance', 'The approach personal stylists charge $4,000+ for'],
            ['📊', 'Style Intelligence Dashboard', 'Track your wardrobe performance over time'],
          ].map(([icon, title, desc], i) => (
            <div key={i} className="flex items-start gap-3 border border-white/10 bg-white/5 rounded-xl p-3">
              <span className="text-2xl">{icon}</span>
              <div>
                <p className="text-sm font-bold text-white">{title}</p>
                <p className="text-xs text-white/50">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* First period discount */}
        <div className="mt-6 rounded-2xl border-2 border-[#F5326D]/50 p-5">
          <div className="text-center mb-4">
            <div className="inline-block bg-[#F5326D] text-white text-[10px] font-black px-3 py-1 rounded-full mb-2">
              🔥 50% OFF YOUR FIRST PERIOD
            </div>
            <p className="text-xs text-white/50">{userName ? `${userName}'s` : 'Your'} welcome discount</p>
          </div>

          <div className="space-y-2 mb-4">
            {[
              { label: 'Monthly Premium', first: '$4.99', then: '$9.99/mo', selected: false },
              { label: 'Annual Premium', first: '$2.49/mo', then: '$4.99/mo', selected: true, note: 'BEST VALUE' },
            ].map((plan, i) => (
              <div key={i} className={`rounded-xl p-3 border-2 flex justify-between items-center ${plan.selected ? 'border-[#F5326D] bg-[#F5326D]/10' : 'border-white/10 bg-white/5'}`}>
                <div>
                  <span className="text-sm font-bold text-white">{plan.label}</span>
                  {plan.note && <span className="ml-2 text-[9px] text-[#F5326D] font-black">{plan.note}</span>}
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/40">First: <strong className="text-white">{plan.first}</strong></p>
                  <p className="text-[10px] text-white/40">Then: {plan.then}</p>
                </div>
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
            Join 2M+ Women →
          </motion.button>
          <p className="text-[10px] text-white/40 text-center mt-2">Cancel anytime · Premium access · 30-day guarantee</p>
        </div>

        {/* Premium testimonial */}
        <div className="mt-4 border border-white/10 rounded-xl p-4 bg-white/5">
          <div className="text-yellow-400 text-sm mb-1">⭐⭐⭐⭐⭐</div>
          <p className="text-xs text-white/70 italic">"I've tried every style app. Outfit Formulas is the only one that actually understands my real wardrobe and my real life. It feels premium in a way the others don't."</p>
          <p className="text-[10px] text-white/40 font-semibold mt-1">— Victoria S., 44, Brand Director</p>
        </div>
      </div>
    </div>
  );
}
