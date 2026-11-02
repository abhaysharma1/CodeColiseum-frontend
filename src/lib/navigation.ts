import {
  useLocation,
  useNavigate,
  useParams as useReactRouterParams,
  useSearchParams as useReactRouterSearchParams,
} from "react-router-dom";

/**
 * Thin adapter over React Router that preserves the navigation API the
 * migrated components were written against (`useRouter().push(...)`).
 *
 * New code should import React Router hooks directly; this module exists so
 * the bulk migration did not have to rewrite ~150 call sites by hand.
 */
export function useRouter() {
  const navigate = useNavigate();

  return {
    push: (to: string | number) => navigate(to as never),
    replace: (to: string | number) => navigate(to as never, { replace: true }),
    back: () => navigate(-1),
    forward: () => navigate(1),
    // Next.js `router.refresh()` re-fetched server components. The Vite app
    // has no server components; React Query invalidation owns refetching.
    refresh: () => undefined,
  };
}

export function usePathname(): string {
  return useLocation().pathname;
}

/** Read-only search params, matching the Next.js return shape. */
export function useSearchParams(): URLSearchParams {
  const [searchParams] = useReactRouterSearchParams();
  return searchParams;
}

export function useParams<
  T extends Record<string, string | undefined> = Record<
    string,
    string | undefined
  >,
>(): T {
  return useReactRouterParams() as T;
}
