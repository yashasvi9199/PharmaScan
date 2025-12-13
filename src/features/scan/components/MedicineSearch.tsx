import { useState } from "react";
import { searchMedicines, type MedicineInfo } from "../../../lib/api/lookupApi";

type Props = {
  onSelect?: (medicine: MedicineInfo) => void;
};

export default function MedicineSearch({ onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MedicineInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (query.trim().length < 2) {
      setError("Please enter at least 2 characters");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setHasSearched(true);
      const data = await searchMedicines(query.trim());
      setResults(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="space-y-4">
      {/* Search input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for a medicine..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "..." : "Search"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="text-sm text-red-600">{error}</div>
      )}

      {/* Results */}
      {hasSearched && !loading && (
        <div className="space-y-2">
          {results.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No medicines found for "{query}"</p>
              <p className="text-sm text-gray-400 mt-1">Try a different search term</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 border rounded-lg overflow-hidden">
              {results.map((medicine) => (
                <button
                  key={medicine.slug}
                  onClick={() => onSelect?.(medicine)}
                  className="w-full text-left px-4 py-3 bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-gray-900">{medicine.name}</span>
                      {medicine.atc && (
                        <span className="ml-2 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          {medicine.atc}
                        </span>
                      )}
                    </div>
                    {typeof medicine.confidence === "number" && (
                      <span className="text-xs text-gray-500">
                        {Math.round(medicine.confidence * 100)}% match
                      </span>
                    )}
                  </div>
                  {medicine.alternateNames.length > 0 && (
                    <div className="text-xs text-gray-500 mt-1">
                      Also: {medicine.alternateNames.slice(0, 2).join(", ")}
                      {medicine.alternateNames.length > 2 && " ..."}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
