// src/lib/apiClient.ts
// Centralized API client

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "") + "/api";

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

class ApiError extends Error {
  statusCode: number;
  data?: unknown;

  constructor(
    statusCode: number,
    message: string,
    data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.data = data;
  }
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, ...fetchOptions } = options;

  // Build URL with query params
  let url = `${API_BASE}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
    url += `?${searchParams.toString()}`;
  }

  // Set default headers
  const headers = new Headers(fetchOptions.headers);
  if (!headers.has("Content-Type") && !(fetchOptions.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  const contentType = response.headers.get("Content-Type");
  const isJson = contentType?.includes("application/json");

  if (!response.ok) {
    const data = isJson ? await response.json() : await response.text();
    throw new ApiError(
      response.status,
      isJson && data.error ? data.error : `HTTP ${response.status}`,
      data
    );
  }

  if (isJson) {
    return response.json();
  }

  return response.text() as unknown as T;
}

export const api = {
  get<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<T> {
    return request<T>(endpoint, { method: "GET", params });
  },

  post<T>(endpoint: string, body?: unknown): Promise<T> {
    const isFormData = body instanceof FormData;
    return request<T>(endpoint, {
      method: "POST",
      body: isFormData ? body : JSON.stringify(body),
    });
  },

  put<T>(endpoint: string, body?: unknown): Promise<T> {
    return request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  },

  delete<T>(endpoint: string): Promise<T> {
    return request<T>(endpoint, { method: "DELETE" });
  },

  upload<T>(endpoint: string, file: File, fieldName = "file"): Promise<T> {
    const formData = new FormData();
    formData.append(fieldName, file);
    return request<T>(endpoint, {
      method: "POST",
      body: formData,
    });
  },
};

export { ApiError };
export default api;
