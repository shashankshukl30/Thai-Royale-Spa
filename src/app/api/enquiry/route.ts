import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = {
  name: 200,
  email: 254,
  phone: 50,
  treatment: 200,
  treatmentTitle: 200,
  date: 60,
  time: 30,
  guests: 10,
  message: 5000,
} as const;

type Validated = {
  name: string;
  email: string;
  phone: string;
  treatment: string;
  treatmentTitle: string;
  date: string;
  time: string;
  guests: string;
  message: string;
};

function validate(
  body: Record<string, unknown>
): { ok: true; data: Validated } | { ok: false; error: string } {
  if (typeof body._hp === "string" && body._hp.trim().length > 0) {
    return { ok: false, error: "spam" };
  }

  const get = (k: string, max: number): string => {
    const v = body[k];
    if (typeof v !== "string") return "";
    return v.slice(0, max).trim();
  };

  const name = get("name", MAX.name);
  const email = get("email", MAX.email).toLowerCase();
  const phone = get("phone", MAX.phone);
  const treatment = get("treatment", MAX.treatment);
  const treatmentTitle = get("treatmentTitle", MAX.treatmentTitle);
  const date = get("date", MAX.date);
  const time = get("time", MAX.time);
  const guests = get("guests", MAX.guests);
  const message = get("message", MAX.message);

  if (!name) return { ok: false, error: "Please tell us your name." };
  if (!email) return { ok: false, error: "Please share an email so we can reply." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "That email doesn't look right." };

  if (/(https?:\/\/|www\.|<a\s)/i.test(name)) return { ok: false, error: "spam" };
  const urlMatches = (Object.values(body).join(" ").match(/https?:\/\//gi) || []).length;
  if (urlMatches >= 4) return { ok: false, error: "spam" };

  return {
    ok: true,
    data: { name, email, phone, treatment, treatmentTitle, date, time, guests, message },
  };
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const result = validate(body);
  if (!result.ok) {
    if (result.error === "spam") {
      return NextResponse.json({ ok: true, dropped: true });
    }
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  const data = result.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL ?? "thairoyalespa.stamesa@gmail.com";
  const from = process.env.ENQUIRY_FROM_EMAIL ?? "Thai Royale Spa <onboarding@resend.dev>";

  if (!apiKey) {
    console.log("[Thai Royale enquiry — DEV mode]", data);
    return NextResponse.json({ ok: true, dev: true });
  }

  try {
    const html = renderEmail(data);
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `New booking enquiry from ${data.name}${data.treatment ? ` · ${data.treatment}` : ""}`,
        html,
      }),
    });
    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend error:", errText);
      return NextResponse.json({ error: "Mail provider error" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}

function renderEmail(data: Validated) {
  const fieldRow = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:10px 16px;background:#F4ECDC;color:#5C605A;text-transform:uppercase;letter-spacing:0.14em;font-size:11px;font-family:Inter,Arial,sans-serif;width:160px;vertical-align:top">${escapeHtml(
          label
        )}</td><td style="padding:10px 16px;color:#0E1F1A;font-family:Inter,Arial,sans-serif;font-size:14px;line-height:1.55;white-space:pre-wrap">${escapeHtml(
          value
        )}</td></tr>`
      : "";

  const rows = [
    fieldRow("Name", data.name),
    fieldRow("Email", data.email),
    fieldRow("Phone", data.phone),
    fieldRow("Treatment", data.treatmentTitle || data.treatment),
    fieldRow("Preferred date", data.date),
    fieldRow("Preferred time", data.time),
    fieldRow("Guests", data.guests),
    fieldRow("Message", data.message),
  ]
    .filter(Boolean)
    .join("");

  return `<!doctype html><html><body style="margin:0;background:#EFE5CB;padding:24px;font-family:Inter,Arial,sans-serif">
  <table cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #DDD0AC;border-radius:16px;overflow:hidden">
    <tr><td style="padding:28px 28px 6px">
      <div style="font-size:24px;color:#0E1F1A;font-family:Georgia,'Times New Roman',serif;font-weight:600;letter-spacing:-0.01em;line-height:1">Thai Royale Spa <span style="color:#B89253">·</span> <span style="color:#8E6C36;font-size:13px;letter-spacing:0.18em;text-transform:uppercase;font-family:monospace">Sta. Mesa</span></div>
      <div style="margin-top:24px;color:#0E1F1A;font-size:18px;font-family:Georgia,'Times New Roman',serif;letter-spacing:-0.01em">New booking enquiry</div>
    </td></tr>
    <tr><td style="padding:8px 12px 28px"><table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:separate;border-spacing:0 4px">${rows}</table></td></tr>
    <tr><td style="padding:0 28px 24px;color:#5C605A;font-family:Inter,Arial,sans-serif;font-size:12px;line-height:1.6;border-top:1px solid #DDD0AC">
      <div style="padding-top:18px">Reply directly to this email to reach the guest. Open daily, 2:00 PM — 2:00 AM.</div>
    </td></tr>
  </table></body></html>`;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
