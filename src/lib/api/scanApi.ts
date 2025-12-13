// src/lib/api/scanApi.ts
import type { ScanResponse, DetectedDrug } from "../../features/scan/types";

function pickText(data: unknown): string {
  if (!data || typeof data !== "object") return "";
  const d = data as Record<string, unknown>;
  // common fields we have seen: text, extractedText, extracted_text
  return (
    (typeof d.text === "string" && d.text) ||
    (typeof d.extractedText === "string" && d.extractedText) ||
    (typeof d.extracted_text === "string" && d.extracted_text) ||
    ""
  );
}

function pickDetectedDrugs(data: unknown): DetectedDrug[] | undefined {
  if (!data || typeof data !== "object") return undefined;
  const d = data as Record<string, unknown>;
  // Check for detectedDrugs array from backend
  const drugs = d.detectedDrugs || d.detected_drugs;
  if (Array.isArray(drugs)) {
    return drugs.map((drug: unknown) => {
      const d = drug as Record<string, unknown>;
      return {
        slug: typeof d.slug === "string" ? d.slug : "",
        name: typeof d.name === "string" ? d.name : (typeof d.canonical === "string" ? d.canonical : ""),
        confidence: typeof d.confidence === "number" ? d.confidence : 0,
        atc: typeof d.atc === "string" ? d.atc : null,
      };
    });
  }
  return undefined;
}

/** Build FormData for scan upload */
export function buildScanForm(
  file: File,
  filename?: string,
  metadata?: Record<string, string>
): FormData {
  const form = new FormData();
  form.append("file", file, filename || file.name);
  if (metadata) {
    Object.entries(metadata).forEach(([k, v]) => {
      form.append(k, v);
    });
  }
  return form;
}

export async function uploadScan(form: FormData): Promise<ScanResponse> {
  const apiBase = (import.meta.env.VITE_API_BASE_URL || "") + "/api";
  const res = await fetch(`${apiBase}/scan`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `${res.status} ${res.statusText}`);
  }

  const data: unknown = await res.json();
  if (typeof data !== 'object' || data === null) {
    throw new Error("Invalid response data format");
  }

  const text = pickText(data);
  const typedData = data as Record<string, unknown>;

  return {
    text,
    confidence: typeof typedData.confidence === "number" ? typedData.confidence : 0,
    lang: typeof typedData.lang === "string" ? typedData.lang : "",
    detectedDrugs: pickDetectedDrugs(data),
    meta: typedData.meta as ScanResponse["meta"],
    raw: data,
  };
}

/** Simplified upload for File/Blob */
export async function uploadForScan(file: File): Promise<ScanResponse> {
  const form = buildScanForm(file);
  return uploadScan(form);
}
