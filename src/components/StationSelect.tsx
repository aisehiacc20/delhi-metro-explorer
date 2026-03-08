import { useState, useMemo } from 'react';
import { Check, ChevronDown } from 'lucide-react';
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
import { getAllStationsSorted, getLineColor } from '@/data/metroData';

interface StationSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
}

export const StationSelect = ({ value, onChange, placeholder, label }: StationSelectProps) => {
  const [open, setOpen] = useState(false);
  const stations = useMemo(() => getAllStationsSorted(), []);
  const selectedStation = stations.find(s => s.id === value);

  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-widest text-muted-foreground/70">
        {label}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between h-12 bg-secondary/30 border-border/30 hover:bg-secondary/50 hover:border-border/50"
          >
            {selectedStation ? (
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {selectedStation.lines.slice(0, 3).map((line, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: getLineColor(line) }}
                    />
                  ))}
                </div>
                <span className="truncate font-normal">{selectedStation.name}</span>
              </div>
            ) : (
              <span className="text-muted-foreground/50 font-normal">{placeholder}</span>
            )}
            <ChevronDown className="h-4 w-4 text-muted-foreground/50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[320px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search..." className="h-10 text-sm" />
            <CommandList>
              <CommandEmpty className="py-6 text-sm text-muted-foreground">
                No station found
              </CommandEmpty>
              <CommandGroup className="max-h-64 overflow-auto">
                {stations.map((station) => (
                  <CommandItem
                    key={station.id}
                    value={station.name}
                    onSelect={() => {
                      onChange(station.id);
                      setOpen(false);
                    }}
                    className="flex items-center gap-2 py-2.5"
                  >
                    <Check
                      className={cn(
                        "h-3.5 w-3.5",
                        value === station.id ? "opacity-100 text-primary" : "opacity-0"
                      )}
                    />
                    <div className="flex gap-0.5">
                      {station.lines.slice(0, 4).map((line, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: getLineColor(line) }}
                        />
                      ))}
                    </div>
                    <span className="text-sm">{station.name}</span>
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
