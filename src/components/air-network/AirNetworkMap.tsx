"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Airport } from "@/data/airports";
import { AirRoute } from "@/data/airRoutes";
import { loadGoogleMapsLibraries, isGoogleMapsConfigured } from "@/services/map/googleMaps";
import { MapConfigurationCard } from "./MapConfigurationCard";
import { ZoomIn, ZoomOut, Compass, Maximize2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AirNetworkMapProps {
  airports: Airport[];
  routes: AirRoute[];
  selectedOrigin: string | null;
  selectedDestination: string | null;
  selectedRoute: AirRoute | null;
  selectedAirportType?: "all" | "major" | "medium" | "small";
  onSelectAirport: (code: string) => void;
  onSelectRoute: (route: AirRoute) => void;
  viewMode: "network" | "route";
  className?: string;
}

export function AirNetworkMap({
  airports,
  routes,
  selectedOrigin,
  selectedDestination,
  selectedRoute,
  selectedAirportType = "all",
  onSelectAirport,
  onSelectRoute,
  viewMode,
  className,
}: AirNetworkMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [useGoogleMaps, setUseGoogleMaps] = useState<boolean>(false);
  const [mapLoading, setMapLoading] = useState<boolean>(true);
  const [currentZoom, setCurrentZoom] = useState<number>(5);

  const googleMapInstanceRef = useRef<google.maps.Map | null>(null);
  const polylinesRef = useRef<google.maps.Polyline[]>([]);
  const markersRef = useRef<any[]>([]);
  const animatedPlaneMarkerRef = useRef<any | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const isConfigured = isGoogleMapsConfigured();

  const handleInitGoogleMaps = useCallback(() => {
    if (!isConfigured) {
      setUseGoogleMaps(false);
      setMapLoading(false);
      return;
    }

    setMapLoading(true);

    loadGoogleMapsLibraries()
      .then((success) => {
        setMapLoading(false);
        if (success) {
          setUseGoogleMaps(true);
        } else {
          setUseGoogleMaps(false);
        }
      })
      .catch(() => {
        setMapLoading(false);
        setUseGoogleMaps(false);
      });
  }, [isConfigured]);

  useEffect(() => {
    handleInitGoogleMaps();
  }, [handleInitGoogleMaps]);

  // Initialize Google Maps instance with LIGHT basemap style
  useEffect(() => {
    if (!useGoogleMaps || mapLoading || !mapRef.current || googleMapInstanceRef.current) return;

    try {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 20.5937, lng: 78.9629 }, // Centered on India
        zoom: 5,
        mapId: "DEMO_MAP_ID",
        mapTypeId: "roadmap",
        disableDefaultUI: false,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        // LIGHT MAP STYLING (Clean light basemap with natural geography)
        styles: [
          { elementType: "geometry", stylers: [{ color: "#F8FAFC" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#FFFFFF" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#334155" }] },
          { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#0F172A" }] },
          { featureType: "water", elementType: "geometry", stylers: [{ color: "#E0F2FE" }] },
          { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#0284C7" }] },
          { featureType: "road", elementType: "geometry", stylers: [{ color: "#F1F5F9" }] },
          { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#F1F5F9" }] },
          { featureType: "poi", elementType: "all", stylers: [{ visibility: "off" }] },
        ],
      });

      map.addListener("zoom_changed", () => {
        setCurrentZoom(map.getZoom() || 5);
      });

      googleMapInstanceRef.current = map;
    } catch (e) {
      console.error("Google Maps initialization error:", e);
      setUseGoogleMaps(false);
    }
  }, [useGoogleMaps, mapLoading]);

  // Filter airports by zoom level & type selection
  const visibleAirports = airports.filter((ap) => {
    if (selectedAirportType !== "all" && ap.airportType !== selectedAirportType) return false;
    if (ap.iata === selectedOrigin || ap.iata === selectedDestination || ap.code === selectedOrigin || ap.code === selectedDestination) return true;
    if (currentZoom <= 5) return ap.airportType === "major";
    if (currentZoom <= 6) return ap.airportType === "major" || ap.airportType === "medium";
    return true;
  });

  // Render Polylines, Airport Markers, and Aircraft Animation on Google Map
  useEffect(() => {
    const map = googleMapInstanceRef.current;
    if (!useGoogleMaps || !map) return;

    // 1. Clear existing polylines
    polylinesRef.current.forEach((p) => p.setMap(null));
    polylinesRef.current = [];

    // 2. Clear existing markers
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    if (animatedPlaneMarkerRef.current) {
      animatedPlaneMarkerRef.current.setMap(null);
      animatedPlaneMarkerRef.current = null;
    }

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    // 3. Draw flight route polylines
    routes.forEach((route) => {
      const orig = airports.find((a) => a.iata === route.origin || a.code === route.origin);
      const dest = airports.find((a) => a.iata === route.destination || a.code === route.destination);
      if (!orig || !dest) return;

      const isSelected = selectedRoute?.routeId === route.routeId;

      const origLat = orig.latitude || orig.lat || 0;
      const origLng = orig.longitude || orig.lng || 0;
      const destLat = dest.latitude || dest.lat || 0;
      const destLng = dest.longitude || dest.lng || 0;

      const polyline = new google.maps.Polyline({
        path: [
          { lat: origLat, lng: origLng },
          { lat: destLat, lng: destLng },
        ],
        geodesic: true,
        strokeColor: isSelected ? "#F3AC27" : route.routeColor || "#0A5B9E",
        strokeOpacity: isSelected ? 1.0 : 0.45,
        strokeWeight: isSelected ? 4 : 2,
        map: map,
      });

      polyline.addListener("click", () => {
        onSelectRoute(route);
      });

      polylinesRef.current.push(polyline);
    });

    // 4. Draw Custom Airport Markers (AdvancedMarkerElement or Marker)
    visibleAirports.forEach((ap) => {
      const lat = ap.latitude || ap.lat || 0;
      const lng = ap.longitude || ap.lng || 0;
      const isOrigin = selectedOrigin === ap.iata || selectedOrigin === ap.code;
      const isDest = selectedDestination === ap.iata || selectedDestination === ap.code;
      const isSelected = isOrigin || isDest;

      const markerContent = document.createElement("div");
      markerContent.className = "custom-airport-marker select-none cursor-pointer flex items-center gap-1.5 font-mono text-xs";
      markerContent.innerHTML = `
        <div class="w-3 h-3 rounded-full border-2 ${
          isOrigin
            ? "bg-[#0A5B9E] border-white shadow-md scale-125"
            : isDest
            ? "bg-[#4EB050] border-white shadow-md scale-125"
            : "bg-[#1E3A5F] border-white"
        }"></div>
        <span class="px-1.5 py-0.5 rounded ${
          isSelected
            ? "bg-[#0A5B9E] text-white font-bold shadow-md"
            : "bg-white text-[#14213D] border border-[#CBD5E1] shadow-2xs font-semibold"
        }">
          ${ap.iata || ap.code}
        </span>
      `;

      let marker: any;
      if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
        marker = new google.maps.marker.AdvancedMarkerElement({
          position: { lat, lng },
          map: map,
          content: markerContent,
          title: `${ap.iata} - ${ap.name}, ${ap.city}`,
        });
      } else {
        marker = new google.maps.Marker({
          position: { lat, lng },
          map: map,
          title: `${ap.iata} - ${ap.name}`,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: isSelected ? 8 : 6,
            fillColor: isOrigin ? "#0A5B9E" : isDest ? "#4EB050" : "#1E3A5F",
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#FFFFFF",
          },
        });
      }

      marker.addListener("click", () => {
        onSelectAirport(ap.iata || ap.code || "");
      });

      markersRef.current.push(marker);
    });

    // 5. Aircraft Animation along Selected Route
    if (selectedRoute) {
      const orig = airports.find((a) => a.iata === selectedRoute.origin || a.code === selectedRoute.origin);
      const dest = airports.find((a) => a.iata === selectedRoute.destination || a.code === selectedRoute.destination);
      if (orig && dest) {
        const origLat = orig.latitude || orig.lat || 0;
        const origLng = orig.longitude || orig.lng || 0;
        const destLat = dest.latitude || dest.lat || 0;
        const destLng = dest.longitude || dest.lng || 0;

        const planeSymbol = {
          path: "M 12 2 L 15 8 L 22 10 L 22 13 L 15 12 L 14 18 L 17 20 L 17 22 L 12 20 L 7 22 L 7 20 L 10 18 L 9 12 L 2 13 L 2 10 L 9 8 Z",
          fillColor: "#F3AC27",
          fillOpacity: 1,
          scale: 0.9,
          strokeColor: "#FFFFFF",
          strokeWeight: 1,
          anchor: new google.maps.Point(12, 12),
        };

        const planeMarker = new google.maps.Marker({
          position: { lat: origLat, lng: origLng },
          map: map,
          icon: planeSymbol,
        });

        animatedPlaneMarkerRef.current = planeMarker;

        let startTime: number | null = null;
        const duration = 4000;

        const animatePlane = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const elapsed = timestamp - startTime;
          const t = (elapsed % duration) / duration;

          const curLat = origLat + (destLat - origLat) * t;
          const curLng = origLng + (destLng - origLng) * t;

          planeMarker.setPosition({ lat: curLat, lng: curLng });

          animFrameRef.current = requestAnimationFrame(animatePlane);
        };

        animFrameRef.current = requestAnimationFrame(animatePlane);
      }
    }
  }, [useGoogleMaps, routes, visibleAirports, selectedRoute, selectedOrigin, selectedDestination]);

  // View Controls Actions
  const handleResetIndiaView = () => {
    if (googleMapInstanceRef.current) {
      googleMapInstanceRef.current.setCenter({ lat: 20.5937, lng: 78.9629 });
      googleMapInstanceRef.current.setZoom(5);
    }
  };

  const handleFitRoute = () => {
    if (googleMapInstanceRef.current && selectedRoute) {
      const orig = airports.find((a) => a.iata === selectedRoute.origin || a.code === selectedRoute.origin);
      const dest = airports.find((a) => a.iata === selectedRoute.destination || a.code === selectedRoute.destination);
      if (orig && dest) {
        const bounds = new google.maps.LatLngBounds();
        bounds.extend({ lat: orig.latitude || orig.lat || 0, lng: orig.longitude || orig.lng || 0 });
        bounds.extend({ lat: dest.latitude || dest.lat || 0, lng: dest.longitude || dest.lng || 0 });
        googleMapInstanceRef.current.fitBounds(bounds, 80);
      }
    }
  };

  const handleZoomIn = () => {
    if (googleMapInstanceRef.current) {
      googleMapInstanceRef.current.setZoom((googleMapInstanceRef.current.getZoom() || 5) + 1);
    }
  };

  const handleZoomOut = () => {
    if (googleMapInstanceRef.current) {
      googleMapInstanceRef.current.setZoom((googleMapInstanceRef.current.getZoom() || 5) - 1);
    }
  };

  // State 1: Loading
  if (mapLoading) {
    return (
      <div className={cn("w-full h-[580px] bg-[#F8FAFC] rounded-sih-xl border border-[#CBD5E1] shadow-sih-card flex flex-col items-center justify-center space-y-3 font-mono text-xs text-[#0A5B9E]", className)}>
        <Loader2 className="w-8 h-8 animate-spin text-[#0A5B9E]" />
        <span>Loading Air Network Explorer Map...</span>
      </div>
    );
  }

  // State 3: Configuration / API error
  if (!isConfigured || !useGoogleMaps) {
    return <MapConfigurationCard onRetry={handleInitGoogleMaps} className={className} />;
  }

  // State 2: Successful Google Maps load
  return (
    <div className={cn("relative w-full h-[580px] rounded-sih-xl border border-[#CBD5E1] overflow-hidden select-none shadow-sih-card", className)}>
      <div ref={mapRef} className="w-full h-full" />

      {/* Map Action Floating Toolbar */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
        <button
          onClick={handleResetIndiaView}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 text-[#14213D] border border-[#CBD5E1] rounded-sih-md text-xs font-mono font-bold shadow-md hover:bg-[#EAF3FB] hover:text-[#0A5B9E] transition-colors cursor-pointer"
        >
          <Compass className="w-3.5 h-3.5 text-[#0A5B9E]" />
          <span>India View</span>
        </button>

        {selectedRoute && (
          <button
            onClick={handleFitRoute}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0A5B9E] text-white rounded-sih-md text-xs font-mono font-bold shadow-md hover:bg-[#08487E] transition-colors cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Fit Route</span>
          </button>
        )}
      </div>

      {/* Custom Zoom Controls */}
      <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-1.5 bg-white/95 p-1 rounded-sih-md border border-[#CBD5E1] shadow-lg">
        <button
          onClick={handleZoomIn}
          className="p-2 text-[#14213D] hover:bg-[#EAF3FB] hover:text-[#0A5B9E] rounded transition-colors cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 text-[#14213D] hover:bg-[#EAF3FB] hover:text-[#0A5B9E] rounded transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
