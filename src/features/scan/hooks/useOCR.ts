import { useState, useCallback } from "react";
import { uploadScanFile } from "../api";
import type { ScanResponse } from "../types";

export function useOCR() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResponse | null>(null);

  const runOCR = useCallback(async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      const res = await uploadScanFile(file, file.name);
      setResult(res);
      return res;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    result,
    runOCR,
  };
}
