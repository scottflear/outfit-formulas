import { useParams, useLocation } from 'wouter';
import { getFunnelById } from '@/data/funnels';
import { QuizEngine } from '@/components/QuizEngine';

export function FunnelQuiz() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();

  const funnel = getFunnelById(params.id?.toUpperCase() || '');

  if (!funnel) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-xl font-black text-foreground mb-2">Funnel not found</h2>
          <p className="text-sm text-muted-foreground mb-4">Funnel "{params.id}" doesn't exist.</p>
          <button
            className="px-4 py-2 rounded-xl text-sm font-bold text-white"
            style={{ background: 'hsl(341 91% 58%)' }}
            onClick={() => navigate('/')}
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return <QuizEngine funnel={funnel} />;
}
