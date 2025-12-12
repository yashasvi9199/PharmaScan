// Types used across scan frontend feature.

// Detected drug from dictionary matching
export type DetectedDrug = {
  slug: string;
  name: string;
  confidence: number;
  atc?: string | null;
};

export type ScanResponse = {
  // OCRed primary text MUST be present (backend guarantees `text`).
  text: string;

  // Confidence reported by backend (0-100 or 0-1; frontend should tolerate either).
  confidence?: number;

  // Optional language code or detected lang
  lang?: string;

  // Detected drugs from dictionary matching
  detectedDrugs?: DetectedDrug[];

  // Optional bounding boxes, per-word metadata, etc.
  meta?: {
    boxes?: Array<{
      x: number;
      y: number;
      width: number;
      height: number;
      text?: string;
      confidence?: number;
    }>;
    [k: string]: unknown;
  };

  // Raw backend payload for debugging or future fields
  raw?: unknown;
};

export type ScanRequestPayload = {
  // File upload handled as FormData on frontend; helper type if needed
  fileName?: string;
  fileSize?: number;
};

export type OCRResultForUI = {
  text: string;
  confidence?: number;
  // parsed lines or tokens useful for UI features
  lines?: string[];
  raw?: unknown;
};
