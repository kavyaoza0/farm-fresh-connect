import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Package, ShoppingCart, BarChart3, LogOut } from 'lucide-react';
import { ProduceOverview } from '@/components/farmer/ProduceOverview';
import { ProduceManagement } from '@/components/farmer/ProduceManagement';
import { BulkOrderManagement } from '@/components/farmer/BulkOrderManagement';
import { useMyProduce, useBulkOrderRequests } from '@/hooks/useFarmer';
import { useAuth } from '@/hooks/useAuth';

export default function FarmerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { data: produce, isLoading: produceLoading } = useMyProduce();
  const { data: bulkOrders, isLoading: ordersLoading } = useBulkOrderRequests();
  const { signOut } = useAuth();

  const pendingOrders = bulkOrders?.filter(o => o.status === 'pending').length || 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground p-4 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Farmer Dashboard</h1>
            <p className="text-primary-foreground/80 text-sm">Manage your produce and orders</p>
          </div>
          <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10" onClick={() => signOut()}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      <div className="p-4 -mt-2">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="overview" className="flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="produce" className="flex items-center gap-1.5">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Produce</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-1.5 relative">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
              {pendingOrders > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {pendingOrders}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <ProduceOverview 
              produce={produce || []} 
              bulkOrders={bulkOrders || []} 
              isLoading={produceLoading || ordersLoading}
            />
          </TabsContent>

          <TabsContent value="produce" className="mt-0">
            <ProduceManagement />
          </TabsContent>

          <TabsContent value="orders" className="mt-0">
            <BulkOrderManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
