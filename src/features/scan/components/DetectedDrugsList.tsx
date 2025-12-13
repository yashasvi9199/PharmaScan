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
    <div className="space-y-3">
      <ul className="space-y-3">
        {drugs.map((drug) => (
          <li
            key={drug.slug}
            className="p-4 bg-white/40 border border-white/40 rounded-xl hover:bg-white/60 transition-all duration-300 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800 text-lg">{drug.name}</span>
                  {drug.atc && (
                    <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-full border border-accent/20">
                      {drug.atc}
                    </span>
                  )}
                </div>
              </div>
              <div className="ml-4 flex items-center">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    drug.confidence >= 0.9
                      ? "bg-green-100 text-green-700 border-green-200"
                      : drug.confidence >= 0.7
                      ? "bg-secondary/10 text-secondary border-secondary/20"
                      : "bg-red-100 text-red-700 border-red-200"
                  }`}
                >
                  {Math.round(drug.confidence * 100)}%
                </span>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2 font-mono opacity-70">
              ID: {drug.slug}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
