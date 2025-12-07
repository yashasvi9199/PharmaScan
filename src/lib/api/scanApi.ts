export async function uploadForScan(file: File) {
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch("/api/scan", {
    method: "POST",
    body: fd,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `${res.status} ${res.statusText}`);
  }

  return res.json();
}
