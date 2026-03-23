"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, Clock3, GraduationCap, Target } from "lucide-react";
import { education, learningRoadmap } from "@/lib/data";
import { cn } from "@/lib/utils";

function getStatusClass(status: string) {
  return cn(
    "inline-flex w-fit items-center rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em]",
    status === "Completed" &&
      "border-[rgba(72,193,141,0.28)] bg-[rgba(72,193,141,0.12)] text-[var(--color-success)]",
    status === "In Progress" &&
      "border-[rgba(60,200,216,0.3)] bg-[rgba(60,200,216,0.12)] text-[var(--color-accent-soft)]",
    status === "Roadmap" &&
      "border-[rgba(157,178,193,0.26)] bg-[rgba(157,178,193,0.1)] text-[var(--color-text-muted)]"
  );
}

export default function Learning() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="learning"
      ref={ref}
      aria-label="Education and learning path"
      className="section-surface relative"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
        >
          <span className="section-kicker">Learning</span>
          <h2 className="section-title">Education &amp; Learning Path</h2>
          <p className="section-subtitle">
            A transparent view of my student context, current study themes, and
            the roadmap I am using to build analyst-ready depth over time.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="space-y-5">
            {education.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : undefined}
                transition={{ delay: 0.12 + index * 0.08, duration: 0.5 }}
                className="panel card-hover p-6 sm:p-7"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.04)]">
                    {index === 0 ? (
                      <GraduationCap className="h-5 w-5 text-[var(--color-accent-soft)]" />
                    ) : index === 1 ? (
                      <BookOpen className="h-5 w-5 text-[var(--color-secondary)]" />
                    ) : (
                      <Target className="h-5 w-5 text-[var(--color-accent)]" />
                    )}
                  </div>

                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-dim)]">
                      {item.label}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-[var(--color-text)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[var(--color-text-muted)]">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <ul className="mt-5 space-y-3 text-sm text-[var(--color-text-muted)]">
                  {item.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent)]" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>

          <div className="space-y-5">
            {learningRoadmap.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, x: 24 }}
                animate={isInView ? { opacity: 1, x: 0 } : undefined}
                transition={{ delay: 0.18 + index * 0.08, duration: 0.52 }}
                className="panel-alt card-hover p-6 sm:p-7"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className={getStatusClass(item.status)}>{item.status}</span>
                  <span className="inline-flex items-center gap-2 text-sm text-[var(--color-text-dim)]">
                    <Clock3 className="h-4 w-4 text-[var(--color-accent-soft)]" />
                    {item.timeline}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-semibold text-[var(--color-text)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[var(--color-text-muted)]">
                  {item.summary}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {item.items.map((roadmapItem) => (
                    <li key={roadmapItem} className="skill-chip">
                      {roadmapItem}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
