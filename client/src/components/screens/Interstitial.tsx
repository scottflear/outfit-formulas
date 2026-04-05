import { motion } from 'framer-motion';
import type { Screen } from '@/data/funnels';

interface Props {
  screen: Screen;
  onContinue: () => void;
  userName?: string;
}

export function Interstitial({ screen, onContinue, userName }: Props) {
  const testimonials = screen.testimonials;

  return (
    <div className="flex flex-col gap-5">
      {/* Quote */}
      {screen.quote && (
        <div className="bg-accent rounded-xl p-4 border-l-4 border-primary">
          <p className="text-sm italic text-foreground leading-relaxed font-medium">
            {screen.quote}
          </p>
          <p className="text-xs text-muted-foreground mt-2">— Shared by 73% of women in this quiz</p>
        </div>
      )}

      {/* Headline */}
      {screen.headline && (
        <h2 className="text-xl font-black text-foreground leading-tight">{screen.headline}</h2>
      )}

      {/* Body */}
      {screen.body && (
        <div className="space-y-3">
          {screen.body.split('\n\n').map((para, i) => (
            <p key={i} className={`text-sm leading-relaxed ${
              para.startsWith('This is not') || para.includes('!') ? 'font-bold text-foreground' : 'text-muted-foreground'
            }`}
              dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-bold">$1</strong>') }}
            />
          ))}
        </div>
      )}

      {/* Stat */}
      {screen.stat && screen.statLabel && (
        <div className="bg-card rounded-xl p-4 border border-border text-center">
          <div className="text-3xl font-black text-primary mb-1">{screen.stat}</div>
          <p className="text-sm text-muted-foreground">{screen.statLabel}</p>
        </div>
      )}

      {/* Testimonials */}
      {testimonials && (
        <div className="space-y-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="bg-card rounded-xl p-4 border border-border"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-yellow-500 text-sm mb-2">{'⭐'.repeat(t.stars)}</div>
              <p className="text-sm text-foreground leading-relaxed italic mb-2">"{t.text}"</p>
              <p className="text-xs text-muted-foreground font-semibold">— {t.author}</p>
            </motion.div>
          ))}
          <p className="text-xs text-muted-foreground text-center">4.8 stars · 147,000+ women · Featured in Real Simple, InStyle</p>
        </div>
      )}

      <motion.button
        data-testid="continue-button"
        className="w-full py-3.5 rounded-xl font-bold text-sm text-white"
        style={{ background: 'hsl(340 100% 58%)' }}
        onClick={onContinue}
        whileTap={{ scale: 0.98 }}
      >
        {screen.ctaLabel ? screen.ctaLabel.replace('{{firstName}}', userName || 'your') : 'Continue →'}
      </motion.button>
    </div>
  );
}
