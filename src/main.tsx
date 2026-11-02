import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Self-hosted fonts replace next/font/google.
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "@fontsource/caveat/400.css";
import "@fontsource/caveat/500.css";
import "@fontsource/caveat/600.css";
import "@fontsource/caveat/700.css";

import "@/styles/globals.css";
// Side-effect import: configures the shared axios defaults (credentials,
// headers) used by every migrated API module.
import "@/lib/api/client";
import { AppProviders } from "@/app/providers";
import { AppRouter } from "@/app/router";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element #root was not found in index.html");
}

createRoot(container).render(
  <StrictMode>
    <AppProviders>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AppProviders>
  </StrictMode>
);
