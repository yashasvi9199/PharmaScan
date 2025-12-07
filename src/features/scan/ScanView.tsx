import { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import type { ScanResponse } from "./types";

export default function ScanView() {
  const [result, setResult] = useState<ScanResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleScanComplete(res: ScanResponse) {
    setError(null);
    setResult(res);
  }

  return (
    <section className="space-y-6">
      <ImageUploader
        onScanComplete={handleScanComplete}
        maxSizeBytes={5 * 1024 * 1024}
      />

      {error && (
        <div className="text-sm text-red-600">
          Error: {error}
        </div>
      )}

      {result && (
        <div className="space-y-3">
          <div>
            <label className="block mb-1 font-medium">OCR Result</label>
            <textarea
              value={result.text}
              onChange={() => {}}
              readOnly
              rows={10}
              className="w-full p-2 border rounded resize-y"
            />
          </div>

          {typeof result.confidence !== "undefined" && (
            <div className="text-sm text-gray-700">
              Confidence: <span className="font-medium">{result.confidence}</span>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
