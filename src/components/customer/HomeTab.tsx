import { useLanguage } from '@/context/LanguageContext';
import { Leaf, Store, Truck, ShieldCheck, Star, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { HeroSection } from './HeroSection';
import { Card3D, FloatingIcon3D, StaggerContainer, StaggerItem } from './Animated3DCards';
import { VideoScrollSection, ScrollReveal3D } from './ParallaxImageSection';
import farmVideo from '@/assets/farm-hero.mp4';

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
    <section className="space-y-6 pb-6 overflow-hidden">
      <HeroSection onExplore={onExplore} />

      {/* Stats Row */}
      <StaggerContainer className="grid grid-cols-3 gap-3">
        {[
          { value: '500+', label: 'Products', icon: Star },
          { value: '100+', label: 'Shops', icon: Store },
          { value: '50+', label: 'Farmers', icon: Users },
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

      {/* Feature Cards */}
      <div className="space-y-3">
        <ScrollReveal3D direction="right">
          <h2 className="text-lg font-semibold text-foreground px-1">Why Choose Us</h2>
        </ScrollReveal3D>
        <FeatureCard icon={Leaf} title="Farm Fresh Quality" description="Direct from verified farmers to your table. No middlemen, just pure freshness." delay={0} />
        <FeatureCard icon={Store} title="Local Shops Network" description="Connect with trusted local vegetable shops in your neighborhood." delay={0.1} />
        <FeatureCard icon={Truck} title="Quick Pickup" description="Order online and pickup at your convenience. No waiting in queues." delay={0} />
        <FeatureCard icon={ShieldCheck} title="Quality Assured" description="Every product is verified for freshness and quality standards." delay={0.1} />
      </div>

      {/* Video Section */}
      <VideoScrollSection
        videoSrc={farmVideo}
        title="From Farm to You"
        subtitle="Watch the journey of freshness from field to your kitchen"
      />

      {/* How It Works */}
      <ScrollReveal3D direction="up">
        <Card3D>
          <div className="rounded-2xl bg-muted/50 border border-border/30 p-5">
            <h3 className="font-semibold text-foreground mb-4">How It Works</h3>
            <StaggerContainer className="space-y-3">
              {[
                { step: '1', text: 'Set your location to find nearby shops' },
                { step: '2', text: 'Browse fresh vegetables and fruits' },
                { step: '3', text: 'Add items to cart and checkout' },
                { step: '4', text: 'Pick up your order at the shop' },
              ].map((item) => (
                <StaggerItem key={item.step} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-sm font-semibold text-primary">{item.step}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </Card3D>
      </ScrollReveal3D>
    </section>
  );
};
