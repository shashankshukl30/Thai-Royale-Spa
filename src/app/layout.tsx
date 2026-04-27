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
    "Thai massage Manila",
    "spa Sta Mesa",
    "Thai Royale Spa",
    "couples massage Manila",
    "late night spa Manila",
    "Thai traditional massage",
  ],
  openGraph: {
    title: `${site.brand.name} — ${site.brand.branch}`,
    description: site.brand.description,
    type: "website",
    locale: "en_PH",
    siteName: site.brand.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand.name} — ${site.brand.branch}`,
    description: site.brand.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#1c357a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
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
