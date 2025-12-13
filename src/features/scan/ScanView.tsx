import { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import DetectedDrugsList from "./components/DetectedDrugsList";
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
        <div className="space-y-8 animate-fadeIn">
          {/* Detected Drugs Section */}
          {result.detectedDrugs && result.detectedDrugs.length > 0 && (
            <div className="glass rounded-2xl p-6 border-l-4 border-l-primary">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Detected Medications
              </h3>
              <DetectedDrugsList drugs={result.detectedDrugs} />
            </div>
          )}

          {/* OCR Text Section */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <label className="text-lg font-semibold text-gray-800 flex items-center">
                <svg className="w-5 h-5 mr-2 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Extracted Text
              </label>
              
              {typeof result.confidence !== "undefined" && (
                <div className={`px-3 py-1 rounded-full text-sm font-medium border ${
                  result.confidence > 80 ? 'bg-green-50 text-green-700 border-green-200' :
                  result.confidence > 50 ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                  'bg-red-50 text-red-700 border-red-200'
                }`}>
                  Confidence: {result.confidence}%
                </div>
              )}
            </div>

            <textarea
              value={result.text}
              onChange={() => {}}
              readOnly
              rows={10}
              className="w-full p-4 rounded-xl bg-white/50 border border-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-y text-gray-700 font-mono text-sm"
            />

            {result.detectedDrugs && (
              <div className="mt-4 flex items-center justify-end text-sm text-gray-500">
                <span className="mr-2">Medications found:</span>
                <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-md font-medium">
                  {result.detectedDrugs.length}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

