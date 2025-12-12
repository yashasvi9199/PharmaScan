import type { ScanResponse } from "../types";

type Props = {
  result: ScanResponse;
};

export default function ScanResultCard({ result }: Props) {
  // Access createdAt from raw backend response if available
  const createdAt = result.raw && typeof result.raw === "object" && "createdAt" in result.raw
    ? (result.raw as { createdAt?: string }).createdAt
    : undefined;

  return (
    <div className="p-4 border rounded w-full max-w-2xl">
      <h2 className="text-lg font-medium mb-2">Scan Result</h2>

      <div className="mb-3">
        <strong>Extracted Text:</strong>
        <pre className="mt-1 whitespace-pre-wrap text-sm">
          {result.text || "(empty)"}
        </pre>
      </div>

      {typeof result.confidence !== "undefined" && (
        <div className="mb-2 text-sm">
          <strong>Confidence:</strong> {result.confidence}
        </div>
      )}

      {createdAt && (
        <div className="text-xs text-gray-500">
          Scanned at: {createdAt}
        </div>
      )}
    </div>
  );
}
