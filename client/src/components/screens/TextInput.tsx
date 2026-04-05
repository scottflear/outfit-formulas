import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Screen } from '@/data/funnels';

interface Props {
  screen: Screen;
  onAnswer: (answer: string) => void;
}

export function TextInput({ screen, onAnswer }: Props) {
  const [value, setValue] = useState('');

  return (
    <div className="flex flex-col gap-5">
      <div className="space-y-1">
        <h2 className="text-base font-bold text-foreground leading-snug">{screen.question}</h2>
        {screen.subtitle && (
          <p className="text-sm text-muted-foreground">{screen.subtitle}</p>
        )}
      </div>

      <input
        data-testid="text-input"
        type="text"
        className="w-full px-4 py-3.5 rounded-xl border border-border bg-card text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-muted-foreground"
        placeholder="Your first name"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && value.trim() && onAnswer(value.trim())}
        autoFocus
      />

      <motion.button
        data-testid="continue-button"
        className="w-full py-3.5 rounded-xl font-bold text-sm text-white disabled:opacity-40 transition-opacity"
        style={{ background: value.trim() ? 'hsl(340 100% 58%)' : undefined, backgroundColor: !value.trim() ? 'hsl(0 0% 70%)' : undefined }}
        disabled={!value.trim()}
        onClick={() => value.trim() && onAnswer(value.trim())}
        whileTap={{ scale: 0.98 }}
      >
        {screen.ctaLabel || 'Continue →'}
      </motion.button>
    </div>
  );
}
