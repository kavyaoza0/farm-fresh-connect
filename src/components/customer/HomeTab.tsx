import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Leaf, Store, Truck, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface HomeTabProps {
  onExplore: () => void;
}

const FloatingParticle = ({ delay, duration, x, y, size }: { delay: number; duration: number; x: string; y: string; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-primary/20"
    style={{ width: size, height: size, left: x, top: y }}
    animate={{
      y: [0, -30, 0],
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: any; title: string; description: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ scale: 1.02, y: -5 }}
    className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 p-5 shadow-card hover:shadow-elevated transition-all duration-300"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10 flex items-start gap-4">
      <motion.div 
        className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"
        whileHover={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.5 }}
      >
        <Icon className="w-6 h-6 text-primary" />
      </motion.div>
      <div>
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  </motion.div>
);

export const HomeTab = ({ onExplore }: HomeTabProps) => {
  const { t } = useLanguage();

  return (
    <section className="space-y-8 pb-6 overflow-hidden">
      {/* Hero Section with Motion */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl overflow-hidden min-h-[320px]"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 gradient-hero">
          {/* Floating Particles */}
          <FloatingParticle delay={0} duration={4} x="10%" y="20%" size={8} />
          <FloatingParticle delay={0.5} duration={3.5} x="85%" y="30%" size={12} />
          <FloatingParticle delay={1} duration={4.5} x="70%" y="70%" size={6} />
          <FloatingParticle delay={1.5} duration={3} x="20%" y="60%" size={10} />
          <FloatingParticle delay={2} duration={5} x="50%" y="80%" size={8} />
          <FloatingParticle delay={0.8} duration={4.2} x="30%" y="40%" size={14} />
          
          {/* Glowing Orbs */}
          <motion.div
            className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-primary-foreground/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-accent/20 blur-2xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 p-6 pt-8 text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 mb-4"
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-3xl font-bold leading-tight mb-3"
          >
            {t.freshFromFarm}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base opacity-90 max-w-[28ch] mb-6 leading-relaxed"
          >
            {t.buyFreshVegetables}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button 
              variant="secondary" 
              size="lg" 
              className="gap-2 font-semibold shadow-elevated hover:shadow-soft transition-all duration-300" 
              onClick={onExplore}
            >
              {t.explore}
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Button>
          </motion.div>

          {/* Animated Leaf Decoration */}
          <motion.div
            className="absolute right-4 bottom-4"
            animate={{
              rotate: [0, 10, -10, 0],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Leaf className="w-16 h-16 text-primary-foreground/20" />
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="grid grid-cols-3 gap-3"
      >
        {[
          { value: '500+', label: 'Products' },
          { value: '100+', label: 'Shops' },
          { value: '50+', label: 'Farmers' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="text-center p-3 rounded-xl bg-card border border-border/50"
          >
            <p className="text-xl font-bold text-primary">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Feature Cards */}
      <div className="space-y-3">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-lg font-semibold text-foreground px-1"
        >
          Why Choose Us
        </motion.h2>
        
        <FeatureCard
          icon={Leaf}
          title="Farm Fresh Quality"
          description="Direct from verified farmers to your table. No middlemen, just pure freshness."
          delay={0.9}
        />
        
        <FeatureCard
          icon={Store}
          title="Local Shops Network"
          description="Connect with trusted local vegetable shops in your neighborhood."
          delay={1.0}
        />
        
        <FeatureCard
          icon={Truck}
          title="Quick Pickup"
          description="Order online and pickup at your convenience. No waiting in queues."
          delay={1.1}
        />
        
        <FeatureCard
          icon={ShieldCheck}
          title="Quality Assured"
          description="Every product is verified for freshness and quality standards."
          delay={1.2}
        />
      </div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.3 }}
        className="rounded-2xl bg-muted/50 border border-border/30 p-5"
      >
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨
          </motion.div>
          How It Works
        </h3>
        <div className="space-y-3">
          {[
            { step: '1', text: 'Set your location to find nearby shops' },
            { step: '2', text: 'Browse fresh vegetables and fruits' },
            { step: '3', text: 'Add items to cart and checkout' },
            { step: '4', text: 'Pick up your order at the shop' },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1.4 + i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-sm font-semibold text-primary">{item.step}</span>
              </div>
              <p className="text-sm text-muted-foreground">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
