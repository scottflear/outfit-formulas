import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import { useLocation } from 'wouter';
import { ProgressBar } from './ProgressBar';
import { SingleChoice } from './screens/SingleChoice';
import { MultiSelect } from './screens/MultiSelect';
import { LikertScale } from './screens/LikertScale';
import { TextInput } from './screens/TextInput';
import { Interstitial } from './screens/Interstitial';
import { LoadingScreen } from './screens/LoadingScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import { EmailCapture } from './screens/EmailCapture';
import { SmartyMePaywall } from './paywalls/SmartyMePaywall';
import { UnimealPaywall } from './paywalls/UnimealPaywall';
import { ParentingLeaderPaywall } from './paywalls/ParentingLeaderPaywall';
import { NervaPaywall } from './paywalls/NervaPaywall';
import { HypnozioPaywall } from './paywalls/HypnozioPaywall';
import { SofaYogaPaywall } from './paywalls/SofaYogaPaywall';
import { EffectoPaywall } from './paywalls/EffectoPaywall';
import { BetterMePaywall } from './paywalls/BetterMePaywall';
import { TodayIsTheDayPaywall } from './paywalls/TodayIsTheDayPaywall';
import { TheCoachPaywall } from './paywalls/TheCoachPaywall';
import { SlowdivePaywall } from './paywalls/SlowdivePaywall';
import { NebulaPaywall } from './paywalls/NebulaPaywall';
import { KetoCyclePaywall } from './paywalls/KetoCyclePaywall';
import { HelpidoPaywall } from './paywalls/HelpidoPaywall';
import type { Funnel } from '@/data/funnels';
import { useToast } from '@/hooks/use-toast';

interface Props {
  funnel: Funnel;
}

const paywall_map: Record<string, (props: { userName?: string; onBuy: () => void }) => JSX.Element> = {
  SmartyMe: (p) => <SmartyMePaywall {...p} />,
  Unimeal: (p) => <UnimealPaywall {...p} />,
  ParentingLeader: (p) => <ParentingLeaderPaywall {...p} />,
  Nerva: (p) => <NervaPaywall {...p} />,
  Hypnozio: (p) => <HypnozioPaywall {...p} />,
  SofaYoga: (p) => <SofaYogaPaywall {...p} />,
  Effecto: (p) => <EffectoPaywall {...p} />,
  BetterMe: (p) => <BetterMePaywall {...p} />,
  TodayIsTheDay: (p) => <TodayIsTheDayPaywall {...p} />,
  TheCoach: (p) => <TheCoachPaywall {...p} />,
  Slowdive: (p) => <SlowdivePaywall {...p} />,
  Nebula: (p) => <NebulaPaywall {...p} />,
  KetoCycle: (p) => <KetoCyclePaywall {...p} />,
  Helpido: (p) => <HelpidoPaywall {...p} />,
};

export function QuizEngine({ funnel }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [userName, setUserName] = useState<string>('');
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const submitLead = (email: string) => {
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        funnel_id: funnel.id,
        archetype: funnel.archetype,
        first_name: userName || undefined,
      }),
    }).catch((err) => console.error('[leads]', err));
  };

  const screen = funnel.screens[currentIndex];
  const total = funnel.screens.length;

  const advance = () => {
    if (currentIndex < total - 1) {
      setDirection(1);
      setCurrentIndex(i => i + 1);
    }
  };

  const back = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(i => i - 1);
    } else {
      navigate('/');
    }
  };

  const handleAnswer = (answer: string | string[]) => {
    // Capture name from text-input
    if (screen.type === 'text-input' && typeof answer === 'string') {
      setUserName(answer);
    }
    // Submit lead to Supabase when email is captured (fire-and-forget)
    if (screen.type === 'email-capture' && typeof answer === 'string') {
      submitLead(answer);
    }
    advance();
  };

  const handleBuy = () => {
    toast({
      title: 'Preview Mode',
      description: 'This is a preview — no payment processed.',
      duration: 3000,
    });
  };

  // Paywall — fullscreen, no chrome
  if (screen.type === 'paywall' && screen.paywallType) {
    const PaywallComp = paywall_map[screen.paywallType];
    if (PaywallComp) {
      return (
        <div className="relative">
          {/* Back button overlay */}
          <button
            onClick={back}
            className="fixed top-14 left-4 z-[100] bg-background/80 backdrop-blur-sm border border-border rounded-full p-2 shadow-lg"
            data-testid="back-button"
          >
            <ArrowLeft size={16} />
          </button>
          <PaywallComp userName={userName} onBuy={handleBuy} />
        </div>
      );
    }
  }

  const progress = screen.progressPercent ?? Math.round((currentIndex / Math.max(total - 1, 1)) * 100);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border px-4 pt-3 pb-2">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <button
            onClick={back}
            className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
            data-testid="back-button"
          >
            {currentIndex === 0 ? <X size={18} /> : <ArrowLeft size={18} />}
          </button>
          <div className="flex-1">
            <ProgressBar percent={progress} />
          </div>
          <span className="text-xs text-muted-foreground font-medium min-w-[40px] text-right">
            {currentIndex + 1}/{total}
          </span>
        </div>
        <p className="text-[10px] text-muted-foreground text-center mt-1.5 font-semibold tracking-wide">
          FUNNEL {funnel.id} · {funnel.name.toUpperCase()}
        </p>
      </div>

      {/* Screen content */}
      <div className="flex-1">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={{
              enter: (d: number) => ({ x: d > 0 ? 20 : -20, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: d > 0 ? -20 : 20, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="max-w-md mx-auto w-full px-4 py-6"
          >
            {screen.type === 'single-choice' && (
              <SingleChoice screen={screen} onAnswer={handleAnswer} />
            )}
            {screen.type === 'multi-select' && (
              <MultiSelect screen={screen} onAnswer={(arr) => handleAnswer(arr)} />
            )}
            {screen.type === 'likert' && (
              <LikertScale screen={screen} onAnswer={handleAnswer} />
            )}
            {screen.type === 'text-input' && (
              <TextInput screen={screen} onAnswer={handleAnswer} />
            )}
            {screen.type === 'interstitial' && (
              <Interstitial screen={screen} onContinue={advance} userName={userName} />
            )}
            {screen.type === 'loading' && (
              <LoadingScreen screen={screen} onComplete={advance} userName={userName} />
            )}
            {screen.type === 'results' && (
              <ResultsScreen screen={screen} onContinue={advance} userName={userName} funnelId={funnel.id} />
            )}
            {screen.type === 'email-capture' && (
              <EmailCapture screen={screen} onAnswer={handleAnswer} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
