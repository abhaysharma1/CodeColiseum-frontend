import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL: z
    .string()
    .min(1, "VITE_API_URL is required")
    .default("http://localhost:5000/api"),
  VITE_AUTH_URL: z.string().min(1).optional(),
  VITE_APP_URL: z.string().min(1).optional(),
});

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

const parsed = envSchema.safeParse({
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_AUTH_URL: import.meta.env.VITE_AUTH_URL,
  VITE_APP_URL: import.meta.env.VITE_APP_URL,
});

if (!parsed.success) {
  const details = parsed.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("\n");
  throw new Error(`Invalid frontend environment configuration:\n${details}`);
}

const apiUrl = stripTrailingSlash(parsed.data.VITE_API_URL);

/**
 * Runtime configuration for the SPA.
 *
 * Only `VITE_*` variables are exposed to the browser. Never place backend
 * secrets, database URLs or mail credentials in this file's inputs.
 */
export const env = {
  apiUrl,
  authUrl: stripTrailingSlash(parsed.data.VITE_AUTH_URL ?? `${apiUrl}/auth`),
  appUrl: stripTrailingSlash(
    parsed.data.VITE_APP_URL ?? window.location.origin
  ),
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;
