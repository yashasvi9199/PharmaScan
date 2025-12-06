import React, { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import ScanResultCard from "./components/ScanResultCard";
import OCRTextEditor from "./components/OCRTextEditor";
import type { ScanResponse } from "./types";

export default function ScanView() {
  const [result, setResult] = useState<ScanResponse | null>(null);
  const [editing, setEditing] = useState(false);

  const handleScan = (res: ScanResponse) => {
    setResult(res);
    setEditing(false);
  };

  return (
    <div className="space-y-6">
      <ImageUploader onScanComplete={handleScan} />

      {result && !editing && (
        <div className="space-y-3">
          <ScanResultCard result={result} />
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="px-3 py-1 border rounded"
          >
            Edit OCR Text
          </button>
        </div>
      )}

      {result && editing && (
        <OCRTextEditor
          scan={result}
          onSave={(updated) => {
            setResult(updated);
            setEditing(false);
          }}
          onCancel={() => setEditing(false)}
        />
      )}
    </div>
  );
}
