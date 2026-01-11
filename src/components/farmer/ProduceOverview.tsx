import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, TrendingUp, Clock, Leaf } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import type { ProduceWithProduct, BulkOrderWithDetails } from '@/hooks/useFarmer';

interface ProduceOverviewProps {
  produce: ProduceWithProduct[];
  bulkOrders: BulkOrderWithDetails[];
  isLoading: boolean;
}

export function ProduceOverview({ produce, bulkOrders, isLoading }: ProduceOverviewProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    );
  }

  const totalProduce = produce.length;
  const availableProduce = produce.filter(p => p.is_available).length;
  const organicProduce = produce.filter(p => p.is_organic).length;
  const pendingOrders = bulkOrders.filter(o => o.status === 'pending').length;
  const acceptedOrders = bulkOrders.filter(o => o.status === 'accepted').length;

  const totalValue = produce.reduce((sum, p) => {
    return sum + (p.price_per_kg * p.available_quantity);
  }, 0);

  const stats = [
    {
      title: 'Total Produce',
      value: totalProduce,
      subtitle: `${availableProduce} available`,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Stock Value',
      value: `₹${totalValue.toLocaleString()}`,
      subtitle: 'Estimated',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Pending Orders',
      value: pendingOrders,
      subtitle: `${acceptedOrders} accepted`,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Organic',
      value: organicProduce,
      subtitle: 'Products',
      icon: Leaf,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.title}</p>
                  <p className="text-xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                </div>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {produce.length > 0 && (
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recent Produce</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {produce.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  {item.product.image ? (
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Package className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-sm">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.available_quantity} kg available
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">₹{item.price_per_kg}/kg</p>
                  {item.is_organic && (
                    <span className="text-xs text-emerald-600 flex items-center gap-1">
                      <Leaf className="h-3 w-3" /> Organic
                    </span>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {produce.length === 0 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8 text-center">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <h3 className="font-medium mb-1">No produce listed yet</h3>
            <p className="text-sm text-muted-foreground">
              Add your first produce to start receiving orders from shopkeepers
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
