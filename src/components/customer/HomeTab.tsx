import { useLanguage } from '@/context/LanguageContext';
import { Leaf, Store, Truck, ShieldCheck, Star, Users, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { HeroSection } from './HeroSection';
import { Card3D, FloatingIcon3D, StaggerContainer, StaggerItem } from './Animated3DCards';
import { ParallaxImageSection, VideoScrollSection, ScrollReveal3D } from './ParallaxImageSection';
import farmVideo from '@/assets/farm-hero.mp4';
import freshVegetablesImg from '@/assets/fresh-vegetables.jpg';
import farmerHarvestImg from '@/assets/farmer-harvest.jpg';
import localShopImg from '@/assets/local-shop.jpg';

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

      {/* Parallax Image — Fresh Produce */}
      <ScrollReveal3D direction="left">
        <ParallaxImageSection
          imageSrc={freshVegetablesImg}
          alt="Fresh vegetables"
          title="Farm Fresh Produce"
          subtitle="Handpicked daily from local farms to your table"
          direction="left"
        />
      </ScrollReveal3D>

      {/* 3D Feature Cards */}
      <div className="space-y-3">
        <ScrollReveal3D direction="right">
          <h2 className="text-lg font-semibold text-foreground px-1">
            Why Choose Us
          </h2>
        </ScrollReveal3D>

        <FeatureCard icon={Leaf} title="Farm Fresh Quality" description="Direct from verified farmers to your table. No middlemen, just pure freshness." delay={0} />
        <FeatureCard icon={Store} title="Local Shops Network" description="Connect with trusted local vegetable shops in your neighborhood." delay={0.1} />
      </div>

      {/* Video Scroll Section — Farm Journey */}
      <VideoScrollSection
        videoSrc={farmVideo}
        title="From Farm to You"
        subtitle="Watch the journey of freshness from field to your kitchen"
      />

      {/* More Feature Cards */}
      <div className="space-y-3">
        <FeatureCard icon={Truck} title="Quick Pickup" description="Order online and pickup at your convenience. No waiting in queues." delay={0} />
        <FeatureCard icon={ShieldCheck} title="Quality Assured" description="Every product is verified for freshness and quality standards." delay={0.1} />
      </div>

      {/* Parallax Image — Farmer at Work */}
      <ScrollReveal3D direction="right">
        <ParallaxImageSection
          imageSrc={farmerHarvestImg}
          alt="Farmer harvesting fresh produce"
          title="Supporting Local Farmers"
          subtitle="Every purchase empowers farmers and their families"
          direction="right"
        />
      </ScrollReveal3D>

      {/* Testimonial-style 3D card */}
      <ScrollReveal3D direction="up">
        <Card3D>
          <div className="rounded-2xl bg-card border border-border/50 p-5 shadow-card">
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              >
                <Heart className="w-5 h-5 text-primary" />
              </motion.div>
              <div>
                <p className="font-semibold text-foreground text-sm">Loved by Thousands</p>
                <p className="text-xs text-muted-foreground">Join our growing community</p>
              </div>
            </div>
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, rotateZ: -180 }}
                  whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
                >
                  <Star className="w-4 h-4 fill-accent text-accent" />
                </motion.div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground italic">"The freshest vegetables I've ever ordered. It's like having a farm next door!"</p>
          </div>
        </Card3D>
      </ScrollReveal3D>

      {/* Parallax Image — Local Shop */}
      <ScrollReveal3D direction="left">
        <ParallaxImageSection
          imageSrc={localShopImg}
          alt="Local vegetable shop"
          title="Discover Nearby Shops"
          subtitle="Find the best local vendors just around the corner"
          direction="left"
        />
      </ScrollReveal3D>

      {/* 3D How It Works */}
      <ScrollReveal3D direction="up">
        <Card3D>
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
      </ScrollReveal3D>
    </section>
  );
};
