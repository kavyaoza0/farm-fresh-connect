import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const Card3D = ({ children, className = '', delay = 0 }: Card3DProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

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
      initial={{ opacity: 0, y: 40, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.7, delay, type: "spring" }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      className={`cursor-pointer ${className}`}
    >
      <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
};

export const FloatingIcon3D = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, rotateY: -90 }}
    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
    transition={{ duration: 0.8, delay, type: "spring", stiffness: 200 }}
    whileHover={{
      rotateY: 15,
      rotateX: -10,
      scale: 1.15,
      transition: { duration: 0.3 },
    }}
    style={{ transformStyle: "preserve-3d" }}
    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"
  >
    {children}
  </motion.div>
);

export const StaggerContainer = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: 0.1 } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30, rotateX: -15 },
      visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, type: "spring" } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);
