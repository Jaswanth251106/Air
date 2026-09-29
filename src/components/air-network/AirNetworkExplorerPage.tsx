"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContentGrid } from "@/components/layout/ContentGrid";
import { StatCard } from "@/components/data-display/StatCard";
import { DataStatus } from "@/components/status/DataStatus";
import { AIRPORTS_DATA, Airport, getAirportByCode } from "@/data/airports";
import { AIR_ROUTES_DATA, AirRoute, getOrCreateRoute } from "@/data/airRoutes";
import { AirNetworkMap } from "./AirNetworkMap";
import { AirNetworkFilters } from "./AirNetworkFilters";
import { RouteDetailsPanel } from "./RouteDetailsPanel";
import { RouteLegend } from "./RouteLegend";
import { MapPin, Plane, Layers, Activity } from "lucide-react";

function AirNetworkExplorerContent() {
  const searchParams = useSearchParams();

  // Query Params Initialization
  const paramFrom = searchParams.get("from") || searchParams.get("origin") || "BOM";
  const paramTo = searchParams.get("to") || searchParams.get("destination") || "CCU";
  const paramWindow = searchParams.get("window") || "T+30";

  // Selection & Filter States
  const [selectedOrigin, setSelectedOrigin] = useState<string | null>(paramFrom);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(paramTo);
  const [selectedAirline, setSelectedAirline] = useState<string>("All Airlines");
  const [selectedSource, setSelectedSource] = useState<string>("All Sources");
  const [selectedCabin, setSelectedCabin] = useState<string>("All Cabins");
  const [selectedWindow, setSelectedWindow] = useState<string>(paramWindow);
  const [selectedAirportType, setSelectedAirportType] = useState<"all" | "major" | "medium" | "small">("all");
  const [selectedRouteType, setSelectedRouteType] = useState<"all" | "domestic" | "international">("all");
  const [departureDate, setDepartureDate] = useState<string>("2026-09-28");
  const [viewMode, setViewMode] = useState<"network" | "route">("network");
  const [selectedRoute, setSelectedRoute] = useState<AirRoute | null>(null);

  // Sync selected route when origin or destination changes
  useEffect(() => {
    if (selectedOrigin && selectedDestination) {
      const route = getOrCreateRoute(selectedOrigin, selectedDestination);
      setSelectedRoute(route);
    } else if (selectedOrigin) {
      const fallback = AIR_ROUTES_DATA.find((r) => r.origin === selectedOrigin);
      if (fallback) {
        setSelectedRoute(fallback);
      } else {
        const dest = AIRPORTS_DATA.find((a) => a.iata !== selectedOrigin && a.code !== selectedOrigin);
        if (dest) {
          setSelectedRoute(getOrCreateRoute(selectedOrigin, dest.iata));
        }
      }
    } else {
      setSelectedRoute(AIR_ROUTES_DATA[0]);
    }
  }, [selectedOrigin, selectedDestination]);

  // Filtered routes based on active filters
  const filteredRoutes = useMemo(() => {
    const list = AIR_ROUTES_DATA.filter((r) => {
      if (viewMode === "route" && selectedOrigin && selectedDestination) {
        if (r.origin !== selectedOrigin || r.destination !== selectedDestination) return false;
      } else if (selectedOrigin) {
        if (r.origin !== selectedOrigin && r.destination !== selectedOrigin) return false;
      }

      if (selectedDestination && viewMode === "network") {
        if (r.destination !== selectedDestination) return false;
      }

      if (selectedAirline !== "All Airlines" && r.airline !== selectedAirline) return false;
      if (selectedSource !== "All Sources" && r.sourceType !== selectedSource) return false;
      if (selectedCabin !== "All Cabins" && r.cabin !== selectedCabin) return false;
      if (selectedRouteType !== "all" && r.routeType !== selectedRouteType) return false;

      return true;
    });

    if (selectedRoute && !list.some((r) => r.routeId === selectedRoute.routeId)) {
      list.push(selectedRoute);
    }

    return list;
  }, [selectedOrigin, selectedDestination, selectedAirline, selectedSource, selectedCabin, selectedRouteType, viewMode, selectedRoute]);

  const activeOriginAirport = useMemo(() => {
    return selectedOrigin ? getAirportByCode(selectedOrigin) : undefined;
  }, [selectedOrigin]);

  const activeDestAirport = useMemo(() => {
    return selectedDestination ? getAirportByCode(selectedDestination) : undefined;
  }, [selectedDestination]);

  const handleResetFilters = () => {
    setSelectedOrigin("BOM");
    setSelectedDestination("CCU");
    setSelectedAirline("All Airlines");
    setSelectedSource("All Sources");
    setSelectedCabin("All Cabins");
    setSelectedWindow("T+30");
    setSelectedAirportType("all");
    setSelectedRouteType("all");
    setViewMode("network");
  };

  return (
    <div className="flex-1 p-4 lg:p-8 max-w-[1440px] mx-auto w-full space-y-6 select-none">
      {/* 1. Page Header */}
      <PageHeader
        title="Air Network Explorer"
        description="Geographic flight route map, airport nodes, and spatial fare dynamics across Indian civil aviation corridors."
        breadcrumbItems={[
          { label: "Air Network Explorer", href: "/air-network" },
        ]}
        action={
          <div className="flex items-center gap-3">
            <DataStatus label="Geographic Stream" variant="prototype" />
          </div>
        }
      />

      {/* 2. Top Summary Metric Cards */}
      <ContentGrid columns={4}>
        <StatCard
          label="Monitored Civil Airports"
          value={`${AIRPORTS_DATA.length} Stations`}
          subtext="OurAirports civil aviation dataset"
          icon={<MapPin className="w-4 h-4 text-[#0A5B9E]" />}
        />
        <StatCard
          label="Active Corridors"
          value={`${AIR_ROUTES_DATA.length} Routes`}
          subtext="Trunk & feeder network"
          accentColor="#7DC9DE"
          icon={<Plane className="w-4 h-4 text-[#7DC9DE]" />}
        />
        <StatCard
          label="Active Window"
          value={selectedWindow}
          subtext="Advance booking horizon"
          accentColor="#568AB2"
          icon={<Layers className="w-4 h-4 text-[#568AB2]" />}
        />
        <StatCard
          label="Selected Fare"
          value={selectedRoute ? `₹${selectedRoute.totalFare.toLocaleString("en-IN")}` : "₹6,700"}
          subtext={selectedRoute ? `${selectedRoute.origin} → ${selectedRoute.destination}` : "BOM → CCU"}
          accentColor="#4EB050"
          icon={<Activity className="w-4 h-4 text-[#4EB050]" />}
        />
      </ContentGrid>

      {/* 3. Filter Controls Panel */}
      <AirNetworkFilters
        airports={AIRPORTS_DATA}
        origin={selectedOrigin}
        destination={selectedDestination}
        selectedAirline={selectedAirline}
        selectedSource={selectedSource}
        selectedCabin={selectedCabin}
        selectedWindow={selectedWindow}
        selectedAirportType={selectedAirportType}
        selectedRouteType={selectedRouteType}
        departureDate={departureDate}
        viewMode={viewMode}
        onOriginChange={setSelectedOrigin}
        onDestinationChange={setSelectedDestination}
        onAirlineChange={setSelectedAirline}
        onSourceChange={setSelectedSource}
        onCabinChange={setSelectedCabin}
        onWindowChange={setSelectedWindow}
        onAirportTypeChange={setSelectedAirportType}
        onRouteTypeChange={setSelectedRouteType}
        onDateChange={setDepartureDate}
        onViewModeChange={setViewMode}
        onResetFilters={handleResetFilters}
      />

      {/* 4. Main Geographic Explorer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Center Map Section */}
        <div className="lg:col-span-8 space-y-3">
          <AirNetworkMap
            airports={AIRPORTS_DATA}
            routes={filteredRoutes}
            selectedOrigin={selectedOrigin}
            selectedDestination={selectedDestination}
            selectedRoute={selectedRoute}
            selectedAirportType={selectedAirportType}
            onSelectAirport={(code) => {
              setSelectedOrigin(code);
              setViewMode("network");
            }}
            onSelectRoute={(r) => {
              setSelectedRoute(r);
              setSelectedOrigin(r.origin);
              setSelectedDestination(r.destination);
            }}
            viewMode={viewMode}
          />

          <RouteLegend />
        </div>

        {/* Right Route Intelligence Panel */}
        <div className="lg:col-span-4 h-full">
          <RouteDetailsPanel
            route={selectedRoute}
            originAirport={activeOriginAirport}
            destinationAirport={activeDestAirport}
          />
        </div>
      </div>
    </div>
  );
}

export function AirNetworkExplorerPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center font-mono text-xs text-[#8A99AD]">Loading Air Network Explorer...</div>}>
      <AirNetworkExplorerContent />
    </Suspense>
  );
}
