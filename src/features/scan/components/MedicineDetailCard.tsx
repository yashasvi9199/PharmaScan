import type { MedicineInfo } from "../../../lib/api/lookupApi";

type Props = {
  medicine: MedicineInfo;
};

export default function MedicineDetailCard({ medicine }: Props) {
  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900">{medicine.name}</h3>
        {medicine.atc && (
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded">
              ATC: {medicine.atc}
            </span>
            {medicine.atcCategory && (
              <span className="text-sm text-gray-500">
                ({medicine.atcCategory})
              </span>
            )}
          </div>
        )}
      </div>

      {/* Alternate names */}
      {medicine.alternateNames && medicine.alternateNames.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Also known as:</h4>
          <div className="flex flex-wrap gap-2">
            {medicine.alternateNames.map((name, idx) => (
              <span
                key={idx}
                className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Match confidence */}
      {typeof medicine.confidence === "number" && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Match confidence:</span>
          <span
            className={`text-sm font-medium px-2 py-1 rounded ${
              medicine.confidence >= 0.9
                ? "bg-green-100 text-green-700"
                : medicine.confidence >= 0.7
                ? "bg-yellow-100 text-yellow-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {Math.round(medicine.confidence * 100)}%
          </span>
        </div>
      )}

      {/* Info note */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
        <p className="text-sm text-amber-800">
          <strong>Note:</strong> This information is for reference only. Always consult 
          with a healthcare professional before taking any medication.
        </p>
      </div>
    </div>
  );
}
