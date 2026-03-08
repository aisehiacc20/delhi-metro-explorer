/**
 * MetroMapImage Component
 * Shows a button that opens a zoomable metro network map
 */

import { useState } from 'react';
import { Map, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import metroMapImage from '@/assets/delhi-metro-map.png';

export const MetroMapImage = () => {
  const [zoom, setZoom] = useState(1);

  // Zoom controls
  const zoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const zoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));

  return (
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Map className="w-4 h-4" />
          View Metro Map
        </Button>
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Map className="w-5 h-5 text-primary" />
            Delhi Metro Network Map
          </DialogTitle>
        </DialogHeader>

        {/* Zoom Controls */}
        <div className="flex gap-2 mb-2">
          <Button variant="outline" size="sm" onClick={zoomOut}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={zoomIn}>
            <ZoomIn className="w-4 h-4" />
          </Button>
          <span className="text-sm text-muted-foreground self-center ml-2">
            {Math.round(zoom * 100)}%
          </span>
        </div>

        {/* Map Image */}
        <div className="overflow-auto max-h-[70vh] rounded-lg border border-border">
          <img
            src={metroMapImage}
            alt="Delhi Metro Network Map"
            className="transition-transform duration-200"
            style={{ 
              transform: `scale(${zoom})`, 
              transformOrigin: 'top left' 
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
