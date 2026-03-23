"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import {
  AlertCircle,
  CheckCircle,
  Clock3,
  Loader2,
  MapPin,
  MessageCircleMore,
  Send,
  ShieldCheck,
} from "lucide-react";
import { personalInfo, socialLinks } from "@/lib/data";
import { isValidEmail, isValidLength, sanitize } from "@/lib/utils";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setErrorMessage("");

    if (!isValidLength(formData.name, 2, 100)) {
      setErrorMessage("Name must be 2-100 characters.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!isValidLength(formData.subject, 2, 200)) {
      setErrorMessage("Subject must be 2-200 characters.");
      return;
    }

    if (!isValidLength(formData.message, 10, 5000)) {
      setErrorMessage("Message must be 10-5000 characters.");
      return;
    }

    setStatus("sending");

    try {
      const payload = {
        name: sanitize(formData.name),
        email: sanitize(formData.email),
        subject: sanitize(formData.subject),
        message: sanitize(formData.message),
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send message."
      );
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      aria-label="Contact"
      className="section-surface relative"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
        >
          <span className="section-kicker">Contact</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            If you would like to discuss an internship, analyst opportunity,
            security project, or learning collaboration, feel free to reach out.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.12, duration: 0.55 }}
            className="panel p-6 sm:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-medium text-[var(--color-text-muted)]"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(event) =>
                      setFormData({ ...formData, name: event.target.value })
                    }
                    className="contact-input"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-medium text-[var(--color-text-muted)]"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(event) =>
                      setFormData({ ...formData, email: event.target.value })
                    }
                    className="contact-input"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-sm font-medium text-[var(--color-text-muted)]"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(event) =>
                    setFormData({ ...formData, subject: event.target.value })
                  }
                  className="contact-input"
                  placeholder="Internship, project, or security conversation"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-medium text-[var(--color-text-muted)]"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={7}
                  value={formData.message}
                  onChange={(event) =>
                    setFormData({ ...formData, message: event.target.value })
                  }
                  className="contact-input resize-y"
                  placeholder="Share the opportunity, project context, or what you would like to discuss."
                />
              </div>

              {errorMessage && (
                <div
                  role="alert"
                  className="flex items-center gap-2 rounded-[1rem] border border-[rgba(226,102,90,0.35)] bg-[rgba(226,102,90,0.12)] px-4 py-3 text-sm text-[#f4b8af]"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {errorMessage}
                </div>
              )}

              {status === "success" && (
                <div
                  role="status"
                  className="flex items-center gap-2 rounded-[1rem] border border-[rgba(120,193,141,0.35)] bg-[rgba(120,193,141,0.12)] px-4 py-3 text-sm text-[var(--color-success)]"
                >
                  <CheckCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  Message sent successfully. Thank you for reaching out.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Sending
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Send message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : undefined}
            transition={{ delay: 0.18, duration: 0.55 }}
            className="space-y-5"
          >
            <InfoCard
              icon={<ShieldCheck className="h-5 w-5 text-[var(--color-accent-soft)]" />}
              title="Best fit opportunities"
              description="SOC internships, student analyst programs, security project collaboration, or mentorship conversations."
            />
            <InfoCard
              icon={<MapPin className="h-5 w-5 text-[var(--color-accent)]" />}
              title="Location"
              description={`Based in ${personalInfo.location}.`}
            />
            <InfoCard
              icon={<Clock3 className="h-5 w-5 text-[var(--color-secondary)]" />}
              title="Response style"
              description="Clear, professional communication with context around projects, learning goals, and next steps."
            />
            <InfoCard
              icon={
                <MessageCircleMore className="h-5 w-5 text-[var(--color-accent-soft)]" />
              }
              title="What to send"
              description="A role description, internship details, collaboration idea, or a quick note about why you want to connect is perfect."
            />

            {socialLinks.length > 0 && (
              <div className="panel-alt p-6">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-dim)]">
                  Elsewhere
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {socialLinks.map((link) => (
                    <a key={link.name} href={link.url} className="btn-secondary text-sm">
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="panel-alt p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.04)]">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-text)]">{title}</h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">{description}</p>
        </div>
      </div>
    </div>
  );
}
