import { useState } from 'react';
import { Shop } from '@/types';
import { useUpdateShop } from '@/hooks/useShopkeeper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MapPin, Navigation } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { INDIAN_CITIES } from '@/context/LocationContext';
import { ShopMap } from '@/components/ShopMap';

interface ShopLocationSetupProps {
  shop: Shop;
}

export function ShopLocationSetup({ shop }: ShopLocationSetupProps) {
  const { t } = useLanguage();
  const updateShop = useUpdateShop();
  const [isOpen, setIsOpen] = useState(false);
  const [locationForm, setLocationForm] = useState({
    city: shop.location.city || '',
    state: shop.location.state || '',
    pincode: shop.location.pincode || '',
    address: shop.location.address || '',
    latitude: shop.location.latitude || 0,
    longitude: shop.location.longitude || 0,
  });

  const handleCityChange = (cityName: string) => {
    const cityData = INDIAN_CITIES.find(c => c.city === cityName);
    if (cityData) {
      setLocationForm(prev => ({
        ...prev,
        city: cityData.city,
        state: cityData.state,
        latitude: cityData.latitude,
        longitude: cityData.longitude,
      }));
    }
  };

  const handleMapLocationSelect = (lat: number, lng: number) => {
    setLocationForm(prev => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));

    // Find nearest city
    let nearestCity = INDIAN_CITIES[0];
    let minDistance = Infinity;

    INDIAN_CITIES.forEach(city => {
      const distance = Math.sqrt(
        Math.pow(city.latitude - lat, 2) + Math.pow(city.longitude - lng, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestCity = city;
      }
    });

    if (minDistance < 1) {
      setLocationForm(prev => ({
        ...prev,
        city: nearestCity.city,
        state: nearestCity.state,
      }));
    }
  };

  const handleUseCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleMapLocationSelect(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const handleSave = () => {
    updateShop.mutate({
      shopId: shop.id,
      updates: locationForm,
    });
    setIsOpen(false);
  };

  const hasLocation = locationForm.latitude !== 0 && locationForm.longitude !== 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {t.setLocation}
          </CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                {hasLocation ? t.changeLocation : t.setLocation}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{t.setLocation}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {/* City Selection */}
                <div className="space-y-2">
                  <Label>{t.selectCity}</Label>
                  <Select value={locationForm.city} onValueChange={handleCityChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={t.selectCity} />
                    </SelectTrigger>
                    <SelectContent>
                      {INDIAN_CITIES.map(city => (
                        <SelectItem key={city.city} value={city.city}>
                          {city.city}, {city.state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Pincode */}
                <div className="space-y-2">
                  <Label>{t.pincode}</Label>
                  <Input
                    value={locationForm.pincode}
                    onChange={(e) => setLocationForm(prev => ({ ...prev, pincode: e.target.value }))}
                    placeholder={t.enterPincode}
                    maxLength={6}
                  />
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label>{t.city}</Label>
                  <Input
                    value={locationForm.address}
                    onChange={(e) => setLocationForm(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter full address"
                  />
                </div>

                {/* Map for pin selection */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>{t.selectOnMap}</Label>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleUseCurrentLocation}
                      className="text-xs"
                    >
                      <Navigation className="w-3 h-3 mr-1" />
                      {t.useCurrentLocation}
                    </Button>
                  </div>
                  <div className="h-[200px] rounded-lg overflow-hidden border">
                    <ShopMap
                      shops={[]}
                      userLocation={hasLocation ? {
                        city: locationForm.city,
                        state: locationForm.state,
                        pincode: locationForm.pincode,
                        latitude: locationForm.latitude,
                        longitude: locationForm.longitude,
                      } : undefined}
                      interactive={true}
                      onLocationSelect={handleMapLocationSelect}
                    />
                  </div>
                  {hasLocation && (
                    <p className="text-xs text-muted-foreground">
                      📍 {locationForm.latitude.toFixed(4)}, {locationForm.longitude.toFixed(4)}
                    </p>
                  )}
                </div>

                <Button 
                  onClick={handleSave} 
                  className="w-full"
                  disabled={updateShop.isPending}
                >
                  {t.save}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {hasLocation ? (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {locationForm.address && `${locationForm.address}, `}
              {locationForm.city && `${locationForm.city}, `}
              {locationForm.state && `${locationForm.state} `}
              {locationForm.pincode && `- ${locationForm.pincode}`}
            </p>
            <div className="h-[120px] rounded-lg overflow-hidden">
              <ShopMap
                shops={[]}
                userLocation={{
                  city: locationForm.city,
                  state: locationForm.state,
                  pincode: locationForm.pincode,
                  latitude: locationForm.latitude,
                  longitude: locationForm.longitude,
                }}
                interactive={false}
              />
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            {t.setYourLocation}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
