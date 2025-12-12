// src/lib/api/scanApi.ts
import type { ScanResponse, DetectedDrug } from "../../features/scan/types";

function pickText(data: any): string {
  if (!data) return "";
  // common fields we have seen: text, extractedText, extracted_text
  return (
    (typeof data.text === "string" && data.text) ||
    (typeof data.extractedText === "string" && data.extractedText) ||
    (typeof data.extracted_text === "string" && data.extracted_text) ||
    ""
  );
}

function pickDetectedDrugs(data: any): DetectedDrug[] | undefined {
  if (!data) return undefined;
  // Check for detectedDrugs array from backend
  const drugs = data.detectedDrugs || data.detected_drugs;
  if (Array.isArray(drugs)) {
    return drugs.map((d: any) => ({
      slug: d.slug || "",
      name: d.name || d.canonical || "",
      confidence: typeof d.confidence === "number" ? d.confidence : 0,
      atc: d.atc ?? null,
    }));
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

/** Upload FormData to backend scan endpoint */
export async function uploadScan(form: FormData): Promise<ScanResponse> {
  const res = await fetch("/api/scan", {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  const text = pickText(data);

  if (!text) {
    console.debug("uploadScan: response payload had no text field", data);
  }

  return {
    text,
    confidence: data.confidence,
    lang: data.lang,
    detectedDrugs: pickDetectedDrugs(data),
    meta: data.meta,
    raw: data,
  };
}

/** Simplified upload for File/Blob */
export async function uploadForScan(file: File): Promise<ScanResponse> {
  const form = buildScanForm(file);
  return uploadScan(form);
}
