import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { LayoutGrid, Map, Moon, Sun } from 'lucide-react';
import { FunnelCard } from '@/components/FunnelCard';
import { funnels } from '@/data/funnels';

interface Props {
  darkMode: boolean;
  toggleDark: () => void;
}

export function Dashboard({ darkMode, toggleDark }: Props) {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* OF Logo */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-label="Outfit Formulas" role="img">
              <rect width="32" height="32" rx="8" fill="hsl(341 91% 58%)" />
              <text x="7" y="22" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="15" fill="white">OF</text>
            </svg>
            <div>
              <h1 className="text-sm font-black text-foreground leading-none">Outfit Formulas</h1>
              <p className="text-[10px] text-muted-foreground">Funnel Tester</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/paywalls')}
              className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-accent"
              data-testid="paywall-map-link"
            >
              <Map size={14} />
              <span className="hidden sm:inline">Paywall Map</span>
            </button>
            <button
              onClick={toggleDark}
              className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
              data-testid="toggle-dark"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Hero */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-accent text-primary text-xs font-bold px-3 py-1.5 rounded-full mb-3">
            <LayoutGrid size={12} />
            14 Quiz Funnels · 14 Unique Paywalls
          </div>
          <h2 className="text-2xl font-black text-foreground leading-tight mb-2">
            Click any funnel to walk through it
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Each funnel has its own quiz flow, screen types, and a completely unique paywall architecture. Buying shows a preview toast — no payment processed.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[
            ['14', 'Funnels'],
            ['14', 'Unique Paywalls'],
            ['350+', 'Total Screens'],
          ].map(([val, label]) => (
            <div key={label} className="bg-card border border-border rounded-xl p-3 text-center">
              <p className="text-xl font-black text-primary">{val}</p>
              <p className="text-[10px] text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {funnels.map((funnel, i) => (
            <motion.div
              key={funnel.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <FunnelCard
                funnel={funnel}
                onClick={() => navigate(`/funnel/${funnel.id}`)}
              />
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          Outfit Formulas Funnel Tester · Internal tool · All paywalls are visual prototypes only
        </div>
      </main>
    </div>
  );
}
