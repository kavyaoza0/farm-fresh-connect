import { useLanguage } from '@/context/LanguageContext';
import { Leaf, Store, Truck, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { HeroSection } from './HeroSection';
import { Card3D, FloatingIcon3D, StaggerContainer, StaggerItem } from './Animated3DCards';

interface HomeTabProps {
  onExplore: () => void;
}

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: any; title: string; description: string; delay: number }) => (
  <Card3D delay={delay} className="group">
    <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 p-5 shadow-card hover:shadow-elevated transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 flex items-start gap-4">
        <FloatingIcon3D delay={delay + 0.2}>
          <Icon className="w-6 h-6 text-primary" />
        </FloatingIcon3D>
        <div>
          <h3 className="font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  </Card3D>
);

export const HomeTab = ({ onExplore }: HomeTabProps) => {
  const { t } = useLanguage();

  return (
    <section className="space-y-8 pb-6 overflow-hidden">
      {/* Video Hero with 3D Scroll */}
      <HeroSection onExplore={onExplore} />

      {/* 3D Stats Row */}
      <StaggerContainer className="grid grid-cols-3 gap-3">
        {[
          { value: '500+', label: 'Products' },
          { value: '100+', label: 'Shops' },
          { value: '50+', label: 'Farmers' },
        ].map((stat) => (
          <StaggerItem key={stat.label}>
            <Card3D className="h-full">
              <div className="text-center p-3 rounded-xl bg-card border border-border/50">
                <motion.p
                  className="text-xl font-bold text-primary"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.8 }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </Card3D>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* 3D Feature Cards */}
      <div className="space-y-3">
        <motion.h2
          initial={{ opacity: 0, x: -20, rotateY: -20 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
          className="text-lg font-semibold text-foreground px-1"
        >
          Why Choose Us
        </motion.h2>

        <FeatureCard icon={Leaf} title="Farm Fresh Quality" description="Direct from verified farmers to your table. No middlemen, just pure freshness." delay={0.9} />
        <FeatureCard icon={Store} title="Local Shops Network" description="Connect with trusted local vegetable shops in your neighborhood." delay={1.0} />
        <FeatureCard icon={Truck} title="Quick Pickup" description="Order online and pickup at your convenience. No waiting in queues." delay={1.1} />
        <FeatureCard icon={ShieldCheck} title="Quality Assured" description="Every product is verified for freshness and quality standards." delay={1.2} />
      </div>

      {/* 3D How It Works */}
      <Card3D delay={1.3}>
        <div className="rounded-2xl bg-muted/50 border border-border/30 p-5">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <motion.div animate={{ scale: [1, 1.3, 1], rotateZ: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              ✨
            </motion.div>
            How It Works
          </h3>
          <StaggerContainer className="space-y-3">
            {[
              { step: '1', text: 'Set your location to find nearby shops' },
              { step: '2', text: 'Browse fresh vegetables and fruits' },
              { step: '3', text: 'Add items to cart and checkout' },
              { step: '4', text: 'Pick up your order at the shop' },
            ].map((item) => (
              <StaggerItem key={item.step} className="flex items-center gap-3">
                <motion.div
                  className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0"
                  whileHover={{ scale: 1.2, rotateY: 180 }}
                  transition={{ type: "spring" }}
                >
                  <span className="text-sm font-semibold text-primary">{item.step}</span>
                </motion.div>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Card3D>
    </section>
  );
};
