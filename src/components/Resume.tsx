"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, FileStack, MapPin } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function Resume() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="profile"
      ref={ref}
      aria-label="Profile"
      className="section-surface relative"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
        >
          <span className="section-kicker">Profile</span>
          <h2 className="section-title">
            A quick snapshot for recruiters, collaborators, and curious people.
          </h2>
          <p className="section-subtitle">
            This section replaces the broken resume embed with a cleaner profile
            summary and a simpler next step.
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
              <ProfileFact label="Name" value={personalInfo.name} />
              <ProfileFact label="Location" value={personalInfo.location} />
              <ProfileFact label="Availability" value={personalInfo.availability} />
              <ProfileFact
                label="Best for"
                value="Case studies, experiments, internships, and a more polished personal brand."
              />
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-[var(--color-border)] bg-[rgba(255,255,255,0.03)] p-5">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-dim)]">
                Current direction
              </p>
              <p className="mt-3 max-w-2xl text-[var(--color-text-muted)]">
                {personalInfo.status}
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
                  <BriefcaseBusiness className="h-5 w-5 text-[var(--color-accent-soft)]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-text)]">
                    What this section now does better
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    It keeps the page polished even before you add a real resume
                    PDF, and it gives people enough context to know whether they
                    should reach out.
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
                  Full resume can be shared on request
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {personalInfo.resumeUrl ? (
                  <a href={personalInfo.resumeUrl} className="btn-primary">
                    View resume
                  </a>
                ) : (
                  <a href="#contact" className="btn-primary">
                    Contact Dikshita
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
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
