import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RoleSelector } from '@/components/RoleSelector';
import { OTPVerification } from '@/components/auth/OTPVerification';
import { UserRole } from '@/types';
import { Leaf, Mail, Lock, User, Sparkles, Phone, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

const emailSchema = z.string().email('Please enter a valid email address');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');
const nameSchema = z.string().min(2, 'Name must be at least 2 characters');
const phoneSchema = z.string().regex(/^\+?[1-9]\d{9,14}$/, 'Please enter a valid phone number (e.g., +91XXXXXXXXXX)');

const isPublicRole = (value: string | null): value is Exclude<UserRole, 'admin'> =>
  value === 'customer' || value === 'shopkeeper' || value === 'farmer';

const isValidRole = (value: string | null): value is UserRole =>
  value === 'customer' || value === 'shopkeeper' || value === 'farmer' || value === 'admin';

type AuthStep = 'credentials' | 'otp' | 'role';
type AuthMethod = 'password' | 'email-otp' | 'phone-otp';

const FloatingOrb = ({ delay, size, position }: { delay: number; size: string; position: string }) => (
  <motion.div
    className={`absolute ${position} ${size} rounded-full bg-primary-foreground/10 blur-2xl`}
    animate={{
      scale: [1, 1.3, 1],
      opacity: [0.2, 0.4, 0.2],
    }}
    transition={{
      duration: 5,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [step, setStep] = useState<AuthStep>('credentials');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string; phone?: string }>({});
  const [isDashboardAccess, setIsDashboardAccess] = useState(false);
  const [targetDashboard, setTargetDashboard] = useState<UserRole | null>(null);
  const [authMethod, setAuthMethod] = useState<AuthMethod>('password');

  const { signIn, signUp, user, userRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleFromQuery = params.get('role');
    const dashboardAccess = params.get('dashboard') === 'true';

    if (dashboardAccess && isValidRole(roleFromQuery)) {
      setIsDashboardAccess(true);
      setTargetDashboard(roleFromQuery);
      setSelectedRole(roleFromQuery);
      setStep('credentials');
      setErrors({});

      if (user) {
        if (!userRole) return;

        if (userRole === roleFromQuery) {
          navigate(`/dashboard/${roleFromQuery}`);
        } else {
          toast({
            variant: 'destructive',
            title: 'Access Denied',
            description: `You need ${roleFromQuery} role to access this dashboard.`,
          });
          navigate('/');
        }
      }

      setIsSignUp(false);
      return;
    }

    setIsDashboardAccess(false);
    setTargetDashboard(null);

    if (user) {
      navigate('/');
      return;
    }

    if (isPublicRole(roleFromQuery)) {
      setSelectedRole(roleFromQuery);
      setIsSignUp(true);
      setStep('credentials');
      setErrors({});
    }
  }, [user, userRole, navigate, location.search, toast]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; name?: string; phone?: string } = {};
    
    if (authMethod === 'phone-otp') {
      const phoneResult = phoneSchema.safeParse(phone);
      if (!phoneResult.success) {
        newErrors.phone = phoneResult.error.errors[0].message;
      }
    } else {
      const emailResult = emailSchema.safeParse(email);
      if (!emailResult.success) {
        newErrors.email = emailResult.error.errors[0].message;
      }
    }
    
    if (authMethod === 'password') {
      const passwordResult = passwordSchema.safeParse(password);
      if (!passwordResult.success) {
        newErrors.password = passwordResult.error.errors[0].message;
      }
      
      if (isSignUp) {
        const nameResult = nameSchema.safeParse(name);
        if (!nameResult.success) {
          newErrors.name = nameResult.error.errors[0].message;
        }
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (authMethod === 'email-otp') {
      await handleEmailOTP();
      return;
    }

    if (authMethod === 'phone-otp') {
      await handlePhoneOTP();
      return;
    }

    if (isSignUp) {
      if (selectedRole) {
        await handleRoleSelect(selectedRole);
      } else {
        setStep('role');
      }
    } else {
      await handleSignIn();
    }
  };

  const handleEmailOTP = async () => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        },
      });

      if (error) {
        if (error.message.includes('user not found') || error.message.includes('not found')) {
          toast({
            variant: 'destructive',
            title: 'Account not found',
            description: 'No account exists with this email. Please sign up first.',
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: error.message,
          });
        }
        setIsLoading(false);
        return;
      }

      toast({
        title: 'Code sent! 📧',
        description: 'Check your email for the verification code.',
      });
      setStep('otp');
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to send verification code.',
      });
    }
    
    setIsLoading(false);
  };

  const handlePhoneOTP = async () => {
    setIsLoading(true);
    
    try {
      const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
      
      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
        options: {
          shouldCreateUser: false,
        },
      });

      if (error) {
        if (error.message.includes('user not found') || error.message.includes('not found')) {
          toast({
            variant: 'destructive',
            title: 'Account not found',
            description: 'No account exists with this phone. Please sign up first.',
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: error.message,
          });
        }
        setIsLoading(false);
        return;
      }

      toast({
        title: 'Code sent! 📱',
        description: 'Check your phone for the verification code.',
      });
      setStep('otp');
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to send verification code.',
      });
    }
    
    setIsLoading(false);
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    const { error } = await signIn(email, password);
    setIsLoading(false);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Sign in failed',
        description: error.message === 'Invalid login credentials' 
          ? 'Invalid email or password. Please try again.'
          : error.message,
      });
    }
  };

  const handleRoleSelect = async (role: UserRole) => {
    if (role === 'admin') {
      toast({
        variant: 'destructive',
        title: 'Admin signup disabled',
        description: 'Admin accounts are created by invitation only.',
      });
      return;
    }

    setSelectedRole(role);
    setIsLoading(true);

    const { error } = await signUp(email, password, name, role);
    setIsLoading(false);

    if (error) {
      let message = error.message;
      if (error.message.includes('already registered')) {
        message = 'This email is already registered. Please sign in instead.';
      }
      toast({
        variant: 'destructive',
        title: 'Sign up failed',
        description: message,
      });
      setStep('credentials');
    } else {
      toast({
        title: 'Welcome to Mandi Fresh! 🌱',
        description: 'Your account has been created successfully.',
      });
    }
  };

  const handleOTPVerified = () => {
    // Session will be set automatically by Supabase
  };

  const getAuthMethodLabel = () => {
    switch (authMethod) {
      case 'email-otp': return 'Email OTP';
      case 'phone-otp': return 'Phone OTP';
      default: return 'Password';
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden">
      {/* Animated Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="gradient-hero text-primary-foreground p-6 pb-16 relative overflow-hidden"
      >
        {/* Animated Background Elements */}
        <FloatingOrb delay={0} size="w-48 h-48" position="-right-16 -top-16" />
        <FloatingOrb delay={1} size="w-32 h-32" position="-left-12 bottom-0" />
        <FloatingOrb delay={2} size="w-24 h-24" position="right-1/4 top-1/2" />
        
        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary-foreground/30"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              delay: i * 0.2,
              repeat: Infinity,
            }}
          />
        ))}

        <div className="relative z-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3 mb-4"
          >
            <motion.div 
              className="w-14 h-14 bg-primary-foreground/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Leaf className="w-8 h-8" />
              </motion.div>
            </motion.div>
            <div>
              <motion.h1 
                className="text-2xl font-bold"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Mandi Fresh
              </motion.h1>
              <motion.p 
                className="text-sm opacity-90"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                मंडी फ्रेश
              </motion.p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 opacity-80" />
            </motion.div>
            <p className="text-sm opacity-80">
              {isDashboardAccess 
                ? `Sign in to access ${targetDashboard} dashboard` 
                : isSignUp ? 'Create your account' : 'Welcome back!'}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 -mt-8 bg-background rounded-t-[2rem] p-6 shadow-elevated relative"
      >
        <AnimatePresence mode="wait">
          {step === 'otp' ? (
            <OTPVerification
              key="otp"
              identifier={authMethod === 'phone-otp' ? (phone.startsWith('+') ? phone : `+${phone}`) : email}
              type={authMethod === 'phone-otp' ? 'phone' : 'email'}
              onVerified={handleOTPVerified}
              onBack={() => setStep('credentials')}
            />
          ) : step === 'credentials' ? (
            <motion.form 
              key="credentials"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleCredentialsSubmit} 
              className="space-y-5"
            >
              <motion.h2 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl font-semibold text-foreground"
              >
                {isDashboardAccess 
                  ? `${targetDashboard?.charAt(0).toUpperCase()}${targetDashboard?.slice(1)} Sign In`
                  : isSignUp ? 'Create Account' : 'Sign In'}
              </motion.h2>

              {/* Auth Method Selector */}
              {!isSignUp && targetDashboard !== 'admin' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex gap-2 p-1 bg-muted rounded-xl"
                >
                  {(['password', 'email-otp', 'phone-otp'] as AuthMethod[]).map((method) => (
                    <motion.button
                      key={method}
                      type="button"
                      onClick={() => setAuthMethod(method)}
                      whileTap={{ scale: 0.95 }}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-300 ${
                        authMethod === method 
                          ? 'bg-background text-foreground shadow-sm' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {method === 'password' && 'Password'}
                      {method === 'email-otp' && 'Email OTP'}
                      {method === 'phone-otp' && 'Phone OTP'}
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {isSignUp && targetDashboard !== 'admin' && authMethod === 'password' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <Label htmlFor="name">Full Name</Label>
                  <motion.div 
                    className="relative"
                    whileFocus={{ scale: 1.01 }}
                  >
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </motion.div>
                  {errors.name && (
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm text-destructive"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </motion.div>
              )}

              {isDashboardAccess && targetDashboard === 'admin' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl border bg-muted/50 p-4 text-sm text-muted-foreground"
                >
                  <p>Admin accounts can't be created here. Please sign in with an existing admin account.</p>
                </motion.div>
              )}

              {/* Email/Phone Input based on auth method */}
              {authMethod === 'phone-otp' ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91XXXXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                  {errors.phone && (
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm text-destructive"
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-2"
                >
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm text-destructive"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </motion.div>
              )}

              {authMethod === 'password' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                  {errors.password && (
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm text-destructive"
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  type="submit"
                  variant="hero"
                  size="xl"
                  className="w-full relative overflow-hidden group"
                  disabled={isLoading}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="relative">
                    {isLoading ? (
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Please wait...
                      </motion.span>
                    ) : authMethod !== 'password' ? (
                      `Send ${authMethod === 'phone-otp' ? 'SMS' : 'Email'} Code`
                    ) : isDashboardAccess ? (
                      'Sign In to Dashboard'
                    ) : isSignUp ? (
                      'Continue'
                    ) : (
                      'Sign In'
                    )}
                  </span>
                </Button>
              </motion.div>

              {targetDashboard !== 'admin' && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center text-sm text-muted-foreground"
                >
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      setAuthMethod('password');
                      setErrors({});
                      setStep('credentials');
                    }}
                    className="text-primary font-medium hover:underline"
                  >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </button>
                </motion.p>
              )}

              {isDashboardAccess && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center text-sm text-muted-foreground"
                >
                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="text-primary font-medium hover:underline inline-flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    Back to Home
                  </button>
                </motion.p>
              )}
            </motion.form>
          ) : (
            <motion.div 
              key="role"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <motion.button
                onClick={() => setStep('credentials')}
                whileHover={{ x: -3 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </motion.button>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Choose Your Role
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  How will you use Mandi Fresh?
                </p>
              </motion.div>

              <RoleSelector onRoleSelect={handleRoleSelect} />

              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-sm text-muted-foreground mt-4"
                >
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Creating your account...
                  </motion.span>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
