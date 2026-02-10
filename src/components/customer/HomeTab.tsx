import { useLanguage } from '@/context/LanguageContext';
import { Leaf, Store, Truck, ShieldCheck, Star, Users, ArrowRight, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { HeroSection } from './HeroSection';
import { FadeInView, StaggerContainer, StaggerItem } from './Animated3DCards';
import { ParallaxImageSection, VideoScrollSection, ScrollReveal3D } from './ParallaxImageSection';
import farmVideo from '@/assets/farm-hero.mp4';
import freshVegetablesImg from '@/assets/fresh-vegetables.jpg';
import farmJourneyImg from '@/assets/farm-journey.jpg';
import farmerFamilyImg from '@/assets/farmer-family.jpg';
import localShopImg from '@/assets/local-shop.jpg';

interface HomeTabProps {
  onExplore: () => void;
}

const StatPill = ({ value, label, delay }: { value: string; label: string; delay: number }) => (
  <motion.div
    className="flex flex-col items-center py-3"
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.4, ease: "easeOut" }}
  >
    <span className="text-xl font-bold text-primary">{value}</span>
    <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">{label}</span>
  </motion.div>
);

const FeatureRow = ({ icon: Icon, title, description, delay }: { icon: any; title: string; description: string; delay: number }) => (
  <FadeInView delay={delay}>
    <div className="flex items-start gap-3.5 py-3">
      <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="text-[13px] text-muted-foreground leading-relaxed mt-0.5">{description}</p>
      </div>
    </div>
  </FadeInView>
);

export const HomeTab = ({ onExplore }: HomeTabProps) => {
  const { t } = useLanguage();

  return (
    <section className="space-y-6 pb-8">
      {/* Hero */}
      <HeroSection onExplore={onExplore} />

      {/* Stats Bar */}
      <FadeInView>
        <div className="grid grid-cols-3 rounded-2xl bg-card border border-border/60 divide-x divide-border/60">
          <StatPill value="500+" label="Products" delay={0.1} />
          <StatPill value="100+" label="Shops" delay={0.2} />
          <StatPill value="50+" label="Farmers" delay={0.3} />
        </div>
      </FadeInView>

      {/* Fresh Produce Image */}
      <ScrollReveal3D direction="up">
        <ParallaxImageSection
          imageSrc={freshVegetablesImg}
          alt="Fresh vegetables"
          title="Farm Fresh Produce"
          subtitle="Handpicked daily from local farms"
          direction="left"
        />
      </ScrollReveal3D>

      {/* Why Choose Us */}
      <div className="space-y-1">
        <FadeInView>
          <h2 className="text-base font-bold text-foreground tracking-tight">Why Choose Mandi Fresh</h2>
        </FadeInView>
        <FeatureRow icon={Leaf} title="Farm Fresh Quality" description="Direct from verified farmers. No middlemen, just pure freshness." delay={0.05} />
        <FeatureRow icon={Store} title="Local Shops Network" description="Connect with trusted vegetable shops in your neighborhood." delay={0.1} />
        <FeatureRow icon={Truck} title="Quick Pickup" description="Order online, pick up at your convenience. No queues." delay={0.15} />
        <FeatureRow icon={ShieldCheck} title="Quality Assured" description="Every product verified for freshness and quality." delay={0.2} />
      </div>

      {/* Farm Journey Image */}
      <ScrollReveal3D direction="left">
        <ParallaxImageSection
          imageSrc={farmJourneyImg}
          alt="Fresh produce crate in farm field"
          title="From Farm to You"
          subtitle="The journey of freshness, from field to kitchen"
          direction="right"
        />
      </ScrollReveal3D>

      {/* Video Section */}
      <ScrollReveal3D direction="up">
        <VideoScrollSection
          videoSrc={farmVideo}
          title="Experience the Harvest"
          subtitle="See how our farmers grow the freshest produce"
        />
      </ScrollReveal3D>

      {/* Supporting Farmers */}
      <ScrollReveal3D direction="right">
        <ParallaxImageSection
          imageSrc={farmerFamilyImg}
          alt="Indian farmers with fresh produce"
          title="Supporting Local Farmers"
          subtitle="Every purchase empowers farmers and families"
          direction="left"
        />
      </ScrollReveal3D>

      {/* Testimonial */}
      <FadeInView>
        <div className="rounded-2xl bg-card border border-border/60 p-5">
          <div className="flex gap-0.5 mb-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.3, ease: "easeOut" }}
              >
                <Star className="w-4 h-4 fill-accent text-accent" />
              </motion.div>
            ))}
          </div>
          <p className="text-[13px] text-muted-foreground italic leading-relaxed mb-3">
            "The freshest vegetables I've ever ordered. It's like having a farm next door! The quality is consistently amazing."
          </p>
          <p className="text-xs font-medium text-foreground">— Priya S., Mumbai</p>
        </div>
      </FadeInView>

      {/* Local Shop Image */}
      <ScrollReveal3D direction="left">
        <ParallaxImageSection
          imageSrc={localShopImg}
          alt="Local vegetable shop"
          title="Discover Nearby Shops"
          subtitle="Find the best vendors just around the corner"
          direction="left"
        />
      </ScrollReveal3D>

      {/* How It Works */}
      <FadeInView>
        <div className="rounded-2xl bg-muted/40 border border-border/40 p-5">
          <h3 className="text-sm font-bold text-foreground mb-4">How It Works</h3>
          <StaggerContainer className="space-y-3.5">
            {[
              { step: '1', icon: MapPin, text: 'Set your location to find nearby shops' },
              { step: '2', icon: Store, text: 'Browse fresh vegetables and fruits' },
              { step: '3', icon: Leaf, text: 'Add items to your cart' },
              { step: '4', icon: Truck, text: 'Pick up your order at the shop' },
            ].map((item) => (
              <StaggerItem key={item.step} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-primary">{item.step}</span>
                </div>
                <p className="text-[13px] text-muted-foreground">{item.text}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </FadeInView>

      {/* CTA */}
      <FadeInView>
        <motion.button
          onClick={onExplore}
          className="w-full rounded-2xl gradient-hero px-6 py-4 flex items-center justify-between group"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-left">
            <p className="text-sm font-bold text-primary-foreground">Ready to go fresh?</p>
            <p className="text-xs text-primary-foreground/75 mt-0.5">Explore local shops and farms near you</p>
          </div>
          <motion.div
            className="w-9 h-9 rounded-xl bg-background/20 flex items-center justify-center"
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight className="w-4.5 h-4.5 text-primary-foreground" />
          </motion.div>
        </motion.button>
      </FadeInView>
    </section>
  );
};
