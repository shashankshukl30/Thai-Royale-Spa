import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const URL = "http://localhost:3000/";
const OUT = "qa";

const VIEWPORTS = [
  { name: "mobile-320", w: 320, h: 720 },
  { name: "mobile-360", w: 360, h: 800 },
  { name: "mobile-390", w: 390, h: 844 },
  { name: "mobile-430", w: 430, h: 932 },
  { name: "tablet-768", w: 768, h: 1024 },
  { name: "laptop-1366", w: 1366, h: 800 },
  { name: "desktop-1440", w: 1440, h: 900 },
];

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const failures = [];

for (const v of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: v.w, height: v.h },
    deviceScaleFactor: 1.5,
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });

  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/${v.name}-fold.png`, fullPage: false });

  // Walk the page so whileInView fires in every section.
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = Math.max(200, Math.floor(v.h * 0.7));
  for (let y = 0; y < total; y += step) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
    await page.waitForTimeout(180);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/${v.name}-full.png`, fullPage: true });

  // Hard overflow check: documentElement / body width must not exceed viewport
  const overflow = await page.evaluate(() => ({
    docW: document.documentElement.scrollWidth,
    bodyW: document.body.scrollWidth,
    winW: window.innerWidth,
  }));
  const overflowing = overflow.docW > overflow.winW + 1 || overflow.bodyW > overflow.winW + 1;

  // Find any individual elements that exceed the viewport (helps debug)
  const widest = await page.evaluate((winW) => {
    const offenders = [];
    document.querySelectorAll("*").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.width > winW + 1 || rect.right > winW + 1) {
        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: el.className?.toString?.()?.slice(0, 80) ?? "",
          w: Math.round(rect.width),
          right: Math.round(rect.right),
        });
      }
    });
    return offenders.slice(0, 8);
  }, v.w);

  const status = overflowing ? "✗" : "✓";
  console.log(
    `${status} ${v.name} (${v.w}×${v.h}) doc=${overflow.docW} body=${overflow.bodyW} win=${overflow.winW}`
  );
  if (overflowing) {
    failures.push({ name: v.name, overflow, widest });
    console.log("    offenders:", JSON.stringify(widest));
  }
  await ctx.close();
}
await browser.close();
if (failures.length) {
  console.error("OVERFLOW FAILURES:", JSON.stringify(failures, null, 2));
  process.exit(1);
}
console.log("All viewports clean — no horizontal overflow.");
