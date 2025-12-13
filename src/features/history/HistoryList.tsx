import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchHistory, deleteScanById, type HistoryItem } from "../../lib/api/historyApi";
import HistoryItemCard from "./HistoryItem";

export default function HistoryList() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const loadHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchHistory();
      setHistory(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this scan?")) return;
    
    try {
      setDeleting(id);
      await deleteScanById(id);
      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(`Failed to delete: ${msg}`);
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-3 text-gray-600">Loading history...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700 font-medium">Error loading history</p>
        <p className="text-red-600 text-sm mt-1">{error}</p>
        <button
          onClick={loadHistory}
          className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <div className="text-4xl mb-4">📋</div>
        <h3 className="text-lg font-medium text-gray-700">No scan history yet</h3>
        <p className="text-gray-500 mt-1">Your scanned medicines will appear here</p>
        <Link
          to="/scan"
          className="inline-block mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Scan a Medicine
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          Scan History ({history.length})
        </h2>
        <button
          onClick={loadHistory}
          className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          ↻ Refresh
        </button>
      </div>
      
      <div className="space-y-3">
        {history.map((item) => (
          <HistoryItemCard
            key={item.id}
            item={item}
            onDelete={handleDelete}
            isDeleting={deleting === item.id}
          />
        ))}
      </div>
    </div>
  );
}
