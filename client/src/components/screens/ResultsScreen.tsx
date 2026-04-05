import { motion } from 'framer-motion';
import type { Screen } from '@/data/funnels';

interface Props {
  screen: Screen;
  onContinue: () => void;
  userName?: string;
  funnelId?: string;
}

export function ResultsScreen({ screen, onContinue, userName, funnelId }: Props) {
  return (
    <div className="flex flex-col gap-5">
      {/* Pre-headline */}
      <div className="text-center">
        <span className="text-xs font-black tracking-widest text-primary uppercase">
          {userName ? `${userName}'s ` : ''}{screen.resultTitle}
        </span>
      </div>

      {/* Score (if present) */}
      {screen.resultScore && (
        <div className="text-center">
          <motion.div
            className="text-7xl font-black text-foreground leading-none"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {screen.resultScore}
          </motion.div>
          <p className="text-sm text-muted-foreground mt-1">outfit combinations hiding in your closet</p>

          {/* Score bar */}
          <div className="mt-4 bg-muted rounded-full h-3 relative overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'hsl(340 100% 58%)' }}
              initial={{ width: 0 }}
              animate={{ width: `${(screen.resultScore / 80) * 100}%` }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
            <span>LOW (10)</span><span>AVERAGE (30)</span><span>HIGH (80+)</span>
          </div>
        </div>
      )}

      {/* Metrics */}
      {screen.resultMetrics && (
        <div className="grid grid-cols-2 gap-2">
          {screen.resultMetrics.map((m, i) => (
            <motion.div
              key={i}
              className="bg-card rounded-xl p-3 border border-border"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{m.label}</p>
              <p className="text-sm font-bold mt-0.5" style={{ color: m.color || 'inherit' }}>{m.value}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* What this means */}
      {screen.resultScore && (
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
          <p className="text-sm font-bold text-foreground mb-1">What this means for you:</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            With the right system, you could go from your current 5–6 regular outfits to {screen.resultScore}+ options — without buying a single new item.
          </p>
        </div>
      )}

      <motion.button
        data-testid="see-plan-button"
        className="w-full py-3.5 rounded-xl font-bold text-sm text-white"
        style={{ background: 'hsl(340 100% 58%)' }}
        onClick={onContinue}
        whileTap={{ scale: 0.98 }}
      >
        See how to unlock them →
      </motion.button>
    </div>
  );
}
