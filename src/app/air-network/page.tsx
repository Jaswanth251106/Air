import { Metadata } from "next";
import { AirNetworkExplorerPage } from "@/components/air-network/AirNetworkExplorerPage";

export const metadata: Metadata = {
  title: "Air Network Explorer | India Airfare Price Index",
  description: "Geographic 2D route map, airport nodes, and spatial fare dynamics across Indian aviation corridors.",
};

export default function Page() {
  return <AirNetworkExplorerPage />;
}
