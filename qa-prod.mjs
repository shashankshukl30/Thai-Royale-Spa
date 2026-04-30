import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
const page = await ctx.newPage();
await page.goto("https://thai-royale-spa-site.vercel.app/", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.screenshot({ path: "qa/prod-fold.png" });
const total = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < total; y += 600) { await page.evaluate(y => window.scrollTo(0, y), y); await page.waitForTimeout(220); }
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);
await page.screenshot({ path: "qa/prod-full.png", fullPage: true });

// Mobile too
const m = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const mp = await m.newPage();
await mp.goto("https://thai-royale-spa-site.vercel.app/", { waitUntil: "networkidle" });
await mp.waitForTimeout(700);
await mp.screenshot({ path: "qa/prod-mobile-fold.png" });
const mtotal = await mp.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < mtotal; y += 500) { await mp.evaluate(y => window.scrollTo(0, y), y); await mp.waitForTimeout(180); }
await mp.evaluate(() => window.scrollTo(0, 0));
await mp.waitForTimeout(400);
await mp.screenshot({ path: "qa/prod-mobile-full.png", fullPage: true });

await browser.close();
console.log("done");
