"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/content/site";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * "The House" — the editorial story panel. Frames the team portrait as
 * the single human anchor of the brand promise, with credentials beside
 * it. Tone is reverent + matter-of-fact.
 */
export function HouseStory() {
  return (
    <section className="relative">
      <div className="surface-royal grain relative overflow-hidden py-24 md:py-32">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(80% 60% at 100% 0%, rgba(240,198,82,0.14), transparent 60%)," +
              "radial-gradient(80% 70% at 0% 100%, rgba(20,39,92,0.6), transparent 60%)",
          }}
        />
        <div className="container-shell relative">
          {/* Top — eyebrow + headline span the canvas */}
          <div className="max-w-4xl">
            <p className="eyebrow-light">
              <span className="gold-rule" aria-hidden /> The House
            </p>
            <h2 className="font-display mt-5 text-[36px] md:text-5xl lg:text-[60px] leading-[1.05] tracking-[-0.02em] text-ivory balance">
              Twenty years of one quiet conviction:{" "}
              <em className="italic font-light text-gold-soft">
                an hour, well given, returns more than itself.
              </em>
            </h2>
          </div>

          {/* Two-column body — team portrait + credentials story */}
          <div className="mt-14 md:mt-20 grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease }}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl ring-1 ring-line-ink/60 shadow-[0_30px_60px_-20px_rgba(8,20,16,0.55)]">
                <Image
                  src="/brand/branch/team.jpg"
                  alt="The Thai Royale Spa North EDSA team"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
                {/* Soft bottom-up royal gradient for caption legibility */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 55%, rgba(8,20,16,0.55) 100%)",
                  }}
                />
                <div className="absolute left-5 right-5 bottom-5 text-ivory">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-gold-soft">
                    The Team · North EDSA
                  </p>
                  <p className="font-display text-[18px] md:text-[20px] leading-[1.25] mt-2">
                    Twelve therapists, one Bangkok standard.
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="lg:col-span-7 lg:pl-2">
              <p className="text-[15.5px] md:text-[16.5px] leading-[1.8] text-ivory/85 font-light max-w-xl">
                Thai Royale began as a single room in 2003 and has, slowly and
                without much fanfare, become a national house of practice — thirty-
                five branches, hundreds of therapists, one trained-in-Bangkok
                standard. North EDSA is our newest room; built with the same tea
                service, the same hot-towel ritual, the same insistence that
                every guest is greeted by name.
              </p>

              <div className="mt-10 md:mt-12 space-y-7">
                {site.credentials.map((c, i) => (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, ease, delay: i * 0.06 }}
                    className="grid grid-cols-12 gap-5 pb-6 border-b border-line-ink last:border-b-0 last:pb-0"
                  >
                    <div className="col-span-12 md:col-span-5">
                      <p className="font-display text-[19px] md:text-[21px] leading-[1.2] tracking-[-0.01em] text-gold-soft">
                        {c.title}
                      </p>
                    </div>
                    <p className="col-span-12 md:col-span-7 text-[14px] md:text-[15px] leading-[1.7] text-ivory/75">
                      {c.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
