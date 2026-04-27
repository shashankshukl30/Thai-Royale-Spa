"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { track } from "@/lib/analytics";

const ease = [0.16, 1, 0.3, 1] as const;

type Treatment = {
  slug: string;
  name: string;
  thaiName: string;
  blurb: string;
  durations: string;
  fromPHP: number;
  intent: string; // "for ___"
  glyph: string;
};

// Curated v1 menu — anchored to what the parent group offers nationwide.
// Phase B will move this to /content/treatments.ts with full detail pages.
const SIGNATURE: Treatment[] = [
  {
    slug: "thai-traditional",
    name: "Traditional Thai",
    thaiName: "นวดแผนไทย",
    blurb:
      "The original. Long stretches, rhythmic compressions, and the careful unspooling of a body that's held too much for too long.",
    durations: "60 · 90 · 120 min",
    fromPHP: 530,
    intent: "for the over-worked",
    glyph: "I",
  },
  {
    slug: "swedish-aromatherapy",
    name: "Swedish & Aromatherapy",
    thaiName: "สวีดิช",
    blurb:
      "Warmed essential oils, slow Swedish strokes, and the lavender-and-lemongrass blend our therapists make in-house each morning.",
    durations: "60 · 90 · 120 min",
    fromPHP: 650,
    intent: "for the wound-tight",
    glyph: "II",
  },
  {
    slug: "couples-ritual",
    name: "The Couples Ritual",
    thaiName: "คู่",
    blurb:
      "Our private suite, two therapists in synchrony, and a closing pot of butterfly-pea tea. Ninety minutes that feel like a small holiday.",
    durations: "90 · 120 min · 2 guests",
    fromPHP: 2300,
    intent: "for the two of you",
    glyph: "III",
  },
];

export function SignatureTreatments() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-shell">
        <header className="max-w-3xl">
          <p className="eyebrow">
            <span className="gold-rule" aria-hidden /> The menu, in brief
          </p>
          <h2 className="font-display mt-5 text-[36px] md:text-5xl lg:text-[56px] leading-[1.06] tracking-[-0.02em] text-ink balance">
            Six rooms. Three signatures.{" "}
            <em className="italic font-light text-gold-deep">One careful hour at a time.</em>
          </h2>
          <p className="mt-5 text-[15.5px] leading-[1.75] text-ash max-w-xl">
            We keep the menu short on purpose. Every therapist on the floor is
            certified to deliver each of these treatments to the standard set
            in Bangkok — there is no junior service in our house.
          </p>
        </header>

        <div className="mt-14 md:mt-18 grid md:grid-cols-3 gap-6 md:gap-7">
          {SIGNATURE.map((t, i) => (
            <motion.article
              key={t.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease, delay: i * 0.07 }}
              className="group relative rounded-3xl border border-line bg-bone overflow-hidden flex flex-col"
            >
              {/* Image stand-in — royal-and-gold composition with numeral */}
              <div className="relative h-48 md:h-56 surface-royal overflow-hidden">
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(140% 100% at 70% 0%, rgba(240,198,82,0.32), transparent 55%), " +
                      "radial-gradient(120% 90% at 0% 100%, rgba(42,70,145,0.55), transparent 65%)",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display italic text-[120px] leading-none text-gold-soft/50 select-none">
                    {t.glyph}
                  </span>
                </div>
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-gold-soft">
                    {t.intent}
                  </span>
                  <span className="font-display italic text-[15px] text-ivory/85">
                    {t.thaiName}
                  </span>
                </div>
              </div>

              <div className="flex-1 flex flex-col p-6 md:p-7">
                <h3 className="font-display text-[26px] md:text-[28px] leading-[1.1] tracking-[-0.015em] text-ink">
                  {t.name}
                </h3>
                <p className="mt-3 text-[14.5px] text-ash leading-[1.7] flex-1">{t.blurb}</p>

                <div className="mt-6 pt-5 border-t border-line flex items-end justify-between gap-3">
                  <div>
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ash/80">
                      From
                    </p>
                    <p className="font-display text-[22px] tracking-[-0.01em] text-ink mt-0.5">
                      ₱{t.fromPHP.toLocaleString("en-PH")}
                    </p>
                  </div>
                  <p className="font-mono text-[11px] tracking-[0.06em] text-ash text-right pb-1">
                    {t.durations}
                  </p>
                </div>

                <Link
                  href={`/treatments/${t.slug}`}
                  onClick={() =>
                    track("treatment_card_click", { slug: t.slug, location: "home_signature" })
                  }
                  className="mt-6 inline-flex items-center justify-between gap-2 text-[13.5px] font-medium text-ink group-hover:text-gold-deep transition-colors"
                >
                  Read the ritual
                  <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-14 flex items-center justify-center">
          <Link
            href="/treatments"
            onClick={() => track("cta_click", { id: "home_view_full_menu", location: "home_signature" })}
            className="btn btn-ghost"
          >
            View the full menu
            <ArrowUpRight size={14} className="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
