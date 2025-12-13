import { Link } from "react-router-dom";
import type { HistoryItem } from "../../lib/api/historyApi";

type Props = {
  item: HistoryItem;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
};

/** Format date to readable string */
function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
}

/** Truncate text to max length */
function truncateText(text: string, maxLength = 100): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

export default function HistoryItemCard({ item, onDelete, isDeleting }: Props) {
  const drugCount = item.detectedDrugs?.length ?? 0;
  const textPreview = truncateText(item.extractedText.replace(/\s+/g, " ").trim());

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow transition-shadow overflow-hidden">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <span className="text-xs text-gray-500">{formatDate(item.createdAt)}</span>
            {typeof item.confidence === "number" && (
              <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                {item.confidence >= 1 ? item.confidence.toFixed(1) : (item.confidence * 100).toFixed(0)}% OCR
              </span>
            )}
          </div>
          <Link
            to={`/result/${item.id}`}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
          >
            View Details →
          </Link>
        </div>

        {/* Text preview */}
        <p className="text-sm text-gray-700 mb-3 line-clamp-2">
          {textPreview || "(No text extracted)"}
        </p>

        {/* Detected drugs */}
        {drugCount > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {item.detectedDrugs!.slice(0, 3).map((drug) => (
              <span
                key={drug.slug}
                className="inline-flex items-center text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full"
              >
                {drug.name}
                <span className="ml-1 text-indigo-400">
                  {Math.round(drug.confidence * 100)}%
                </span>
              </span>
            ))}
            {drugCount > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{drugCount - 3} more
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            {drugCount} medication{drugCount !== 1 ? "s" : ""} found
          </span>
          {onDelete && (
            <button
              onClick={() => onDelete(item.id)}
              disabled={isDeleting}
              className="text-xs text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
