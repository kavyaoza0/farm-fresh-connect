import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Shop } from '@/types';
import { UserLocation } from '@/context/LocationContext';

// Fix for default marker icons in Leaflet with bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface ShopMapProps {
  shops: Shop[];
  userLocation: UserLocation | null;
  onLocationSelect?: (lat: number, lng: number) => void;
  onShopSelect?: (shop: Shop) => void;
  interactive?: boolean;
  className?: string;
}

export const ShopMap: React.FC<ShopMapProps> = ({
  shops,
  userLocation,
  onLocationSelect,
  onShopSelect,
  interactive = false,
  className = '',
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    const centerLat = userLocation?.latitude ?? 20.5937;
    const centerLng = userLocation?.longitude ?? 78.9629;

    // Initialize map
    map.current = L.map(mapContainer.current).setView(
      [centerLat, centerLng],
      userLocation ? 11 : 4
    );

    // Add OpenStreetMap tiles (free!)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map.current);

    // Handle click for location selection
    if (interactive && onLocationSelect) {
      map.current.on('click', (e: L.LeafletMouseEvent) => {
        onLocationSelect(e.latlng.lat, e.latlng.lng);
      });
    }

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      map.current?.remove();
      map.current = null;
    };
  }, [userLocation?.latitude, userLocation?.longitude, interactive, onLocationSelect]);

  // Add markers
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // User location marker (blue)
    if (userLocation) {
      const userIcon = L.divIcon({
        className: 'user-marker',
        html: `
          <div style="
            width: 20px;
            height: 20px;
            background: hsl(199, 89%, 48%);
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          "></div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      const userMarker = L.marker([userLocation.latitude, userLocation.longitude], { icon: userIcon })
        .addTo(map.current)
        .bindPopup('Your Location');

      markersRef.current.push(userMarker);
    }

    // Shop markers (green)
    shops.forEach(shop => {
      if (shop.location.latitude && shop.location.longitude) {
        const shopIcon = L.divIcon({
          className: 'shop-marker',
          html: `
            <div style="
              width: 32px;
              height: 32px;
              background: hsl(142, 55%, 35%);
              border: 3px solid white;
              border-radius: 50%;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
            ">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        const marker = L.marker([shop.location.latitude, shop.location.longitude], { icon: shopIcon })
          .addTo(map.current!)
          .bindPopup(`
            <div style="padding: 4px;">
              <strong>${shop.name}</strong>
              <p style="margin: 4px 0 0; font-size: 12px; color: #666;">
                ${shop.location.city}${shop.isOpen ? ' • Open' : ' • Closed'}
              </p>
            </div>
          `);

        if (onShopSelect) {
          marker.on('click', () => onShopSelect(shop));
        }

        markersRef.current.push(marker);
      }
    });
  }, [shops, userLocation, onShopSelect]);

  return <div ref={mapContainer} className={`w-full h-full ${className}`} />;
};
