import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateShop } from '@/hooks/useShopkeeper';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Store, ArrowLeft, LogOut } from 'lucide-react';

export function CreateShopForm() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const createShop = useCreateShop();

  const [form, setForm] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    createShop.mutate(form);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="sm" onClick={async () => {
            await signOut();
            navigate('/');
          }}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button variant="ghost" size="sm" onClick={() => signOut()}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Welcome */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-shopkeeper/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Store className="w-8 h-8 text-shopkeeper" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Create Your Shop</h1>
          <p className="text-muted-foreground">
            Set up your shop to start selling on Mandi Fresh
          </p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Shop Details</CardTitle>
            <CardDescription>
              Fill in your shop information. You can update this later.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Shop Name *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g., Fresh Vegetables Store"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Tell customers about your shop..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Shop address"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="City"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    placeholder="State"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  value={form.pincode}
                  onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                  placeholder="6-digit pincode"
                  maxLength={6}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={createShop.isPending || !form.name.trim()}
              >
                {createShop.isPending ? 'Creating Shop...' : 'Create Shop'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
