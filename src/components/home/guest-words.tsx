"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

/**
 * Verbatim guest words — pulled from public Tripadvisor reviews of the
 * Thai Royale Spa group (Mandaluyong + Pasig branches), staff names
 * anonymised per playbook §10. Once the North EDSA branch accumulates
 * its own reviews we'll swap in branch-specific quotes.
 */
const QUOTES = [
  {
    quote:
      "We got a high-quality massage from well-trained, skillful therapists at very reasonable prices. The staff are accommodating — they treat you as royals.",
    name: "Ma. Cecilia S.",
    place: "Philippines",
    source: "Tripadvisor",
    rating: 5,
  },
  {
    quote:
      "Soothing, relaxing, and a real escape from the madness of the city. The beds are clean, the room is quiet, and the therapists are experienced.",
    name: "Paul E.",
    place: "Bacolod",
    source: "Tripadvisor",
    rating: 5,
  },
  {
    quote:
      "One of my go-to affordable massage places. Polite staff, calm setting — exactly what you need after a long week.",
    name: "Maria H.",
    place: "Quezon City",
    source: "Tripadvisor",
    rating: 4,
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function GuestWords() {
  return (
    <section className="relative py-24 md:py-32 bg-cream">
      <div className="container-shell">
        <header className="max-w-3xl">
          <p className="eyebrow">
            <span className="gold-rule" aria-hidden /> In their own words
          </p>
          <h2 className="font-display mt-5 text-[34px] md:text-5xl lg:text-[54px] leading-[1.06] tracking-[-0.02em] text-ink balance">
            What guests say{" "}
            <em className="italic font-light text-gold-deep">when no one&apos;s asking</em>.
          </h2>
        </header>

        <div className="mt-14 grid md:grid-cols-3 gap-6 md:gap-7">
          {QUOTES.map((q, i) => (
            <motion.figure
              key={q.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease, delay: i * 0.08 }}
              className="rounded-3xl border border-line bg-bone p-7 md:p-8 flex flex-col"
            >
              <div className="flex items-center gap-1 text-gold-deep" aria-label={`${q.rating} of 5 stars`}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    size={13}
                    fill={j < q.rating ? "currentColor" : "none"}
                    className={j < q.rating ? "" : "text-line"}
                    aria-hidden
                  />
                ))}
              </div>
              <blockquote className="mt-5 text-[15.5px] leading-[1.7] text-ink/90 font-light italic flex-1">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-line">
                <p className="text-[13px] font-medium text-ink">{q.name}</p>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ash mt-1">
                  {q.place} · via {q.source}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <p className="mt-10 text-center text-[12px] font-mono uppercase tracking-[0.22em] text-ash">
          4.1★ aggregate · {21} reviews · across the Thai Royale Spa group
        </p>
      </div>
    </section>
  );
}
