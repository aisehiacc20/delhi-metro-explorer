import { useMemo } from 'react';
import { Clock, ArrowRightLeft, IndianRupee, Train, MapPin } from 'lucide-react';
import { getStationById, getLineColor, getLineName, MetroLine } from '@/data/metroData';

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
  // Group stations by line segments
  const segments = useMemo(() => {
    const result: { line: MetroLine; stations: string[] }[] = [];
    let currentSegment: { line: MetroLine; stations: string[] } | null = null;

    route.forEach((node, index) => {
      if (!currentSegment || node.line !== currentSegment.line) {
        if (currentSegment) {
          result.push(currentSegment);
        }
        currentSegment = { line: node.line, stations: [node.stationId] };
      } else {
        currentSegment.stations.push(node.stationId);
      }
    });

    if (currentSegment) {
      result.push(currentSegment);
    }

    return result;
  }, [route]);

  return (
    <div className="glass-card p-6 space-y-6 animate-fade-in">
      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-secondary/30 rounded-lg">
          <div className="flex items-center justify-center gap-2 text-primary mb-1">
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold">{totalTime}</div>
          <div className="text-xs text-muted-foreground">minutes</div>
        </div>
        <div className="text-center p-4 bg-secondary/30 rounded-lg">
          <div className="flex items-center justify-center gap-2 text-primary mb-1">
            <ArrowRightLeft className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold">{interchanges}</div>
          <div className="text-xs text-muted-foreground">interchanges</div>
        </div>
        <div className="text-center p-4 bg-secondary/30 rounded-lg">
          <div className="flex items-center justify-center gap-2 text-primary mb-1">
            <IndianRupee className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold">{fare}</div>
          <div className="text-xs text-muted-foreground">fare</div>
        </div>
      </div>

      {/* Route Visualization */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Train className="w-5 h-5 text-primary" />
          Route Details
        </h3>
        <p className="text-sm text-muted-foreground">
          {route.length} stations • {segments.length} line{segments.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Station List */}
      <div className="relative">
        {segments.map((segment, segmentIndex) => (
          <div key={segmentIndex} className="relative">
            {/* Line Header */}
            <div 
              className="flex items-center gap-3 mb-4 p-3 rounded-lg animate-fade-up"
              style={{ 
                backgroundColor: `${getLineColor(segment.line)}15`,
                animationDelay: `${segmentIndex * 0.1}s`
              }}
            >
              <div 
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: getLineColor(segment.line) }}
              />
              <span className="font-medium" style={{ color: getLineColor(segment.line) }}>
                {getLineName(segment.line)}
              </span>
              <span className="text-xs text-muted-foreground">
                ({segment.stations.length} stations)
              </span>
            </div>

            {/* Stations */}
            <div className="ml-2 pl-6 border-l-2" style={{ borderColor: getLineColor(segment.line) }}>
              {segment.stations.map((stationId, stationIndex) => {
                const station = getStationById(stationId);
                const isFirst = segmentIndex === 0 && stationIndex === 0;
                const isLast = segmentIndex === segments.length - 1 && stationIndex === segment.stations.length - 1;
                const routeNode = route.find(r => r.stationId === stationId);
                const isInterchange = routeNode?.isInterchange && stationIndex === 0 && segmentIndex > 0;

                return (
                  <div
                    key={stationId}
                    className="relative pb-4 animate-station-pop"
                    style={{ animationDelay: `${(segmentIndex * segment.stations.length + stationIndex) * 0.03}s` }}
                  >
                    {/* Station Dot */}
                    <div 
                      className={`absolute -left-[25px] w-4 h-4 rounded-full border-2 bg-background flex items-center justify-center ${
                        isFirst || isLast || isInterchange ? 'w-5 h-5 -left-[27px]' : ''
                      }`}
                      style={{ 
                        borderColor: getLineColor(segment.line),
                        backgroundColor: (isFirst || isLast) ? getLineColor(segment.line) : undefined
                      }}
                    >
                      {isInterchange && (
                        <ArrowRightLeft className="w-2.5 h-2.5" style={{ color: getLineColor(segment.line) }} />
                      )}
                    </div>

                    {/* Station Info */}
                    <div className={`flex items-center gap-2 ${isFirst || isLast ? 'font-semibold' : ''}`}>
                      {isFirst && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                      {isLast && <MapPin className="w-4 h-4 text-destructive" />}
                      <span className={isFirst || isLast ? 'text-foreground' : 'text-muted-foreground'}>
                        {station?.name}
                      </span>
                      {isInterchange && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                          Interchange
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
