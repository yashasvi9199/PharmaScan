import React, { useCallback, useState } from "react";
import type { ScanResponse } from "../types";
import { uploadScanFile } from "../api";

type Props = {
  onScanComplete?: (res: ScanResponse) => void;
};

export default function ImageUploader({ onScanComplete }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);
      setLoading(true);
      try {
        const res = await uploadScanFile(file, file.name);
        onScanComplete?.(res);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    [onScanComplete]
  );

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.currentTarget.files?.[0];
    if (f) handleFile(f);
    e.currentTarget.value = "";
  };

  // Use label element handlers typed to HTMLLabelElement to satisfy TS.
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
          <div className="text-sm">Drop an image here, or click to select</div>
          <div className="text-xs text-muted-foreground">
            Supported: jpeg, png, webp. Max size depends on server config.
          </div>
          {loading ? (
            <div className="text-sm">Uploading & processing…</div>
          ) : (
            <div className="text-sm">Ready</div>
          )}
          {error && <div className="text-sm text-red-600">Error: {error}</div>}
        </div>
      </label>
    </div>
  );
}
