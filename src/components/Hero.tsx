"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  MapPin,
  Radar,
  ShieldCheck,
} from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function Hero() {
  const initials = personalInfo.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative overflow-hidden pt-28 sm:pt-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-12 -z-10 mx-auto h-[34rem] max-w-6xl rounded-full bg-[radial-gradient(circle,rgba(60,200,216,0.18),transparent_55%)] blur-3xl" />

      <div className="section-container grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          <span className="eyebrow-pill">{personalInfo.status}</span>

          <div className="mt-7">
            <p className="section-kicker mb-4">Cybersecurity / Portfolio 2026</p>
            <h1 className="font-display text-[clamp(3.8rem,10vw,7rem)] leading-[0.92] tracking-[-0.06em] text-[var(--color-text)]">
              {personalInfo.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-[var(--color-text-muted)] sm:text-xl">
              {personalInfo.subheadline}
            </p>
            <p className="mt-5 max-w-xl text-[var(--color-text-dim)]">
              {personalInfo.intro}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.55 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a href="#investigations" className="btn-primary">
              View Investigations
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#contact" className="btn-secondary">
              Contact Me
            </a>
            {personalInfo.resumeUrl && (
              <a
                href={personalInfo.resumeUrl}
                download="resume.pdf"
                className="btn-download group"
                id="resume-download-hero"
                aria-label="Download resume as PDF"
              >
                <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-[2px]" />
                Resume
              </a>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.55 }}
            className="mt-10 grid gap-3 sm:grid-cols-3"
          >
            {personalInfo.highlights.map((item) => (
              <div key={item.label} className="stat-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.75, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -left-6 top-12 hidden h-28 w-28 rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.03)] blur-[1px] sm:block" />
          <div className="absolute -right-4 bottom-10 hidden h-20 w-20 rounded-full bg-[rgba(54,212,154,0.16)] blur-2xl sm:block" />

          <div className="panel relative overflow-hidden p-6 sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-dim)]">
                  Analyst profile
                </p>
                <h2 className="mt-3 font-display text-5xl tracking-[-0.08em] text-[var(--color-text)] sm:text-6xl">
                  {initials}
                </h2>
              </div>

              <div className="flex flex-col gap-3 md:items-end">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-border)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-text-dim)] md:self-end">
                  <ShieldCheck className="h-3.5 w-3.5 text-[var(--color-accent)]" />
                  SOC / Blue Team Track
                </div>

                <div className="animate-float-slow w-fit rounded-[1.6rem] border border-[var(--color-border)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-left md:self-end md:text-right">
                  <span className="block text-xs uppercase tracking-[0.18em] text-[var(--color-text-dim)]">
                    Based in
                  </span>
                  <span className="mt-1 inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                    <MapPin className="h-4 w-4 text-[var(--color-accent-soft)]" />
                    {personalInfo.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-[var(--color-border)] bg-[rgba(255,255,255,0.03)] p-5">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-dim)]">
                Current priorities
              </p>
              <ul className="mt-4 space-y-4">
                {personalInfo.focusAreas.map((focus, index) => (
                  <li
                    key={focus}
                    className="flex items-start gap-3 text-[var(--color-text-muted)]"
                  >
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] font-mono text-[11px] text-[var(--color-accent-soft)]">
                      0{index + 1}
                    </span>
                    <span>{focus}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-col gap-4 rounded-[1.5rem] border border-[var(--color-border)] bg-[rgba(255,255,255,0.025)] p-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-dim)]">
                  Learning direction
                </p>
                <p className="mt-2 max-w-md text-sm text-[var(--color-text-muted)]">
                  Building toward analyst roles through defensive tooling,
                  roadmap-driven labs, and clear security communication.
                </p>
              </div>

              <a href="#learning" className="btn-secondary text-sm">
                <Radar className="h-4 w-4" aria-hidden="true" />
                View learning path
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
