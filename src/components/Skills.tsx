"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  FileText,
  Network,
  Radar,
  ShieldCheck,
} from "lucide-react";
import { toolkit } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: ShieldCheck,
  network: Network,
  code: Code2,
  radar: Radar,
  report: FileText,
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="toolkit"
      ref={ref}
      aria-label="Core toolkit"
      className="section-surface relative"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
        >
          <span className="section-kicker">Toolkit</span>
          <h2 className="section-title">Core Toolkit</h2>
          <p className="section-subtitle">
            The concepts, tools, and communication habits I am building into a
            stronger junior analyst foundation.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {toolkit.map((category, index) => {
            const Icon = iconMap[category.icon] || ShieldCheck;

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
