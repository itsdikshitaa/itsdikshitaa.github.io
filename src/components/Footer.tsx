"use client";

import { ArrowUpRight } from "lucide-react";
import { navLinks, personalInfo } from "@/lib/data";

export default function Footer() {
  const quickLinks = navLinks.filter((link) => link.href !== "#home");
  const initials = personalInfo.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <footer className="relative px-3 pb-4 pt-8 sm:px-5">
      <div className="glass mx-auto max-w-[1240px] rounded-[2rem] px-6 py-8 sm:px-8 sm:py-9">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)] lg:items-start">
          <div>
            <div className="flex items-center gap-4">
              <span className="flex h-13 w-13 items-center justify-center rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.025)] font-mono text-sm text-[var(--color-accent-soft)] sm:h-14 sm:w-14">
                {initials}
              </span>
              <div>
                <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] tracking-[-0.05em] text-[var(--color-text)]">
                  {personalInfo.name}
                </h2>
                <p className="text-sm text-[var(--color-text-dim)]">
                  {personalInfo.availability}
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-xl text-[15px] leading-8 text-[var(--color-text-muted)] sm:text-base">
              Cybersecurity student building toward SOC and blue-team analyst
              roles through hands-on projects, roadmap-driven labs, and clear
              technical communication.
            </p>
          </div>

          <div className="lg:justify-self-end lg:pl-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-text-dim)]">
              Explore
            </p>
            <div className="mt-4 space-y-1">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-between gap-6 rounded-full px-1 py-3 text-sm text-[var(--color-text-dim)] hover:text-[var(--color-text)]"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--color-accent-soft)] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-[var(--color-border)] pt-5 text-sm text-[var(--color-text-dim)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            {new Date().getFullYear()} {personalInfo.name}
          </p>
          <p>Focused on blue-team growth, defensive tooling, and continuous learning.</p>
        </div>
      </div>
    </footer>
  );
}
