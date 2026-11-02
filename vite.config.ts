import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";

function apiOrigin(apiUrl: string): string {
  try {
    return new URL(apiUrl).origin;
  } catch {
    return "http://localhost:5000";
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const backend = env.VITE_API_URL || "http://localhost:5000/api";

  // Mirrors the CSP previously emitted by the Next.js proxy middleware.
  // In production the static host must emit the same header (see DEPLOYMENT.md).
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://github.githubassets.com https://cdn.jsdelivr.net",
    "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
    "img-src 'self' blob: data: https:",
    "font-src 'self' data: https://cdn.jsdelivr.net",
    `connect-src 'self' https://github.com https://api.github.com ${apiOrigin(backend)} ws: wss:`,
    "frame-src 'self' https://github.com",
    "worker-src 'self' blob:",
  ].join("; ");

  const securityHeaders = {
    "Content-Security-Policy": csp,
    "X-Content-Type-Options": "nosniff",
  };

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: 5173,
      headers: securityHeaders,
    },
    preview: {
      port: 4173,
      headers: securityHeaders,
    },
    build: {
      outDir: "dist",
      sourcemap: false,
      target: "es2022",
    },
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: ["./vitest.setup.ts"],
      css: false,
      restoreMocks: true,
      include: ["src/**/*.{test,spec}.{ts,tsx}"],
    },
  };
});
