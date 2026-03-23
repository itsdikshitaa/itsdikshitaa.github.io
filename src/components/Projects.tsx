"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  ChevronRight,
  ExternalLink,
  Github,
  Layers3,
  X,
} from "lucide-react";
import { investigations } from "@/lib/data";
import type { Investigation } from "@/lib/data";
import { cn } from "@/lib/utils";

function getStatusClass(status: Investigation["status"]) {
  return cn(
    "inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em]",
    status === "Completed" &&
      "border-[rgba(72,193,141,0.28)] bg-[rgba(72,193,141,0.12)] text-[var(--color-success)]",
    status === "In Progress" &&
      "border-[rgba(60,200,216,0.3)] bg-[rgba(60,200,216,0.12)] text-[var(--color-accent-soft)]",
    status === "Roadmap" &&
      "border-[rgba(157,178,193,0.26)] bg-[rgba(157,178,193,0.1)] text-[var(--color-text-muted)]"
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedInvestigation, setSelectedInvestigation] =
    useState<Investigation | null>(null);

  return (
    <section
      id="investigations"
      ref={ref}
      aria-label="Investigations and labs"
      className="section-surface relative"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
        >
          <span className="section-kicker">Investigations</span>
          <h2 className="section-title">Investigations &amp; Labs</h2>
          <p className="section-subtitle">
            Security work that shows how I approach privacy, vulnerability
            analysis, and the roadmap I am building toward analyst workflows.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {investigations.map((investigation, index) => (
            <ProjectCard
              key={investigation.id}
              investigation={investigation}
              index={index}
              isInView={isInView}
              onView={() => setSelectedInvestigation(investigation)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedInvestigation && (
          <ProjectModal
            investigation={selectedInvestigation}
            onClose={() => setSelectedInvestigation(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({
  investigation,
  index,
  isInView,
  onView,
}: {
  investigation: Investigation;
  index: number;
  isInView: boolean;
  onView: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ delay: 0.12 + index * 0.1, duration: 0.52 }}
      className="panel card-hover group flex h-full flex-col overflow-hidden p-6 sm:p-7"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-display text-5xl leading-none tracking-[-0.08em] text-[var(--color-text-dim)]">
          0{index + 1}
        </span>
        <span className={getStatusClass(investigation.status)}>
          {investigation.status}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <span className="tag-badge">{investigation.year}</span>
        <span className="tag-badge">{investigation.type}</span>
        {investigation.tags.map((tag) => (
          <span key={tag} className="tag-badge">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-7">
        <p className="text-sm text-[var(--color-text-dim)]">
          {investigation.focus}
        </p>
        <h3 className="mt-4 text-2xl font-semibold leading-tight text-[var(--color-text)] transition-colors group-hover:text-[var(--color-accent-soft)]">
          {investigation.title}
        </h3>
        <p className="mt-3 text-[var(--color-text-muted)]">
          {investigation.short}
        </p>
      </div>

      <div className="mt-6 rounded-[1.35rem] border border-[var(--color-border)] bg-[rgba(255,255,255,0.03)] p-4 text-sm text-[var(--color-text-muted)]">
        {investigation.analystValue}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {investigation.tech.map((tech) => (
          <span key={tech} className="skill-chip">
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-8">
        <button
          onClick={onView}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] hover:text-[var(--color-accent-soft)]"
          aria-label={`View details for ${investigation.title}`}
        >
          View investigation
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </motion.article>
  );
}

function ProjectModal({
  investigation,
  onClose,
}: {
  investigation: Investigation;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, a, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    modalRef.current?.querySelector<HTMLElement>("button")?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Investigation details: ${investigation.title}`}
    >
      <button
        type="button"
        className="absolute inset-0 bg-[rgba(4,9,14,0.78)] backdrop-blur-md"
        onClick={onClose}
        aria-label="Close investigation details"
      />

      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.25 }}
        className="panel relative z-10 max-h-[88vh] w-full max-w-4xl overflow-y-auto p-6 sm:p-8"
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.04)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          aria-label="Close investigation details"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="pr-14">
          <div className="flex flex-wrap items-center gap-2">
            <span className="tag-badge">{investigation.year}</span>
            <span className={getStatusClass(investigation.status)}>
              {investigation.status}
            </span>
            <span className="tag-badge">{investigation.type}</span>
            {investigation.tags.map((tag) => (
              <span key={tag} className="tag-badge">
                {tag}
              </span>
            ))}
          </div>

          <h3 className="mt-5 font-display text-4xl leading-tight tracking-[-0.05em] text-[var(--color-text)]">
            {investigation.title}
          </h3>
          <p className="mt-3 max-w-2xl text-[var(--color-text-muted)]">
            {investigation.short}
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_0.9fr]">
          <div>
            <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-[rgba(255,255,255,0.03)] p-5 text-[var(--color-text-muted)]">
              {investigation.long}
            </div>

            <DetailList
              title="Objectives"
              items={investigation.objectives}
              className="mt-6"
            />
            <DetailList
              title="Workflow"
              items={investigation.workflow}
              className="mt-6"
            />
            <DetailList
              title="Findings"
              items={investigation.findings}
              className="mt-6"
            />

            <div className="mt-6">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-dim)]">
                Tools and technologies
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {investigation.tech.map((tech) => (
                  <span key={tech} className="skill-chip">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="panel-alt p-5">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-dim)]">
                Focus
              </p>
              <p className="mt-3 text-sm text-[var(--color-text-muted)]">
                {investigation.focus}
              </p>
            </div>

            <div className="panel-alt p-5">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-dim)]">
                Environment
              </p>
              <p className="mt-3 text-sm text-[var(--color-text-muted)]">
                {investigation.environment}
              </p>
            </div>

            <div className="panel-alt p-5">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-dim)]">
                Analyst value
              </p>
              <p className="mt-3 text-sm text-[var(--color-text-muted)]">
                {investigation.analystValue}
              </p>
            </div>

            <div className="panel-alt p-5">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-dim)]">
                Next step
              </p>
              <p className="mt-3 text-sm text-[var(--color-text-muted)]">
                {investigation.nextStep}
              </p>
            </div>

            <div className="panel-alt p-5">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-dim)]">
                Evidence posture
              </p>
              <ul className="mt-3 space-y-3 text-sm text-[var(--color-text-muted)]">
                <li className="flex items-start gap-2">
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-soft)]" />
                  Completed work stays separated from roadmap items to keep the
                  portfolio honest.
                </li>
                <li className="flex items-start gap-2">
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-soft)]" />
                  Technical decisions are framed around defensive learning and
                  analyst growth.
                </li>
                <li className="flex items-start gap-2">
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-soft)]" />
                  Stronger future case studies will come from documented lab
                  repetition and clearer reporting.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {(investigation.repo || investigation.live) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {investigation.repo && (
              <a
                href={investigation.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                Source code
              </a>
            )}
            {investigation.live && (
              <a
                href={investigation.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Live preview
              </a>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function DetailList({
  title,
  items,
  className,
}: {
  title: string;
  items: string[];
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-dim)]">
        {title}
      </p>
      <ul className="mt-3 space-y-3 rounded-[1.5rem] border border-[var(--color-border)] bg-[rgba(255,255,255,0.03)] p-5 text-sm text-[var(--color-text-muted)]">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Layers3 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-soft)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
