import { Header } from '@/components/Header';
import { Users, Store, Tractor, FileText, Shield, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header title="Admin Dashboard" showLocation={false} showCart={false} />
      
      <main className="container max-w-lg mx-auto px-4 py-6">
        {/* Welcome */}
        <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8" />
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
          <p className="text-primary-foreground/80 text-sm">
            Full control over platform users, listings, and requests.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold">24</CardTitle>
              <CardDescription>Pending Approvals</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold">156</CardTitle>
              <CardDescription>Active Requests</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Management Sections */}
        <h2 className="font-semibold text-foreground mb-4">Management</h2>
        <div className="space-y-3">
          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">User Management</h3>
                <p className="text-sm text-muted-foreground">Verify accounts, manage roles</p>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <Store className="w-6 h-6 text-secondary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Shop Approvals</h3>
                <p className="text-sm text-muted-foreground">Review and approve shops</p>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <Tractor className="w-6 h-6 text-success" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Farmer Verification</h3>
                <p className="text-sm text-muted-foreground">Verify farmer accounts</p>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-warning" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Requests & Disputes</h3>
                <p className="text-sm text-muted-foreground">Handle user requests</p>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Analytics</h3>
                <p className="text-sm text-muted-foreground">View platform statistics</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Note */}
        <div className="mt-6 p-4 bg-muted/50 rounded-xl">
          <p className="text-xs text-muted-foreground text-center">
            🚧 Full admin features coming soon. This is a preview of the dashboard structure.
          </p>
        </div>
      </main>
    </div>
  );
}
