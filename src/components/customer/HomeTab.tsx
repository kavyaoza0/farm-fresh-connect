import { useLanguage } from '@/context/LanguageContext';
import { Leaf, Store, Truck, ShieldCheck, Star, Users, Heart, Zap, Award, Globe } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { HeroSection } from './HeroSection';
import { Card3D, FloatingIcon3D, StaggerContainer, StaggerItem } from './Animated3DCards';
import { ParallaxImageSection, VideoScrollSection, ScrollReveal3D } from './ParallaxImageSection';
import farmVideo from '@/assets/farm-hero.mp4';
import freshVegetablesImg from '@/assets/fresh-vegetables.jpg';
import farmJourneyImg from '@/assets/farm-journey.jpg';
import farmerFamilyImg from '@/assets/farmer-family.jpg';
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

const CountUpNumber = ({ value, label, delay }: { value: string; label: string; delay: number }) => (
  <motion.div
    className="text-center"
    initial={{ opacity: 0, scale: 0, rotateZ: -90 }}
    whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
    viewport={{ once: true }}
    transition={{ type: "spring", stiffness: 150, delay }}
  >
    <motion.p
      className="text-2xl font-bold text-primary"
      whileHover={{ scale: 1.2, rotateY: 15 }}
      transition={{ type: "spring" }}
    >
      {value}
    </motion.p>
    <p className="text-xs text-muted-foreground">{label}</p>
  </motion.div>
);

const FloatingBadge3D = ({ text, icon: Icon, delay, className = '' }: { text: string; icon: any; delay: number; className?: string }) => (
  <motion.div
    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium ${className}`}
    initial={{ opacity: 0, y: 20, rotateX: -30 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    viewport={{ once: true }}
    transition={{ delay, type: "spring", stiffness: 200 }}
    whileHover={{ scale: 1.1, rotateY: 10, boxShadow: "0 8px 25px -5px hsl(142 55% 35% / 0.3)" }}
    style={{ transformStyle: "preserve-3d" }}
  >
    <Icon className="w-3.5 h-3.5" />
    {text}
  </motion.div>
);

export const HomeTab = ({ onExplore }: HomeTabProps) => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const bgGradientOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.05, 0.1]);

  return (
    <section ref={sectionRef} className="space-y-8 pb-6 overflow-hidden relative">
      {/* Animated Background Gradient */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: bgGradientOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-accent/10" />
      </motion.div>

      {/* Video Hero with 3D Scroll */}
      <HeroSection onExplore={onExplore} />

      {/* Floating Badges Row */}
      <div className="flex flex-wrap gap-2 justify-center">
        <FloatingBadge3D icon={Leaf} text="100% Organic" delay={0.3} />
        <FloatingBadge3D icon={Zap} text="Same Day" delay={0.4} />
        <FloatingBadge3D icon={Award} text="Verified" delay={0.5} />
        <FloatingBadge3D icon={Globe} text="Local First" delay={0.6} />
      </div>

      {/* 3D Stats Row */}
      <ScrollReveal3D direction="up">
        <Card3D>
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-card border border-border/50 shadow-card">
            <CountUpNumber value="500+" label="Products" delay={0.2} />
            <CountUpNumber value="100+" label="Shops" delay={0.4} />
            <CountUpNumber value="50+" label="Farmers" delay={0.6} />
          </div>
        </Card3D>
      </ScrollReveal3D>

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

      {/* Video Scroll Section — Farm Journey (NEW IMAGE) */}
      <ScrollReveal3D direction="up">
        <ParallaxImageSection
          imageSrc={farmJourneyImg}
          alt="Farm to table journey with fresh produce crate"
          title="From Farm to You"
          subtitle="Watch the journey of freshness from field to your kitchen"
          direction="right"
        />
      </ScrollReveal3D>

      {/* Video Scroll Section */}
      <VideoScrollSection
        videoSrc={farmVideo}
        title="Experience the Harvest"
        subtitle="See how our farmers grow the freshest produce every day"
      />

      {/* More Feature Cards */}
      <div className="space-y-3">
        <FeatureCard icon={Truck} title="Quick Pickup" description="Order online and pickup at your convenience. No waiting in queues." delay={0} />
        <FeatureCard icon={ShieldCheck} title="Quality Assured" description="Every product is verified for freshness and quality standards." delay={0.1} />
      </div>

      {/* Parallax Image — Supporting Farmers (NEW IMAGE) */}
      <ScrollReveal3D direction="right">
        <ParallaxImageSection
          imageSrc={farmerFamilyImg}
          alt="Indian farmers proudly holding fresh produce"
          title="Supporting Local Farmers"
          subtitle="Every purchase empowers farmers and their families"
          direction="right"
        />
      </ScrollReveal3D>

      {/* Animated Divider */}
      <motion.div
        className="flex items-center gap-3 px-4"
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <Leaf className="w-4 h-4 text-primary/40" />
        </motion.div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </motion.div>

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

      {/* CTA Section */}
      <ScrollReveal3D direction="up">
        <motion.div
          className="rounded-2xl gradient-hero p-6 text-center"
          whileHover={{ scale: 1.02, rotateX: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{ transformStyle: "preserve-3d", perspective: 800 }}
        >
          <motion.h3
            className="text-lg font-bold text-primary-foreground mb-2"
            initial={{ opacity: 0, z: -30 }}
            whileInView={{ opacity: 1, z: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            Ready to go fresh?
          </motion.h3>
          <motion.p
            className="text-sm text-primary-foreground/80 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Start exploring local shops and farms near you
          </motion.p>
          <motion.button
            onClick={onExplore}
            className="px-6 py-2.5 rounded-xl bg-background text-primary font-semibold text-sm shadow-elevated"
            whileHover={{ scale: 1.08, rotateY: 5 }}
            whileTap={{ scale: 0.95 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            Explore Now →
          </motion.button>
        </motion.div>
      </ScrollReveal3D>
    </section>
  );
};