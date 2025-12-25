import { useMemo } from 'react';
import { getStationById, getLineColor, MetroLine } from '@/data/metroData';

interface RouteNode {
  stationId: string;
  line: MetroLine;
  isInterchange: boolean;
}

interface MetroMapProps {
  route: RouteNode[];
}

export const MetroMap = ({ route }: MetroMapProps) => {
  // Generate SVG path for route visualization
  const pathData = useMemo(() => {
    if (route.length < 2) return null;

    const width = 600;
    const height = 200;
    const padding = 40;
    const stepX = (width - padding * 2) / (route.length - 1);
    
    const points = route.map((node, index) => ({
      x: padding + index * stepX,
      y: height / 2 + (index % 2 === 0 ? -20 : 20) * (index % 3 === 0 ? 1 : -1) * 0.5,
      ...node
    }));

    // Group segments by line
    const segments: { line: MetroLine; path: string; startIndex: number }[] = [];
    let currentLine = points[0].line;
    let pathStart = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      if (points[i].line !== currentLine) {
        segments.push({
          line: currentLine,
          path: pathStart,
          startIndex: segments.length === 0 ? 0 : i - 1
        });
        currentLine = points[i].line;
        pathStart = `M ${points[i - 1].x} ${points[i - 1].y}`;
      }
      
      const midX = (points[i - 1].x + points[i].x) / 2;
      pathStart += ` Q ${midX} ${points[i - 1].y} ${midX} ${(points[i - 1].y + points[i].y) / 2}`;
      pathStart += ` T ${points[i].x} ${points[i].y}`;
    }

    segments.push({
      line: currentLine,
      path: pathStart,
      startIndex: segments.length === 0 ? 0 : points.length - 1
    });

    return { segments, points };
  }, [route]);

  if (!pathData) return null;

  return (
    <div className="glass-card p-6 animate-fade-in">
      <h3 className="text-lg font-semibold mb-4">Route Map</h3>
      <div className="overflow-x-auto">
        <svg 
          width="100%" 
          height="200" 
          viewBox="0 0 600 200" 
          className="min-w-[600px]"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background gradient */}
          <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
            </linearGradient>
            
            {/* Glow filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width="100%" height="100%" fill="url(#bgGradient)" rx="12" />

          {/* Draw route segments */}
          {pathData.segments.map((segment, index) => (
            <g key={index}>
              {/* Shadow path */}
              <path
                d={segment.path}
                fill="none"
                stroke={getLineColor(segment.line)}
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.3"
                className="animate-route-draw"
                style={{
                  strokeDasharray: 1000,
                  animationDelay: `${index * 0.2}s`
                }}
              />
              {/* Main path */}
              <path
                d={segment.path}
                fill="none"
                stroke={getLineColor(segment.line)}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-route-draw"
                filter="url(#glow)"
                style={{
                  strokeDasharray: 1000,
                  animationDelay: `${index * 0.2}s`
                }}
              />
            </g>
          ))}

          {/* Draw station points */}
          {pathData.points.map((point, index) => {
            const station = getStationById(point.stationId);
            const isFirst = index === 0;
            const isLast = index === pathData.points.length - 1;
            const isInterchange = point.isInterchange;

            return (
              <g key={point.stationId} className="animate-station-pop" style={{ animationDelay: `${index * 0.05 + 0.3}s` }}>
                {/* Station circle */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={isFirst || isLast ? 10 : isInterchange ? 8 : 6}
                  fill={isFirst || isLast ? getLineColor(point.line) : 'hsl(var(--background))'}
                  stroke={getLineColor(point.line)}
                  strokeWidth={isFirst || isLast ? 3 : 2}
                  filter={isFirst || isLast ? 'url(#glow)' : undefined}
                />
                
                {/* Interchange indicator */}
                {isInterchange && (
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill={getLineColor(point.line)}
                  />
                )}

                {/* Station name (only show for first, last, and interchanges) */}
                {(isFirst || isLast || isInterchange) && (
                  <text
                    x={point.x}
                    y={point.y + (index % 2 === 0 ? -18 : 28)}
                    textAnchor="middle"
                    className="fill-foreground text-[10px] font-medium"
                    style={{ fontSize: '10px' }}
                  >
                    {station?.name.length > 15 ? station?.name.slice(0, 15) + '...' : station?.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          <span>Start</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border-2 border-foreground" />
          <span>Interchange</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive" />
          <span>End</span>
        </div>
      </div>
    </div>
  );
};
