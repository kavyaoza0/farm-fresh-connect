import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Shield, Store, Tractor, Info, HelpCircle, LogOut, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useAuth } from '@/hooks/useAuth';
import { Separator } from '@/components/ui/separator';

interface HamburgerMenuProps {
  className?: string;
}

export const HamburgerMenu = ({ className }: HamburgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, userRole, signOut } = useAuth();

  const handleDashboardAccess = (role: 'admin' | 'shopkeeper' | 'farmer') => {
    setIsOpen(false);
    
    // If user is logged in and has the matching role, go to dashboard
    if (user && userRole === role) {
      navigate(`/dashboard/${role}`);
      return;
    }
    
    // Otherwise, redirect to auth with the role
    navigate(`/auth?role=${role}&dashboard=true`);
  };

  const handleSignOut = async () => {
    setIsOpen(false);
    await signOut();
    navigate('/');
  };

  const menuItems = [
    {
      label: 'Admin Dashboard',
      icon: Shield,
      onClick: () => handleDashboardAccess('admin'),
      description: 'Platform management & moderation',
    },
    {
      label: 'Shopkeeper Dashboard',
      icon: Store,
      onClick: () => handleDashboardAccess('shopkeeper'),
      description: 'Manage your shop & inventory',
    },
    {
      label: 'Farmer Dashboard',
      icon: Tractor,
      onClick: () => handleDashboardAccess('farmer'),
      description: 'Manage produce & pricing',
    },
  ];

  const infoItems = [
    {
      label: 'About Platform',
      icon: Info,
      onClick: () => {
        setIsOpen(false);
        navigate('/about');
      },
    },
    {
      label: 'Help / Contact Admin',
      icon: HelpCircle,
      onClick: () => {
        setIsOpen(false);
        navigate('/help');
      },
    },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className={className}>
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          {/* Dashboard Access */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Dashboards
            </p>
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = user && userRole === item.label.split(' ')[0].toLowerCase();
                
                return (
                  <button
                    key={item.label}
                    onClick={item.onClick}
                    className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Info Links */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Information
            </p>
            <div className="space-y-1">
              {infoItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={item.onClick}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                  >
                    <Icon className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium text-foreground text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Auth Actions */}
          <div>
            {user ? (
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">Signed in as</p>
                  <p className="font-medium text-sm text-foreground truncate">{user.email}</p>
                  {userRole && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full capitalize">
                      {userRole}
                    </span>
                  )}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/auth');
                }}
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

