import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

export function getGoogleMapsApiKey(): string {
  return process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
}

export function isGoogleMapsConfigured(): boolean {
  const key = getGoogleMapsApiKey();
  return Boolean(key && key !== "YOUR_GOOGLE_MAPS_API_KEY" && key.length > 5);
}

let isInitialized = false;

export async function loadGoogleMapsLibraries(): Promise<boolean> {
  if (!isGoogleMapsConfigured()) return false;

  try {
    if (!isInitialized) {
      setOptions({
        key: getGoogleMapsApiKey(),
        v: "weekly",
      });
      isInitialized = true;
    }

    await importLibrary("maps");
    await importLibrary("marker");
    return true;
  } catch (err) {
    console.warn("Failed to load Google Maps via importLibrary:", err);
    return false;
  }
}
