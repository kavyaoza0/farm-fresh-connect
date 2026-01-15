import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const OrdersTab = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['customer-orders', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          shops (name, address, city),
          order_items (
            *,
            products (name, image)
          )
        `)
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />{t.pending}</Badge>;
      case 'confirmed':
        return <Badge variant="default">{t.confirmed}</Badge>;
      case 'preparing':
        return <Badge variant="default" className="bg-warning text-warning-foreground">{t.preparing}</Badge>;
      case 'ready':
        return <Badge variant="default" className="bg-success text-white">{t.ready}</Badge>;
      case 'picked_up':
        return <Badge variant="outline"><CheckCircle className="w-3 h-3 mr-1" />{t.pickedUp}</Badge>;
      case 'cancelled':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />{t.cancelled}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground mb-4">{t.signIn} to view your orders</p>
        <Button variant="outline" onClick={() => window.location.href = '/auth'}>
          {t.signIn}
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <p className="text-lg font-medium text-foreground mb-2">{t.noOrders}</p>
        <p className="text-sm text-muted-foreground">
          Start exploring shops to place your first order
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg text-foreground">{t.myOrders}</h2>
      
      {orders.map((order: any) => (
        <Card key={order.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{order.shops?.name || 'Shop'}</CardTitle>
              {getStatusBadge(order.status)}
            </div>
            <p className="text-xs text-muted-foreground">
              {new Date(order.created_at).toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {order.order_items?.slice(0, 3).map((item: any) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.products?.name} × {item.quantity}
                  </span>
                  <span className="font-medium">₹{item.total}</span>
                </div>
              ))}
              {order.order_items?.length > 3 && (
                <p className="text-xs text-muted-foreground">
                  +{order.order_items.length - 3} more items
                </p>
              )}
            </div>
            <div className="mt-3 pt-3 border-t flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Total</span>
              <span className="text-lg font-bold text-primary">₹{order.total}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
