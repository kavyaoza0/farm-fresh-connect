import { Header } from '@/components/Header';
import { MessageSquare, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Help() {
  return (
    <div className="min-h-screen bg-background">
      <Header title="Help & Support" showLocation={false} showCart={false} />
      
      <main className="container max-w-lg mx-auto px-4 py-6">
        {/* Contact Admin */}
        <section className="bg-card rounded-xl p-6 shadow-card mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Contact Admin</h2>
              <p className="text-sm text-muted-foreground">Get help with any issues</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            All communication on this platform is mediated by our admin team for safety 
            and transparency. Submit your request and we'll respond within 24 hours.
          </p>

          <Button className="w-full">Submit a Request</Button>
        </section>

        {/* Contact Methods */}
        <section className="mb-6">
          <h2 className="font-semibold text-foreground mb-4">Other Ways to Reach Us</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-4 bg-card rounded-xl p-4 shadow-card">
              <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground text-sm">Phone Support</h3>
                <p className="text-xs text-muted-foreground">+91 1800-XXX-XXXX (Toll Free)</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-card rounded-xl p-4 shadow-card">
              <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground text-sm">Email</h3>
                <p className="text-xs text-muted-foreground">support@mandifresh.in</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-card rounded-xl p-4 shadow-card">
              <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground text-sm">Support Hours</h3>
                <p className="text-xs text-muted-foreground">Mon-Sat: 9 AM - 6 PM IST</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-6">
          <h2 className="font-semibold text-foreground mb-4">Common Questions</h2>
          <div className="space-y-3">
            <div className="bg-card rounded-xl p-4 shadow-card">
              <h3 className="font-medium text-foreground text-sm mb-1">How do I place an order?</h3>
              <p className="text-xs text-muted-foreground">
                Browse shops, add items to cart, and checkout. All orders are pickup-only.
              </p>
            </div>

            <div className="bg-card rounded-xl p-4 shadow-card">
              <h3 className="font-medium text-foreground text-sm mb-1">How do I become a shopkeeper?</h3>
              <p className="text-xs text-muted-foreground">
                Sign up via the Shopkeeper Dashboard in the menu. Admin approval is required.
              </p>
            </div>

            <div className="bg-card rounded-xl p-4 shadow-card">
              <h3 className="font-medium text-foreground text-sm mb-1">How do I register as a farmer?</h3>
              <p className="text-xs text-muted-foreground">
                Sign up via the Farmer Dashboard in the menu. Admin verification is required.
              </p>
            </div>

            <div className="bg-card rounded-xl p-4 shadow-card">
              <h3 className="font-medium text-foreground text-sm mb-1">Can I contact sellers directly?</h3>
              <p className="text-xs text-muted-foreground">
                No. All communication is admin-mediated for safety. Submit requests through the platform.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
