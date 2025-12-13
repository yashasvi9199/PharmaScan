// src/lib/ocr/tesseract.ts
// Client-side Tesseract OCR stub (for future local OCR)

export interface ClientOCRResult {
  text: string;
  confidence?: number;
}

/**
 * Client-side OCR is not currently implemented.
 * All OCR processing happens on the backend.
 * This stub is here for future local/offline OCR support.
 */
export async function runClientOCR(): Promise<ClientOCRResult> {
  console.warn("Client-side OCR not implemented. Use backend API instead.");
  return {
    text: "",
    confidence: 0,
  };
}

/**
 * Check if client-side OCR is available
 */
export function isClientOCRAvailable(): boolean {
  return false;
}

export default { runClientOCR, isClientOCRAvailable };
