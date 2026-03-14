"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  ChevronRight,
  ExternalLink,
  Github,
  X,
} from "lucide-react";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/data";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      ref={ref}
      aria-label="Projects"
      className="section-surface relative"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
        >
          <span className="section-kicker">Projects</span>
          <h2 className="section-title">
            Selected work slots with room for real stories.
          </h2>
          <p className="section-subtitle">
            The structure below is ready for case studies, process notes, and
            more expressive presentation once you swap the sample copy with your
            actual projects.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
              onView={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  isInView,
  onView,
}: {
  project: Project;
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
      <div className="flex items-center justify-between">
        <span className="font-display text-5xl leading-none tracking-[-0.08em] text-[var(--color-text-dim)]">
          0{index + 1}
        </span>
        <span className="tag-badge">{project.year}</span>
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="tag-badge">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="mt-5 text-2xl font-semibold leading-tight text-[var(--color-text)] transition-colors group-hover:text-[var(--color-accent-soft)]">
          {project.title}
        </h3>
        <p className="mt-3 text-[var(--color-text-muted)]">{project.short}</p>
      </div>

      {project.note && (
        <div className="mt-6 rounded-[1.35rem] border border-[var(--color-border)] bg-[rgba(255,255,255,0.03)] p-4 text-sm text-[var(--color-text-muted)]">
          {project.note}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span key={tech} className="skill-chip">
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-8">
        <button
          onClick={onView}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] hover:text-[var(--color-accent-soft)]"
          aria-label={`View details for ${project.title}`}
        >
          Read the project note
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </motion.article>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
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
      aria-label={`Project details: ${project.title}`}
    >
      <button
        type="button"
        className="absolute inset-0 bg-[rgba(8,6,5,0.72)] backdrop-blur-md"
        onClick={onClose}
        aria-label="Close project details"
      />

      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.25 }}
        className="panel relative z-10 max-h-[88vh] w-full max-w-3xl overflow-y-auto p-6 sm:p-8"
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.04)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          aria-label="Close project details"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="pr-14">
          <div className="flex flex-wrap items-center gap-2">
            <span className="tag-badge">{project.year}</span>
            {project.tags.map((tag) => (
              <span key={tag} className="tag-badge">
                {tag}
              </span>
            ))}
          </div>

          <h3 className="mt-5 font-display text-4xl leading-tight tracking-[-0.05em] text-[var(--color-text)]">
            {project.title}
          </h3>
          <p className="mt-3 max-w-2xl text-[var(--color-text-muted)]">
            {project.short}
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-[rgba(255,255,255,0.03)] p-5 text-[var(--color-text-muted)]">
              {project.long}
            </div>

            <div className="mt-6">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-dim)]">
                Suggested stack or focus
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="skill-chip">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {project.note && (
              <div className="panel-alt p-5">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-dim)]">
                  Placement note
                </p>
                <p className="mt-3 text-sm text-[var(--color-text-muted)]">
                  {project.note}
                </p>
              </div>
            )}

            <div className="panel-alt p-5">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-dim)]">
                What makes this section useful
              </p>
              <ul className="mt-3 space-y-3 text-sm text-[var(--color-text-muted)]">
                <li className="flex items-start gap-2">
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-soft)]" />
                  A clear role and outcome make the story stronger.
                </li>
                <li className="flex items-start gap-2">
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-soft)]" />
                  Screenshots, process sketches, or metrics will add credibility.
                </li>
                <li className="flex items-start gap-2">
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-soft)]" />
                  Keep the explanation concise, then let visuals do the work.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {(project.repo || project.live) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                Source code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
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
