import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoleSelector } from '@/components/RoleSelector';
import { CustomerHome } from '@/pages/CustomerHome';
import { ShopkeeperDashboard } from '@/pages/ShopkeeperDashboard';
import FarmerDashboard from '@/pages/FarmerDashboard';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { Sprout, Store, Users, Truck, LogIn, LogOut } from 'lucide-react';

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const { user, userRole, signOut, loading } = useAuth();
  const navigate = useNavigate();

  // If user is logged in and has a role, show the appropriate dashboard
  if (user && userRole && !selectedRole) {
    setSelectedRole(userRole);
  }

  // Render customer home if customer is selected
  if (selectedRole === 'customer') {
    return <CustomerHome />;
  }

  // Render shopkeeper dashboard
  if (selectedRole === 'shopkeeper') {
    return <ShopkeeperDashboard />;
  }

  // Render farmer dashboard
  if (selectedRole === 'farmer') {
    return <FarmerDashboard />;
  }

  // Render role-specific placeholders
  if (selectedRole) {
    const roleConfig = {
      shopkeeper: {
        title: 'Shopkeeper Dashboard',
        icon: Store,
        color: 'bg-shopkeeper/10 text-shopkeeper',
        description: 'Manage your shop, products, and orders',
      },
      farmer: {
        title: 'Farmer Dashboard',
        icon: Truck,
        color: 'bg-farmer/10 text-farmer',
        description: 'List your produce and connect with shopkeepers',
      },
      admin: {
        title: 'Admin Panel',
        icon: Users,
        color: 'bg-primary/10 text-primary',
        description: 'Manage users, verify accounts, and view analytics',
      },
    }[selectedRole];

    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className={`w-20 h-20 ${roleConfig?.color} rounded-2xl flex items-center justify-center mb-6`}>
          {roleConfig?.icon && <roleConfig.icon className="w-10 h-10" />}
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">{roleConfig?.title}</h1>
        <p className="text-muted-foreground text-center mb-6">{roleConfig?.description}</p>
        <p className="text-sm text-muted-foreground mb-8 text-center">
          This feature is coming soon! We're building it step by step.
        </p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setSelectedRole(null)}>
            ← Back to Home
          </Button>
          {user && (
            <Button variant="ghost" onClick={() => signOut()}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          )}
        </div>
      </div>
    );
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
            if (!user) {
              // Redirect to auth if not logged in
              navigate('/auth');
            } else {
              setSelectedRole(role);
            }
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
