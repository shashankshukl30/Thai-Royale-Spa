import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Brand mark — pairs the official Thai Royale Spa badge (oval logo on a
 * white field, treated as an intentional "stamp") with a typed wordmark.
 * The typed mark gives clean inline typography on dark/light surfaces;
 * the badge gives identity and instant recognisability.
 *
 * `tone="ivory"` is for dark surfaces (hero, footer); `tone="ink"` is
 * for light surfaces (header on scroll). Set `badgeOnly` to render the
 * stamp alone (e.g. as a pure brand seal).
 */
export function Wordmark({
  className = "",
  tone = "ink",
  badgeOnly = false,
  badgeSize = 36,
}: {
  className?: string;
  tone?: "ink" | "ivory";
  badgeOnly?: boolean;
  badgeSize?: number;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 leading-none select-none",
        className
      )}
    >
      <Image
        src="/brand/logo.jpg"
        alt="Thai Royale Spa"
        width={badgeSize * 2}
        height={badgeSize * 2}
        priority
        className="rounded-full ring-1 ring-gold-soft/50 shadow-[0_2px_10px_-4px_rgba(20,39,92,0.4)] shrink-0"
        style={{ width: badgeSize, height: badgeSize }}
      />
      {!badgeOnly && (
        <span className="inline-flex items-baseline gap-2">
          <span
            className={cn(
              "font-display tracking-[-0.02em] text-[19px] md:text-[20px] font-medium",
              tone === "ink" ? "text-royal" : "text-ivory"
            )}
          >
            Thai Royale
          </span>
          <span
            className={cn(
              "font-mono uppercase text-[10.5px] tracking-[0.22em] mb-[1px]",
              tone === "ink" ? "text-gold-deep" : "text-gold-soft"
            )}
          >
            Spa
          </span>
        </span>
      )}
    </span>
  );
}
