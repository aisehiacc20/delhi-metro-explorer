/**
 * RouteDisplay Component
 * Shows the metro route as a vertical list with a center line
 * Like a real metro route diagram
 */

import { Clock, ArrowRightLeft, IndianRupee, Train } from 'lucide-react';
import { getStationById, getLineColor, getLineName, MetroLine } from '@/data/metroData';

// Define what each station in the route looks like
interface RouteNode {
  stationId: string;
  line: MetroLine;
  isInterchange: boolean;
}

// Props for this component
interface RouteDisplayProps {
  route: RouteNode[];
  totalTime: number;
  interchanges: number;
  fare: number;
}

// Main component
export const RouteDisplay = ({ route, totalTime, interchanges, fare }: RouteDisplayProps) => {
  return (
    <div className="glass-card p-6 space-y-6 animate-fade-in">
      
      {/* Top Stats - Time, Interchanges, Fare */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard 
          icon={<Clock className="w-5 h-5" />} 
          value={totalTime} 
          label="minutes" 
        />
        <StatCard 
          icon={<ArrowRightLeft className="w-5 h-5" />} 
          value={interchanges} 
          label="interchanges" 
        />
        <StatCard 
          icon={<IndianRupee className="w-5 h-5" />} 
          value={fare} 
          label="fare" 
        />
      </div>

      {/* Route Header */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Train className="w-5 h-5 text-primary" />
          Route Details
        </h3>
        <p className="text-sm text-muted-foreground">
          {route.length} stations
        </p>
      </div>

      {/* Station List - Vertical timeline style */}
      <div className="flex flex-col items-center">
        {route.map((node, index) => {
          // Get station info
          const station = getStationById(node.stationId);
          const lineColor = getLineColor(node.line);
          
          // Check position
          const isFirst = index === 0;
          const isLast = index === route.length - 1;
          const isInterchange = node.isInterchange;
          
          // Get next station's line color for the connecting line
          const nextNode = route[index + 1];
          const nextLineColor = nextNode ? getLineColor(nextNode.line) : lineColor;

          return (
            <div key={node.stationId} className="flex items-center w-full max-w-lg">
              
              {/* Left side - Station number */}
              <div className="w-8 text-center">
                <span className="text-xs text-muted-foreground">
                  {index + 1}
                </span>
              </div>

              {/* Station name */}
              <div className="flex-1 text-right pr-4">
                <span className={`text-sm ${
                  isFirst || isLast 
                    ? 'font-bold text-foreground' 
                    : isInterchange 
                      ? 'font-semibold text-foreground' 
                      : 'text-muted-foreground'
                }`}>
                  {station?.name}
                </span>
              </div>

              {/* Center line with station dot */}
              <div className="flex flex-col items-center">
                {/* Station circle */}
                <div
                  className={`rounded-full border-3 z-10 ${
                    isFirst || isLast 
                      ? 'w-5 h-5 border-[3px]' 
                      : isInterchange 
                        ? 'w-5 h-5 border-[3px]' 
                        : 'w-3 h-3 border-2'
                  }`}
                  style={{
                    borderColor: lineColor,
                    backgroundColor: isFirst || isLast 
                      ? lineColor 
                      : isInterchange 
                        ? lineColor 
                        : 'hsl(var(--background))'
                  }}
                />
                
                {/* Vertical connecting line */}
                {!isLast && (
                  <div
                    className="w-0.5 h-10"
                    style={{ backgroundColor: nextLineColor }}
                  />
                )}
              </div>

              {/* Right side - Change info */}
              <div className="flex-1 pl-4">
                {isInterchange && (
                  <div className="text-left">
                    <span className="text-xs font-bold px-2 py-1 rounded bg-primary/20 text-primary">
                      ↻ Change to {getLineName(node.line)}
                    </span>
                  </div>
                )}
                {isFirst && (
                  <span className="text-xs font-medium text-primary">START</span>
                )}
                {isLast && (
                  <span className="text-xs font-medium text-destructive">END</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * StatCard - Shows a single stat with icon
 */
const StatCard = ({ 
  icon, 
  value, 
  label 
}: { 
  icon: React.ReactNode; 
  value: number; 
  label: string;
}) => (
  <div className="text-center p-4 bg-secondary/30 rounded-lg">
    <div className="flex items-center justify-center gap-2 text-primary mb-1">
      {icon}
    </div>
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </div>
);
