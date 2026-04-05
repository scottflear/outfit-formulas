import { motion } from 'framer-motion';
import type { Screen } from '@/data/funnels';

interface Props {
  screen: Screen;
  onAnswer: (answer: string) => void;
}

export function SingleChoice({ screen, onAnswer }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {screen.headline && (
        <div className="text-center mb-2">
          {screen.stat && (
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-accent px-3 py-1.5 rounded-full mb-3">
              {screen.stat}
            </div>
          )}
          <h1 className="text-xl font-black text-foreground leading-tight">{screen.headline}</h1>
        </div>
      )}

      {screen.body && (
        <p className="text-sm text-muted-foreground text-center leading-relaxed mb-1">{screen.body}</p>
      )}
      {screen.statLabel && !screen.headline && (
        <div className="text-center mb-1">
          <span className="inline-block text-xs font-semibold text-primary bg-accent px-3 py-1.5 rounded-full">
            ⏱ {screen.stat} · {screen.statLabel}
          </span>
        </div>
      )}

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
            className="w-full text-left px-4 py-3 rounded-xl border border-border bg-card hover:border-primary hover:bg-accent transition-all duration-150 flex items-center gap-3 group"
            onClick={() => onAnswer(opt.label)}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            {opt.emoji && (
              <span className="text-xl w-8 text-center shrink-0">{opt.emoji}</span>
            )}
            <span className="text-sm font-medium text-foreground group-hover:text-primary">{opt.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
