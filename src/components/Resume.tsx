"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Download,
  FileStack,
  FileText,
  MapPin,
  ShieldCheck,
  Target,
} from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function Resume() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="resume"
      ref={ref}
      aria-label="Resume snapshot"
      className="section-surface relative"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
        >
          <span className="section-kicker">Resume</span>
          <h2 className="section-title">Resume Snapshot</h2>
          <p className="section-subtitle">
            A quick summary of role fit, availability, and the kind of
            cybersecurity opportunities I am actively building toward.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.14, duration: 0.55 }}
            className="panel overflow-hidden p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <ProfileFact label="Target role" value="SOC / Blue-Team Analyst" />
              <ProfileFact label="Location" value={personalInfo.location} />
              <ProfileFact label="Availability" value={personalInfo.availability} />
              <ProfileFact
                label="Current focus"
                value="Defensive tooling, roadmap-driven labs, and clearer analyst-style reporting."
              />
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-[var(--color-border)] bg-[rgba(255,255,255,0.03)] p-5">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-dim)]">
                Professional summary
              </p>
              <p className="mt-3 max-w-2xl text-[var(--color-text-muted)]">
                Cybersecurity student building practical evidence through
                privacy-first tools, vulnerability-focused projects, and a
                transparent learning roadmap oriented toward SOC readiness.
              </p>
            </div>
          </motion.article>

          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : undefined}
            transition={{ delay: 0.22, duration: 0.55 }}
            className="space-y-5"
          >
            <div className="panel-alt p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.04)]">
                  <ShieldCheck className="h-5 w-5 text-[var(--color-accent-soft)]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-text)]">
                    Recruiter snapshot
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Best suited for internships, student analyst programs, and
                    entry-level roles where strong fundamentals, curiosity, and
                    communication matter.
                  </p>
                </div>
              </div>
            </div>

            <div className="panel-alt p-6">
              <div className="space-y-4 text-sm text-[var(--color-text-muted)]">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-[var(--color-accent)]" />
                  Based in {personalInfo.location}
                </div>
                <div className="flex items-center gap-3">
                  <FileStack className="h-4 w-4 text-[var(--color-secondary)]" />
                  Resume available for download
                </div>
                <div className="flex items-center gap-3">
                  <Target className="h-4 w-4 text-[var(--color-accent-soft)]" />
                  Focused on SOC and blue-team analyst growth
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#contact" className="btn-secondary">
                  Reach out
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.34, duration: 0.55 }}
              className="resume-download-card panel overflow-hidden"
            >
              <div className="h-1 w-full bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-soft)] to-[var(--color-secondary)]" />

              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="resume-icon-wrapper flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
                    <FileText className="h-5.5 w-5.5 text-[var(--color-accent)]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-[var(--color-text)]">
                      Download Resume
                    </h3>
                    <p className="mt-1 text-sm text-[var(--color-text-dim)]">
                      PDF · Cybersecurity portfolio profile
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={personalInfo.resumeUrl}
                    download="resume.pdf"
                    className="btn-download group"
                    id="resume-download-profile"
                    aria-label="Download Dikshita Konwar's resume as PDF"
                  >
                    <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-[2px]" />
                    Download PDF
                  </a>
                  <a
                    href={personalInfo.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-sm"
                    id="resume-view-profile"
                    aria-label="View Dikshita Konwar's resume in a new tab"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    View Online
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function ProfileFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.35rem] border border-[var(--color-border)] bg-[rgba(255,255,255,0.03)] p-5">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-dim)]">
        {label}
      </p>
      <p className="mt-3 text-base text-[var(--color-text)]">{value}</p>
    </div>
  );
}
