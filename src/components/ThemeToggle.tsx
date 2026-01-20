import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle = ({ className, showLabel = false }: ThemeToggleProps) => {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative flex items-center gap-3 p-3 rounded-xl transition-colors ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div 
        className="relative w-14 h-8 rounded-full bg-muted p-1 cursor-pointer overflow-hidden"
        initial={false}
        animate={{
          backgroundColor: resolvedTheme === 'dark' 
            ? 'hsl(var(--primary) / 0.2)' 
            : 'hsl(var(--muted))'
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Animated background stars/sun rays */}
        <AnimatePresence mode="wait">
          {resolvedTheme === 'dark' ? (
            <motion.div
              key="stars"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-primary/60"
                  style={{
                    left: `${15 + i * 15}%`,
                    top: `${20 + (i % 2) * 40}%`,
                  }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 1.5 + i * 0.3,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="rays"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 overflow-hidden"
            >
              <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-l from-accent/20 to-transparent rounded-full blur-sm"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle circle */}
        <motion.div
          className="relative w-6 h-6 rounded-full bg-background shadow-md flex items-center justify-center z-10"
          animate={{
            x: resolvedTheme === 'dark' ? 24 : 0,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <AnimatePresence mode="wait">
            {resolvedTheme === 'dark' ? (
              <motion.div
                key="moon"
                initial={{ rotate: -90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: 90, scale: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Moon className="w-4 h-4 text-primary" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: -90, scale: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Sun className="w-4 h-4 text-accent" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {showLabel && (
        <div className="flex-1 text-left">
          <motion.p 
            className="font-medium text-foreground"
            key={resolvedTheme}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {resolvedTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </motion.p>
          <motion.p 
            className="text-sm text-muted-foreground flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Sparkles className="w-3 h-3" />
            Tap to switch
          </motion.p>
        </div>
      )}
    </motion.button>
  );
};
