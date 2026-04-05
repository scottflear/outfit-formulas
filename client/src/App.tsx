import { useEffect, useState } from 'react';
import { Switch, Route, Router } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { Toaster } from '@/components/ui/toaster';
import { Dashboard } from '@/pages/Dashboard';
import { FunnelQuiz } from '@/pages/FunnelQuiz';
import { PaywallMap } from '@/pages/PaywallMap';

function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-black text-foreground">404</h1>
        <p className="text-muted-foreground mt-2">Page not found</p>
        <a href="/" className="mt-4 inline-block text-primary font-semibold">← Go home</a>
      </div>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDark = () => setDarkMode(d => !d);

  return (
    <QueryClientProvider client={queryClient}>
      <Router hook={useHashLocation}>
        <Switch>
          <Route path="/" component={() => <Dashboard darkMode={darkMode} toggleDark={toggleDark} />} />
          <Route path="/funnel/:id" component={() => <FunnelQuiz />} />
          <Route path="/paywalls" component={() => <PaywallMap />} />
          <Route component={NotFound} />
        </Switch>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
