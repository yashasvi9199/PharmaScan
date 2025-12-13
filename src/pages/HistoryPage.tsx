import HistoryList from "../features/history/HistoryList";

export default function HistoryPage() {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Scan History</h1>
      <HistoryList />
    </div>
  );
}
