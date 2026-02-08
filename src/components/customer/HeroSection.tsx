import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Leaf, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import farmVideo from '@/assets/farm-hero.mp4';

const FloatingParticle = ({ delay, duration, x, y, size }: { delay: number; duration: number; x: string; y: string; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-primary-foreground/30"
    style={{ width: size, height: size, left: x, top: y }}
    animate={{
      y: [0, -30, 0],
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.2, 1],
      rotateZ: [0, 180, 360],
    }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

interface HeroSectionProps {
  onExplore: () => void;
}

export const HeroSection = ({ onExplore }: HeroSectionProps) => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [0, 8]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <motion.div
      ref={heroRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative rounded-3xl overflow-hidden min-h-[380px]"
      style={{ perspective: 1200 }}
    >
      {/* Video Background with 3D parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: videoScale, y: videoY }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={farmVideo} type="video/mp4" />
        </video>
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      </motion.div>

      {/* Floating 3D Particles */}
      <FloatingParticle delay={0} duration={4} x="10%" y="20%" size={8} />
      <FloatingParticle delay={0.5} duration={3.5} x="85%" y="30%" size={12} />
      <FloatingParticle delay={1} duration={4.5} x="70%" y="70%" size={6} />
      <FloatingParticle delay={1.5} duration={3} x="20%" y="60%" size={10} />
      <FloatingParticle delay={2} duration={5} x="50%" y="80%" size={8} />
      <FloatingParticle delay={0.8} duration={4.2} x="30%" y="40%" size={14} />

      {/* Glowing 3D Orbs */}
      <motion.div
        className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-primary/20 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
          rotateZ: [0, 90, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-accent/30 blur-2xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2],
          x: [0, 20, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hero Content with 3D tilt on scroll */}
      <motion.div
        className="relative z-10 p-6 pt-8 text-white"
        style={{ y: contentY, rotateX, opacity, transformStyle: "preserve-3d" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, rotateY: -10 }}
          animate={{ opacity: 1, y: 0, rotateY: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2 mb-4"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-5 h-5" />
          </motion.div>
          <span className="text-sm font-medium opacity-90">Farm Fresh • Daily Harvest</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, z: -50, rotateX: -15 }}
          animate={{ opacity: 1, z: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
          className="text-3xl font-bold leading-tight mb-3 drop-shadow-lg"
          style={{ transformStyle: "preserve-3d" }}
        >
          {t.freshFromFarm}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base opacity-90 max-w-[28ch] mb-6 leading-relaxed drop-shadow-md"
        >
          {t.buyFreshVegetables}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
          whileHover={{ scale: 1.05, rotateY: 5 }}
          whileTap={{ scale: 0.95 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Button
            variant="secondary"
            size="lg"
            className="gap-2 font-semibold shadow-elevated hover:shadow-soft transition-all duration-300"
            onClick={onExplore}
          >
            {t.explore}
            <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </Button>
        </motion.div>

        {/* 3D Floating Leaf */}
        <motion.div
          className="absolute right-4 bottom-4"
          animate={{
            rotate: [0, 15, -15, 0],
            y: [0, -10, 0],
            rotateY: [0, 30, -30, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Leaf className="w-16 h-16 text-white/20" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
