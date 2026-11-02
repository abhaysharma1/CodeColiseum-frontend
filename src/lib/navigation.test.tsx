import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useParams, usePathname, useRouter, useSearchParams } from "@/lib/navigation";

function wrapper(initialEntries: string[] = ["/"]) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="*" element={<>{children}</>} />
        </Routes>
      </MemoryRouter>
    );
  };
}

function useLocationSnapshot() {
  const location = useLocation();
  return `${location.pathname}${location.search}`;
}

describe("navigation adapter", () => {
  it("pushes and replaces routes", () => {
    const { result } = renderHook(
      () => ({ router: useRouter(), location: useLocationSnapshot() }),
      { wrapper: wrapper(["/start"]) }
    );

    act(() => result.current.router.push("/dashboard"));
    expect(result.current.location).toBe("/dashboard");

    act(() => result.current.router.replace("/login"));
    expect(result.current.location).toBe("/login");
  });

  it("exposes the pathname", () => {
    const { result } = renderHook(() => usePathname(), {
      wrapper: wrapper(["/dashboard/teacher/tests"]),
    });

    expect(result.current).toBe("/dashboard/teacher/tests");
  });

  it("reads search params like the Next.js hook", () => {
    const { result } = renderHook(() => useSearchParams(), {
      wrapper: wrapper(["/problems?id=abc&moduleProblemId=def"]),
    });

    expect(result.current.get("id")).toBe("abc");
    expect(result.current.get("moduleProblemId")).toBe("def");
    expect(result.current.toString()).toContain("id=abc");
  });

  it("reads dynamic params", () => {
    const { result } = renderHook(() => useParams<{ id: string }>(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <MemoryRouter initialEntries={["/group/123"]}>
          <Routes>
            <Route path="/group/:id" element={<>{children}</>} />
          </Routes>
        </MemoryRouter>
      ),
    });

    expect(result.current.id).toBe("123");
  });
});
