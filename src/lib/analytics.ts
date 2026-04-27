/**
 * Unified analytics wrapper for Thai Royale Spa.
 *
 * - `@vercel/analytics` is mounted in the root layout via <Analytics />
 *   and captures pageviews + custom events (free tier: 2,500 events/mo).
 * - PostHog is env-gated: it only loads when NEXT_PUBLIC_POSTHOG_KEY is
 *   set (initialised in `instrumentation-client.ts`). Without a key,
 *   `track()` still flows to Vercel only — no-op for PostHog.
 *
 * Call `track('event_name', { ... })` from anywhere (Client Components).
 * Server Components should not call this — track at the user-action level
 * which is always client-side.
 */
import { track as vercelTrack } from "@vercel/analytics";

type PostHogClient = {
  capture: (event: string, props?: Record<string, unknown>) => void;
  identify: (id: string, props?: Record<string, unknown>) => void;
  reset: () => void;
};

declare global {
  interface Window {
    posthog?: PostHogClient;
  }
}

export type EventName =
  | "cta_click"
  | "wa_click"
  | "tel_click"
  | "treatment_card_click"
  | "booking_open"
  | "booking_submit"
  | "newsletter_submit"
  | "scroll_milestone"
  | "exit_intent_shown"
  | "exit_intent_dismissed";

type EventProps = Record<string, string | number | boolean | null | undefined>;

export function track(event: EventName, props: EventProps = {}) {
  const clean: Record<string, string | number | boolean | null> = {};
  for (const [k, v] of Object.entries(props)) {
    if (v !== undefined) clean[k] = v;
  }

  try {
    vercelTrack(event, clean);
  } catch {
    // ignore — analytics must never throw into product code
  }

  if (typeof window !== "undefined" && window.posthog) {
    try {
      window.posthog.capture(event, clean);
    } catch {
      // ignore
    }
  }
}

export function identify(id: string, props?: EventProps) {
  if (typeof window !== "undefined" && window.posthog) {
    try {
      window.posthog.identify(id, props);
    } catch {
      // ignore
    }
  }
}
