import ScanView from "../features/scan/ScanView";

export default function ScanPage() {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Scan Medicine Strip</h1>
      <ScanView />
    </div>
  );
}
