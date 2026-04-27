"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { site } from "@/content/site";
import { Wordmark } from "@/components/wordmark";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-ivory/85 backdrop-blur-xl border-b border-line/60"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container-shell flex items-center justify-between h-[68px] md:h-[76px]">
        <Link
          href="/"
          aria-label={`${site.brand.name} home`}
          onClick={() => track("cta_click", { id: "header_logo", location: "header" })}
          className="shrink-0"
        >
          <Wordmark tone={scrolled ? "ink" : "ivory"} />
        </Link>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-9">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[13.5px] font-medium tracking-[-0.005em] transition-colors",
                scrolled ? "text-ink/80 hover:text-ink" : "text-ivory/85 hover:text-gold-soft"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.contact.phone}`}
            onClick={() => track("tel_click", { location: "header" })}
            className={cn(
              "hidden sm:inline-flex items-center gap-2 text-[12.5px] font-mono uppercase tracking-[0.18em] transition-colors",
              scrolled ? "text-ash hover:text-ink" : "text-ivory/70 hover:text-gold-soft"
            )}
            aria-label={`Call ${site.contact.phoneDisplay}`}
          >
            <Phone size={14} aria-hidden />
            <span className="hidden md:inline">{site.contact.phoneDisplay}</span>
          </a>
          <Link
            href="/visit#book"
            onClick={() => track("cta_click", { id: "header_book", location: "header" })}
            className={cn(
              "hidden md:inline-flex btn !py-2.5 !px-5 !text-[13px]",
              scrolled ? "btn-primary" : "btn-gold"
            )}
          >
            Reserve a room
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className={cn(
              "lg:hidden w-10 h-10 -mr-2 inline-flex items-center justify-center rounded-full transition-colors",
              scrolled ? "text-ink hover:bg-cream" : "text-ivory hover:bg-ivory/10"
            )}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 top-[68px] bg-ivory/98 backdrop-blur-xl"
          >
            <div className="container-shell pt-8 pb-12 flex flex-col gap-1">
              {site.nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.04 * i, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 font-display text-[34px] tracking-[-0.02em] text-ink border-b border-line/70"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/visit#book"
                  onClick={() => {
                    setOpen(false);
                    track("cta_click", { id: "mobile_menu_book", location: "mobile_menu" });
                  }}
                  className="btn btn-primary w-full justify-center"
                >
                  Reserve a room
                </Link>
                <a
                  href={`tel:${site.contact.phone}`}
                  onClick={() => track("tel_click", { location: "mobile_menu" })}
                  className="btn btn-ghost w-full justify-center"
                >
                  <Phone size={14} aria-hidden /> {site.contact.phoneDisplay}
                </a>
              </div>
              <p className="mt-10 text-[12.5px] uppercase tracking-[0.22em] text-ash font-mono">
                {site.contact.hours.label}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
