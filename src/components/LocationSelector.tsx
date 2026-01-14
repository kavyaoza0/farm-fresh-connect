import React, { useState } from 'react';
import { MapPin, X, Navigation, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocation, INDIAN_CITIES, UserLocation } from '@/context/LocationContext';
import { ShopMap } from '@/components/ShopMap';
import { Shop } from '@/types';

interface LocationSelectorProps {
  shops?: Shop[];
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({ shops = [] }) => {
  const { showLocationSelector, setShowLocationSelector, setUserLocation, userLocation } = useLocation();
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [pincode, setPincode] = useState('');
  const [pincodeError, setPincodeError] = useState('');
  const [isLoadingPincode, setIsLoadingPincode] = useState(false);

  const handleCitySelect = (cityName: string) => {
    const city = INDIAN_CITIES.find(c => c.city === cityName);
    if (city) {
      setSelectedCity(cityName);
      setUserLocation({
        city: city.city,
        state: city.state,
        pincode: '',
        latitude: city.latitude,
        longitude: city.longitude,
      });
    }
  };

  const handlePincodeSubmit = async () => {
    if (!/^\d{6}$/.test(pincode)) {
      setPincodeError('Please enter a valid 6-digit pincode');
      return;
    }

    setIsLoadingPincode(true);
    setPincodeError('');

    try {
      // Use a simple geocoding approach - map common pincode prefixes to cities
      const location = getPincodeLocation(pincode);
      if (location) {
        setUserLocation(location);
      } else {
        setPincodeError('Could not find location for this pincode');
      }
    } catch {
      setPincodeError('Error looking up pincode');
    } finally {
      setIsLoadingPincode(false);
    }
  };

  const handleMapLocationSelect = (lat: number, lng: number) => {
    // Find nearest city based on coordinates
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

    setUserLocation({
      city: nearestCity.city,
      state: nearestCity.state,
      pincode: '',
      latitude: lat,
      longitude: lng,
    });
  };

  const handleUseCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleMapLocationSelect(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  };

  return (
    <Dialog open={showLocationSelector} onOpenChange={setShowLocationSelector}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Select Your Location
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="city" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="city">City</TabsTrigger>
            <TabsTrigger value="pincode">Pincode</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
          </TabsList>

          <TabsContent value="city" className="space-y-4 mt-4">
            <Select value={selectedCity} onValueChange={handleCitySelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select your city" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {INDIAN_CITIES.map((city) => (
                  <SelectItem key={city.city} value={city.city}>
                    {city.city}, {city.state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleUseCurrentLocation}
            >
              <Navigation className="w-4 h-4 mr-2" />
              Use Current Location
            </Button>
          </TabsContent>

          <TabsContent value="pincode" className="space-y-4 mt-4">
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter 6-digit pincode"
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value.replace(/\D/g, '').slice(0, 6));
                    setPincodeError('');
                  }}
                  maxLength={6}
                />
                <Button onClick={handlePincodeSubmit} disabled={isLoadingPincode}>
                  <Search className="w-4 h-4" />
                </Button>
              </div>
              {pincodeError && (
                <p className="text-sm text-destructive">{pincodeError}</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="map" className="mt-4">
            <div className="h-64 rounded-lg overflow-hidden border">
              <ShopMap
                shops={shops}
                userLocation={userLocation}
                onLocationSelect={handleMapLocationSelect}
                interactive
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Click on the map to select your location
            </p>
          </TabsContent>
        </Tabs>

        {userLocation && (
          <div className="mt-4 p-3 bg-muted rounded-lg flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">{userLocation.city}</p>
              <p className="text-sm text-muted-foreground">{userLocation.state}</p>
            </div>
            <Button
              size="sm"
              onClick={() => setShowLocationSelector(false)}
            >
              Confirm
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

// Helper function to map pincodes to locations
function getPincodeLocation(pincode: string): UserLocation | null {
  const prefix = pincode.slice(0, 2);
  
  const pincodeMap: Record<string, { city: string; state: string; lat: number; lng: number }> = {
    '40': { city: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lng: 72.8777 },
    '41': { city: 'Pune', state: 'Maharashtra', lat: 18.5204, lng: 73.8567 },
    '11': { city: 'Delhi', state: 'Delhi', lat: 28.6139, lng: 77.2090 },
    '56': { city: 'Bangalore', state: 'Karnataka', lat: 12.9716, lng: 77.5946 },
    '50': { city: 'Hyderabad', state: 'Telangana', lat: 17.3850, lng: 78.4867 },
    '60': { city: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707 },
    '70': { city: 'Kolkata', state: 'West Bengal', lat: 22.5726, lng: 88.3639 },
    '38': { city: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lng: 72.5714 },
    '30': { city: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873 },
    '22': { city: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462 },
  };

  const match = pincodeMap[prefix];
  if (match) {
    return {
      city: match.city,
      state: match.state,
      pincode,
      latitude: match.lat,
      longitude: match.lng,
    };
  }

  return null;
}
