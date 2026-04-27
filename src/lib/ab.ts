"use client";

import { useEffect, useState } from "react";

/**
 * Lightweight A/B test helper backed by PostHog feature flags.
 *
 * Usage:
 *   const variant = useVariant("hero-headline", ["control", "treatment"]);
 *   if (variant === "treatment") { ... }
 *
 * Without a NEXT_PUBLIC_POSTHOG_KEY, the hook returns the first variant
 * ("control" by convention). Sites work identically.
 */
export function useVariant<T extends string>(
  flagName: string,
  variants: readonly [T, ...T[]]
): T {
  const fallback = variants[0];
  const [variant, setVariant] = useState<T>(fallback);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ph = window.posthog;
    if (!ph) return;

    function read() {
      const phAny = window.posthog as unknown as {
        getFeatureFlag?: (key: string) => string | boolean | undefined;
      };
      const v = phAny.getFeatureFlag?.(flagName);
      if (typeof v === "string" && (variants as readonly string[]).includes(v)) {
        setVariant(v as T);
      }
    }

    read();
    const phAny = ph as unknown as {
      onFeatureFlags?: (cb: () => void) => () => void;
    };
    const off = phAny.onFeatureFlags?.(read);
    return () => {
      if (typeof off === "function") off();
    };
  }, [flagName, variants]);

  return variant;
}
