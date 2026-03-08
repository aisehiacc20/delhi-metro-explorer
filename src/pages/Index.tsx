import { useState, useCallback } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { StationSelect } from '@/components/StationSelect';
import { RouteDisplay } from '@/components/RouteDisplay';
import { MetroMap } from '@/components/MetroMap';
import { LineColors } from '@/components/LineColors';
import { findShortestRoute } from '@/lib/dijkstra';
import { MetroLine } from '@/data/metroData';
import { toast } from 'sonner';

interface RouteResult {
  route: { stationId: string; line: MetroLine; isInterchange: boolean }[];
  totalTime: number;
  interchanges: number;
  fare: number;
}

const Index = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [result, setResult] = useState<RouteResult | null>(null);
  const [loading, setLoading] = useState(false);

  const search = useCallback(() => {
    if (!from || !to) {
      toast.error('Select both stations');
      return;
    }
    if (from === to) {
      toast.error('Select different stations');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const route = findShortestRoute(from, to);
      if (route) {
        setResult(route);
      } else {
        toast.error('No route found');
        setResult(null);
      }
      setLoading(false);
    }, 200);
  }, [from, to]);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setResult(null);
  };

  const reset = () => {
    setFrom('');
    setTo('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-xl mx-auto px-4 py-8">
        <Header />

        {/* Search */}
        <div className="space-y-4 mt-8">
          <StationSelect
            value={from}
            onChange={setFrom}
            placeholder="Departure"
            label="From"
          />

          <div className="flex justify-center">
            <button
              onClick={swap}
              disabled={!from && !to}
              className="p-2 rounded-full text-muted-foreground/50 hover:text-muted-foreground hover:bg-secondary/50 transition-colors disabled:opacity-30"
            >
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>

          <StationSelect
            value={to}
            onChange={setTo}
            placeholder="Destination"
            label="To"
          />

          <div className="flex gap-2 pt-4">
            <Button
              onClick={search}
              disabled={!from || !to || loading}
              className="flex-1 h-11"
            >
              {loading ? 'Finding...' : 'Find Route'}
            </Button>
            {(from || to || result) && (
              <Button variant="ghost" onClick={reset} className="h-11 px-4 text-muted-foreground">
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-12 space-y-8">
            <MetroMap route={result.route} />
            <RouteDisplay
              route={result.route}
              totalTime={result.totalTime}
              interchanges={result.interchanges}
              fare={result.fare}
            />
          </div>
        )}

        <LineColors />

        <footer className="mt-12 text-center text-xs text-muted-foreground/30 pb-8">
          Delhi Metro Route Finder
        </footer>
      </div>
    </div>
  );
};

export default Index;
