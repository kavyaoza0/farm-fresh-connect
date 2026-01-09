import { Home, Search, ShoppingBag, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  activeTab: 'home' | 'explore' | 'orders' | 'profile';
  onTabChange: (tab: 'home' | 'explore' | 'orders' | 'profile') => void;
  className?: string;
}

const navItems = [
  { id: 'home' as const, label: 'Home', icon: Home },
  { id: 'explore' as const, label: 'Explore', icon: Search },
  { id: 'orders' as const, label: 'Orders', icon: ShoppingBag },
  { id: 'profile' as const, label: 'Profile', icon: User },
];

export const BottomNav = ({ activeTab, onTabChange, className }: BottomNavProps) => {
  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border safe-area-bottom",
      className
    )}>
      <div className="container max-w-lg mx-auto">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div className={cn(
                  "p-2 rounded-xl transition-all duration-200",
                  isActive && "bg-primary/10"
                )}>
                  <Icon className={cn(
                    "w-5 h-5 transition-all",
                    isActive && "scale-110"
                  )} />
                </div>
                <span className={cn(
                  "text-xs font-medium",
                  isActive && "font-semibold"
                )}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
