import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Screen } from '@/data/funnels';

interface Props {
  screen: Screen;
  onComplete: () => void;
  userName?: string;
}

export function LoadingScreen({ screen, onComplete, userName }: Props) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const lines = screen.loadingLines || [];
  const delay = (screen.autoAdvanceDelay || 5000);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines(v => Math.min(v + 1, lines.length));
    }, delay / (lines.length + 1));

    const progressInterval = setInterval(() => {
      setProgress(p => Math.min(p + 2, 100));
    }, delay / 50);

    const timer = setTimeout(onComplete, delay);
    return () => { clearInterval(interval); clearInterval(progressInterval); clearTimeout(timer); };
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 py-6">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r="40" fill="none" stroke="hsl(341 91% 58% / 0.15)" strokeWidth="6" />
          <motion.circle
            cx="48" cy="48" r="40"
            fill="none"
            stroke="hsl(341 91% 58%)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={251}
            animate={{ strokeDashoffset: 251 - (251 * progress / 100) }}
            transition={{ duration: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-black text-primary">{progress}%</span>
        </div>
      </div>

      <h2 className="text-base font-bold text-foreground text-center leading-snug">
        {screen.headline?.replace('{{firstName}}', userName || 'your')}
      </h2>

      <div className="w-full space-y-2">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 text-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: i < visibleLines ? 1 : 0.3, x: i < visibleLines ? 0 : -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${i < visibleLines ? 'bg-primary' : 'bg-muted'}`}>
              {i < visibleLines && <span className="text-[8px] text-white font-bold">✓</span>}
            </div>
            <span className={i < visibleLines ? 'text-foreground' : 'text-muted-foreground'}>{line}</span>
          </motion.div>
        ))}
      </div>

      {progress >= 100 && (
        <motion.p
          className="text-sm font-bold text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Your results are ready ✨
        </motion.p>
      )}
    </div>
  );
}
