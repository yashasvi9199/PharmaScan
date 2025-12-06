import React, { useState } from "react";
import ImageUploader from "../features/scan/components/ImageUploader";
import type { ScanResponse } from "../features/scan/types";

export default function ScanPage() {
  const [result, setResult] = useState<ScanResponse | null>(null);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Scan</h1>

      <section className="mb-6">
        <ImageUploader onScanComplete={(res) => setResult(res)} />
      </section>

      <section>
        {result ? (
          <article className="p-4 border rounded">
            <h2 className="text-lg font-medium">Result</h2>
            <div className="mt-2">
              <strong>Extracted text:</strong>
              <pre className="whitespace-pre-wrap mt-1">{result.extractedText || "(empty)"}</pre>
            </div>

            {typeof result.confidence !== "undefined" && (
              <div className="mt-2">
                <strong>Confidence:</strong> {result.confidence}
              </div>
            )}

            {result.createdAt && (
              <div className="mt-2 text-sm text-muted-foreground">Scanned at: {result.createdAt}</div>
            )}
          </article>
        ) : (
          <div className="text-sm text-muted-foreground">No scan yet — upload an image to begin.</div>
        )}
      </section>
    </main>
  );
}
