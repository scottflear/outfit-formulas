import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { Screen } from '@/data/funnels';

interface Props {
  screen: Screen;
  onAnswer: (answer: string[]) => void;
}

export function MultiSelect({ screen, onAnswer }: Props) {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    const next = new Set(selected);
    if (next.has(i)) next.delete(i); else next.add(i);
    setSelected(next);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <h2 className="text-base font-bold text-foreground leading-snug">{screen.question}</h2>
        {screen.subtitle && (
          <p className="text-sm text-muted-foreground">{screen.subtitle}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {screen.options?.map((opt, i) => (
          <motion.button
            key={i}
            data-testid={`option-${i}`}
            className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-150 flex items-center gap-3 ${
              selected.has(i)
                ? 'border-primary bg-accent'
                : 'border-border bg-card hover:border-primary/50'
            }`}
            onClick={() => toggle(i)}
            whileTap={{ scale: 0.99 }}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
              selected.has(i) ? 'bg-primary border-primary' : 'border-muted-foreground'
            }`}>
              {selected.has(i) && <Check size={12} className="text-white" strokeWidth={3} />}
            </div>
            <span className="text-sm font-medium text-foreground">{opt.label}</span>
          </motion.button>
        ))}
      </div>

      <motion.button
        data-testid="next-button"
        className="w-full py-3.5 rounded-xl font-bold text-sm text-white disabled:opacity-40 transition-opacity"
        style={{ background: selected.size > 0 ? 'hsl(341 91% 58%)' : undefined, backgroundColor: selected.size === 0 ? 'hsl(0 0% 70%)' : undefined }}
        disabled={selected.size === 0}
        onClick={() => onAnswer(Array.from(selected).map(i => screen.options![i].label))}
        whileTap={{ scale: 0.98 }}
      >
        Continue →
      </motion.button>
    </div>
  );
}
