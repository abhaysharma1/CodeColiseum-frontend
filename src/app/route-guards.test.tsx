import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { RequireAuth, RequireRole } from "@/app/route-guards";

const authState = vi.hoisted(() => ({
  user: null as null | { id: string; globalRoleId?: string | null },
  loading: false,
  error: null as null | { message: string },
}));

vi.mock("@/features/authentication/auth-context", () => ({
  useAuth: () => ({
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
  }),
}));

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/login" element={<div>login screen</div>} />
        <Route
          path="/dashboard/teacher"
          element={
            <RequireAuth>
              <RequireRole role="role_org_teacher">
                <div>teacher dashboard</div>
              </RequireRole>
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/student"
          element={
            <RequireAuth>
              <RequireRole role="role_org_student">
                <div>student dashboard</div>
              </RequireRole>
            </RequireAuth>
          }
        />
      </Routes>
    </MemoryRouter>
  );
}

describe("route guards", () => {
  beforeEach(() => {
    authState.user = null;
    authState.loading = false;
    authState.error = null;
  });

  it("redirects anonymous visitors to /login", () => {
    renderAt("/dashboard/teacher");
    expect(screen.getByText("login screen")).toBeInTheDocument();
  });

  it("renders the protected page for the matching role", () => {
    authState.user = { id: "u1", globalRoleId: "role_org_teacher" };
    renderAt("/dashboard/teacher");
    expect(screen.getByText("teacher dashboard")).toBeInTheDocument();
  });

  it("redirects users away from another role's dashboard", () => {
    authState.user = { id: "u1", globalRoleId: "role_org_student" };
    renderAt("/dashboard/teacher");
    expect(screen.getByText("student dashboard")).toBeInTheDocument();
  });

  it("shows a session error instead of redirecting", () => {
    authState.error = { message: "network down" };
    renderAt("/dashboard/teacher");
    expect(screen.getByText(/network down/i)).toBeInTheDocument();
  });
});
