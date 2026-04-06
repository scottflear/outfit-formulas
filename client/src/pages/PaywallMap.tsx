import { useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { SmartyMePaywall } from '@/components/paywalls/SmartyMePaywall';
import { UnimealPaywall } from '@/components/paywalls/UnimealPaywall';
import { ParentingLeaderPaywall } from '@/components/paywalls/ParentingLeaderPaywall';
import { NervaPaywall } from '@/components/paywalls/NervaPaywall';
import { HypnozioPaywall } from '@/components/paywalls/HypnozioPaywall';
import { SofaYogaPaywall } from '@/components/paywalls/SofaYogaPaywall';
import { EffectoPaywall } from '@/components/paywalls/EffectoPaywall';
import { BetterMePaywall } from '@/components/paywalls/BetterMePaywall';
import { TodayIsTheDayPaywall } from '@/components/paywalls/TodayIsTheDayPaywall';
import { TheCoachPaywall } from '@/components/paywalls/TheCoachPaywall';
import { SlowdivePaywall } from '@/components/paywalls/SlowdivePaywall';
import { NebulaPaywall } from '@/components/paywalls/NebulaPaywall';
import { KetoCyclePaywall } from '@/components/paywalls/KetoCyclePaywall';
import { HelpidoPaywall } from '@/components/paywalls/HelpidoPaywall';
import { useToast } from '@/hooks/use-toast';

const PAYWALLS = [
  { id: 'A', name: 'SmartyMe', desc: 'Countdown + Trial Hybrid', color: '#F5326D', Component: SmartyMePaywall },
  { id: 'B', name: 'Unimeal', desc: 'Email → Savings Graph', color: '#4F46E5', Component: UnimealPaywall },
  { id: 'C', name: 'Parenting Leader', desc: 'Trust Badges + Gift', color: '#059669', Component: ParentingLeaderPaywall },
  { id: 'D', name: 'Nerva', desc: 'Expert Panel + Results Date', color: '#0284C7', Component: NervaPaywall },
  { id: 'E', name: 'Hypnozio', desc: 'Duration Plans, No Trial', color: '#7C3AED', Component: HypnozioPaywall },
  { id: 'F', name: 'Sofa Yoga', desc: 'Triple Urgency + Promo Code', color: '#DC2626', Component: SofaYogaPaywall },
  { id: 'G', name: 'Effecto', desc: 'Science-Minimal', color: '#0891B2', Component: EffectoPaywall },
  { id: 'H', name: 'BetterMe', desc: 'Premium Dark UI', color: '#1a1a2e', Component: BetterMePaywall },
  { id: 'I', name: 'TodayIsTheDay', desc: 'Before/After + Intro Pricing', color: '#F5326D', Component: TodayIsTheDayPaywall },
  { id: 'J', name: 'The Coach', desc: 'Expert Cards + SAVE 78%', color: '#F59E0B', Component: TheCoachPaywall },
  { id: 'K', name: 'Slowdive', desc: 'Live Counter + Per-Day Price', color: '#10B981', Component: SlowdivePaywall },
  { id: 'L', name: 'Nebula', desc: 'One-Time $19.99 Report', color: '#6366F1', Component: NebulaPaywall },
  { id: 'M', name: 'Keto Cycle', desc: 'Conditional Refund + Preview', color: '#F5326D', Component: KetoCyclePaywall },
  { id: 'N', name: 'Helpido', desc: '77% Discount + Emotional', color: '#DC2626', Component: HelpidoPaywall },
];

export function PaywallMap() {
  const [, navigate] = useLocation();
  const [activePaywall, setActivePaywall] = useState<string | null>(null);
  const { toast } = useToast();

  const handleBuy = () => {
    toast({
      title: 'Preview Mode',
      description: 'This is a preview — no payment processed.',
      duration: 3000,
    });
  };

  if (activePaywall) {
    const pw = PAYWALLS.find(p => p.id === activePaywall);
    if (pw) {
      const { Component } = pw;
      return (
        <div className="relative">
          <button
            onClick={() => setActivePaywall(null)}
            className="fixed top-4 left-4 z-[100] bg-background/80 backdrop-blur-sm border border-border rounded-full px-3 py-2 text-xs font-bold flex items-center gap-1.5 shadow-lg"
          >
            <ArrowLeft size={14} /> Paywall Map
          </button>
          <Component userName="Sarah" onBuy={handleBuy} />
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors text-muted-foreground"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-sm font-black text-foreground">Paywall Architecture Map</h1>
            <p className="text-[10px] text-muted-foreground">14 unique paywall designs — click to preview full-screen</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PAYWALLS.map((pw, i) => (
            <motion.button
              key={pw.id}
              data-testid={`paywall-card-${pw.id}`}
              className="w-full text-left bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all group"
              onClick={() => setActivePaywall(pw.id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="h-1.5" style={{ background: pw.color }} />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm"
                    style={{ background: pw.color }}>
                    {pw.id}
                  </div>
                  <div>
                    <p className="text-sm font-black text-foreground">{pw.name}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{pw.desc}</p>
                <div className="text-[10px] font-semibold text-primary">Click to preview →</div>
              </div>
            </motion.button>
          ))}
        </div>
      </main>
    </div>
  );
}
