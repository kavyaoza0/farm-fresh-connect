import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/hooks/useAuth";
import { LocationProvider } from "@/context/LocationContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Help from "./pages/Help";
import AdminDashboard from "./pages/AdminDashboard";
import { ShopkeeperDashboard } from "./pages/ShopkeeperDashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <LocationProvider>
            <CartProvider>
              <Toaster />
              <Sonner />
              <LanguageSelector />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/dashboard/admin" element={<AdminDashboard />} />
                  <Route path="/dashboard/shopkeeper" element={<ShopkeeperDashboard />} />
                  <Route path="/dashboard/farmer" element={<FarmerDashboard />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </CartProvider>
          </LocationProvider>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
