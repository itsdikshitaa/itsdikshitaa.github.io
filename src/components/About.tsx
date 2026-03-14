"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Compass, MapPin, Quote, Sparkles } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      id="about"
      ref={ref}
      aria-label="About"
      className="section-surface relative"
    >
      <div className="section-container grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
        >
          <span className="section-kicker">About</span>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            A brief introduction to my background, working style, and professional interests.
          </p>

          <div className="mt-8 space-y-5 text-[var(--color-text-muted)]">
            {personalInfo.bio.map((paragraph, index) => (
              <motion.p
                key={paragraph}
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : undefined}
                transition={{ delay: 0.1 + index * 0.08, duration: 0.45 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="panel-alt mt-8 p-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.03)]">
                <Quote className="h-5 w-5 text-[var(--color-accent-soft)]" />
              </div>
              <div>
                <p className="text-lg text-[var(--color-text)]">
                  &ldquo;I believe strong work should be clear, thoughtful, and
                  professionally presented.&rdquo;
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-dim)]">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[var(--color-accent)]" />
                    {personalInfo.location}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[var(--color-secondary)]" />
                    {personalInfo.availability}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="space-y-4">
          {personalInfo.principles.map((principle, index) => (
            <motion.article
              key={principle.title}
              initial={{ opacity: 0, x: 28 }}
              animate={isInView ? { opacity: 1, x: 0 } : undefined}
              transition={{ delay: 0.18 + index * 0.1, duration: 0.52 }}
              className="panel card-hover p-6 sm:p-7"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.04)]">
                  <Compass className="h-5 w-5 text-[var(--color-accent-soft)]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--color-text)]">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-[var(--color-text-muted)]">
                    {principle.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
