import { env } from "@/config/env";

/**
 * Base URL of the Express API (including the `/api` prefix).
 *
 * Kept as a function because the original Next.js code imported
 * `getBackendURL()` in ~150 places. It now resolves the Vite environment
 * instead of `NEXT_PUBLIC_BACKEND_DOMAIN`.
 */
export function getBackendURL(): string {
  return env.apiUrl;
}
