import { Clock, ArrowRightLeft, IndianRupee, Train } from 'lucide-react';
import { getStationById, getLineColor, MetroLine } from '@/data/metroData';

// Types for route data
interface RouteNode {
  stationId: string;
  line: MetroLine;
  isInterchange: boolean;
}

interface RouteDisplayProps {
  route: RouteNode[];
  totalTime: number;
  interchanges: number;
  fare: number;
}

export const RouteDisplay = ({ route, totalTime, interchanges, fare }: RouteDisplayProps) => {
  return (
    <div className="glass-card p-6 space-y-6 animate-fade-in">
      {/* Stats Row - Shows time, interchanges, and fare */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard icon={<Clock className="w-5 h-5" />} value={totalTime} label="minutes" />
        <StatCard icon={<ArrowRightLeft className="w-5 h-5" />} value={interchanges} label="interchanges" />
        <StatCard icon={<IndianRupee className="w-5 h-5" />} value={fare} label="fare" />
      </div>

      {/* Header */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Train className="w-5 h-5 text-primary" />
          Route Details
        </h3>
        <p className="text-sm text-muted-foreground">
          {route.length} stations
        </p>
      </div>

      {/* Station List - Vertical line style like reference image */}
      <div className="flex flex-col items-center">
        {route.map((node, index) => {
          const station = getStationById(node.stationId);
          const lineColor = getLineColor(node.line);
          const isFirst = index === 0;
          const isLast = index === route.length - 1;
          const isInterchange = node.isInterchange;

          // Check if next station has different line (for connecting line color)
          const nextNode = route[index + 1];
          const nextLineColor = nextNode ? getLineColor(nextNode.line) : lineColor;

          return (
            <div key={node.stationId} className="flex items-center w-full max-w-md">
              {/* Station name on left */}
              <div className="flex-1 text-right pr-4">
                <span className={`text-sm ${isFirst || isLast ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                  {station?.name}
                </span>
              </div>

              {/* Center line with station dot */}
              <div className="flex flex-col items-center">
                {/* Station circle */}
                <div
                  className={`rounded-full border-2 z-10 ${
                    isFirst || isLast ? 'w-4 h-4' : 'w-3 h-3'
                  }`}
                  style={{
                    borderColor: lineColor,
                    backgroundColor: isFirst || isLast ? lineColor : 'hsl(var(--background))'
                  }}
                />
                
                {/* Connecting line to next station */}
                {!isLast && (
                  <div
                    className="w-0.5 h-8"
                    style={{ backgroundColor: nextLineColor }}
                  />
                )}
              </div>

              {/* Interchange badge on right */}
              <div className="flex-1 pl-4">
                {isInterchange && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                    Change
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Simple stat card component
const StatCard = ({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) => (
  <div className="text-center p-4 bg-secondary/30 rounded-lg">
    <div className="flex items-center justify-center gap-2 text-primary mb-1">
      {icon}
    </div>
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </div>
);
