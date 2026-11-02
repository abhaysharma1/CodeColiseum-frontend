import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

/**
 * Application shell. The document <html>/<body> live in index.html; this
 * mirrors the `<main>{children}</main>` wrapper from the Next.js root layout.
 */
export function RootLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Toaster />
    </>
  );
}
