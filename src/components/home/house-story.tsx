"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * "The House" — the editorial story panel. Pulls credentials from
 * site.credentials and presents them as a quiet manifesto rather than
 * a list of badges. Tone is reverent + matter-of-fact.
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
              "radial-gradient(80% 60% at 100% 0%, rgba(240,198,82,0.16), transparent 60%)," +
              "radial-gradient(80% 70% at 0% 100%, rgba(20,39,92,0.6), transparent 60%)",
          }}
        />
        <div className="container-shell relative grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow-light">
              <span className="gold-rule" aria-hidden /> The House
            </p>
            <h2 className="font-display mt-5 text-[36px] md:text-5xl lg:text-[58px] leading-[1.05] tracking-[-0.02em] text-ivory balance">
              Twenty years of one quiet conviction:{" "}
              <em className="italic font-light text-gold-soft">
                an hour, well given, returns more than itself.
              </em>
            </h2>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-[15.5px] md:text-[16.5px] leading-[1.8] text-ivory/85 font-light max-w-xl">
              Thai Royale began as a single room in 2003 and has, slowly and
              without much fanfare, become a national house of practice — thirty-
              five branches, hundreds of therapists, one trained-in-Bangkok
              standard. North EDSA is our newest room; built with the same tea
              service, the same hot-towel ritual, the same insistence that
              every guest is greeted by name.
            </p>

            <div className="mt-12 space-y-8">
              {site.credentials.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease, delay: i * 0.06 }}
                  className="grid grid-cols-12 gap-5 pb-7 border-b border-line-ink last:border-b-0 last:pb-0"
                >
                  <div className="col-span-12 md:col-span-4">
                    <p className="font-display text-[20px] md:text-[22px] leading-[1.2] tracking-[-0.01em] text-gold-soft">
                      {c.title}
                    </p>
                  </div>
                  <p className="col-span-12 md:col-span-8 text-[14px] md:text-[15px] leading-[1.7] text-ivory/75">
                    {c.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
