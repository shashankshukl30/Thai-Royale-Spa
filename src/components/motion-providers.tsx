"use client";

import { MotionConfig } from "framer-motion";

/**
 * Honour `prefers-reduced-motion: reduce` across every Framer Motion
 * component. With `reducedMotion="user"`, motion components snap to their
 * `animate` state instantly when the user prefers reduced motion — so
 * `initial={{ opacity: 0 }}` doesn't strand content invisibly.
 */
export function MotionProviders({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
