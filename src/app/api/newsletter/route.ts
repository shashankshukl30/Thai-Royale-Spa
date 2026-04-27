import { NextResponse } from "next/server";

/**
 * Newsletter signup. Posts to Resend Audiences API when configured;
 * falls back to a notification email otherwise; in dev (no Resend key)
 * returns ok and logs.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { email?: unknown; source?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const source = typeof body.source === "string" ? body.source.slice(0, 40) : "footer";

  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey) {
    console.log("[Thai Royale newsletter — DEV mode]", { email, source });
    return NextResponse.json({ ok: true, dev: true });
  }

  if (audienceId) {
    try {
      const res = await fetch(
        `https://api.resend.com/audiences/${encodeURIComponent(audienceId)}/contacts`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, unsubscribed: false }),
        }
      );
      if (res.ok) return NextResponse.json({ ok: true, added: true });
      if (res.status === 422) return NextResponse.json({ ok: true, alreadyOnList: true });
      const errText = await res.text();
      console.error("Resend audiences error:", res.status, errText);
    } catch (err) {
      console.error("Resend audiences fetch failed:", err);
    }
  }

  // Fallback: forward to inbox so signups aren't lost
  const to = process.env.ENQUIRY_TO_EMAIL ?? "thairoyalespa.stamesa@gmail.com";
  const from = process.env.ENQUIRY_FROM_EMAIL ?? "Thai Royale Spa <onboarding@resend.dev>";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New newsletter signup · ${email}`,
        html: `<p>Add this address to the Thai Royale Spa newsletter list:</p>
               <p style="font-family:monospace;font-size:15px;background:#F4ECDC;padding:10px 14px;border-radius:8px">${email}</p>
               <p style="color:#5C605A;font-size:12px">Source: ${source}. Configure RESEND_AUDIENCE_ID on Vercel to add new signups directly to a Resend Audience.</p>`,
      }),
    });
    if (!res.ok) {
      const errText = await res.text();
      console.error("Newsletter fallback email error:", errText);
      return NextResponse.json({ error: "Mail provider error" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, fallbackEmail: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
