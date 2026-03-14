import { NextRequest, NextResponse } from "next/server";

// ─── Simple in-memory rate limiter ──────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

// ─── Validation helpers ──────────────────────────────────────────────────────
function sanitizeStr(str: unknown): string {
  if (typeof str !== "string") return "";
  return str.trim().replace(/[<>]/g, "");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

// ─── POST handler ────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse and validate
    const body = await request.json();
    const name = sanitizeStr(body.name);
    const email = sanitizeStr(body.email);
    const subject = sanitizeStr(body.subject);
    const message = sanitizeStr(body.message);

    if (!name || name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: "Name must be 2–100 characters." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    if (!subject || subject.length < 2 || subject.length > 200) {
      return NextResponse.json(
        { error: "Subject must be 2–200 characters." },
        { status: 400 }
      );
    }

    if (!message || message.length < 10 || message.length > 5000) {
      return NextResponse.json(
        { error: "Message must be 10–5000 characters." },
        { status: 400 }
      );
    }

    // ─── Email delivery ─────────────────────────────────────────────────
    // Option 1: SendGrid (if SENDGRID_API_KEY is set)
    // Option 2: Formspree (if FORMSPREE_ENDPOINT is set)
    // Option 3: Log to console (development fallback)

    const sendgridKey = process.env.SENDGRID_API_KEY;
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;
    const contactEmail = process.env.CONTACT_EMAIL || "owner@example.com";

    if (sendgridKey) {
      // SendGrid integration
      const sgResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sendgridKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: contactEmail }] }],
          from: { email: "noreply@portfolio.dev", name: "Portfolio Contact" },
          reply_to: { email, name },
          subject: `[Portfolio] ${subject}`,
          content: [
            {
              type: "text/plain",
              value: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
            },
          ],
        }),
      });

      if (!sgResponse.ok) {
        console.error("SendGrid error:", await sgResponse.text());
        return NextResponse.json(
          { error: "Failed to send email. Please try again." },
          { status: 500 }
        );
      }
    } else if (formspreeEndpoint) {
      // Formspree integration
      const fpResponse = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!fpResponse.ok) {
        console.error("Formspree error:", await fpResponse.text());
        return NextResponse.json(
          { error: "Failed to send message. Please try again." },
          { status: 500 }
        );
      }
    } else {
      // Development fallback — log to console
      console.log("═══════════════════════════════════════");
      console.log("📧 New Contact Form Submission:");
      console.log(`   Name:    ${name}`);
      console.log(`   Email:   ${email}`);
      console.log(`   Subject: ${subject}`);
      console.log(`   Message: ${message}`);
      console.log("═══════════════════════════════════════");
    }

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
