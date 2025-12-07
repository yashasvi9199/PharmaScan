import { useCallback, useState } from "react";
import type { ScanResponse } from "../types";
import { uploadForScan } from "../../../lib/api/scanApi";

type Props = {
  onScanComplete?: (res: ScanResponse) => void;
  maxSizeBytes?: number;
};

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default function ImageUploader({ onScanComplete, maxSizeBytes }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const performUploadWithRetries = useCallback(
    async (file: File) => {
      const maxAttempts = 5;
      let attempt = 0;

      while (attempt < maxAttempts) {
        attempt += 1;
        try {
          setStatusMessage(attempt === 1 ? "Uploading…" : `Retrying upload (attempt ${attempt})…`);
          const res = await uploadForScan(file);
          setStatusMessage(null);
          setError(null);
          return res;
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);

          // If last attempt, rethrow
          if (attempt >= maxAttempts) {
            throw new Error(msg || "Upload failed after retries");
          }

          // For common cold-start indicators, show a waking message before retry
          const lower = msg.toLowerCase();
          if (
            lower.includes("timeout") ||
            lower.includes("failed to fetch") ||
            lower.includes("502") ||
            lower.includes("503") ||
            lower.includes("gateway") ||
            lower.includes("network")
          ) {
            const delayMs = Math.min(3000 * attempt, 15000); // 3s, 6s, 9s...
            setStatusMessage(`Server waking up — retrying in ${Math.round(delayMs / 1000)}s`);
            // give user a visible pause (non-blocking)
            await sleep(delayMs);
            // continue to next attempt
            continue;
          }

          // Non-recoverable error — rethrow
          throw new Error(msg || "Upload failed");
        }
      }

      throw new Error("Unexpected upload failure");
    },
    []
  );

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);
      setStatusMessage(null);

      if (maxSizeBytes && file.size > maxSizeBytes) {
        setError(`File too large. Max ${(maxSizeBytes / 1024).toFixed(0)} KB`);
        return;
      }

      setLoading(true);
      try {
        const result = await performUploadWithRetries(file);
        onScanComplete?.(result as ScanResponse);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg);
        setStatusMessage(null);
      } finally {
        setLoading(false);
      }
    },
    [onScanComplete, maxSizeBytes, performUploadWithRetries]
  );

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.currentTarget.files?.[0];
    if (f) handleFile(f);
    e.currentTarget.value = "";
  };

  const onDrop: React.DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const onDragOver: React.DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-md">
      <label
        className="block p-6 border-2 border-dashed rounded-md text-center cursor-pointer"
        onDrop={onDrop}
        onDragOver={onDragOver}
        htmlFor="scan-file-input"
      >
        <input
          id="scan-file-input"
          type="file"
          accept="image/*"
          onChange={onInputChange}
          className="hidden"
          aria-label="Upload image for scanning"
        />

        <div className="space-y-2">
          <div className="text-sm font-medium">
            {loading ? "Uploading & processing…" : "Drop or click to select"}
          </div>

          <div className="text-xs text-gray-500">
            Supported: jpeg, png, webp{maxSizeBytes ? ` • Max ${(maxSizeBytes / 1024).toFixed(0)} KB` : ""}
          </div>

          {statusMessage && (
            <div className="text-sm text-indigo-600">
              {statusMessage}
            </div>
          )}

          {error && <div className="text-sm text-red-600">Error: {error}</div>}
        </div>
      </label>
    </div>
  );
}
