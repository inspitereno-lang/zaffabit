// Central API configuration for Zaffabit
// Backend: https://synsacral-agnes-cureless.ngrok-free.dev

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://synsacral-agnes-cureless.ngrok-free.dev";

/**
 * Generic fetch wrapper that:
 * - Adds the ngrok-skip-browser-warning header (required for ngrok free tier)
 * - Sets Content-Type to JSON by default
 * - Throws on non-2xx responses
 */
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",   // bypasses ngrok interstitial page
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error ${response.status}: ${errorText}`);
  }

  return response.json() as Promise<T>;
}

// ─── Convenience methods ───────────────────────────────────────────────────────

export const api = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    apiFetch<T>(endpoint, { method: "GET", ...options }),

  post: <T>(endpoint: string, body: unknown, options?: RequestInit) =>
    apiFetch<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      ...options,
    }),

  put: <T>(endpoint: string, body: unknown, options?: RequestInit) =>
    apiFetch<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
      ...options,
    }),

  patch: <T>(endpoint: string, body: unknown, options?: RequestInit) =>
    apiFetch<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
      ...options,
    }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    apiFetch<T>(endpoint, { method: "DELETE", ...options }),
};

export const API_BASE_URL = BASE_URL;
