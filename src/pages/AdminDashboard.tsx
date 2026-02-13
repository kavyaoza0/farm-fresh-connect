import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import {
  Users,
  Store,
  Tractor,
  ShoppingCart,
  Shield,
  BarChart3,
  ArrowLeft,
  CheckCircle,
  Clock,
  MapPin,
  Package,
  Search,
  XCircle,
  Phone,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  useAdminStats,
  useAllProfiles,
  useAllUserRoles,
  useAllShops,
  useAllOrders,
  useAllFarmerProduce,
  useVerifyShop,
} from '@/hooks/useAdmin';
import { useAuth } from '@/hooks/useAuth';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';

type AdminTab = 'overview' | 'customers' | 'shopkeepers' | 'farmers' | 'orders';

const roleChartConfig: ChartConfig = {
  customers: { label: 'Customers', color: 'hsl(199 89% 48%)' },
  shopkeepers: { label: 'Shopkeepers', color: 'hsl(28 90% 55%)' },
  farmers: { label: 'Farmers', color: 'hsl(142 55% 35%)' },
};

const orderChartConfig: ChartConfig = {
  pending: { label: 'Pending', color: 'hsl(38 92% 50%)' },
  confirmed: { label: 'Confirmed', color: 'hsl(199 89% 48%)' },
  preparing: { label: 'Preparing', color: 'hsl(28 90% 55%)' },
  ready: { label: 'Ready', color: 'hsl(142 70% 45%)' },
  picked_up: { label: 'Picked Up', color: 'hsl(142 55% 35%)' },
  cancelled: { label: 'Cancelled', color: 'hsl(0 72% 51%)' },
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { userRole } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: profiles = [], isLoading: profilesLoading } = useAllProfiles();
  const { data: userRoles = [] } = useAllUserRoles();
  const { data: shops = [], isLoading: shopsLoading } = useAllShops();
  const { data: orders = [], isLoading: ordersLoading } = useAllOrders();
  const { data: produce = [], isLoading: produceLoading } = useAllFarmerProduce();
  const verifyShop = useVerifyShop();

  // Role map
  const roleMap = new Map<string, string[]>();
  userRoles.forEach(ur => {
    const existing = roleMap.get(ur.user_id) || [];
    roleMap.set(ur.user_id, [...existing, ur.role]);
  });

  const customers = profiles.filter(p => roleMap.get(p.id)?.includes('customer'));
  const shopkeepers = profiles.filter(p => roleMap.get(p.id)?.includes('shopkeeper'));
  const farmers = profiles.filter(p => roleMap.get(p.id)?.includes('farmer'));

  // Search filter
  const filterBySearch = (items: any[], keys: string[]) => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter(item =>
      keys.some(key => item[key]?.toString().toLowerCase().includes(q))
    );
  };

  // Chart data
  const roleDistribution = [
    { name: 'customers', value: stats?.customerCount || 0, fill: 'hsl(199 89% 48%)' },
    { name: 'shopkeepers', value: stats?.shopkeeperCount || 0, fill: 'hsl(28 90% 55%)' },
    { name: 'farmers', value: stats?.farmerCount || 0, fill: 'hsl(142 55% 35%)' },
  ];

  const orderStatusData = orders.reduce((acc: Record<string, number>, order: any) => {
    const status = order.status || 'pending';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const orderChartData = Object.entries(orderStatusData).map(([status, count]) => ({
    status,
    count,
  }));

  const handleVerifyShop = (shopId: string, verified: boolean) => {
    verifyShop.mutate(
      { shopId, verified },
      {
        onSuccess: () => {
          toast({
            title: verified ? 'Shop Verified' : 'Verification Removed',
            description: verified
              ? 'The shop has been verified successfully.'
              : 'Shop verification has been revoked.',
          });
        },
        onError: () => {
          toast({ title: 'Error', description: 'Failed to update shop verification.', variant: 'destructive' });
        },
      }
    );
  };

  if (userRole !== 'admin') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <Shield className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2">Access Denied</h2>
          <p className="text-sm text-muted-foreground mb-4">You don't have admin privileges.</p>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title={t.adminDashboard} showLocation={false} showCart={false} />

      <div className="container max-w-lg mx-auto px-4 py-2">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="gap-1">
          <ArrowLeft className="w-4 h-4" />
          {t.back}
        </Button>
      </div>

      <main className="container max-w-lg mx-auto px-4 pb-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8" />
            <h1 className="text-xl font-bold">{t.admin}</h1>
          </div>
          <p className="text-primary-foreground/80 text-sm">{t.platformManagement}</p>
        </div>

        {/* Stats Grid */}
        {statsLoading ? (
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">{stats?.totalUsers || 0}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Users className="w-3 h-3" /> Total Users
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">{stats?.totalShops || 0}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Store className="w-3 h-3" /> Total Shops
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">{stats?.totalOrders || 0}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <ShoppingCart className="w-3 h-3" /> Total Orders
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-warning">{stats?.pendingShopApprovals || 0}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Pending Approvals
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        )}

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search users, shops, orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as AdminTab)}>
          <TabsList className="grid w-full grid-cols-5 mb-4">
            <TabsTrigger value="overview" className="text-xs px-1"><BarChart3 className="w-4 h-4" /></TabsTrigger>
            <TabsTrigger value="customers" className="text-xs px-1"><Users className="w-4 h-4" /></TabsTrigger>
            <TabsTrigger value="shopkeepers" className="text-xs px-1"><Store className="w-4 h-4" /></TabsTrigger>
            <TabsTrigger value="farmers" className="text-xs px-1"><Tractor className="w-4 h-4" /></TabsTrigger>
            <TabsTrigger value="orders" className="text-xs px-1"><ShoppingCart className="w-4 h-4" /></TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <h2 className="font-semibold">{t.analytics}</h2>

            {/* Role Distribution Pie Chart */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">User Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                {stats && (stats.customerCount + stats.shopkeeperCount + stats.farmerCount) > 0 ? (
                  <ChartContainer config={roleChartConfig} className="h-[200px] w-full">
                    <PieChart>
                      <Pie
                        data={roleDistribution}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {roleDistribution.map((entry, index) => (
                          <Cell key={index} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ChartContainer>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">No user data yet</p>
                )}
              </CardContent>
            </Card>

            {/* Order Status Bar Chart */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Orders by Status</CardTitle>
              </CardHeader>
              <CardContent>
                {orderChartData.length > 0 ? (
                  <ChartContainer config={orderChartConfig} className="h-[200px] w-full">
                    <BarChart data={orderChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="status" tick={{ fontSize: 10 }} />
                      <YAxis allowDecimals={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">No orders yet</p>
                )}
              </CardContent>
            </Card>

            {/* Platform Activity */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Platform Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Shops</span>
                  <span className="font-medium">{shops.filter(s => s.is_open).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Verified Shops</span>
                  <span className="font-medium">{shops.filter(s => s.is_verified).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pending Orders</span>
                  <span className="font-medium">{stats?.pendingOrders || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available Produce</span>
                  <span className="font-medium">{produce.filter(p => p.is_available).length}</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-3">
            <h2 className="font-semibold flex items-center gap-2">
              <Users className="w-4 h-4" />
              Customers ({customers.length})
            </h2>
            {profilesLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-16 rounded-lg" />
                <Skeleton className="h-16 rounded-lg" />
              </div>
            ) : filterBySearch(customers, ['name', 'city', 'phone']).length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No customers found</p>
            ) : (
              filterBySearch(customers, ['name', 'city', 'phone']).map(customer => (
                <Card key={customer.id} className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {customer.phone || 'No phone'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {customer.city && `${customer.city}, `}{customer.state}
                      </p>
                    </div>
                    <div className="text-right">
                      {customer.is_verified ? (
                        <Badge variant="secondary" className="gap-1">
                          <CheckCircle className="w-3 h-3" /> Verified
                        </Badge>
                      ) : (
                        <Badge variant="outline">Pending</Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Shopkeepers Tab */}
          <TabsContent value="shopkeepers" className="space-y-3">
            <h2 className="font-semibold flex items-center gap-2">
              <Store className="w-4 h-4" />
              Shops ({shops.length})
            </h2>
            {shopsLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-24 rounded-lg" />
                <Skeleton className="h-24 rounded-lg" />
              </div>
            ) : filterBySearch(shops, ['name', 'city', 'address']).length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No shops found</p>
            ) : (
              filterBySearch(shops, ['name', 'city', 'address']).map(shop => (
                <Card key={shop.id} className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium">{shop.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {shop.city ? `${shop.city}, ${shop.state}` : 'No location'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Created: {shop.created_at ? format(new Date(shop.created_at), 'MMM d, yyyy') : 'N/A'}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant={shop.is_open ? 'default' : 'outline'}>
                        {shop.is_open ? 'Open' : 'Closed'}
                      </Badge>
                    </div>
                  </div>
                  {/* Verification Actions */}
                  <div className="flex items-center justify-between border-t pt-2">
                    <Badge variant={shop.is_verified ? 'secondary' : 'destructive'} className="gap-1">
                      {shop.is_verified ? (
                        <><CheckCircle className="w-3 h-3" /> Verified</>
                      ) : (
                        <><XCircle className="w-3 h-3" /> Unverified</>
                      )}
                    </Badge>
                    <div className="flex gap-2">
                      {!shop.is_verified ? (
                        <Button
                          size="sm"
                          variant="default"
                          className="h-7 text-xs"
                          onClick={() => handleVerifyShop(shop.id, true)}
                          disabled={verifyShop.isPending}
                        >
                          <CheckCircle className="w-3 h-3 mr-1" /> Verify
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs"
                          onClick={() => handleVerifyShop(shop.id, false)}
                          disabled={verifyShop.isPending}
                        >
                          <XCircle className="w-3 h-3 mr-1" /> Revoke
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Farmers Tab */}
          <TabsContent value="farmers" className="space-y-3">
            <h2 className="font-semibold flex items-center gap-2">
              <Tractor className="w-4 h-4" />
              Farmers ({farmers.length}) | Produce ({produce.length})
            </h2>
            {produceLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-16 rounded-lg" />
                <Skeleton className="h-16 rounded-lg" />
              </div>
            ) : filterBySearch(produce as any[], []).length === 0 && searchQuery ? (
              <p className="text-sm text-muted-foreground text-center py-8">No produce found</p>
            ) : produce.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No produce listed</p>
            ) : (
              produce.map((item: any) => (
                <Card key={item.id} className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{item.product?.name || 'Unknown'}</p>
                        <p className="text-xs text-muted-foreground">
                          ₹{item.price_per_kg}/kg • {item.available_quantity}kg available
                        </p>
                        {item.is_organic && (
                          <Badge variant="secondary" className="text-[10px] mt-0.5">Organic</Badge>
                        )}
                      </div>
                    </div>
                    <Badge variant={item.is_available ? 'default' : 'outline'}>
                      {item.is_available ? 'Available' : 'Out'}
                    </Badge>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-3">
            <h2 className="font-semibold flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Orders ({orders.length})
            </h2>
            {ordersLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-20 rounded-lg" />
                <Skeleton className="h-20 rounded-lg" />
              </div>
            ) : orders.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No orders yet</p>
            ) : (
              orders.map((order: any) => (
                <Card key={order.id} className="p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">Order #{order.id.slice(0, 8)}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.created_at ? format(new Date(order.created_at), 'MMM d, yyyy h:mm a') : 'N/A'}
                      </p>
                      <p className="text-sm font-medium mt-1">₹{order.total}</p>
                      {order.order_items && (
                        <p className="text-xs text-muted-foreground">
                          {order.order_items.length} item{order.order_items.length !== 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge
                        variant={
                          order.status === 'picked_up' ? 'default' :
                          order.status === 'cancelled' ? 'destructive' : 'secondary'
                        }
                      >
                        {order.status}
                      </Badge>
                      {order.is_paid && (
                        <Badge variant="outline" className="gap-1 text-primary">
                          <CheckCircle className="w-3 h-3" /> Paid
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-[10px]">
                        {order.payment_method || 'cash'}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
