import { motion } from 'framer-motion';
import { ChevronRight, Layers } from 'lucide-react';
import type { Funnel } from '@/data/funnels';

interface Props {
  funnel: Funnel;
  onClick: () => void;
}

const PAYWALL_CONFIG: Record<string, { color: string; short: string }> = {
  A: { color: '#FF2A6D', short: 'Countdown + Trial' },
  B: { color: '#4F46E5', short: 'Email → Savings Graph' },
  C: { color: '#059669', short: 'Trust Badges + Gift' },
  D: { color: '#0284C7', short: 'Expert Panel + Date' },
  E: { color: '#7C3AED', short: 'Duration Plans, No Trial' },
  F: { color: '#DC2626', short: 'Triple Urgency + Promo' },
  G: { color: '#0891B2', short: 'Science-Minimal' },
  H: { color: '#1a1a2e', short: 'Premium / Dark UI' },
  I: { color: '#FF2A6D', short: 'Before/After + Intro' },
  J: { color: '#F59E0B', short: 'Expert Endorsements' },
  K: { color: '#10B981', short: 'Live Counter + Per-Day' },
  L: { color: '#6366F1', short: 'One-Time Report $19.99' },
  M: { color: '#FF2A6D', short: 'Conditional Refund' },
  N: { color: '#DC2626', short: '77% Discount + Emotional' },
};

export function FunnelCard({ funnel, onClick }: Props) {
  const config = PAYWALL_CONFIG[funnel.id] || { color: '#FF2A6D', short: 'Paywall' };

  return (
    <motion.button
      data-testid={`funnel-card-${funnel.id}`}
      className="w-full text-left bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all group"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Color strip */}
      <div className="h-1.5 w-full" style={{ background: config.color }} />

      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm shrink-0"
              style={{ background: config.color }}
            >
              {funnel.id}
            </div>
            <p className="text-xs font-black text-muted-foreground uppercase tracking-wide leading-tight">{funnel.archetype}</p>
          </div>
          <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors mt-0.5 shrink-0" />
        </div>

        {/* Quiz name */}
        <p className="text-sm font-bold text-foreground leading-snug mb-2">{funnel.name}</p>

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">{funnel.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Layers size={12} />
            <span>{funnel.screenCount} screens</span>
          </div>
          <div
            className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white max-w-[130px] text-right leading-snug"
            style={{ background: config.color }}
          >
            {config.short}
          </div>
        </div>
      </div>
    </motion.button>
  );
}
