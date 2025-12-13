import type { DetectedDrug } from "../../features/scan/types";

// Base API URL
const API_BASE = "/api/lookup";

// Medicine result from lookup API
export interface MedicineInfo {
  slug: string;
  name: string;
  alternateNames: string[];
  atc: string | null;
  atcCategory?: string;
  confidence?: number;
}

// ATC Category
export interface ATCCategory {
  code: string;
  name: string;
  level: number;
}

// Response wrappers
interface SearchResponse {
  success: boolean;
  query: string;
  count: number;
  data: MedicineInfo[];
}

interface DrugDetailResponse {
  success: boolean;
  data: MedicineInfo;
}

interface CategoriesResponse {
  success: boolean;
  count: number;
  data: ATCCategory[];
}

/**
 * Search for medicines by query.
 */
export async function searchMedicines(query: string, limit = 20): Promise<MedicineInfo[]> {
  const url = `${API_BASE}/search?q=${encodeURIComponent(query)}&limit=${limit}`;
  const res = await fetch(url);
  
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `${res.status} ${res.statusText}`);
  }
  
  const data: SearchResponse = await res.json();
  return data.data || [];
}

/**
 * Get detailed information about a specific medicine.
 */
export async function getMedicineBySlug(slug: string): Promise<MedicineInfo | null> {
  const res = await fetch(`${API_BASE}/drug/${slug}`);
  
  if (res.status === 404) {
    return null;
  }
  
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `${res.status} ${res.statusText}`);
  }
  
  const data: DrugDetailResponse = await res.json();
  return data.data;
}

/**
 * Get ATC categories for browsing.
 */
export async function getATCCategories(): Promise<ATCCategory[]> {
  const res = await fetch(`${API_BASE}/categories`);
  
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `${res.status} ${res.statusText}`);
  }
  
  const data: CategoriesResponse = await res.json();
  return data.data || [];
}

/**
 * Convert DetectedDrug to query for lookup.
 */
export function detectedDrugToQuery(drug: DetectedDrug): string {
  return drug.name || drug.slug;
}
