import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserLocation {
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
}

interface LocationContextType {
  userLocation: UserLocation | null;
  setUserLocation: (location: UserLocation) => void;
  isLocationSet: boolean;
  showLocationSelector: boolean;
  setShowLocationSelector: (show: boolean) => void;
  clearLocation: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

const LOCATION_STORAGE_KEY = 'user_location';

// Major Indian cities for dropdown
export const INDIAN_CITIES = [
  { city: 'Mumbai', state: 'Maharashtra', latitude: 19.0760, longitude: 72.8777 },
  { city: 'Delhi', state: 'Delhi', latitude: 28.6139, longitude: 77.2090 },
  { city: 'Bangalore', state: 'Karnataka', latitude: 12.9716, longitude: 77.5946 },
  { city: 'Hyderabad', state: 'Telangana', latitude: 17.3850, longitude: 78.4867 },
  { city: 'Chennai', state: 'Tamil Nadu', latitude: 13.0827, longitude: 80.2707 },
  { city: 'Kolkata', state: 'West Bengal', latitude: 22.5726, longitude: 88.3639 },
  { city: 'Pune', state: 'Maharashtra', latitude: 18.5204, longitude: 73.8567 },
  { city: 'Ahmedabad', state: 'Gujarat', latitude: 23.0225, longitude: 72.5714 },
  { city: 'Jaipur', state: 'Rajasthan', latitude: 26.9124, longitude: 75.7873 },
  { city: 'Lucknow', state: 'Uttar Pradesh', latitude: 26.8467, longitude: 80.9462 },
  { city: 'Surat', state: 'Gujarat', latitude: 21.1702, longitude: 72.8311 },
  { city: 'Nagpur', state: 'Maharashtra', latitude: 21.1458, longitude: 79.0882 },
  { city: 'Indore', state: 'Madhya Pradesh', latitude: 22.7196, longitude: 75.8577 },
  { city: 'Bhopal', state: 'Madhya Pradesh', latitude: 23.2599, longitude: 77.4126 },
  { city: 'Patna', state: 'Bihar', latitude: 25.5941, longitude: 85.1376 },
  { city: 'Vadodara', state: 'Gujarat', latitude: 22.3072, longitude: 73.1812 },
  { city: 'Coimbatore', state: 'Tamil Nadu', latitude: 11.0168, longitude: 76.9558 },
  { city: 'Kochi', state: 'Kerala', latitude: 9.9312, longitude: 76.2673 },
  { city: 'Visakhapatnam', state: 'Andhra Pradesh', latitude: 17.6868, longitude: 83.2185 },
  { city: 'Chandigarh', state: 'Punjab', latitude: 30.7333, longitude: 76.7794 },
];

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userLocation, setUserLocationState] = useState<UserLocation | null>(null);
  const [showLocationSelector, setShowLocationSelector] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LOCATION_STORAGE_KEY);
    if (stored) {
      try {
        setUserLocationState(JSON.parse(stored));
      } catch {
        localStorage.removeItem(LOCATION_STORAGE_KEY);
      }
    }
  }, []);

  const setUserLocation = (location: UserLocation) => {
    setUserLocationState(location);
    localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(location));
    setShowLocationSelector(false);
  };

  const clearLocation = () => {
    setUserLocationState(null);
    localStorage.removeItem(LOCATION_STORAGE_KEY);
  };

  return (
    <LocationContext.Provider
      value={{
        userLocation,
        setUserLocation,
        isLocationSet: !!userLocation,
        showLocationSelector,
        setShowLocationSelector,
        clearLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
