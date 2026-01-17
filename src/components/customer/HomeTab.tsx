import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, MapPin, ShoppingBasket, Receipt } from 'lucide-react';

interface HomeTabProps {
  onExplore: () => void;
}

export const HomeTab = ({ onExplore }: HomeTabProps) => {
  const { t } = useLanguage();

  return (
    <section className="space-y-6 animate-fade-in">
      <header className="gradient-hero rounded-2xl p-6 text-primary-foreground overflow-hidden relative">
        <div className="relative z-10">
          <h1 className="text-2xl font-bold">{t.freshFromFarm}</h1>
          <p className="text-sm opacity-90 mt-2 max-w-[32ch]">
            {t.buyFreshVegetables}
          </p>

          <div className="mt-5">
            <Button variant="secondary" size="sm" className="gap-2 hover-scale" onClick={onExplore}>
              {t.explore}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Decorative animated blob */}
        <div className="absolute -right-12 -bottom-16 w-56 h-56 bg-primary-foreground/15 rounded-full blur-2xl animate-slide-in-right" />
      </header>

      <div className="grid gap-3">
        <div className="bg-card border rounded-xl p-4 hover-scale">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <ShoppingBasket className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{t.explore}</p>
              <p className="text-sm text-muted-foreground">Browse verified shops and fresh categories near you.</p>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-xl p-4 hover-scale">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{t.setYourLocation}</p>
              <p className="text-sm text-muted-foreground">Set your city/pincode to see the closest shops first.</p>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-xl p-4 hover-scale">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Receipt className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{t.orders}</p>
              <p className="text-sm text-muted-foreground">Track your orders and pickup status in one place.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">
        <p>
          <span className="font-medium text-foreground">How it works:</span> Explore shops → add to cart → checkout → pickup.
        </p>
      </div>
    </section>
  );
};
