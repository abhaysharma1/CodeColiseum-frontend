import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/features/authentication/auth-context";
import { RbacProvider } from "@/features/authentication/rbac-context";
import { useState, type ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000,
            retry: 1,
          },
        },
      })
  );

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <RbacProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </RbacProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
