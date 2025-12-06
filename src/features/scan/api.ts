import { buildScanForm, uploadScan as uploadToBackend } from "../../lib/api/scanApi";
import type { ScanResponse } from "./types";

/** Upload a single file (image/blob) for scanning.
 *  Returns the canonical ScanResponse used by frontend components.
 */
export async function uploadScanFile(
  file: File | Blob,
  filename = "scan.jpg",
  metadata?: Record<string, string | number | boolean>
): Promise<ScanResponse> {
  const meta = metadata
    ? Object.fromEntries(Object.entries(metadata).map(([k, v]) => [k, String(v)]))
    : undefined;
  const form = buildScanForm(file as File, filename, meta);
  return await uploadToBackend(form);
}
