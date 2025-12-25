import { Train, Map } from 'lucide-react';

export const Header = () => {
  return (
    <header className="relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 glow-effect opacity-50" />
      
      <div className="relative z-10 text-center py-8 px-4">
        <div className="inline-flex items-center justify-center gap-3 mb-4">
          <div className="relative">
            <Train className="w-10 h-10 text-primary" />
            <div className="absolute inset-0 blur-xl bg-primary/30 animate-pulse" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Delhi Metro
          </h1>
        </div>
        <p className="text-muted-foreground text-lg flex items-center justify-center gap-2">
          <Map className="w-5 h-5" />
          Route Finder
        </p>
        <p className="text-sm text-muted-foreground/70 mt-2">
          Find the fastest route between any two metro stations
        </p>
      </div>
    </header>
  );
};
