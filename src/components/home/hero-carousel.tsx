"use client";

import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const SLIDES = [
  {
    src: "/brand/hero/1-massage-table.jpg",
    alt: "Therapist pouring warm oil onto a guest's back",
  },
  {
    src: "/brand/hero/3-back-massage.jpg",
    alt: "Hands resting between strokes, low warm light",
  },
  {
    src: "/brand/hero/4-thai-spa-back.jpg",
    alt: "Close detail of hands during a back massage",
  },
  {
    src: "/brand/hero/2-hot-stones.jpg",
    alt: "Hot stones placed along the spine in a candlelit room",
  },
];

const INTERVAL_MS = 7000;
const FADE_MS = 1800;

/**
 * Slow editorial crossfade behind the hero copy. Long fade durations
 * (~1.8s) and a 7s dwell — Aman/Six Senses cadence, not a slideshow.
 *
 * Honours `prefers-reduced-motion`: shows just the first frame, no rotation.
 * The royal-blue + gold tinting overlay sits on top so the brand identity
 * dominates regardless of which photo is showing — and so the headline
 * remains readable across a wide range of slides.
 */
export function HeroCarousel() {
  const reduced = useReducedMotion();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* Crossfading photo stack */}
      <AnimatePresence initial={false}>
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_MS / 1000, ease: "linear" }}
          className="absolute inset-0"
        >
          <Image
            src={SLIDES[idx].src}
            alt={SLIDES[idx].alt}
            fill
            priority={idx === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Royal tint — multiply blend pulls the photo into brand palette */}
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{
          background:
            "linear-gradient(180deg, rgba(28,53,122,0.92) 0%, rgba(28,53,122,0.78) 35%, rgba(20,39,92,0.92) 100%)",
        }}
      />

      {/* Gold highlight gradient on top — gives warmth + spotlight */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 80% at 80% 15%, rgba(240,198,82,0.18), transparent 55%)," +
            "radial-gradient(80% 60% at 0% 100%, rgba(20,39,92,0.45), transparent 60%)",
        }}
      />

      {/* Soft horizontal gold light beam */}
      <div className="absolute left-0 right-0 top-1/3 h-[1px] bg-gradient-to-r from-transparent via-gold-soft/40 to-transparent" />

      {/* Slide indicator dots — bottom-right, very small, screen-reader-hidden */}
      <div className="absolute right-5 bottom-5 md:right-8 md:bottom-8 flex items-center gap-1.5">
        {SLIDES.map((_, i) => (
          <span
            key={i}
            className={`block h-[5px] rounded-full transition-all duration-700 ${
              i === idx ? "w-6 bg-gold-soft" : "w-[5px] bg-ivory/35"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
