import { Header } from '@/components/Header';
import { Sprout, Users, Shield, TrendingUp } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header title="About" showLocation={false} showCart={false} />
      
      <main className="container max-w-lg mx-auto px-4 py-6">
        {/* Hero */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-elevated">
            <Sprout className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Mandi Fresh</h1>
          <p className="text-muted-foreground">Farm to Table, Direct</p>
        </div>

        {/* Mission */}
        <section className="bg-card rounded-xl p-6 shadow-card mb-6">
          <h2 className="font-semibold text-foreground mb-3">Our Mission</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            We're building a safe, localized, admin-controlled agricultural marketplace that 
            benefits farmers with fair pricing, helps shopkeepers increase margins, and gives 
            customers affordable, local produce.
          </p>
        </section>

        {/* How It Works */}
        <section className="mb-6">
          <h2 className="font-semibold text-foreground mb-4">How It Works</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-4 bg-card rounded-xl p-4 shadow-card">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground text-sm">Fair Pricing</h3>
                <p className="text-xs text-muted-foreground">
                  Farmers set base prices, shopkeepers add retail margins, admin monitors to prevent exploitation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-card rounded-xl p-4 shadow-card">
              <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground text-sm">Admin Mediated</h3>
                <p className="text-xs text-muted-foreground">
                  All communication goes through admin for safety and transparency. No direct messaging.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-card rounded-xl p-4 shadow-card">
              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground text-sm">Pickup Only</h3>
                <p className="text-xs text-muted-foreground">
                  Support local businesses, reduce carbon footprint. All orders are pickup-based.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6 mb-6">
          <h2 className="font-semibold text-foreground mb-4 text-center">Platform Stats</h2>
          <div className="flex justify-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">500+</p>
              <p className="text-xs text-muted-foreground">Farmers</p>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">1200+</p>
              <p className="text-xs text-muted-foreground">Shops</p>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-accent-foreground">50K+</p>
              <p className="text-xs text-muted-foreground">Customers</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-4">
          <p className="text-xs text-muted-foreground">
            Made with ❤️ for Indian farmers and communities
          </p>
        </footer>
      </main>
    </div>
  );
}
