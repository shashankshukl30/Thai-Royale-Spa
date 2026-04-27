type ClassValue = string | number | null | false | undefined | ClassValue[];

/**
 * Tiny `classnames`-style helper. Keeps the bundle smaller than `clsx` for
 * a one-import use case.
 */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  const walk = (v: ClassValue) => {
    if (!v && v !== 0) return;
    if (typeof v === "string" || typeof v === "number") out.push(String(v));
    else if (Array.isArray(v)) v.forEach(walk);
  };
  inputs.forEach(walk);
  return out.join(" ");
}

/** Format a price as PHP. Whole-peso by default — spa pricing is round. */
export function formatPHP(amount: number, opts?: { withDecimals?: boolean }) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: opts?.withDecimals ? 2 : 0,
    maximumFractionDigits: opts?.withDecimals ? 2 : 0,
  }).format(amount);
}

/** "60 min" / "90 min" — use sparingly; menus read better as plain numbers. */
export function formatMinutes(min: number) {
  return `${min} min`;
}
