import { Home, Search, ShoppingBag, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

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
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.3 }}
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border safe-area-bottom",
        className
      )}
    >
      <div className="container max-w-lg mx-auto">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.08, type: "spring" }}
                whileTap={{ scale: 0.85 }}
                className={cn(
                  "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors duration-200 relative",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div className="relative p-2 rounded-xl">
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="bottomNavActive"
                        className="absolute inset-0 bg-primary/10 rounded-xl"
                        initial={{ scale: 0, borderRadius: 50 }}
                        animate={{ scale: 1, borderRadius: 12 }}
                        exit={{ scale: 0, borderRadius: 50 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                  </AnimatePresence>
                  <motion.div
                    animate={isActive ? { scale: 1.15, rotateY: 360 } : { scale: 1, rotateY: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Icon className="w-5 h-5 relative z-10" />
                  </motion.div>
                </div>
                <motion.span
                  className={cn(
                    "text-xs font-medium",
                    isActive && "font-semibold"
                  )}
                  animate={isActive ? { y: -2 } : { y: 0 }}
                  transition={{ type: "spring" }}
                >
                  {item.label}
                </motion.span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};
