import type { ScanResponse, DetectedDrug } from "../../features/scan/types";

// Base API URL - using proxy configured in vite
const API_BASE = "/api/history";

// History item type matching backend response
export interface HistoryItem {
  id: string;
  extractedText: string;
  confidence?: number;
  createdAt: string;
  detectedDrugs?: DetectedDrug[];
  raw?: unknown;
}

// API response wrappers
interface HistoryListResponse {
  success: boolean;
  count: number;
  data: HistoryItem[];
}

interface HistoryDetailResponse {
  success: boolean;
  data: HistoryItem;
}

interface DeleteResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Fetch all scan history.
 */
export async function fetchHistory(): Promise<HistoryItem[]> {
  const res = await fetch(API_BASE);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `${res.status} ${res.statusText}`);
  }
  const data: HistoryListResponse = await res.json();
  return data.data || [];
}

/**
 * Fetch a single scan by ID.
 */
export async function fetchScanById(id: string): Promise<HistoryItem> {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `${res.status} ${res.statusText}`);
  }
  const data: HistoryDetailResponse = await res.json();
  return data.data;
}

/**
 * Delete a scan by ID.
 */
export async function deleteScanById(id: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `${res.status} ${res.statusText}`);
  }
  const data: DeleteResponse = await res.json();
  return data.success;
}

/**
 * Convert HistoryItem to ScanResponse for compatibility with existing components.
 */
export function historyItemToScanResponse(item: HistoryItem): ScanResponse {
  return {
    text: item.extractedText,
    confidence: item.confidence,
    detectedDrugs: item.detectedDrugs,
    raw: item.raw,
  };
}
