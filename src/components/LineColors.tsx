import { metroLines } from '@/data/metroData';

export const LineColors = () => (
  <div className="py-6">
    <p className="text-xs text-muted-foreground/50 uppercase tracking-widest mb-4 text-center">
      Lines
    </p>
    <div className="flex flex-wrap justify-center gap-3">
      {metroLines.map((line) => (
        <div
          key={line.id}
          className="flex items-center gap-2 text-xs text-muted-foreground"
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: line.color }}
          />
          <span>{line.name}</span>
        </div>
      ))}
    </div>
  </div>
);
