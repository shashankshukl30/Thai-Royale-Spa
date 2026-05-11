import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppBubble } from "@/components/whatsapp-bubble";
import { MotionProviders } from "@/components/motion-providers";
import { site } from "@/content/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "opsz"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thairoyalespa.com"),
  title: {
    default: `${site.brand.name} — ${site.brand.branch}`,
    template: `%s · ${site.brand.name}`,
  },
  description: site.brand.description,
  keywords: [
    "Thai massage Quezon City",
    "spa North EDSA",
    "Thai Royale Spa",
    "couples massage Quezon City",
    "late night spa Manila",
    "Thai traditional massage",
  ],
  // Social-share preview. images is what WhatsApp / iMessage / Slack /
  // Twitter look at when a guest pastes the link. Without it the preview
  // card is blank — kills click-through from social shares + IG bio link.
  // Using the existing hero image already shipped in /public/brand/hero/.
  openGraph: {
    title: `${site.brand.name} — ${site.brand.branch}`,
    description: site.brand.description,
    type: "website",
    locale: "en_PH",
    siteName: site.brand.name,
    images: [
      {
        url: "/brand/hero/4-thai-spa-back.jpg",
        width: 1200,
        height: 630,
        alt: `${site.brand.name} — authentic Thai massage in ${site.brand.branch}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand.name} — ${site.brand.branch}`,
    description: site.brand.description,
    images: ["/brand/hero/4-thai-spa-back.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1c357a",
  width: "device-width",
  initialScale: 1,
};

// JSON-LD structured data — LocalBusiness schema gets the spa rich
// snippets in Google search (address, phone, hours). Rendered inside
// <head> (not <body>) so every audit crawler — including the third-
// party ones that only scan head — detects it. Google parses JSON-LD
// anywhere but head is the textbook spot.
const jsonLdLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "@id": "https://thairoyalespa.com/#business",
  name: site.brand.name,
  description: site.brand.description,
  url: "https://thairoyalespa.com",
  image: "https://thairoyalespa.com/brand/hero/4-thai-spa-back.jpg",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.brand.branch,
    addressLocality: "Quezon City",
    addressRegion: "Metro Manila",
    addressCountry: "PH",
  },
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: "https://thairoyalespa.com",
  name: site.brand.name,
  description: site.brand.description,
  inLanguage: "en-PH",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-ivory text-ink">
        <MotionProviders>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <WhatsAppBubble />
        </MotionProviders>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
