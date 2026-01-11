import { useState } from 'react';
import { useUpdateOrderStatus } from '@/hooks/useShopkeeper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Clock, 
  CheckCircle2, 
  Package, 
  XCircle,
  Phone,
  User,
  IndianRupee,
  ChevronRight,
} from 'lucide-react';
import { format } from 'date-fns';

interface OrderItem {
  id: string;
  productId: string;
  product: {
    id: string;
    name: string;
    nameHindi?: string;
    image: string;
  };
  quantity: number;
  pricePerUnit: number;
  total: number;
}

interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  shopId: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'picked_up' | 'cancelled';
  subtotal: number;
  total: number;
  pickupTime: Date | null;
  paymentMethod: 'upi' | 'cash';
  isPaid: boolean;
  createdAt: Date;
  items: OrderItem[];
}

interface OrderManagementProps {
  orders: Order[];
  isLoading: boolean;
}

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-warning/10 text-warning', icon: Clock },
  confirmed: { label: 'Confirmed', color: 'bg-primary/10 text-primary', icon: CheckCircle2 },
  preparing: { label: 'Preparing', color: 'bg-shopkeeper/10 text-shopkeeper', icon: Package },
  ready: { label: 'Ready', color: 'bg-success/10 text-success', icon: CheckCircle2 },
  picked_up: { label: 'Picked Up', color: 'bg-muted text-muted-foreground', icon: CheckCircle2 },
  cancelled: { label: 'Cancelled', color: 'bg-destructive/10 text-destructive', icon: XCircle },
};

export function OrderManagement({ orders, isLoading }: OrderManagementProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const updateStatus = useUpdateOrderStatus();

  const activeOrders = orders.filter(
    (o) => ['pending', 'confirmed', 'preparing', 'ready'].includes(o.status)
  );
  const completedOrders = orders.filter(
    (o) => ['picked_up', 'cancelled'].includes(o.status)
  );

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Orders</h2>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">
            Active ({activeOrders.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            History ({completedOrders.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-4 space-y-3">
          {activeOrders.length === 0 ? (
            <Card className="p-8 text-center">
              <Package className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="font-medium mb-1">No active orders</h3>
              <p className="text-sm text-muted-foreground">
                New orders will appear here
              </p>
            </Card>
          ) : (
            activeOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onClick={() => setSelectedOrder(order)}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-4 space-y-3">
          {completedOrders.length === 0 ? (
            <Card className="p-8 text-center">
              <CheckCircle2 className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="font-medium mb-1">No completed orders yet</h3>
              <p className="text-sm text-muted-foreground">
                Completed orders will appear here
              </p>
            </Card>
          ) : (
            completedOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onClick={() => setSelectedOrder(order)}
              />
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <OrderDetails
              order={selectedOrder}
              onStatusChange={(status) => {
                updateStatus.mutate({ orderId: selectedOrder.id, status });
                setSelectedOrder({ ...selectedOrder, status });
              }}
              isUpdating={updateStatus.isPending}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function OrderCard({ order, onClick }: { order: Order; onClick: () => void }) {
  const status = statusConfig[order.status];
  const StatusIcon = status.icon;

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge className={status.color}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {status.label}
              </Badge>
              {!order.isPaid && (
                <Badge variant="outline" className="text-warning border-warning">
                  Unpaid
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <User className="w-3 h-3 text-muted-foreground" />
              <span className="font-medium">{order.customerName}</span>
            </div>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span>{order.items.length} items</span>
              <span className="flex items-center font-medium text-foreground">
                <IndianRupee className="w-3 h-3" />
                {order.total}
              </span>
              <span>{format(order.createdAt, 'h:mm a')}</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
        </div>
      </CardContent>
    </Card>
  );
}

function OrderDetails({
  order,
  onStatusChange,
  isUpdating,
}: {
  order: Order;
  onStatusChange: (status: Order['status']) => void;
  isUpdating: boolean;
}) {
  order: Order;
  onStatusChange: (status: string) => void;
  isUpdating: boolean;
}) {
  const status = statusConfig[order.status];

  const getNextStatus = () => {
    switch (order.status) {
      case 'pending': return 'confirmed';
      case 'confirmed': return 'preparing';
      case 'preparing': return 'ready';
      case 'ready': return 'picked_up';
      default: return null;
    }
  };

  const nextStatus = getNextStatus();

  return (
    <div className="space-y-4 py-2">
      {/* Status */}
      <div className="flex items-center justify-between">
        <Badge className={`${status.color} text-sm py-1 px-3`}>
          {status.label}
        </Badge>
        <span className="text-sm text-muted-foreground">
          {format(order.createdAt, 'MMM d, h:mm a')}
        </span>
      </div>

      {/* Customer Info */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Customer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <span>{order.customerName}</span>
          </div>
          {order.customerPhone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <a 
                href={`tel:${order.customerPhone}`}
                className="text-primary hover:underline"
              >
                {order.customerPhone}
              </a>
            </div>
          )}
          {order.pickupTime && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>Pickup: {format(order.pickupTime, 'h:mm a')}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Items ({order.items.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <img
                src={item.product.image || '/placeholder.svg'}
                alt={item.product.name}
                className="w-10 h-10 rounded-lg object-cover bg-muted"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{item.product.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.quantity} × ₹{item.pricePerUnit}
                </p>
              </div>
              <span className="font-medium text-sm">₹{item.total}</span>
            </div>
          ))}
          <div className="border-t pt-3 mt-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{order.subtotal}</span>
            </div>
            <div className="flex justify-between font-semibold mt-1">
              <span>Total</span>
              <span className="flex items-center">
                <IndianRupee className="w-4 h-4" />
                {order.total}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Info */}
      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
        <span className="text-sm">Payment Method</span>
        <Badge variant={order.isPaid ? 'default' : 'outline'}>
          {order.paymentMethod?.toUpperCase() || 'CASH'}
          {order.isPaid ? ' (Paid)' : ' (Pending)'}
        </Badge>
      </div>

      {/* Action Buttons */}
      {nextStatus && order.status !== 'cancelled' && (
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onStatusChange('cancelled')}
            disabled={isUpdating}
          >
            <XCircle className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button
            className="flex-1"
            onClick={() => onStatusChange(nextStatus)}
            disabled={isUpdating}
          >
            {nextStatus === 'confirmed' && 'Accept Order'}
            {nextStatus === 'preparing' && 'Start Preparing'}
            {nextStatus === 'ready' && 'Mark Ready'}
            {nextStatus === 'picked_up' && 'Mark Picked Up'}
          </Button>
        </div>
      )}
    </div>
  );
}
