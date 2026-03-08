/**
 * LineColors Component
 * Shows all metro lines with their colors as a reference
 */

import { metroLines } from '@/data/metroData';

export const LineColors = () => {
  return (
    <div className="glass-card p-4">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">
        Metro Lines
      </h3>
      
      {/* Grid of line badges */}
      <div className="flex flex-wrap gap-2">
        {metroLines.map(line => (
          <div
            key={line.id}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-transform hover:scale-105"
            style={{
              backgroundColor: `${line.color}20`,
              color: line.color
            }}
          >
            {/* Color dot */}
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: line.color }}
            />
            {line.name}
          </div>
        ))}
      </div>
    </div>
  );
};
