import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RoleSelector } from '@/components/RoleSelector';
import { OTPVerification } from '@/components/auth/OTPVerification';
import { ThemeToggle } from '@/components/ThemeToggle';
import { UserRole } from '@/types';
import { Leaf, Mail, Lock, User, Sparkles, Phone, ArrowLeft, Zap, Shield, Star } from 'lucide-react';
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
type IdentifierType = 'email' | 'phone';

// Enhanced floating orb with more motion
const FloatingOrb = ({ delay, size, position, color = 'bg-primary-foreground/10' }: { 
  delay: number; 
  size: string; 
  position: string;
  color?: string;
}) => (
  <motion.div
    className={`absolute ${position} ${size} rounded-full ${color} blur-2xl`}
    animate={{
      scale: [1, 1.4, 1],
      opacity: [0.2, 0.5, 0.2],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 6,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Animated wave component
const WaveAnimation = () => (
  <motion.div 
    className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden pointer-events-none"
  >
    <motion.svg
      viewBox="0 0 1440 320"
      className="absolute bottom-0 w-full h-full"
      preserveAspectRatio="none"
    >
      <motion.path
        fill="hsl(var(--background))"
        fillOpacity="0.3"
        d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,176C672,181,768,139,864,128C960,117,1056,139,1152,154.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        animate={{
          d: [
            "M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,176C672,181,768,139,864,128C960,117,1056,139,1152,154.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
            "M0,192L48,176C96,160,192,128,288,133.3C384,139,480,181,576,186.7C672,192,768,160,864,144C960,128,1056,160,1152,170.7C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
    </motion.svg>
    <motion.svg
      viewBox="0 0 1440 320"
      className="absolute bottom-0 w-full h-full"
      preserveAspectRatio="none"
    >
      <motion.path
        fill="hsl(var(--background))"
        fillOpacity="0.6"
        d="M0,256L48,234.7C96,213,192,171,288,165.3C384,160,480,192,576,197.3C672,203,768,181,864,165.3C960,149,1056,139,1152,154.7C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        animate={{
          d: [
            "M0,256L48,234.7C96,213,192,171,288,165.3C384,160,480,192,576,197.3C672,203,768,181,864,165.3C960,149,1056,139,1152,154.7C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
            "M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,229.3C960,213,1056,171,1152,165.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }}
      />
    </motion.svg>
  </motion.div>
);

// Floating icons component
const FloatingIcons = () => (
  <>
    {[Leaf, Zap, Shield, Star, Sparkles].map((Icon, i) => (
      <motion.div
        key={i}
        className="absolute text-primary-foreground/20"
        style={{
          left: `${10 + i * 20}%`,
          top: `${20 + (i % 3) * 25}%`,
        }}
        animate={{
          y: [0, -15, 0],
          rotate: [0, 10, -10, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4 + i,
          delay: i * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Icon className="w-6 h-6" />
      </motion.div>
    ))}
  </>
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
  const [identifierType, setIdentifierType] = useState<IdentifierType>('email');

  const { signIn, signUp: authSignUp, user, userRole } = useAuth();
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
    
    if (identifierType === 'phone') {
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

    // Determine auth method based on identifier type for OTP
    if (authMethod === 'email-otp' || authMethod === 'phone-otp') {
      if (identifierType === 'phone') {
        await handlePhoneOTP();
      } else {
        await handleEmailOTP();
      }
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
      // Enable OTP for both signup and signin
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: isSignUp, // Allow signup with OTP
        },
      });

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message,
        });
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
      
      // Enable OTP for both signup and signin
      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
        options: {
          shouldCreateUser: isSignUp, // Allow signup with OTP
        },
      });

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message,
        });
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

    const { error } = await authSignUp(email, password, name, role);
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
    // For new signups via OTP, they might need to set up their profile
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden">
      {/* Animated Header */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="gradient-hero text-primary-foreground p-6 pb-20 relative overflow-hidden"
      >
        {/* Animated Background Elements */}
        <FloatingOrb delay={0} size="w-56 h-56" position="-right-20 -top-20" />
        <FloatingOrb delay={1} size="w-40 h-40" position="-left-16 bottom-0" color="bg-accent/20" />
        <FloatingOrb delay={2} size="w-32 h-32" position="right-1/4 top-1/2" color="bg-secondary/15" />
        <FloatingOrb delay={0.5} size="w-24 h-24" position="left-1/3 top-1/4" />
        
        {/* Floating Icons */}
        <FloatingIcons />
        
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary-foreground/30"
            style={{
              width: 4 + (i % 3) * 2,
              height: 4 + (i % 3) * 2,
              left: `${5 + i * 8}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [0, -25, 0],
              x: [0, (i % 2 === 0 ? 10 : -10), 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 3 + i * 0.3,
              delay: i * 0.15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Wave Animation */}
        <WaveAnimation />

        <div className="relative z-10">
          {/* Theme Toggle */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute right-0 top-0"
          >
            <ThemeToggle className="text-primary-foreground" />
          </motion.div>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            className="flex items-center gap-3 mb-4"
          >
            <motion.div 
              className="w-16 h-16 bg-primary-foreground/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-primary-foreground/10"
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.15, 1],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Leaf className="w-9 h-9" />
              </motion.div>
            </motion.div>
            <div>
              <motion.h1 
                className="text-2xl font-bold"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                Mandi Fresh
              </motion.h1>
              <motion.p 
                className="text-sm opacity-90"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                मंडी फ्रेश
              </motion.p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
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
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex-1 -mt-10 bg-background rounded-t-[2.5rem] p-6 shadow-elevated relative"
      >
        {/* Decorative top line */}
        <motion.div 
          className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-muted-foreground/20 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        />

        <AnimatePresence mode="wait">
          {step === 'otp' ? (
            <OTPVerification
              key="otp"
              identifier={identifierType === 'phone' ? (phone.startsWith('+') ? phone : `+${phone}`) : email}
              type={identifierType}
              onVerified={handleOTPVerified}
              onBack={() => setStep('credentials')}
              isSignUp={isSignUp}
            />
          ) : step === 'credentials' ? (
            <motion.form 
              key="credentials"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, x: -30 }}
              onSubmit={handleCredentialsSubmit} 
              className="space-y-5 mt-4"
            >
              <motion.h2 
                variants={itemVariants}
                className="text-xl font-semibold text-foreground"
              >
                {isDashboardAccess 
                  ? `${targetDashboard?.charAt(0).toUpperCase()}${targetDashboard?.slice(1)} Sign In`
                  : isSignUp ? 'Create Account' : 'Sign In'}
              </motion.h2>

              {/* Identifier Type Selector (Email/Phone) */}
              <motion.div variants={itemVariants}>
                <Label className="text-sm text-muted-foreground mb-2 block">Sign {isSignUp ? 'up' : 'in'} with</Label>
                <div className="flex gap-2 p-1 bg-muted rounded-2xl">
                  {(['email', 'phone'] as IdentifierType[]).map((type) => (
                    <motion.button
                      key={type}
                      type="button"
                      onClick={() => setIdentifierType(type)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                        identifierType === type 
                          ? 'bg-background text-foreground shadow-md' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {type === 'email' ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                      {type === 'email' ? 'Email' : 'Phone'}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Auth Method Selector */}
              <motion.div variants={itemVariants}>
                <Label className="text-sm text-muted-foreground mb-2 block">Authentication method</Label>
                <div className="flex gap-2 p-1 bg-muted rounded-2xl">
                  {(['password', identifierType === 'email' ? 'email-otp' : 'phone-otp'] as AuthMethod[]).map((method) => (
                    <motion.button
                      key={method}
                      type="button"
                      onClick={() => setAuthMethod(method)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                        authMethod === method 
                          ? 'bg-background text-foreground shadow-md' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {method === 'password' ? <Lock className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                      {method === 'password' ? 'Password' : 'OTP'}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {isSignUp && authMethod === 'password' && (
                <motion.div 
                  variants={itemVariants}
                  className="space-y-2"
                >
                  <Label htmlFor="name">Full Name</Label>
                  <motion.div 
                    className="relative"
                    whileFocus={{ scale: 1.01 }}
                  >
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-12 h-14 rounded-xl text-base"
                    />
                  </motion.div>
                  {errors.name && (
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm text-destructive flex items-center gap-1"
                    >
                      <span className="w-1 h-1 rounded-full bg-destructive" />
                      {errors.name}
                    </motion.p>
                  )}
                </motion.div>
              )}

              {isDashboardAccess && targetDashboard === 'admin' && (
                <motion.div
                  variants={itemVariants}
                  className="rounded-xl border bg-muted/50 p-4 text-sm text-muted-foreground"
                >
                  <p>Admin accounts can't be created here. Please sign in with an existing admin account.</p>
                </motion.div>
              )}

              {/* Email/Phone Input based on identifier type */}
              {identifierType === 'phone' ? (
                <motion.div 
                  variants={itemVariants}
                  className="space-y-2"
                >
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91XXXXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-12 h-14 rounded-xl text-base"
                    />
                  </div>
                  {errors.phone && (
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm text-destructive flex items-center gap-1"
                    >
                      <span className="w-1 h-1 rounded-full bg-destructive" />
                      {errors.phone}
                    </motion.p>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  variants={itemVariants}
                  className="space-y-2"
                >
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-14 rounded-xl text-base"
                    />
                  </div>
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm text-destructive flex items-center gap-1"
                    >
                      <span className="w-1 h-1 rounded-full bg-destructive" />
                      {errors.email}
                    </motion.p>
                  )}
                </motion.div>
              )}

              {authMethod === 'password' && (
                <motion.div 
                  variants={itemVariants}
                  className="space-y-2"
                >
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 h-14 rounded-xl text-base"
                    />
                  </div>
                  {errors.password && (
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm text-destructive flex items-center gap-1"
                    >
                      <span className="w-1 h-1 rounded-full bg-destructive" />
                      {errors.password}
                    </motion.p>
                  )}
                </motion.div>
              )}

              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  variant="hero"
                  size="xl"
                  className="w-full relative overflow-hidden group h-14 rounded-xl text-base"
                  disabled={isLoading}
                >
                  {/* Animated shimmer */}
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Ripple effect on hover */}
                  <motion.span
                    className="absolute inset-0 bg-primary-foreground/10 opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0, borderRadius: '100%' }}
                    whileHover={{ scale: 2, borderRadius: '0%' }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  <span className="relative flex items-center justify-center gap-2">
                    {isLoading ? (
                      <motion.span
                        className="flex items-center gap-2"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <motion.div 
                          className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Please wait...
                      </motion.span>
                    ) : authMethod !== 'password' ? (
                      <>
                        <Zap className="w-5 h-5" />
                        Send {identifierType === 'phone' ? 'SMS' : 'Email'} Code
                      </>
                    ) : isDashboardAccess ? (
                      <>
                        <Shield className="w-5 h-5" />
                        Sign In to Dashboard
                      </>
                    ) : isSignUp ? (
                      <>
                        <Star className="w-5 h-5" />
                        Continue
                      </>
                    ) : (
                      <>
                        <ArrowLeft className="w-5 h-5 rotate-180" />
                        Sign In
                      </>
                    )}
                  </span>
                </Button>
              </motion.div>

              {targetDashboard !== 'admin' && (
                <motion.p 
                  variants={itemVariants}
                  className="text-center text-sm text-muted-foreground"
                >
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <motion.button
                    type="button"
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      setAuthMethod('password');
                      setErrors({});
                      setStep('credentials');
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-primary font-semibold hover:underline"
                  >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </motion.button>
                </motion.p>
              )}

              {isDashboardAccess && (
                <motion.p 
                  variants={itemVariants}
                  className="text-center text-sm text-muted-foreground"
                >
                  <motion.button
                    type="button"
                    onClick={() => navigate('/')}
                    whileHover={{ x: -3 }}
                    className="text-primary font-medium hover:underline inline-flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    Back to Home
                  </motion.button>
                </motion.p>
              )}
            </motion.form>
          ) : (
            <motion.div 
              key="role"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-5 mt-4"
            >
              <motion.button
                onClick={() => setStep('credentials')}
                whileHover={{ x: -5 }}
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
                  className="text-center text-sm text-muted-foreground mt-4 flex items-center justify-center gap-2"
                >
                  <motion.div 
                    className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
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
