"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  LayoutPanelTop,
  Layers3,
  PenTool,
  Sparkles,
} from "lucide-react";
import { skills } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  sparkles: Sparkles,
  layout: LayoutPanelTop,
  code: Code2,
  pen: PenTool,
  layers: Layers3,
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={ref}
      aria-label="Skills"
      className="section-surface relative"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
        >
          <span className="section-kicker">Skills</span>
          <h2 className="section-title">
            Capabilities arranged to feel more like a studio sheet.
          </h2>
          <p className="section-subtitle">
            The categories below give the site a broader, more design-aware
            profile while still being easy to replace with your actual strengths.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((category, index) => {
            const Icon = iconMap[category.icon] || Sparkles;

            return (
              <motion.article
                key={category.category}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : undefined}
                transition={{ delay: 0.12 + index * 0.08, duration: 0.5 }}
                className="panel card-hover p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.04)]">
                    <Icon className="h-5 w-5 text-[var(--color-accent-soft)]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--color-text)]">
                      {category.category}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {category.items.map((item, itemIndex) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : undefined}
                      transition={{
                        delay: 0.28 + index * 0.08 + itemIndex * 0.04,
                        duration: 0.3,
                      }}
                      className="skill-chip"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
