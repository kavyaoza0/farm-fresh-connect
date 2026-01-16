import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
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
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  useAdminStats, 
  useAllProfiles, 
  useAllUserRoles,
  useAllShops, 
  useAllOrders, 
  useAllFarmerProduce 
} from '@/hooks/useAdmin';
import { format } from 'date-fns';

type AdminTab = 'overview' | 'customers' | 'shopkeepers' | 'farmers' | 'orders';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: profiles = [], isLoading: profilesLoading } = useAllProfiles();
  const { data: userRoles = [] } = useAllUserRoles();
  const { data: shops = [], isLoading: shopsLoading } = useAllShops();
  const { data: orders = [], isLoading: ordersLoading } = useAllOrders();
  const { data: produce = [], isLoading: produceLoading } = useAllFarmerProduce();

  // Create a map of user_id to roles
  const roleMap = new Map<string, string[]>();
  userRoles.forEach(ur => {
    const existing = roleMap.get(ur.user_id) || [];
    roleMap.set(ur.user_id, [...existing, ur.role]);
  });

  // Filter profiles by role
  const customers = profiles.filter(p => roleMap.get(p.id)?.includes('customer'));
  const shopkeepers = profiles.filter(p => roleMap.get(p.id)?.includes('shopkeeper'));
  const farmers = profiles.filter(p => roleMap.get(p.id)?.includes('farmer'));

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title={t.adminDashboard} showLocation={false} showCart={false} />
      
      {/* Back Button */}
      <div className="container max-w-lg mx-auto px-4 py-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="gap-1"
        >
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
          <p className="text-primary-foreground/80 text-sm">
            {t.platformManagement}
          </p>
        </div>

        {/* Stats Grid */}
        {statsLoading ? (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-20 rounded-xl" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">{stats?.totalUsers || 0}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  Total Users
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">{stats?.totalShops || 0}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Store className="w-3 h-3" />
                  Total Shops
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">{stats?.totalOrders || 0}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <ShoppingCart className="w-3 h-3" />
                  Total Orders
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">{stats?.pendingShopApprovals || 0}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Pending Approvals
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        )}

        {/* Tabs for Different Sections */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as AdminTab)}>
          <TabsList className="grid w-full grid-cols-5 mb-4">
            <TabsTrigger value="overview" className="text-xs px-1">
              <BarChart3 className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="customers" className="text-xs px-1">
              <Users className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="shopkeepers" className="text-xs px-1">
              <Store className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="farmers" className="text-xs px-1">
              <Tractor className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="orders" className="text-xs px-1">
              <ShoppingCart className="w-4 h-4" />
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <h2 className="font-semibold">{t.analytics}</h2>
            <div className="grid grid-cols-3 gap-2">
              <Card className="p-3 text-center">
                <p className="text-xl font-bold text-primary">{stats?.customerCount || 0}</p>
                <p className="text-xs text-muted-foreground">Customers</p>
              </Card>
              <Card className="p-3 text-center">
                <p className="text-xl font-bold text-secondary">{stats?.shopkeeperCount || 0}</p>
                <p className="text-xs text-muted-foreground">Shopkeepers</p>
              </Card>
              <Card className="p-3 text-center">
                <p className="text-xl font-bold text-success">{stats?.farmerCount || 0}</p>
                <p className="text-xs text-muted-foreground">Farmers</p>
              </Card>
            </div>
            
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
            ) : customers.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No customers yet</p>
            ) : (
              customers.slice(0, 10).map(customer => (
                <Card key={customer.id} className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {customer.city && `${customer.city}, `}{customer.state}
                      </p>
                    </div>
                    <div className="text-right">
                      {customer.is_verified ? (
                        <Badge variant="secondary" className="gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Verified
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
                <Skeleton className="h-20 rounded-lg" />
                <Skeleton className="h-20 rounded-lg" />
              </div>
            ) : shops.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No shops registered</p>
            ) : (
              shops.slice(0, 10).map(shop => (
                <Card key={shop.id} className="p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{shop.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {shop.city ? `${shop.city}, ${shop.state}` : 'No location'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Created: {shop.created_at ? format(new Date(shop.created_at), 'MMM d, yyyy') : 'N/A'}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {shop.is_verified ? (
                        <Badge variant="secondary" className="gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="destructive">Unverified</Badge>
                      )}
                      <Badge variant={shop.is_open ? "default" : "outline"}>
                        {shop.is_open ? 'Open' : 'Closed'}
                      </Badge>
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
            ) : produce.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No produce listed</p>
            ) : (
              produce.slice(0, 10).map((item: any) => (
                <Card key={item.id} className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <p className="font-medium">{item.product?.name || 'Unknown'}</p>
                        <p className="text-xs text-muted-foreground">
                          ₹{item.price_per_kg}/kg • {item.available_quantity}kg available
                        </p>
                      </div>
                    </div>
                    <Badge variant={item.is_available ? "default" : "outline"}>
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
              orders.slice(0, 10).map((order: any) => (
                <Card key={order.id} className="p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">Order #{order.id.slice(0, 8)}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.created_at ? format(new Date(order.created_at), 'MMM d, yyyy h:mm a') : 'N/A'}
                      </p>
                      <p className="text-sm font-medium mt-1">₹{order.total}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant={
                        order.status === 'completed' || order.status === 'picked_up' ? 'default' :
                        order.status === 'cancelled' ? 'destructive' : 'secondary'
                      }>
                        {order.status}
                      </Badge>
                      {order.is_paid && (
                        <Badge variant="outline" className="gap-1 text-success">
                          <CheckCircle className="w-3 h-3" />
                          Paid
                        </Badge>
                      )}
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
