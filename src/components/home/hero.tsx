"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { site } from "@/content/site";
import { track } from "@/lib/analytics";
import { HeroCarousel } from "@/components/home/hero-carousel";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section
      aria-label="Welcome"
      className="relative overflow-hidden surface-royal min-h-[92svh] flex flex-col"
    >
      <HeroCarousel />

      <div className="container-shell relative flex-1 flex flex-col justify-end pt-32 md:pt-36 pb-16 md:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="eyebrow-light"
        >
          <span className="gold-rule" aria-hidden />
          {site.brand.branch}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.08 }}
          className="font-display mt-5 max-w-[16ch] md:max-w-[14ch] text-[44px] sm:text-6xl md:text-7xl lg:text-[88px] leading-[1.02] tracking-[-0.02em] text-ivory balance"
        >
          The hour the city <em className="italic font-light text-gold-soft">finally lets go</em>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.18 }}
          className="mt-6 max-w-xl text-[15px] md:text-[16.5px] leading-[1.7] text-ivory/85 font-light"
        >
          Traditional Thai therapy on North EDSA — therapists trained in
          Bangkok, oils warmed for the body, hours that meet Quezon City
          after work and after midnight.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.28 }}
          className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
        >
          <Link
            href="/visit#book"
            onClick={() => track("cta_click", { id: "hero_book", location: "hero" })}
            className="btn btn-gold"
          >
            Reserve a room
            <ArrowUpRight size={15} className="arrow" />
          </Link>
          <Link
            href="/treatments"
            onClick={() => track("cta_click", { id: "hero_menu", location: "hero" })}
            className="btn btn-ghost-light"
          >
            See the menu of treatments
          </Link>
        </motion.div>

        {/* Bottom strip — hours, location, social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease, delay: 0.55 }}
          className="mt-14 md:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 max-w-4xl"
        >
          <FactCell label="Open" value="2 PM — 2 AM" sub="Daily, including holidays" />
          <FactCell label="Trained in" value="Bangkok" sub="Union of Thai Traditional Medicine" />
          <FactCell label="In practice" value="20 years" sub="35 branches nationwide" />
          <FactCell label="Tripadvisor" value="4.1 ★" sub="Across the group" />
        </motion.div>

        {/* Tiny location pill, lower right on desktop */}
        <div className="mt-10 lg:mt-0 lg:absolute lg:right-10 lg:top-32 flex items-center gap-2 text-[11px] uppercase font-mono tracking-[0.22em] text-ivory/50">
          <MapPin size={12} aria-hidden />
          North EDSA · Quezon City · PH
        </div>
      </div>

      {/* Bottom hairline */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}

function FactCell({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="min-w-0">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-gold-soft">{label}</p>
      <p className="mt-2 font-display text-[20px] sm:text-[24px] md:text-[28px] leading-[1.15] tracking-[-0.01em] text-ivory">
        {value}
      </p>
      <p className="mt-1 text-[12px] text-ivory/60 leading-[1.5] break-words">{sub}</p>
    </div>
  );
}
