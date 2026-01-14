import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Shop } from '@/types';
import { UserLocation } from '@/context/LocationContext';
import { supabase } from '@/integrations/supabase/client';

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
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [mapboxToken, setMapboxToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Mapbox token from edge function
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-mapbox-token');
        if (error) throw error;
        setMapboxToken(data.token);
      } catch (err) {
        console.error('Failed to fetch Mapbox token:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    const centerLat = userLocation?.latitude ?? 20.5937;
    const centerLng = userLocation?.longitude ?? 78.9629;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [centerLng, centerLat],
      zoom: userLocation ? 11 : 4,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    if (interactive && onLocationSelect) {
      map.current.on('click', (e) => {
        onLocationSelect(e.lngLat.lat, e.lngLat.lng);
      });
    }

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      map.current?.remove();
    };
  }, [mapboxToken, userLocation?.latitude, userLocation?.longitude, interactive, onLocationSelect]);

  // Add shop markers
  useEffect(() => {
    if (!map.current || !mapboxToken) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add user location marker
    if (userLocation) {
      const userMarkerEl = document.createElement('div');
      userMarkerEl.className = 'user-marker';
      userMarkerEl.innerHTML = `
        <div style="
          width: 20px;
          height: 20px;
          background: hsl(199, 89%, 48%);
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        "></div>
      `;

      const userMarker = new mapboxgl.Marker(userMarkerEl)
        .setLngLat([userLocation.longitude, userLocation.latitude])
        .addTo(map.current);

      markersRef.current.push(userMarker);
    }

    // Add shop markers
    shops.forEach(shop => {
      if (shop.location.latitude && shop.location.longitude) {
        const markerEl = document.createElement('div');
        markerEl.className = 'shop-marker';
        markerEl.innerHTML = `
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
        `;

        if (onShopSelect) {
          markerEl.addEventListener('click', () => onShopSelect(shop));
        }

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div style="padding: 8px;">
            <strong>${shop.name}</strong>
            <p style="margin: 4px 0 0; font-size: 12px; color: #666;">
              ${shop.location.city}${shop.isOpen ? ' • Open' : ' • Closed'}
            </p>
          </div>
        `);

        const marker = new mapboxgl.Marker(markerEl)
          .setLngLat([shop.location.longitude, shop.location.latitude])
          .setPopup(popup)
          .addTo(map.current!);

        markersRef.current.push(marker);
      }
    });
  }, [shops, userLocation, mapboxToken, onShopSelect]);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center bg-muted ${className}`}>
        <div className="animate-pulse text-muted-foreground">Loading map...</div>
      </div>
    );
  }

  if (!mapboxToken) {
    return (
      <div className={`flex items-center justify-center bg-muted text-muted-foreground p-4 text-center ${className}`}>
        <p>Map unavailable. Please configure Mapbox token.</p>
      </div>
    );
  }

  return <div ref={mapContainer} className={`w-full h-full ${className}`} />;
};
