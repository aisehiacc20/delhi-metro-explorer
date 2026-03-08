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
  const pathData = useMemo(() => {
    if (route.length < 2) return null;

    const width = 600;
    const height = 120;
    const padding = 50;
    const stepX = (width - padding * 2) / (route.length - 1);

    const points = route.map((node, index) => ({
      x: padding + index * stepX,
      y: height / 2,
      ...node
    }));

    const segments: { line: MetroLine; points: typeof points }[] = [];
    let currentLine = points[0].line;
    let segmentPoints = [points[0]];

    for (let i = 1; i < points.length; i++) {
      if (points[i].line !== currentLine) {
        segments.push({ line: currentLine, points: segmentPoints });
        currentLine = points[i].line;
        segmentPoints = [points[i - 1], points[i]];
      } else {
        segmentPoints.push(points[i]);
      }
    }
    segments.push({ line: currentLine, points: segmentPoints });

    return { segments, points };
  }, [route]);

  if (!pathData) return null;

  return (
    <div className="py-6">
      <svg
        width="100%"
        height="120"
        viewBox="0 0 600 120"
        className="overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Route lines */}
        {pathData.segments.map((segment, i) => {
          const d = segment.points.map((p, j) => 
            `${j === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
          ).join(' ');
          
          return (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={getLineColor(segment.line)}
              strokeWidth="3"
              strokeLinecap="round"
            />
          );
        })}

        {/* Station dots */}
        {pathData.points.map((point, index) => {
          const station = getStationById(point.stationId);
          const isEnd = index === 0 || index === pathData.points.length - 1;

          return (
            <g key={point.stationId}>
              <circle
                cx={point.x}
                cy={point.y}
                r={isEnd ? 6 : 4}
                fill={isEnd ? getLineColor(point.line) : 'hsl(var(--background))'}
                stroke={getLineColor(point.line)}
                strokeWidth="2"
              />
              {isEnd && (
                <text
                  x={point.x}
                  y={point.y + 24}
                  textAnchor="middle"
                  className="fill-foreground text-[9px]"
                >
                  {station?.name.slice(0, 12)}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
