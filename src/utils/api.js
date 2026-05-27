// For local dev: VITE_API_BASE is not set, so uses empty string (Vite proxy handles it)
// For production: set VITE_API_BASE=https://your-backend.onrender.com in your frontend hosting env vars
const API_BASE = import.meta.env.VITE_API_BASE || "";

export const api = {
  get: (url) =>
    fetch(`${API_BASE}${url}`, { credentials: "include" }).then((r) => r.json()),
  post: (url, body) =>
    fetch(`${API_BASE}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    }).then((r) => r.json()),
  del: (url) =>
    fetch(`${API_BASE}${url}`, {
      method: "DELETE",
      credentials: "include",
    }).then((r) => r.json()),
  put: (url, body) =>
    fetch(`${API_BASE}${url}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    }).then((r) => r.json()),
};
