import type { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/features/authentication/auth-context";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export const ROLE_DESTINATIONS: Record<string, string> = {
  role_platform_admin: "/admin/dashboard",
  role_org_teacher: "/dashboard/teacher",
  role_org_student: "/dashboard/student",
};

const ROLE_PREFIXES: Record<string, string> = {
  role_platform_admin: "/admin",
  role_org_teacher: "/dashboard/teacher",
  role_org_student: "/dashboard/student",
};

function FullScreenLoader() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <Spinner variant="ring" size={50} />
    </div>
  );
}

/**
 * Replaces the Next.js middleware auth check for `/dashboard`, `/admin` and
 * `/tests`: unauthenticated visitors are sent to `/login`.
 *
 * This is a UX guard only — the Express backend independently authorizes every
 * request.
 */
export function RequireAuth({ children }: { children?: ReactNode }) {
  const { user, loading, error } = useAuth();
  const location = useLocation();

  if (loading) return <FullScreenLoader />;

  if (!user?.id) {
    if (error) {
      return (
        <div className="flex h-screen w-screen items-center justify-center bg-background text-lg">
          Could not verify your session: {error.message}
        </div>
      );
    }
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }

  return <>{children ?? <Outlet />}</>;
}

/**
 * Mirrors the role-based redirects from the Next.js middleware: a user who
 * opens another role's dashboard is sent to their own landing page.
 */
export function RequireRole({
  role,
  children,
}: {
  role: keyof typeof ROLE_PREFIXES;
  children?: ReactNode;
}) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <FullScreenLoader />;
  if (!user?.id) return <Navigate to="/login" replace />;

  const allowedPrefix = ROLE_PREFIXES[role];
  const destination = user.globalRoleId
    ? ROLE_DESTINATIONS[user.globalRoleId]
    : undefined;

  if (
    destination &&
    allowedPrefix &&
    (location.pathname.startsWith("/admin") ||
      location.pathname.startsWith("/dashboard/teacher") ||
      location.pathname.startsWith("/dashboard/student")) &&
    !location.pathname.startsWith(allowedPrefix)
  ) {
    return <Navigate to={destination} replace />;
  }

  if (user.globalRoleId !== role) {
    return <Navigate to={destination ?? "/dashboard"} replace />;
  }

  return <>{children ?? <Outlet />}</>;
}
