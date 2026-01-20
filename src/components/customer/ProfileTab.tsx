import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from '@/context/LocationContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/ThemeToggle';
import { 
  User, 
  MapPin, 
  Globe, 
  Bell, 
  LogOut, 
  LogIn,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { languages } from '@/i18n/translations';

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

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
    <motion.div 
      className="space-y-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1 }
        }
      }}
    >
      {/* User Info */}
      {user ? (
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <motion.div 
                className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center relative"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring" as const }}
                  >
                    <User className="w-8 h-8 text-primary" />
                    <motion.div
                      className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="w-3 h-3 text-primary-foreground" />
                    </motion.div>
                  </motion.div>
                  <div className="flex-1">
                    <motion.h2 
                      className="font-semibold text-foreground text-lg"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {user.email?.split('@')[0]}
                    </motion.h2>
                    <motion.p 
                      className="text-sm text-muted-foreground"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {user.email}
                    </motion.p>
                    {userRole && (
                      <motion.span 
                        className="inline-block mt-1 px-3 py-0.5 bg-primary/20 text-primary text-xs rounded-full capitalize font-medium"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {userRole}
                      </motion.span>
                    )}
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" as const, delay: 0.2 }}
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-muted flex items-center justify-center mb-4">
                  <User className="w-8 h-8 text-muted-foreground" />
                </div>
              </motion.div>
              <motion.p 
                className="text-muted-foreground mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {t.signIn} to access your profile
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button onClick={() => navigate('/auth')} className="gap-2">
                  <LogIn className="w-4 h-4" />
                  {t.signIn}
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Settings */}
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {/* Dark Mode Toggle */}
            <motion.div
              whileHover={{ backgroundColor: 'hsl(var(--muted) / 0.5)' }}
              className="transition-colors"
            >
              <ThemeToggle showLabel className="w-full hover:bg-transparent p-1" />
            </motion.div>

            <Separator />

            {/* Location */}
            <motion.button 
              onClick={() => setShowLocationSelector(true)}
              className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.99 }}
            >
              <motion.div 
                className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"
                whileHover={{ rotate: 10 }}
              >
                <MapPin className="w-5 h-5 text-primary" />
              </motion.div>
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">{t.setLocation}</p>
                <p className="text-sm text-muted-foreground">
                  {userLocation ? `${userLocation.city}, ${userLocation.state}` : t.findShopsNearYou}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </motion.button>

            <Separator />

            {/* Language */}
            <motion.button 
              onClick={() => setShowLanguageSelector(true)}
              className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.99 }}
            >
              <motion.div 
                className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center"
                whileHover={{ rotate: 10 }}
              >
                <Globe className="w-5 h-5 text-secondary" />
              </motion.div>
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">{t.language}</p>
                <p className="text-sm text-muted-foreground">
                  {currentLanguage?.nativeName} ({currentLanguage?.name})
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </motion.button>

            <Separator />

            {/* Notifications */}
            <motion.button 
              className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.99 }}
            >
              <motion.div 
                className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center"
                whileHover={{ rotate: 10 }}
              >
                <Bell className="w-5 h-5 text-warning" />
              </motion.div>
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">{t.notifications}</p>
                <p className="text-sm text-muted-foreground">Manage notification preferences</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </motion.button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Sign Out */}
      {user && (
        <motion.div variants={itemVariants}>
          <Button 
            variant="outline" 
            className="w-full gap-2 text-destructive hover:text-destructive h-12 rounded-xl"
            onClick={handleSignOut}
          >
            <motion.div
              whileHover={{ x: -3 }}
              transition={{ type: "spring" as const }}
            >
              <LogOut className="w-4 h-4" />
            </motion.div>
            {t.signOut}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};
