import type { NextConfig } from "next";

// Security headers — Next.js ships zero by default. Without these the
// site fails Security Headers + Mozilla Observatory grades, which our
// own audit tool at audit.digiocular.in surfaces immediately.
// CSP allows only the third parties this site actually uses (Vercel
// Analytics + Speed Insights, Google Fonts). No 'unsafe-eval'; the
// 'unsafe-inline' on script-src stays until per-request nonces are
// wired through middleware.
const SECURITY_HEADERS = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://*.vercel-scripts.com https://*.vercel-insights.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https://images.unsplash.com https://*.thairoyalespa.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://vitals.vercel-insights.com https://*.vercel-insights.com https://*.vercel-scripts.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
