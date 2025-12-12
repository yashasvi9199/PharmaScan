import type { DetectedDrug } from "../types";

type Props = {
  drugs: DetectedDrug[];
};

/** Displays a list of detected drugs with confidence and ATC codes */
export default function DetectedDrugsList({ drugs }: Props) {
  if (!drugs.length) {
    return (
      <div className="text-sm text-gray-500 italic">
        No medications detected in the scanned text.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-700">
        Detected Medications ({drugs.length})
      </h3>
      <ul className="divide-y divide-gray-100 border rounded-lg overflow-hidden">
        {drugs.map((drug) => (
          <li
            key={drug.slug}
            className="px-4 py-3 bg-white hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <span className="font-medium text-gray-900">{drug.name}</span>
                {drug.atc && (
                  <span className="ml-2 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    ATC: {drug.atc}
                  </span>
                )}
              </div>
              <div className="ml-4 flex items-center">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${
                    drug.confidence >= 0.9
                      ? "bg-green-100 text-green-700"
                      : drug.confidence >= 0.7
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {Math.round(drug.confidence * 100)}% match
                </span>
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              slug: {drug.slug}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
