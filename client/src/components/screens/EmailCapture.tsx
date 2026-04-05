import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import type { Screen } from '@/data/funnels';

interface Props {
  screen: Screen;
  onAnswer: (email: string) => void;
}

export function EmailCapture({ screen, onAnswer }: Props) {
  const [email, setEmail] = useState('');
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="flex flex-col gap-5">
      {screen.headline && (
        <div className="text-center">
          <span className="text-xs font-black tracking-widest text-primary">{screen.headline}</span>
        </div>
      )}

      <div className="space-y-1">
        <h2 className="text-base font-bold text-foreground leading-snug">{screen.question}</h2>
        {screen.body && (
          <p className="text-sm text-muted-foreground leading-relaxed">{screen.body}</p>
        )}
      </div>

      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
        <input
          data-testid="email-input"
          type="email"
          className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-muted-foreground"
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && valid && onAnswer(email)}
          autoFocus
        />
      </div>

      <motion.button
        data-testid="submit-email-button"
        className="w-full py-3.5 rounded-xl font-bold text-sm text-white disabled:opacity-40 transition-opacity"
        style={{ background: valid ? 'hsl(340 100% 58%)' : undefined, backgroundColor: !valid ? 'hsl(0 0% 70%)' : undefined }}
        disabled={!valid}
        onClick={() => valid && onAnswer(email)}
        whileTap={{ scale: 0.98 }}
      >
        {screen.ctaLabel || 'Send my guide →'}
      </motion.button>

      <p className="text-xs text-muted-foreground text-center">
        We never sell your data. Unsubscribe anytime.
      </p>
    </div>
  );
}
