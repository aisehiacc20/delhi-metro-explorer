import { useMemo } from 'react';
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
  const segments = useMemo(() => {
    const result: { line: MetroLine; stations: string[] }[] = [];
    let current: { line: MetroLine; stations: string[] } | null = null;

    route.forEach((node) => {
      if (!current || node.line !== current.line) {
        if (current) result.push(current);
        current = { line: node.line, stations: [node.stationId] };
      } else {
        current.stations.push(node.stationId);
      }
    });
    if (current) result.push(current);
    return result;
  }, [route]);

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="flex justify-center gap-12 text-center">
        <div>
          <p className="text-3xl font-light">{totalTime}</p>
          <p className="text-xs text-muted-foreground/50 uppercase tracking-wider mt-1">min</p>
        </div>
        <div>
          <p className="text-3xl font-light">{interchanges}</p>
          <p className="text-xs text-muted-foreground/50 uppercase tracking-wider mt-1">changes</p>
        </div>
        <div>
          <p className="text-3xl font-light">₹{fare}</p>
          <p className="text-xs text-muted-foreground/50 uppercase tracking-wider mt-1">fare</p>
        </div>
      </div>

      {/* Route */}
      <div className="space-y-6">
        {segments.map((segment, segmentIndex) => {
          const lineColor = getLineColor(segment.line);
          return (
            <div key={segmentIndex}>
              {/* Line badge */}
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: lineColor }}
                />
                <span className="text-sm font-medium" style={{ color: lineColor }}>
                  {getLineName(segment.line)}
                </span>
                <span className="text-xs text-muted-foreground/40">
                  {segment.stations.length} stops
                </span>
              </div>

              {/* Stations with centered line */}
              <div className="relative pl-6">
                {/* Vertical line - centered on dots */}
                <div
                  className="absolute left-[7px] top-1 bottom-1 w-px"
                  style={{ backgroundColor: lineColor, opacity: 0.3 }}
                />

                {segment.stations.map((stationId, i) => {
                  const station = getStationById(stationId);
                  const isFirst = segmentIndex === 0 && i === 0;
                  const isLast = segmentIndex === segments.length - 1 && i === segment.stations.length - 1;
                  const isInterchange = i === 0 && segmentIndex > 0;

                  return (
                    <div key={stationId} className="relative flex items-center py-1.5">
                      {/* Station dot - centered */}
                      <div
                        className="absolute left-0 w-[15px] flex justify-center"
                      >
                        <div
                          className={cn(
                            "rounded-full border-2 bg-background",
                            isFirst || isLast ? "w-3 h-3" : "w-2 h-2"
                          )}
                          style={{
                            borderColor: lineColor,
                            backgroundColor: isFirst || isLast ? lineColor : undefined
                          }}
                        />
                      </div>

                      {/* Station name */}
                      <span
                        className={cn(
                          "pl-6 text-sm",
                          isFirst || isLast
                            ? "text-foreground font-medium"
                            : "text-muted-foreground/60"
                        )}
                      >
                        {station?.name}
                        {isInterchange && (
                          <span className="ml-2 text-xs text-primary/70">change</span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
