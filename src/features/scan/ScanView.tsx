import { useState } from "react";
import { uploadForScan } from "../../lib/api/scanApi";

export default function ScanView() {
  const [ocrText, setOcrText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  async function handleFile(file: File | null) {
    if (!file) return;
    setFileName(file.name);
    setError(null);
    setOcrText("");
    setLoading(true);

    try {
      const data = await uploadForScan(file);

      if (typeof data === "string") {
        setOcrText(data);
      } else if (data?.text) {
        setOcrText(String(data.text));
      } else {
        setOcrText(JSON.stringify(data));
      }
    } catch (err: any) {
      setError(err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  }

  function onFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    handleFile(file);
  }

  return (
    <section>
      <label className="block mb-2 font-medium">Choose image or photo</label>

      <div className="flex items-center gap-3 mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={onFileInputChange}
          className="block"
        />
        <div>
          <button
            type="button"
            onClick={() => {}}
            className="px-3 py-1 border rounded"
            disabled
            aria-hidden
            title="No-op placeholder"
          >
            Upload
          </button>
        </div>
      </div>

      {fileName && (
        <div className="text-sm text-gray-600 mb-2">Selected: {fileName}</div>
      )}

      {loading && <div className="mb-2">Scanning…</div>}

      {error && (
        <div className="mb-2 text-sm text-red-600">
          Error: {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block mb-1 font-medium">OCR Result</label>
        <textarea
          value={ocrText}
          onChange={(e) => setOcrText(e.target.value)}
          rows={10}
          className="w-full p-2 border rounded resize-y"
          placeholder={loading ? "Scanning..." : "OCR output will appear here"}
        />
      </div>
    </section>
  );
}
