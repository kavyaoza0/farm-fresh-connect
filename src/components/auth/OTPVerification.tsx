import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { OTPInput } from './OTPInput';
import { ArrowLeft, Mail, Phone, RefreshCw, CheckCircle2, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface OTPVerificationProps {
  identifier: string;
  type: 'email' | 'phone';
  onVerified: () => void;
  onBack: () => void;
  isSignUp?: boolean;
}

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
        ? { email: identifier, options: { shouldCreateUser: false } }
        : { phone: identifier, options: { shouldCreateUser: false } };

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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <motion.button
        onClick={onBack}
        whileHover={{ x: -3 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </motion.button>

      <div className="text-center space-y-2">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 relative"
        >
          {verified ? (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </motion.div>
          ) : (
            <>
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Icon className="w-10 h-10 text-primary" />
              </motion.div>
              
              {/* Animated sparkles */}
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ 
                  rotate: [0, 360],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 text-accent" />
              </motion.div>
            </>
          )}
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-semibold text-foreground"
        >
          {verified ? 'Verified!' : type === 'email' ? 'Verify Your Email' : 'Verify Your Phone'}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-muted-foreground max-w-[28ch] mx-auto"
        >
          {verified 
            ? 'Redirecting you now...'
            : `We've sent a 6-digit code to ${identifier}`
          }
        </motion.p>
      </div>

      {!verified && (
        <>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="py-4"
          >
            <OTPInput onComplete={handleVerify} disabled={isVerifying} />
          </motion.div>

          {isVerifying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw className="w-4 h-4" />
              </motion.div>
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Verifying...
              </motion.span>
            </motion.div>
          )}

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <p className="text-sm text-muted-foreground mb-2">
              Didn't receive the code?
            </p>
            {canResend ? (
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResend}
                  disabled={isResending}
                  className="text-primary"
                >
                  {isResending ? 'Sending...' : 'Resend Code'}
                </Button>
              </motion.div>
            ) : (
              <motion.p 
                className="text-sm text-muted-foreground"
                key={countdown}
              >
                Resend in{' '}
                <motion.span 
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                  className="font-semibold text-primary inline-block"
                >
                  {countdown}s
                </motion.span>
              </motion.p>
            )}
          </motion.div>
        </>
      )}
    </motion.div>
  );
};
