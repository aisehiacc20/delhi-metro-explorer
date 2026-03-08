import { useState, useMemo } from 'react';
import { Check, ChevronsUpDown, MapPin, Train } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { getAllStationsSorted, Station, getLineColor } from '@/data/metroData';

interface StationSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  icon?: 'from' | 'to';
}

export const StationSelect = ({ value, onChange, placeholder, label, icon }: StationSelectProps) => {
  const [open, setOpen] = useState(false);
  const stations = useMemo(() => getAllStationsSorted(), []);
  
  const selectedStation = stations.find(s => s.id === value);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
        {icon === 'from' ? (
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
        ) : (
          <MapPin className="w-4 h-4 text-destructive" />
        )}
        {label}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-14 text-left font-normal bg-secondary/50 border-border/50 hover:bg-secondary hover:border-primary/50 transition-all"
          >
            {selectedStation ? (
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {selectedStation.lines.slice(0, 3).map((line, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getLineColor(line) }}
                    />
                  ))}
                </div>
                <span className="truncate">{selectedStation.name}</span>
              </div>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[350px] p-0 bg-popover border-border" align="start">
          <Command className="bg-transparent">
            <CommandInput placeholder="Search station..." className="h-12" />
            <CommandList>
              <CommandEmpty>No station found.</CommandEmpty>
              <CommandGroup className="max-h-[300px] overflow-auto">
                {stations.map((station) => (
                  <CommandItem
                    key={station.id}
                    value={station.name}
                    onSelect={() => {
                      onChange(station.id);
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 py-3 cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "h-4 w-4",
                        value === station.id ? "opacity-100 text-primary" : "opacity-0"
                      )}
                    />
                    <div className="flex gap-1">
                      {station.lines.slice(0, 4).map((line, i) => (
                        <div
                          key={i}
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: getLineColor(line) }}
                        />
                      ))}
                    </div>
                    <span className="flex-1">{station.name}</span>
                    {station.lines.length > 1 && (
                      <Train className="w-4 h-4 text-muted-foreground" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
