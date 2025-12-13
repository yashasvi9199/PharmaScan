import { useState } from "react";
import MedicineSearch from "../features/scan/components/MedicineSearch";
import MedicineDetailCard from "../features/scan/components/MedicineDetailCard";
import type { MedicineInfo } from "../lib/api/lookupApi";

export default function LookupPage() {
  const [selectedMedicine, setSelectedMedicine] = useState<MedicineInfo | null>(null);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Medicine Lookup</h1>
      <p className="text-gray-600 mb-6">
        Search our database to find information about medicines and their classifications.
      </p>
      
      <MedicineSearch onSelect={setSelectedMedicine} />

      {selectedMedicine && (
        <div className="mt-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <MedicineDetailCard medicine={selectedMedicine} />
          <div className="px-6 pb-4">
            <button
              onClick={() => setSelectedMedicine(null)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back to search
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
