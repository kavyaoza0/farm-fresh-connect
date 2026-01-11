import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Package, Check, X, Clock, User } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useBulkOrderRequests, useUpdateBulkOrderStatus, type BulkOrderWithDetails } from '@/hooks/useFarmer';
import type { Database } from '@/integrations/supabase/types';

type BulkOrderStatus = Database['public']['Enums']['bulk_order_status'];

const statusConfig: Record<BulkOrderStatus, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  accepted: { label: 'Accepted', color: 'bg-green-100 text-green-800', icon: Check },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800', icon: X },
  completed: { label: 'Completed', color: 'bg-blue-100 text-blue-800', icon: Check },
};

export function BulkOrderManagement() {
  const { data: orders, isLoading } = useBulkOrderRequests();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  const pendingOrders = orders?.filter(o => o.status === 'pending') || [];
  const otherOrders = orders?.filter(o => o.status !== 'pending') || [];

  return (
    <div className="space-y-6">
      {pendingOrders.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Pending Requests ({pendingOrders.length})</h2>
          {pendingOrders.map((order) => (
            <OrderCard key={order.id} order={order} showActions />
          ))}
        </div>
      )}

      {otherOrders.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Order History</h2>
          {otherOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}

      {(!orders || orders.length === 0) && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8 text-center">
            <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <h3 className="font-medium mb-1">No bulk order requests</h3>
            <p className="text-sm text-muted-foreground">
              When shopkeepers send you bulk order requests, they'll appear here
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function OrderCard({ order, showActions = false }: { order: BulkOrderWithDetails; showActions?: boolean }) {
  const updateStatus = useUpdateBulkOrderStatus();
  const status = statusConfig[order.status || 'pending'];
  const StatusIcon = status.icon;

  const handleAccept = () => {
    updateStatus.mutate({ id: order.id, status: 'accepted' });
  };

  const handleReject = () => {
    updateStatus.mutate({ id: order.id, status: 'rejected' });
  };

  const handleComplete = () => {
    updateStatus.mutate({ id: order.id, status: 'completed' });
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <Badge className={`${status.color} border-0`}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {status.label}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {new Date(order.created_at || '').toLocaleDateString()}
          </span>
        </div>

        <div className="flex gap-3 mb-3">
          {order.produce?.product?.image ? (
            <img 
              src={order.produce.product.image} 
              alt={order.produce.product.name}
              className="w-14 h-14 rounded-lg object-cover"
            />
          ) : (
            <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center">
              <Package className="h-7 w-7 text-muted-foreground" />
            </div>
          )}

          <div className="flex-1">
            <h3 className="font-semibold">{order.produce?.product?.name || 'Unknown Product'}</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Quantity: <span className="font-medium text-foreground">{order.requested_quantity} kg</span></p>
              <p>Offered Price: <span className="font-medium text-primary">₹{order.offered_price}/kg</span></p>
            </div>
          </div>
        </div>

        {order.shopkeeper_profile && (
          <div className="flex items-center gap-2 p-2 bg-muted rounded-lg mb-3">
            <User className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm">
              <span className="font-medium">{order.shopkeeper_profile.name}</span>
              {order.shopkeeper_profile.phone && (
                <span className="text-muted-foreground ml-2">{order.shopkeeper_profile.phone}</span>
              )}
            </div>
          </div>
        )}

        {showActions && order.status === 'pending' && (
          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="flex-1"
              onClick={handleAccept}
              disabled={updateStatus.isPending}
            >
              <Check className="h-4 w-4 mr-1" />
              Accept
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 text-destructive hover:text-destructive"
              onClick={handleReject}
              disabled={updateStatus.isPending}
            >
              <X className="h-4 w-4 mr-1" />
              Reject
            </Button>
          </div>
        )}

        {order.status === 'accepted' && (
          <Button 
            size="sm" 
            variant="outline"
            className="w-full"
            onClick={handleComplete}
            disabled={updateStatus.isPending}
          >
            <Check className="h-4 w-4 mr-1" />
            Mark as Completed
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
