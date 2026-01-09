import { ShoppingCart, MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title?: string;
  showLocation?: boolean;
  showCart?: boolean;
  onCartClick?: () => void;
  onProfileClick?: () => void;
  className?: string;
}

export const Header = ({
  title = "Mandi Fresh",
  showLocation = true,
  showCart = true,
  onCartClick,
  onProfileClick,
  className,
}: HeaderProps) => {
  const { itemCount, total } = useCart();

  return (
    <header className={cn(
      "sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border",
      className
    )}>
      <div className="container max-w-lg mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo & Location */}
          <div className="flex-1">
            <h1 className="text-xl font-bold text-primary">{title}</h1>
            {showLocation && (
              <button className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5 hover:text-foreground transition-colors">
                <MapPin className="w-3.5 h-3.5" />
                <span className="truncate max-w-[180px]">New Delhi, 110001</span>
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {showCart && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onCartClick}
                className="relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-scale-in">
                    {itemCount}
                  </span>
                )}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onProfileClick}
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
