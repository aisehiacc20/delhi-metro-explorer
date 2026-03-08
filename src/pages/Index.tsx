/**
 * Index Page - Main page of Delhi Metro Route Finder
 * 
 * This is the home page where users can:
 * 1. Select departure and destination stations
 * 2. Search for the shortest route
 * 3. View the route details and map
 */

import { useState, useCallback } from 'react';
import { Search, ArrowDownUp, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { StationSelect } from '@/components/StationSelect';
import { RouteDisplay } from '@/components/RouteDisplay';
import { MetroMap } from '@/components/MetroMap';
import { MetroMapImage } from '@/components/MetroMapImage';
import { LineColors } from '@/components/LineColors';
import { findShortestRoute } from '@/lib/dijkstra';
import { MetroLine } from '@/data/metroData';
import { toast } from 'sonner';

// Type for the route result
interface RouteResult {
  route: { stationId: string; line: MetroLine; isInterchange: boolean }[];
  totalTime: number;
  interchanges: number;
  fare: number;
}

const Index = () => {
  // State for selected stations
  const [fromStation, setFromStation] = useState<string>('');
  const [toStation, setToStation] = useState<string>('');
  
  // State for search results
  const [routeResult, setRouteResult] = useState<RouteResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Handle search button click
  const handleSearch = useCallback(() => {
    // Validate inputs
    if (!fromStation || !toStation) {
      toast.error('Please select both stations');
      return;
    }

    if (fromStation === toStation) {
      toast.error('Please select different stations');
      return;
    }

    setIsSearching(true);

    // Small delay for better UX
    setTimeout(() => {
      const result = findShortestRoute(fromStation, toStation);

      if (result) {
        setRouteResult(result);
        toast.success(`Route found! ${result.route.length} stations, ${result.totalTime} minutes`);
      } else {
        toast.error('No route found between these stations');
        setRouteResult(null);
      }

      setIsSearching(false);
    }, 300);
  }, [fromStation, toStation]);

  // Swap the from and to stations
  const handleSwap = useCallback(() => {
    setFromStation(toStation);
    setToStation(fromStation);
    setRouteResult(null);
  }, [fromStation, toStation]);

  // Reset everything
  const handleReset = useCallback(() => {
    setFromStation('');
    setToStation('');
    setRouteResult(null);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Page Title for SEO */}
      <title>Delhi Metro Route Finder - Find the Fastest Route</title>
      <meta 
        name="description" 
        content="Find the shortest route between any two Delhi Metro stations. All 10 lines included." 
      />

      <div className="container max-w-4xl mx-auto px-4 py-6">
        <Header />

        {/* Search Section */}
        <div className="glass-card p-6 mt-6 space-y-6">
          
          {/* Station Selection */}
          <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
            <StationSelect
              value={fromStation}
              onChange={setFromStation}
              placeholder="Select departure station"
              label="From"
              icon="from"
            />

            {/* Swap Button (desktop) */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSwap}
              className="hidden md:flex h-14 w-14 rounded-full border border-border/50 hover:bg-primary/10"
              disabled={!fromStation && !toStation}
            >
              <ArrowDownUp className="h-5 w-5" />
            </Button>

            <StationSelect
              value={toStation}
              onChange={setToStation}
              placeholder="Select destination station"
              label="To"
              icon="to"
            />
          </div>

          {/* Swap Button (mobile) */}
          <div className="flex md:hidden justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSwap}
              disabled={!fromStation && !toStation}
              className="gap-2"
            >
              <ArrowDownUp className="h-4 w-4" />
              Swap Stations
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleSearch}
              disabled={!fromStation || !toStation || isSearching}
              className="flex-1 h-12 text-lg font-semibold gap-2 bg-primary hover:bg-primary/90"
            >
              {isSearching ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
              {isSearching ? 'Finding Route...' : 'Search Route'}
            </Button>

            {/* Show reset button if anything is selected */}
            {(fromStation || toStation || routeResult) && (
              <Button
                variant="outline"
                onClick={handleReset}
                className="h-12 px-6 gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Route Results */}
        {routeResult && (
          <div className="mt-6 space-y-6">
            <MetroMap route={routeResult.route} />
            <RouteDisplay
              route={routeResult.route}
              totalTime={routeResult.totalTime}
              interchanges={routeResult.interchanges}
              fare={routeResult.fare}
            />
          </div>
        )}

        {/* Metro Map Button & Line Colors */}
        <div className="mt-6 space-y-4">
          <div className="flex justify-center">
            <MetroMapImage />
          </div>
          <LineColors />
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-muted-foreground/60 pb-6">
          <p>Delhi Metro Route Finder • All {new Date().getFullYear()} metro lines included</p>
          <p className="mt-1">Uses Dijkstra's algorithm for optimal route calculation</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
