// src/lib/api/scanApi.ts
import type { ScanResponse } from "../../features/scan/types";

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

  const text = pickText(data);

  // defensive: if text ended up empty, keep raw so caller can inspect
  if (!text) {
    console.debug("uploadForScan: response payload had no text field", data);
  }

  return {
    text,
    confidence: data.confidence,
    lang: data.lang,
    meta: data.meta,
    raw: data,
  };
}
