import { useCallback, useState } from "react";
import type { ScanResponse } from "../types";
import { uploadForScan } from "../../../lib/api/scanApi";

type Props = {
  onScanComplete?: (res: ScanResponse) => void;
  maxSizeBytes?: number;
};

export default function ImageUploader({ onScanComplete, maxSizeBytes }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);
      if (maxSizeBytes && file.size > maxSizeBytes) {
        setError(`File too large. Max ${Math.round(maxSizeBytes / 1024)} KB`);
        return;
      }

      setLoading(true);
      try {
        const res = await uploadForScan(file);
        onScanComplete?.(res as ScanResponse);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    [onScanComplete, maxSizeBytes]
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
          <div className="text-sm">
            {loading ? "Uploading & processing…" : "Drop an image here, or click to select"}
          </div>
          <div className="text-xs text-muted-foreground">
            Supported: jpeg, png, webp. {maxSizeBytes ? `Max ${(maxSizeBytes / 1024) | 0} KB.` : ""}
          </div>

          {error && <div className="text-sm text-red-600">Error: {error}</div>}
        </div>
      </label>
    </div>
  );
}
