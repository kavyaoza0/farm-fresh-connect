import { Star, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Shop } from '@/types';
import { cn } from '@/lib/utils';

interface ShopCardProps {
  shop: Shop;
  onClick?: () => void;
  className?: string;
}

export const ShopCard = ({ shop, onClick, className }: ShopCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer animate-fade-in",
        className
      )}
    >
      {/* Shop Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={shop.image}
          alt={shop.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Status Badge */}
        <div className={cn(
          "absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium",
          shop.isOpen 
            ? "bg-success text-primary-foreground" 
            : "bg-muted text-muted-foreground"
        )}>
          {shop.isOpen ? 'Open Now' : 'Closed'}
        </div>
        {shop.isVerified && (
          <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <span>✓</span> Verified
          </div>
        )}
      </div>

      {/* Shop Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-foreground text-lg leading-tight group-hover:text-primary transition-colors">
            {shop.name}
          </h3>
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {shop.description}
        </p>

        {/* Rating & Info */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="font-medium text-foreground">{shop.rating}</span>
            <span className="text-muted-foreground">({shop.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{shop.openingTime} - {shop.closingTime}</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="truncate">{shop.location.address}, {shop.location.city}</span>
        </div>
      </div>
    </div>
  );
};
