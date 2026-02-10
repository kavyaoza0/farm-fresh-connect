import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { HamburgerMenu } from '@/components/HamburgerMenu';
import { LocationBadge } from '@/components/LocationBadge';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  title?: string;
  showLocation?: boolean;
  showCart?: boolean;
  showMenu?: boolean;
  onCartClick?: () => void;
  className?: string;
}

export const Header = ({
  title = "Mandi Fresh",
  showLocation = true,
  showCart = true,
  showMenu = true,
  onCartClick,
  className,
}: HeaderProps) => {
  const { itemCount } = useCart();

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className={cn(
        "sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border",
        className
      )}
    >
      <div className="container max-w-lg mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo & Location */}
          <div className="flex-1">
            <motion.h1
              className="text-xl font-bold text-primary"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {title}
            </motion.h1>
            {showLocation && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <LocationBadge className="mt-1" />
              </motion.div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {showCart && (
              <motion.div
                whileHover={{ scale: 1.1, rotateZ: 5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onCartClick}
                  className="relative"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <AnimatePresence>
                    {itemCount > 0 && (
                      <motion.span
                        key={itemCount}
                        initial={{ scale: 0, rotateZ: -180 }}
                        animate={{ scale: 1, rotateZ: 0 }}
                        exit={{ scale: 0, rotateZ: 180 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                      >
                        {itemCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            )}
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <HamburgerMenu />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};
