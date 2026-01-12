import { useNavigate } from 'react-router-dom';
import { RoleSelector } from '@/components/RoleSelector';
import { CustomerHome } from '@/pages/CustomerHome';
import { ShopkeeperDashboard } from '@/pages/ShopkeeperDashboard';
import FarmerDashboard from '@/pages/FarmerDashboard';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Sprout, Users, LogIn, LogOut } from 'lucide-react';

const Index = () => {
  const { user, userRole, signOut, loading } = useAuth();
  const navigate = useNavigate();

  // If user is logged in and has a role, render the appropriate dashboard directly
  if (user && userRole) {
    switch (userRole) {
      case 'customer':
        return <CustomerHome />;
      case 'shopkeeper':
        return <ShopkeeperDashboard />;
      case 'farmer':
        return <FarmerDashboard />;
      case 'admin':
        return (
          <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
              <Users className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Admin Panel</h1>
            <p className="text-muted-foreground text-center mb-6">Manage users, verify accounts, and view analytics</p>
            <p className="text-sm text-muted-foreground mb-8 text-center">
              This feature is coming soon! We're building it step by step.
            </p>
            <Button variant="ghost" onClick={() => signOut()}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        );
      default:
        break;
    }
  }

  // Landing page with role selection
  return (
    <div className="min-h-screen gradient-fresh">
      {/* Hero Section */}
      <div className="container max-w-lg mx-auto px-4 pt-12 pb-8">
        {/* Header with Auth */}
        <div className="flex justify-end mb-4">
          {loading ? null : user ? (
            <Button variant="ghost" size="sm" onClick={() => signOut()}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => navigate('/auth')}>
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          )}
        </div>

        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-14 h-14 gradient-hero rounded-2xl flex items-center justify-center shadow-elevated">
            <Sprout className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mandi Fresh</h1>
            <p className="text-sm text-muted-foreground">Farm to Table, Direct</p>
          </div>
        </div>

        {/* Tagline */}
        <div className="text-center mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Fresh Produce at Fair Prices
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Connecting local farmers, shopkeepers, and customers. 
            No middlemen, no delivery hassles - just fresh produce.
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-6 mb-10">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">500+</p>
            <p className="text-xs text-muted-foreground">Farmers</p>
          </div>
          <div className="w-px bg-border" />
          <div className="text-center">
            <p className="text-3xl font-bold text-secondary">1200+</p>
            <p className="text-xs text-muted-foreground">Shops</p>
          </div>
          <div className="w-px bg-border" />
          <div className="text-center">
            <p className="text-3xl font-bold text-accent">50K+</p>
            <p className="text-xs text-muted-foreground">Customers</p>
          </div>
        </div>

        {/* Role Selection */}
        <div className="mb-8">
          <h3 className="text-center font-semibold text-foreground mb-4">
            I am a...
          </h3>
          <RoleSelector onRoleSelect={(role) => {
            // Preselect role on the auth page (used for sign up)
            navigate(`/auth?role=${role}`);
          }} />
        </div>

        {/* Features */}
        <div className="space-y-3 mt-8">
          <div className="flex items-center gap-4 bg-card rounded-xl p-4 shadow-card">
            <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center shrink-0">
              <span className="text-lg">🌿</span>
            </div>
            <div>
              <h4 className="font-medium text-foreground text-sm">Fresh & Local</h4>
              <p className="text-xs text-muted-foreground">Direct from nearby farms, always fresh</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-card rounded-xl p-4 shadow-card">
            <div className="w-10 h-10 bg-warning/10 rounded-xl flex items-center justify-center shrink-0">
              <span className="text-lg">💰</span>
            </div>
            <div>
              <h4 className="font-medium text-foreground text-sm">Fair Prices</h4>
              <p className="text-xs text-muted-foreground">No middlemen means better prices for all</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-card rounded-xl p-4 shadow-card">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <span className="text-lg">📍</span>
            </div>
            <div>
              <h4 className="font-medium text-foreground text-sm">Pickup Only</h4>
              <p className="text-xs text-muted-foreground">Support local, reduce carbon footprint</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container max-w-lg mx-auto px-4 py-6 text-center">
        <p className="text-xs text-muted-foreground">
          Made with ❤️ for Indian farmers and communities
        </p>
      </footer>
    </div>
  );
};

export default Index;
