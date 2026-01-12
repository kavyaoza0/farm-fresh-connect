import { UserRole } from '@/types';
import { Sprout, Store, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  },
  {
    id: 'shopkeeper' as UserRole,
    title: 'Shopkeeper',
    titleHindi: 'दुकानदार',
    description: 'Sell to customers, buy from farmers',
    icon: Store,
    color: 'shopkeeper',
  },
  {
    id: 'farmer' as UserRole,
    title: 'Farmer',
    titleHindi: 'किसान',
    description: 'Sell your harvest to local shops',
    icon: Sprout,
    color: 'farmer',
  },
];

export const RoleSelector = ({ onRoleSelect, className }: RoleSelectorProps) => {
  return (
    <div className={cn("grid grid-cols-2 gap-4", className)}>
      {roles.map((role) => {
        const Icon = role.icon;
        
        return (
          <button
            key={role.id}
            onClick={() => onRoleSelect(role.id)}
            className={cn(
              "group relative flex flex-col items-center p-6 bg-card rounded-2xl shadow-card hover:shadow-elevated transition-all duration-300 border-2 border-transparent animate-fade-in",
              role.id === 'customer' && "hover:border-customer",
              role.id === 'shopkeeper' && "hover:border-shopkeeper",
              role.id === 'farmer' && "hover:border-farmer"
            )}
            style={{ animationDelay: `${roles.indexOf(role) * 100}ms` }}
          >
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110",
              role.id === 'customer' && "bg-customer/10 text-customer",
              role.id === 'shopkeeper' && "bg-shopkeeper/10 text-shopkeeper",
              role.id === 'farmer' && "bg-farmer/10 text-farmer"
            )}>
              <Icon className="w-8 h-8" />
            </div>
            <h3 className="font-semibold text-foreground text-lg">{role.title}</h3>
            <span className="text-sm text-muted-foreground mb-2">{role.titleHindi}</span>
            <p className="text-xs text-muted-foreground text-center line-clamp-2">
              {role.description}
            </p>
          </button>
        );
      })}
    </div>
  );
};
