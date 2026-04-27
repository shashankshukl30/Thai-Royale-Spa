"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { site } from "@/content/site";
import { Wordmark } from "@/components/wordmark";
import { track } from "@/lib/analytics";

export function SiteFooter() {
  return (
    <footer className="surface-royal-deep relative pt-20 pb-10 mt-32">
      <div className="container-shell">
        {/* Top row — wordmark + tagline + newsletter */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-5">
            <Wordmark tone="ivory" className="!text-[24px]" />
            <p className="mt-5 max-w-sm text-[15px] leading-[1.7] text-ivory/80 font-light">
              Therapists trained in Bangkok, oils warmed for the body, doors
              open around the clock. {site.brand.branch}.
            </p>

            <div className="mt-7 flex items-center gap-3 text-[12px] uppercase font-mono tracking-[0.22em] text-gold-soft">
              <span className="gold-rule" aria-hidden />
              {site.contact.hours.label}
            </div>

            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px] text-ivory/70">
              {site.contact.phone && (
                <>
                  <a
                    href={`tel:${site.contact.phone}`}
                    onClick={() => track("tel_click", { location: "footer" })}
                    className="hover:text-gold-soft transition-colors"
                  >
                    {site.contact.phoneDisplay}
                  </a>
                  <span aria-hidden className="text-ivory/30">·</span>
                </>
              )}
              <a
                href={`mailto:${site.contact.email}`}
                className="hover:text-gold-soft transition-colors"
              >
                {site.contact.email}
              </a>
            </div>

            <NewsletterForm />
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <FooterColumn title="Visit" items={site.footerNav.visit} />
            <FooterColumn title="Treatments" items={site.footerNav.treatments} />
            <FooterColumn title="The House" items={site.footerNav.house} />
          </div>
        </div>

        <div className="mt-16 hairline-ink" />

        {/* Bottom row */}
        <div className="mt-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[12px] text-ivory/55 font-mono uppercase tracking-[0.18em]">
          <p>© {new Date().getFullYear()} {site.brand.legalName}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {site.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-soft transition-colors"
              >
                {s.label}
              </a>
            ))}
            <span aria-hidden className="hidden md:inline text-ivory/25">·</span>
            <Link href="/policies" className="hover:text-gold-soft transition-colors">
              Policies
            </Link>
          </div>
        </div>

        <p className="mt-8 text-[10.5px] tracking-[0.16em] uppercase font-mono text-ivory/35">
          Crafted by{" "}
          <a
            href="https://digiocular.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold-soft transition-colors underline-offset-4"
          >
            Digiocular
          </a>
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="eyebrow-light">{title}</p>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-[14px] text-ivory/80 hover:text-gold-soft transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Couldn't sign you up.");
      setStatus("success");
      track("newsletter_submit", {
        success: true,
        source: "footer",
        already_on_list: !!data?.alreadyOnList,
      });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
      track("newsletter_submit", { success: false, source: "footer" });
    }
  }

  if (status === "success") {
    return (
      <div className="mt-8 inline-flex items-center gap-3 text-gold-soft text-[14px]">
        <CheckCircle2 size={18} aria-hidden />
        Thank you. We&apos;ll write only when there&apos;s something worth saying.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-8 max-w-md">
      <p className="eyebrow-light">A quiet letter</p>
      <p className="mt-3 text-[14px] text-ivory/75 leading-[1.65]">
        Seasonal rituals, new arrivals, and the occasional invitation. One letter a month, never more.
      </p>
      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-label="Email address"
          aria-invalid={status === "error"}
          className="flex-1 bg-transparent border border-ivory/25 rounded-full px-5 py-3 text-[14px] text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold-soft transition"
        />
        <button
          type="submit"
          disabled={status === "submitting" || !email}
          className="btn btn-gold disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "Sending…" : "Subscribe"}
          {status !== "submitting" && <ArrowUpRight size={14} className="arrow" />}
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="mt-2 text-[12px] text-gold-soft">
          {error}
        </p>
      )}
    </form>
  );
}
