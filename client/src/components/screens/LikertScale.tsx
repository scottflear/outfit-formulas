import { motion } from 'framer-motion';
import type { Screen } from '@/data/funnels';

interface Props {
  screen: Screen;
  onAnswer: (answer: string) => void;
}

const labels = ['Strongly\nDisagree', 'Disagree', 'Not\nSure', 'Agree', 'Strongly\nAgree'];

export function LikertScale({ screen, onAnswer }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center px-2">
        <div className="text-4xl mb-3">💭</div>
        <p className="text-base font-semibold text-foreground leading-snug italic">
          {screen.question}
        </p>
      </div>

      <div className="flex gap-2 justify-center">
        {[1, 2, 3, 4, 5].map((val) => (
          <motion.button
            key={val}
            data-testid={`likert-${val}`}
            className="flex flex-col items-center gap-1.5 flex-1"
            onClick={() => onAnswer(labels[val - 1].replace('\n', ' '))}
            whileTap={{ scale: 0.92 }}
          >
            <motion.div
              className="w-full aspect-square rounded-xl border-2 border-border bg-card hover:border-primary hover:bg-accent transition-colors flex items-center justify-center"
              whileHover={{ borderColor: 'hsl(341 91% 58%)' }}
              transition={{ duration: 0.1 }}
            >
              <span className="text-sm font-bold text-muted-foreground">{val}</span>
            </motion.div>
            <span className="text-[10px] text-muted-foreground text-center leading-tight whitespace-pre-line">
              {labels[val - 1]}
            </span>
          </motion.button>
        ))}
      </div>

      <div className="flex justify-between text-[11px] text-muted-foreground px-1">
        <span>← Disagree</span>
        <span>Agree →</span>
      </div>
    </div>
  );
}
