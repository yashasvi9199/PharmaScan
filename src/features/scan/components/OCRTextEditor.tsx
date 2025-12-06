import React, { useState } from "react";
import type { ScanResponse } from "../types";

type Props = {
  scan: ScanResponse;
  onSave?: (updated: ScanResponse) => void;
  onCancel?: () => void;
};

export default function OCRTextEditor({ scan, onSave, onCancel }: Props) {
  const [text, setText] = useState<string>(scan.extractedText ?? "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated: ScanResponse = {
        ...scan,
        extractedText: text,
      };
      onSave?.(updated);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-2">OCR Text</label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        className="w-full p-2 border rounded resize-vertical"
        aria-label="OCR text editor"
      />
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="px-3 py-1 border rounded"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 border rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
