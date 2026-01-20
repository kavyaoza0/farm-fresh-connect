import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { OTPInput } from './OTPInput';
import { ArrowLeft, Mail, Phone, RefreshCw, CheckCircle2, Sparkles, Shield, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface OTPVerificationProps {
  identifier: string;
  type: 'email' | 'phone';
  onVerified: () => void;
  onBack: () => void;
  isSignUp?: boolean;
}

// Floating particle component
const FloatingParticle = ({ delay, index }: { delay: number; index: number }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full bg-primary/30"
    style={{
      left: `${10 + index * 15}%`,
      top: `${20 + (index % 3) * 25}%`,
    }}
    animate={{
      y: [0, -20, 0],
      opacity: [0.2, 0.6, 0.2],
      scale: [0.8, 1.2, 0.8],
    }}
    transition={{
      duration: 3 + delay,
      delay: index * 0.3,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

export const OTPVerification = ({ identifier, type, onVerified, onBack, isSignUp = false }: OTPVerificationProps) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [verified, setVerified] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0 && !canResend) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown, canResend]);

  const handleVerify = async (otp: string) => {
    setIsVerifying(true);
    
    try {
      const verifyOptions = type === 'email' 
        ? { email: identifier, token: otp, type: isSignUp ? 'signup' as const : 'email' as const }
        : { phone: identifier, token: otp, type: 'sms' as const };

      const { error } = await supabase.auth.verifyOtp(verifyOptions);

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Verification failed',
          description: error.message,
        });
        setIsVerifying(false);
        return;
      }

      setVerified(true);
      toast({
        title: 'Verified! ✓',
        description: type === 'email' 
          ? 'Your email has been verified successfully.'
          : 'Your phone has been verified successfully.',
      });
      
      setTimeout(() => {
        onVerified();
      }, 1500);
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong. Please try again.',
      });
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    
    try {
      const resendOptions = type === 'email'
        ? { email: identifier, options: { shouldCreateUser: isSignUp } }
        : { phone: identifier, options: { shouldCreateUser: isSignUp } };

      const { error } = await supabase.auth.signInWithOtp(resendOptions);

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Failed to resend',
          description: error.message,
        });
      } else {
        toast({
          title: 'Code sent!',
          description: type === 'email'
            ? 'A new verification code has been sent to your email.'
            : 'A new verification code has been sent to your phone.',
        });
        setCountdown(60);
        setCanResend(false);
      }
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to resend code.',
      });
    }
    
    setIsResending(false);
  };

  const Icon = type === 'email' ? Mail : Phone;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className="space-y-6 relative mt-4"
    >
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <FloatingParticle key={i} delay={i * 0.5} index={i} />
      ))}

      <motion.button
        onClick={onBack}
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </motion.button>

      <div className="text-center space-y-3">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring" as const, duration: 0.8 }}
          className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center mb-6 relative overflow-hidden"
        >
          {/* Animated rings */}
          <motion.div
            className="absolute inset-0 rounded-3xl border-2 border-primary/20"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 rounded-3xl border-2 border-primary/20"
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />

          {verified ? (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring" as const, duration: 0.5 }}
            >
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </motion.div>
          ) : (
            <>
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Icon className="w-12 h-12 text-primary" />
              </motion.div>
              
              {/* Animated sparkles around icon */}
              {[Shield, Zap, Sparkles].map((SparkleIcon, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    top: `${20 + i * 25}%`,
                    right: `${10 + i * 10}%`,
                  }}
                  animate={{ 
                    rotate: [0, 360],
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.3 }}
                >
                  <SparkleIcon className="w-4 h-4 text-accent" />
                </motion.div>
              ))}
            </>
          )}
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-foreground"
        >
          {verified ? 'Verified!' : type === 'email' ? 'Check Your Email' : 'Check Your Phone'}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-muted-foreground max-w-[32ch] mx-auto"
        >
          {verified 
            ? 'Redirecting you now...'
            : `We've sent a 6-digit code to ${identifier}`
          }
        </motion.p>
      </div>

      <AnimatePresence mode="wait">
        {!verified && (
          <motion.div
            key="otp-input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="py-6"
            >
              <OTPInput onComplete={handleVerify} disabled={isVerifying} />
            </motion.div>

            {isVerifying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-3 text-sm text-muted-foreground py-4"
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
                  Verifying your code...
                </motion.span>
              </motion.div>
            )}

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center pt-4"
            >
              <p className="text-sm text-muted-foreground mb-3">
                Didn't receive the code?
              </p>
              {canResend ? (
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" as const }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleResend}
                    disabled={isResending}
                    className="gap-2 rounded-xl"
                  >
                    {isResending ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <RefreshCw className="w-4 h-4" />
                        </motion.div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4" />
                        Resend Code
                      </>
                    )}
                  </Button>
                </motion.div>
              ) : (
                <motion.div 
                  className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
                  key={countdown}
                >
                  <span>Resend in</span>
                  <motion.span 
                    initial={{ scale: 1.3 }}
                    animate={{ scale: 1 }}
                    className="font-bold text-primary text-lg inline-block min-w-[2ch]"
                  >
                    {countdown}
                  </motion.span>
                  <span>seconds</span>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success animation */}
      <AnimatePresence>
        {verified && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-8"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-8 h-8 text-primary" />
              </motion.div>
            </motion.div>
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-muted-foreground"
            >
              Redirecting...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
