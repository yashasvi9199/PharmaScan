import { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import type { ScanResponse } from "./types";

export default function ScanView() {
  const [ocrText, setOcrText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  function handleScanComplete(res: ScanResponse) {
    setError(null);
    if (typeof res === "string") {
      setOcrText(res);
      return;
    }
    if (res?.text) {
      setOcrText(String(res.text));
      return;
    }
    setOcrText(JSON.stringify(res));
  }

  return (
    <section>
      <div className="mb-6">
        <ImageUploader onScanComplete={handleScanComplete} maxSizeBytes={5 * 1024 * 1024} />
      </div>

      {error && (
        <div className="mb-2 text-sm text-red-600">
          Error: {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block mb-1 font-medium">OCR Result</label>
        <textarea
          value={ocrText}
          onChange={(e) => setOcrText(e.target.value)}
          rows={10}
          className="w-full p-2 border rounded resize-y"
          placeholder="OCR output will appear here"
        />
      </div>
    </section>
  );
}
