"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { site } from "@/content/site";
import { track } from "@/lib/analytics";

const ease = [0.16, 1, 0.3, 1] as const;

export function VisitCard() {
  const hasWhatsApp = !!site.contact.whatsapp;
  const hasPhone = !!site.contact.phone;
  const waNumber = site.contact.whatsapp.replace(/\D/g, "");
  const waHref = hasWhatsApp
    ? `https://wa.me/${waNumber}?text=${encodeURIComponent(
        `Hello — I'd like to book a session at ${site.brand.name}.`
      )}`
    : "#";

  return (
    <section className="relative py-20 md:py-28">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="relative overflow-hidden rounded-[28px] surface-royal grain"
        >
          {/* Reception interior as backdrop — pulls into brand palette via
              multiply, with a darkening gradient so type stays readable. */}
          <div className="absolute inset-0">
            <Image
              src="/brand/branch/reception.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center opacity-90"
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 mix-blend-multiply"
            style={{
              background:
                "linear-gradient(135deg, rgba(28,53,122,0.85) 0%, rgba(20,39,92,0.78) 60%, rgba(20,39,92,0.92) 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(80% 100% at 100% 0%, rgba(240,198,82,0.22), transparent 55%)",
            }}
          />

          <div className="relative p-8 md:p-12 lg:p-16 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <p className="eyebrow-light">
                <span className="gold-rule" aria-hidden /> Pay us a visit
              </p>
              <h2 className="font-display mt-5 text-[34px] md:text-5xl lg:text-[58px] leading-[1.06] tracking-[-0.02em] text-ivory balance">
                Reserve a quiet hour.{" "}
                <em className="italic font-light text-gold-soft">Book ahead, or just walk in.</em>
              </h2>
              <p className="mt-5 max-w-lg text-[15.5px] leading-[1.75] text-ivory/80 font-light">
                Reservations are recommended for evenings, weekends, and the
                couples suite. The fastest way to reach us is a message on
                Facebook — we usually reply within fifteen minutes during
                open hours.
              </p>

              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                {hasWhatsApp ? (
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("wa_click", { location: "home_visit_card" })}
                    className="btn btn-gold"
                  >
                    Message on WhatsApp
                    <ArrowUpRight size={14} className="arrow" />
                  </a>
                ) : (
                  <a
                    href={site.contact.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      track("cta_click", { id: "home_visit_facebook", location: "home_visit_card" })
                    }
                    className="btn btn-gold"
                  >
                    <MessageCircle size={14} aria-hidden /> Message us on Facebook
                    <ArrowUpRight size={14} className="arrow" />
                  </a>
                )}
                {hasPhone ? (
                  <a
                    href={`tel:${site.contact.phone}`}
                    onClick={() => track("tel_click", { location: "home_visit_card" })}
                    className="btn btn-ghost-light"
                  >
                    <Phone size={14} aria-hidden /> {site.contact.phoneDisplay}
                  </a>
                ) : (
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="btn btn-ghost-light"
                  >
                    {site.contact.email}
                  </a>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 lg:border-l lg:border-line-ink lg:pl-12">
              <FactRow icon={<Clock size={15} aria-hidden />} label="Hours" value={site.contact.hours.label} />
              <div className="hairline-ink my-5 opacity-60" />
              <FactRow
                icon={<MapPin size={15} aria-hidden />}
                label="Location"
                value={`${site.contact.address.line1}, ${site.contact.address.line2}`}
              />
              <div className="hairline-ink my-5 opacity-60" />
              <Link
                href="/visit"
                onClick={() => track("cta_click", { id: "home_visit_directions", location: "home_visit_card" })}
                className="inline-flex items-center gap-2 text-[14px] font-medium text-gold-soft hover:text-ivory transition-colors"
              >
                Directions, parking & transit
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FactRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-gold-soft font-mono text-[10.5px] uppercase tracking-[0.22em]">
        {icon}
        {label}
      </div>
      <p className="mt-2 font-display text-[20px] leading-[1.3] tracking-[-0.005em] text-ivory">
        {value}
      </p>
    </div>
  );
}
