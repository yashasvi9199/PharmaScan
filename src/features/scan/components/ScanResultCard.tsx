import React from "react";
import type { ScanResponse } from "../types";

type Props = {
  result: ScanResponse;
};

export default function ScanResultCard({ result }: Props) {
  return (
    <div className="p-4 border rounded w-full max-w-2xl">
      <h2 className="text-lg font-medium mb-2">Scan Result</h2>

      <div className="mb-3">
        <strong>Extracted Text:</strong>
        <pre className="mt-1 whitespace-pre-wrap text-sm">
          {result.extractedText || "(empty)"}
        </pre>
      </div>

      {typeof result.confidence !== "undefined" && (
        <div className="mb-2 text-sm">
          <strong>Confidence:</strong> {result.confidence}
        </div>
      )}

      {result.createdAt && (
        <div className="text-xs text-muted-foreground">
          Scanned at: {result.createdAt}
        </div>
      )}
    </div>
  );
}
