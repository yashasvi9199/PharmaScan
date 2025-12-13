import { useCallback, useState } from "react";
import type { ScanResponse } from "../types";
import { uploadForScan } from "../../../lib/api/scanApi";
import { Loader } from "../../../ui/Loader";

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
          setStatusMessage(attempt === 1 ? "Uploading..." : `Retrying upload (attempt ${attempt})...`);
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
    e.stopPropagation();
  };

  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto glass rounded-2xl p-12 flex flex-col items-center justify-center min-h-[400px]">
        <Loader />
        {statusMessage && (
          <p className="mt-4 text-primary-dark/70 text-sm font-medium animate-pulse">
            {statusMessage}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <label
        className="group relative flex flex-col items-center justify-center w-full h-80 rounded-2xl border-2 border-dashed border-primary/30 bg-surface/50 hover:bg-surface hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden glass"
        onDrop={onDrop}
        onDragOver={onDragOver}
        htmlFor="scan-file-input"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <input
          id="scan-file-input"
          type="file"
          accept="image/*"
          onChange={onInputChange}
          className="hidden"
          aria-label="Upload image for scanning"
        />

        <div className="relative z-10 flex flex-col items-center space-y-4 p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          
          <div className="space-y-1">
            <p className="text-xl font-semibold text-gray-700">
              Upload Prescription or Medicine
            </p>
            <p className="text-sm text-gray-500">
              Drag & drop or click to browse
            </p>
          </div>

          <div className="text-xs text-gray-400 bg-white/50 px-3 py-1 rounded-full border border-gray-200">
            Supported: JPEG, PNG, WEBP {maxSizeBytes ? `• Max ${(maxSizeBytes / 1024 / 1024).toFixed(0)}MB` : ""}
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 flex items-center animate-fadeIn">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}
        </div>
      </label>
    </div>
  );
}
