// src/features/pharmacies/api.ts
// Pharmacy API functions (placeholder for future implementation)

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  lat?: number;
  lng?: number;
  phone?: string;
  hours?: string;
  distance?: number;
}

/**
 * Find nearby pharmacies (placeholder)
 */
export async function findNearbyPharmacies(): Promise<Pharmacy[]> {
  console.warn("Pharmacy search not implemented yet");
  return [];
}

/**
 * Get pharmacy by ID (placeholder)
 */
export async function getPharmacyById(): Promise<Pharmacy | null> {
  console.warn("Pharmacy lookup not implemented yet");
  return null;
}
