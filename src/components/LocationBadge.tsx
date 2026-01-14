import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import { cn } from '@/lib/utils';

interface LocationBadgeProps {
  className?: string;
}

export const LocationBadge: React.FC<LocationBadgeProps> = ({ className }) => {
  const { userLocation, setShowLocationSelector } = useLocation();

  return (
    <button
      onClick={() => setShowLocationSelector(true)}
      className={cn(
        'flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors text-sm',
        className
      )}
    >
      <MapPin className="w-4 h-4 text-primary" />
      <span className="text-foreground font-medium truncate max-w-[120px]">
        {userLocation ? userLocation.city : 'Select Location'}
      </span>
      <ChevronDown className="w-3 h-3 text-muted-foreground" />
    </button>
  );
};
