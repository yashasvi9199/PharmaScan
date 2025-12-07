import type { ScanResponse } from "../../features/scan/types";

export async function uploadForScan(file: File): Promise<ScanResponse> {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch("/api/scan", {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  // Normalize backend → UI shape cleanly
  return {
    text: data.text,
    confidence: data.confidence,
    lang: data.lang,
    meta: data.meta,
    raw: data.raw ?? data,
  };
}
