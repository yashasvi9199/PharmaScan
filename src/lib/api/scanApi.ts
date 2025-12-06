import type { ScanResponse } from "../../features/scan/types";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

/** POST FormData to backend scan endpoint and return typed response. */
export async function uploadScan(form: FormData): Promise<ScanResponse> {
  const res = await fetch(`${API_BASE.replace(/\/$/, "")}/api/scan`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`scan upload failed: ${res.status} ${res.statusText} ${text}`);
  }

  const data = (await res.json().catch(() => ({}))) as Partial<ScanResponse>;

  return {
    id: data.id ?? `local-${Date.now()}`,
    extractedText: data.extractedText ?? data.raw?.ocr?.text ?? data.raw?.text ?? "",
    confidence: data.confidence ?? data.raw?.ocr?.confidence,
    raw: (data.raw ?? undefined) as ScanResponse["raw"],
    createdAt: data.createdAt,
  };
}

/** Helper: construct FormData from File/Blob and optional metadata. */
export function buildScanForm(
  file: File | Blob,
  filename = "scan.jpg",
  metadata?: Record<string, string | number | boolean>
) {
  const form = new FormData();
  form.append("file", file as Blob, (file as File).name ?? filename);
  if (metadata) {
    Object.entries(metadata).forEach(([k, v]) => form.append(k, String(v)));
  }
  return form;
}
