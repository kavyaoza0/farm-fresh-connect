import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { OTPInput } from './OTPInput';
import { ArrowLeft, Mail, RefreshCw, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface OTPVerificationProps {
  email: string;
  onVerified: () => void;
  onBack: () => void;
  isSignUp?: boolean;
}

export const OTPVerification = ({ email, onVerified, onBack, isSignUp = false }: OTPVerificationProps) => {
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
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: isSignUp ? 'signup' : 'email',
      });

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
        description: 'Your email has been verified successfully.',
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
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        },
      });

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Failed to resend',
          description: error.message,
        });
      } else {
        toast({
          title: 'Code sent!',
          description: 'A new verification code has been sent to your email.',
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

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="text-center space-y-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4"
        >
          {verified ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </motion.div>
          ) : (
            <Mail className="w-8 h-8 text-primary" />
          )}
        </motion.div>
        
        <h2 className="text-xl font-semibold text-foreground">
          {verified ? 'Verified!' : 'Verify Your Email'}
        </h2>
        
        <p className="text-sm text-muted-foreground max-w-[28ch] mx-auto">
          {verified 
            ? 'Redirecting you now...'
            : `We've sent a 6-digit code to ${email}`
          }
        </p>
      </div>

      {!verified && (
        <>
          <div className="py-4">
            <OTPInput onComplete={handleVerify} disabled={isVerifying} />
          </div>

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
              Verifying...
            </motion.div>
          )}

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Didn't receive the code?
            </p>
            {canResend ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResend}
                disabled={isResending}
                className="text-primary"
              >
                {isResending ? 'Sending...' : 'Resend Code'}
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">
                Resend in <span className="font-semibold text-primary">{countdown}s</span>
              </p>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
};
