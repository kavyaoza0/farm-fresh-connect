import { UserRole } from '@/types';
import { Sprout, Store, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface RoleSelectorProps {
  onRoleSelect: (role: UserRole) => void;
  className?: string;
}

const roles = [
  {
    id: 'customer' as UserRole,
    title: 'Customer',
    titleHindi: 'ग्राहक',
    description: 'Buy fresh produce from local shops',
    icon: Users,
    color: 'customer',
    gradient: 'from-blue-500/20 to-cyan-500/10',
  },
  {
    id: 'shopkeeper' as UserRole,
    title: 'Shopkeeper',
    titleHindi: 'दुकानदार',
    description: 'Sell to customers, buy from farmers',
    icon: Store,
    color: 'shopkeeper',
    gradient: 'from-orange-500/20 to-amber-500/10',
  },
  {
    id: 'farmer' as UserRole,
    title: 'Farmer',
    titleHindi: 'किसान',
    description: 'Sell your harvest to local shops',
    icon: Sprout,
    color: 'farmer',
    gradient: 'from-green-500/20 to-emerald-500/10',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
    },
  },
};

export const RoleSelector = ({ onRoleSelect, className }: RoleSelectorProps) => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn("grid grid-cols-1 sm:grid-cols-2 gap-4", className)}
    >
      {roles.map((role, index) => {
        const Icon = role.icon;
        
        return (
          <motion.button
            key={role.id}
            variants={itemVariants}
            onClick={() => onRoleSelect(role.id)}
            whileHover={{ 
              scale: 1.03, 
              y: -5,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "group relative flex flex-col items-center p-6 bg-card rounded-2xl shadow-card hover:shadow-elevated transition-shadow duration-300 border-2 border-transparent overflow-hidden",
              role.id === 'customer' && "hover:border-customer",
              role.id === 'shopkeeper' && "hover:border-shopkeeper",
              role.id === 'farmer' && "hover:border-farmer",
              index === 2 && "sm:col-span-2 sm:max-w-xs sm:mx-auto"
            )}
          >
            {/* Animated gradient background */}
            <motion.div 
              className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                role.gradient
              )}
              initial={false}
            />
            
            {/* Floating particles */}
            <motion.div
              className="absolute top-4 right-4 w-2 h-2 rounded-full bg-current opacity-20"
              animate={{
                y: [0, -10, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3,
              }}
              style={{ color: `hsl(var(--${role.color}))` }}
            />
            
            <div className="relative z-10">
              <motion.div 
                className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300",
                  role.id === 'customer' && "bg-customer/10 text-customer group-hover:bg-customer/20",
                  role.id === 'shopkeeper' && "bg-shopkeeper/10 text-shopkeeper group-hover:bg-shopkeeper/20",
                  role.id === 'farmer' && "bg-farmer/10 text-farmer group-hover:bg-farmer/20"
                )}
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                >
                  <Icon className="w-8 h-8" />
                </motion.div>
              </motion.div>
              
              <motion.h3 
                className="font-semibold text-foreground text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                {role.title}
              </motion.h3>
              
              <motion.span 
                className="text-sm text-muted-foreground mb-2 block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {role.titleHindi}
              </motion.span>
              
              <motion.p 
                className="text-xs text-muted-foreground text-center line-clamp-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                {role.description}
              </motion.p>
            </div>
            
            {/* Hover arrow indicator */}
            <motion.div
              className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ x: -10 }}
              whileHover={{ x: 0 }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <motion.path
                  d="M7 10H13M13 10L10 7M13 10L10 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn(
                    role.id === 'customer' && "text-customer",
                    role.id === 'shopkeeper' && "text-shopkeeper",
                    role.id === 'farmer' && "text-farmer"
                  )}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </svg>
            </motion.div>
          </motion.button>
        );
      })}
    </motion.div>
  );
};
