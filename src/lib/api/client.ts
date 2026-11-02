import axios from "axios";
import { env } from "@/config/env";

/**
 * Centralized HTTP client for the Express backend.
 *
 * - Single base URL (`VITE_API_URL`).
 * - Cookies are always sent (`withCredentials`) because BetterAuth issues
 *   httpOnly session cookies; no auth token is stored in localStorage.
 */
export const api = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

// Legacy modules still call the global `axios` object. Make sure those calls
// also send session cookies instead of relying on same-origin proxying.
axios.defaults.withCredentials = true;

export interface ApiErrorBody {
  message?: string;
  error?: string;
  success?: boolean;
}

/** Extracts a human readable message from an unknown axios/API error. */
export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again."
): string {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    return (
      error.response?.data?.message ??
      error.response?.data?.error ??
      error.message ??
      fallback
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}
