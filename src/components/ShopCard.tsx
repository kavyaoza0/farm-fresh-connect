import { Star, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Shop } from '@/types';
import { cn } from '@/lib/utils';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

interface ShopCardProps {
  shop: Shop;
  onClick?: () => void;
  className?: string;
  index?: number;
}

export const ShopCard = ({ shop, onClick, className, index = 0 }: ShopCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      onClick={onClick}
      className={cn(
        "group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-300 cursor-pointer",
        className
      )}
    >
      {/* Shop Image with 3D depth */}
      <div className="relative h-40 overflow-hidden" style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}>
        <motion.img
          src={shop.image}
          alt={shop.name}
          className="w-full h-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6 }}
        />
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className={cn(
            "absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium",
            shop.isOpen
              ? "bg-success text-primary-foreground"
              : "bg-muted text-muted-foreground"
          )}
          style={{ transform: "translateZ(30px)" }}
        >
          {shop.isOpen ? 'Open Now' : 'Closed'}
        </motion.div>
        {shop.isVerified && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.4, type: "spring" }}
            className="absolute top-3 right-3 bg-primary/90 text-primary-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"
            style={{ transform: "translateZ(30px)" }}
          >
            <span>✓</span> Verified
          </motion.div>
        )}
      </div>

      {/* Shop Info with depth layers */}
      <div className="p-4" style={{ transform: "translateZ(15px)", transformStyle: "preserve-3d" }}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-foreground text-lg leading-tight group-hover:text-primary transition-colors">
            {shop.name}
          </h3>
          <motion.div
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all" />
          </motion.div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {shop.description}
        </p>

        {/* Rating & Info */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <motion.div whileHover={{ rotate: 72, scale: 1.3 }} transition={{ type: "spring" }}>
              <Star className="w-4 h-4 fill-accent text-accent" />
            </motion.div>
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
    </motion.div>
  );
};
