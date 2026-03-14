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
      <div className="glass mx-auto max-w-[1240px] rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[rgba(255,255,255,0.04)] font-mono text-sm text-[var(--color-accent-soft)]">
                {initials}
              </span>
              <div>
                <h2 className="font-display text-3xl tracking-[-0.05em] text-[var(--color-text)]">
                  {personalInfo.name}
                </h2>
                <p className="text-sm text-[var(--color-text-dim)]">
                  {personalInfo.availability}
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-2xl text-[var(--color-text-muted)]">
              A more distinctive portfolio foundation: calmer pacing, better
              typography, stronger surfaces, and space for real work to stand out.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {quickLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center justify-between rounded-[1.25rem] border border-[var(--color-border)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              >
                {link.label}
                <ArrowUpRight className="h-4 w-4 text-[var(--color-accent-soft)]" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-[var(--color-border)] pt-6 text-sm text-[var(--color-text-dim)]">
          {new Date().getFullYear()} {personalInfo.name}. Crafted to feel more
          human and less like a starter template.
        </div>
      </div>
    </footer>
  );
}
