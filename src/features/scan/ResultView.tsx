import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchScanById, type HistoryItem } from "../../lib/api/historyApi";
import { getMedicineBySlug, type MedicineInfo } from "../../lib/api/lookupApi";
import MedicineDetailCard from "./components/MedicineDetailCard";

export default function ResultView() {
  const { id } = useParams<{ id: string }>();
  const [scan, setScan] = useState<HistoryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDrug, setSelectedDrug] = useState<string | null>(null);
  const [drugDetail, setDrugDetail] = useState<MedicineInfo | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    const loadScan = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchScanById(id);
        setScan(data);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    
    loadScan();
  }, [id]);

  // Load drug details when selected
  useEffect(() => {
    if (!selectedDrug) {
      setDrugDetail(null);
      return;
    }
    
    const loadDrugDetail = async () => {
      try {
        setDetailLoading(true);
        const detail = await getMedicineBySlug(selectedDrug);
        setDrugDetail(detail);
      } catch (err) {
        console.error("Failed to load drug detail:", err);
        setDrugDetail(null);
      } finally {
        setDetailLoading(false);
      }
    };
    
    loadDrugDetail();
  }, [selectedDrug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-3 text-gray-600">Loading scan details...</span>
      </div>
    );
  }

  if (error || !scan) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-700 font-medium">Failed to load scan</p>
        <p className="text-red-600 text-sm mt-1">{error || "Scan not found"}</p>
        <Link
          to="/history"
          className="inline-block mt-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
        >
          ← Back to History
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link
        to="/history"
        className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800"
      >
        ← Back to History
      </Link>

      {/* Scan info header */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Scan ID: {scan.id}</span>
          <span className="text-xs text-gray-500">
            {new Date(scan.createdAt).toLocaleString()}
          </span>
        </div>
        {typeof scan.confidence === "number" && (
          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
            OCR Confidence: {scan.confidence >= 1 ? scan.confidence.toFixed(1) : (scan.confidence * 100).toFixed(0)}%
          </span>
        )}
      </div>

      {/* Detected Drugs with clickable items */}
      {scan.detectedDrugs && scan.detectedDrugs.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Detected Medications
          </h3>
          <div className="grid gap-3 md:grid-cols-2">
            {scan.detectedDrugs.map((drug) => (
              <button
                key={drug.slug}
                onClick={() => setSelectedDrug(drug.slug === selectedDrug ? null : drug.slug)}
                className={`text-left p-3 rounded-lg border transition-all ${
                  selectedDrug === drug.slug
                    ? "border-indigo-500 bg-indigo-50 shadow-md"
                    : "border-gray-200 bg-white hover:border-indigo-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{drug.name}</span>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${
                      drug.confidence >= 0.9
                        ? "bg-green-100 text-green-700"
                        : drug.confidence >= 0.7
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {Math.round(drug.confidence * 100)}%
                  </span>
                </div>
                {drug.atc && (
                  <span className="text-xs text-blue-600">ATC: {drug.atc}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Drug detail panel */}
      {selectedDrug && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          {detailLoading ? (
            <div className="p-6 flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
              <span className="ml-2 text-gray-600">Loading details...</span>
            </div>
          ) : drugDetail ? (
            <MedicineDetailCard medicine={drugDetail} />
          ) : (
            <div className="p-6 text-center text-gray-500">
              <p>No additional details available for this medication.</p>
            </div>
          )}
        </div>
      )}

      {/* OCR Text */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">Extracted Text</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
            {scan.extractedText || "(No text extracted)"}
          </pre>
        </div>
      </div>
    </div>
  );
}
