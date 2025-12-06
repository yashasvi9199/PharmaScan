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

  // parse JSON safely
  const parsed = await res.json().catch(() => null);
  const data = (parsed ?? {}) as Partial<ScanResponse>;

  // normalize raw so TypeScript understands nested fields
  const raw = (data.raw ?? undefined) as ScanResponse["raw"] | undefined;

  const extracted =
    data.extractedText ??
    (typeof raw?.ocr?.text === "string" ? raw.ocr.text : undefined) ??
    (typeof raw?.text === "string" ? (raw.text as unknown as string) : undefined) ??
    "";

  return {
    id: data.id ?? `local-${Date.now()}`,
    extractedText: extracted,
    confidence: data.confidence ?? raw?.ocr?.confidence,
    raw: raw,
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
