import { lazy, Suspense, type ComponentType, type ReactNode } from "react";

interface LazyComponentOptions {
  ssr?: boolean;
  loading?: () => ReactNode;
}

/**
 * Vite equivalent of `next/dynamic`.
 *
 * The `ssr` flag is accepted for source compatibility but is meaningless in a
 * client-only SPA (every component is client-rendered).
 */
export default function lazyComponent<P extends Record<string, unknown>>(
  loader: () => Promise<{ default: ComponentType<P> }>,
  options?: LazyComponentOptions
) {
  const LazyComponent = lazy(loader);

  return function DynamicComponent(props: P) {
    return (
      <Suspense fallback={options?.loading?.() ?? null}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}
