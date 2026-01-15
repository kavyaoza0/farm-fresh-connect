import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from '@/context/LocationContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  MapPin, 
  Globe, 
  Bell, 
  Moon, 
  LogOut, 
  LogIn,
  ChevronRight,
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { languages } from '@/i18n/translations';

export const ProfileTab = () => {
  const { t, language, setShowLanguageSelector } = useLanguage();
  const { user, userRole, signOut } = useAuth();
  const { userLocation, setShowLocationSelector } = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const currentLanguage = languages.find(l => l.code === language);

  return (
    <div className="space-y-4">
      {/* User Info */}
      {user ? (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-foreground">{user.email?.split('@')[0]}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                {userRole && (
                  <span className="inline-block mt-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full capitalize">
                    {userRole}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-4 text-center">
            <User className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground mb-4">{t.signIn} to access your profile</p>
            <Button onClick={() => navigate('/auth')} className="gap-2">
              <LogIn className="w-4 h-4" />
              {t.signIn}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Settings */}
      <Card>
        <CardContent className="p-0">
          {/* Location */}
          <button 
            onClick={() => setShowLocationSelector(true)}
            className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-foreground">{t.setLocation}</p>
              <p className="text-sm text-muted-foreground">
                {userLocation ? `${userLocation.city}, ${userLocation.state}` : t.findShopsNearYou}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <Separator />

          {/* Language */}
          <button 
            onClick={() => setShowLanguageSelector(true)}
            className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-foreground">{t.language}</p>
              <p className="text-sm text-muted-foreground">
                {currentLanguage?.nativeName} ({currentLanguage?.name})
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <Separator />

          {/* Notifications */}
          <button 
            className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-warning" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-foreground">{t.notifications}</p>
              <p className="text-sm text-muted-foreground">Manage notification preferences</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <Separator />

          {/* Dark Mode - placeholder */}
          <button 
            className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <Moon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-foreground">{t.darkMode}</p>
              <p className="text-sm text-muted-foreground">Coming soon</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </CardContent>
      </Card>

      {/* Sign Out */}
      {user && (
        <Button 
          variant="outline" 
          className="w-full gap-2 text-destructive hover:text-destructive"
          onClick={handleSignOut}
        >
          <LogOut className="w-4 h-4" />
          {t.signOut}
        </Button>
      )}
    </div>
  );
};
