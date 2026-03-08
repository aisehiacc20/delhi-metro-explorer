import { useMemo } from 'react';
import { getStationById, getLineColor, MetroLine } from '@/data/metroData';

// Types
interface RouteNode {
  stationId: string;
  line: MetroLine;
  isInterchange: boolean;
}

interface MetroMapProps {
  route: RouteNode[];
}

export const MetroMap = ({ route }: MetroMapProps) => {
  // Calculate SVG points and path segments
  const mapData = useMemo(() => {
    if (route.length < 2) return null;

    const width = 600;
    const height = 200;
    const padding = 40;
    const stepX = (width - padding * 2) / (route.length - 1);

    // Create points with slight wave pattern for visual interest
    const points = route.map((node, i) => ({
      x: padding + i * stepX,
      y: height / 2 + (i % 2 === 0 ? -15 : 15),
      ...node
    }));

    // Group path segments by line color
    const segments: { line: MetroLine; path: string }[] = [];
    let currentLine = points[0].line;
    let currentPath = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      // Add curved line to next point
      const midX = (points[i - 1].x + points[i].x) / 2;
      const midY = (points[i - 1].y + points[i].y) / 2;
      currentPath += ` Q ${midX} ${points[i - 1].y} ${midX} ${midY}`;
      currentPath += ` T ${points[i].x} ${points[i].y}`;

      // Start new segment when line changes
      if (points[i].line !== currentLine) {
        segments.push({ line: currentLine, path: currentPath });
        currentLine = points[i].line;
        currentPath = `M ${points[i - 1].x} ${points[i - 1].y}`;
        currentPath += ` Q ${midX} ${points[i - 1].y} ${midX} ${midY}`;
        currentPath += ` T ${points[i].x} ${points[i].y}`;
      }
    }
    segments.push({ line: currentLine, path: currentPath });

    return { segments, points };
  }, [route]);

  if (!mapData) return null;

  return (
    <div className="glass-card p-6 animate-fade-in">
      <h3 className="text-lg font-semibold mb-4">Route Map</h3>
      
      <div className="overflow-x-auto">
        <svg
          width="100%"
          height="200"
          viewBox="0 0 600 200"
          className="min-w-[600px]"
        >
          {/* Background */}
          <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#bgGradient)" rx="12" />

          {/* Draw route lines */}
          {mapData.segments.map((seg, i) => (
            <path
              key={i}
              d={seg.path}
              fill="none"
              stroke={getLineColor(seg.line)}
              strokeWidth="4"
              strokeLinecap="round"
              className="animate-route-draw"
              style={{ strokeDasharray: 1000, animationDelay: `${i * 0.2}s` }}
            />
          ))}

          {/* Draw station circles */}
          {mapData.points.map((point, i) => {
            const station = getStationById(point.stationId);
            const isEnd = i === 0 || i === mapData.points.length - 1;

            return (
              <g key={point.stationId} className="animate-station-pop" style={{ animationDelay: `${i * 0.05 + 0.3}s` }}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={isEnd ? 10 : point.isInterchange ? 8 : 6}
                  fill={isEnd ? getLineColor(point.line) : 'hsl(var(--background))'}
                  stroke={getLineColor(point.line)}
                  strokeWidth={isEnd ? 3 : 2}
                />
                
                {/* Show name for endpoints and interchanges */}
                {(isEnd || point.isInterchange) && (
                  <text
                    x={point.x}
                    y={point.y + (i % 2 === 0 ? -18 : 28)}
                    textAnchor="middle"
                    className="fill-foreground text-[10px] font-medium"
                  >
                    {station?.name.slice(0, 12)}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Simple legend */}
      <div className="flex gap-6 mt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span>Start/End</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border-2 border-foreground" />
          <span>Interchange</span>
        </div>
      </div>
    </div>
  );
};
