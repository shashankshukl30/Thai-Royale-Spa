"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { site } from "@/content/site";
import { track } from "@/lib/analytics";

/**
 * Floating WhatsApp bubble — bottom-right on every page except treatment-detail
 * (which gets its own sticky bottom CTA bar in Phase C). Appears after the
 * user scrolls past the hero so it doesn't compete with the primary CTA.
 */
export function WhatsAppBubble() {
  const pathname = usePathname();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide on individual treatment pages (sticky CTA shipped there in Phase C).
  const isTreatmentDetail =
    pathname?.startsWith("/treatments/") &&
    pathname.split("/").filter(Boolean).length === 2;
  if (isTreatmentDetail) return null;

  const number = site.contact.whatsapp.replace(/\D/g, "");
  const href = `https://wa.me/${number}?text=${encodeURIComponent(
    `Hello ${site.brand.name} — I'd like to book a session.`
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${site.brand.name} on WhatsApp`}
      onClick={() => track("wa_click", { location: "floating_bubble" })}
      className={`fixed z-40 bottom-5 right-5 md:bottom-6 md:right-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1FB855] text-white pl-4 pr-5 py-3 shadow-[0_18px_40px_-14px_rgba(37,211,102,0.55)] transition-all duration-500 ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{
        paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0))",
      }}
    >
      <MessageCircle size={18} aria-hidden />
      <span className="font-medium text-sm hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
