"use client";

import React from "react";
import { MapConfigurationCard } from "./MapConfigurationCard";

export function FallbackGeographicMap(props: any) {
  return <MapConfigurationCard onRetry={props.onRetry} />;
}
