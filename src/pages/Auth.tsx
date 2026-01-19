import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RoleSelector } from '@/components/RoleSelector';
import { OTPVerification } from '@/components/auth/OTPVerification';
import { UserRole } from '@/types';
import { Leaf, Mail, Lock, User, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

const emailSchema = z.string().email('Please enter a valid email address');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');
const nameSchema = z.string().min(2, 'Name must be at least 2 characters');

const isPublicRole = (value: string | null): value is Exclude<UserRole, 'admin'> =>
  value === 'customer' || value === 'shopkeeper' || value === 'farmer';

const isValidRole = (value: string | null): value is UserRole =>
  value === 'customer' || value === 'shopkeeper' || value === 'farmer' || value === 'admin';

type AuthStep = 'credentials' | 'otp' | 'role';

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [step, setStep] = useState<AuthStep>('credentials');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string }>({});
  const [isDashboardAccess, setIsDashboardAccess] = useState(false);
  const [targetDashboard, setTargetDashboard] = useState<UserRole | null>(null);
  const [useOTP, setUseOTP] = useState(false);

  const { signIn, signUp, user, userRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleFromQuery = params.get('role');
    const dashboardAccess = params.get('dashboard') === 'true';

    // Dashboard flow (role fixed)
    if (dashboardAccess && isValidRole(roleFromQuery)) {
      setIsDashboardAccess(true);
      setTargetDashboard(roleFromQuery);
      setSelectedRole(roleFromQuery);
      setStep('credentials');
      setErrors({});

      // If already logged in, wait for role to load then route accordingly
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

      // Start in sign-in mode (signup toggle allowed for non-admin dashboards)
      setIsSignUp(false);
      return;
    }

    // Not a dashboard flow
    setIsDashboardAccess(false);
    setTargetDashboard(null);

    if (user) {
      navigate('/');
      return;
    }

    // Regular signup with role preselection (public roles only)
    if (isPublicRole(roleFromQuery)) {
      setSelectedRole(roleFromQuery);
      setIsSignUp(true);
      setStep('credentials');
      setErrors({});
    }
  }, [user, userRole, navigate, location.search, toast]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; name?: string } = {};
    
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }
    
    if (!useOTP) {
      const passwordResult = passwordSchema.safeParse(password);
      if (!passwordResult.success) {
        newErrors.password = passwordResult.error.errors[0].message;
      }
    }
    
    if (isSignUp && !useOTP) {
      const nameResult = nameSchema.safeParse(name);
      if (!nameResult.success) {
        newErrors.name = nameResult.error.errors[0].message;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (useOTP) {
      await handleOTPSignIn();
      return;
    }

    if (isSignUp) {
      // If the user preselected a role (e.g. from landing page), skip the role step
      if (selectedRole) {
        await handleRoleSelect(selectedRole);
      } else {
        setStep('role');
      }
    } else {
      await handleSignIn();
    }
  };

  const handleOTPSignIn = async () => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        },
      });

      if (error) {
        // If user doesn't exist, show message
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
    // Note: Redirect is handled by the useEffect when user state changes
  };

  const handleRoleSelect = async (role: UserRole) => {
    // Security: admin accounts should not be self-created from the UI
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
    // The useEffect will handle navigation
  };

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden">
      {/* Animated Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="gradient-hero text-primary-foreground p-6 pb-14 relative overflow-hidden"
      >
        {/* Animated Background Elements */}
        <motion.div
          className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-primary-foreground/10 blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -left-12 bottom-0 w-32 h-32 rounded-full bg-accent/20 blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative z-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-12 h-12 bg-primary-foreground/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Leaf className="w-7 h-7" />
              </motion.div>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Mandi Fresh</h1>
              <p className="text-sm opacity-90">मंडी फ्रेश</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 opacity-80" />
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
        className="flex-1 -mt-6 bg-background rounded-t-3xl p-6 shadow-elevated"
      >
        <AnimatePresence mode="wait">
          {step === 'otp' ? (
            <OTPVerification
              key="otp"
              email={email}
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
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold text-foreground mb-6">
                {isDashboardAccess 
                  ? `${targetDashboard?.charAt(0).toUpperCase()}${targetDashboard?.slice(1)} Sign In`
                  : isSignUp ? 'Create Account' : 'Sign In'}
              </h2>

              {isSignUp && targetDashboard !== 'admin' && !useOTP && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2"
                >
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </motion.div>
              )}

              {isDashboardAccess && targetDashboard === 'admin' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl border bg-muted p-3 text-sm text-muted-foreground"
                >
                  Admin accounts can't be created here. Please sign in with an existing admin account.
                </motion.div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              {!useOTP && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
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
                      className="pl-10"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </motion.div>
              )}

              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full mt-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Please wait...
                  </motion.span>
                ) : useOTP ? (
                  'Send Verification Code'
                ) : isDashboardAccess ? (
                  'Sign In to Dashboard'
                ) : isSignUp ? (
                  'Continue'
                ) : (
                  'Sign In'
                )}
              </Button>

              {/* OTP Toggle - Only for sign in, not for dashboard admin */}
              {!isSignUp && targetDashboard !== 'admin' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <button
                    type="button"
                    onClick={() => setUseOTP(!useOTP)}
                    className="text-sm text-primary hover:underline"
                  >
                    {useOTP ? 'Use password instead' : 'Sign in with OTP code'}
                  </button>
                </motion.div>
              )}

              {targetDashboard !== 'admin' && (
                <p className="text-center text-sm text-muted-foreground mt-6">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      setUseOTP(false);
                      setErrors({});
                      setStep('credentials');
                    }}
                    className="text-primary font-medium hover:underline"
                  >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </button>
                </p>
              )}

              {isDashboardAccess && (
                <p className="text-center text-sm text-muted-foreground mt-6">
                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="text-primary font-medium hover:underline"
                  >
                    ← Back to Home
                  </button>
                </p>
              )}
            </motion.form>
          ) : (
            <motion.div 
              key="role"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <button
                onClick={() => setStep('credentials')}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <motion.span
                  animate={{ x: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ←
                </motion.span>
                Back
              </button>
              
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Choose Your Role
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                How will you use Mandi Fresh?
              </p>

              <RoleSelector 
                onRoleSelect={handleRoleSelect}
              />

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
