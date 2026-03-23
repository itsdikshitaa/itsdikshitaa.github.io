"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, Moon, Sun, X } from "lucide-react";
import { navLinks, personalInfo } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const initials = useMemo(
    () =>
      personalInfo.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    []
  );

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const initialTheme = savedTheme || (prefersDark.matches ? "dark" : "light");
    let themeFrame = 0;

    document.documentElement.setAttribute("data-theme", initialTheme);
    themeFrame = window.requestAnimationFrame(() => {
      setTheme(initialTheme);
    });

    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.cancelAnimationFrame(themeFrame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const id = href.replace("#", "");
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        aria-label="Main navigation"
        className={cn(
          "mx-auto flex h-[72px] w-full max-w-[1240px] items-center justify-between rounded-full px-4 sm:px-5",
          isScrolled
            ? "glass shadow-[var(--shadow-soft)]"
            : "border border-transparent bg-transparent"
        )}
      >
        <a
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            handleNavClick("#home");
          }}
          className="flex items-center gap-3"
          aria-label={`${personalInfo.name} home`}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-card)] font-mono text-sm text-[var(--color-accent-soft)]">
            {initials}
          </span>
          <span className="hidden sm:block">
            <strong className="block text-sm font-semibold text-[var(--color-text)]">
              {personalInfo.name}
            </strong>
            <span className="block text-xs text-[var(--color-text-dim)]">
              {personalInfo.title}
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(event) => {
                  event.preventDefault();
                  handleNavClick(link.href);
                }}
                className="rounded-full px-4 py-2 text-sm font-medium text-[var(--color-text-muted)] hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--color-text)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {personalInfo.resumeUrl && (
            <a
              href={personalInfo.resumeUrl}
              download="resume.pdf"
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-[rgba(59,198,216,0.25)] bg-[rgba(59,198,216,0.08)] text-[var(--color-accent)] hover:border-[rgba(59,198,216,0.4)] hover:bg-[rgba(59,198,216,0.14)] hover:text-[var(--color-accent-soft)] sm:flex"
              aria-label="Download resume"
              id="resume-download-header"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          <button
            onClick={toggleTheme}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.03)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4" aria-hidden="true" />
            )}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.03)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] lg:hidden"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-auto mt-3 w-full max-w-[1240px] overflow-hidden rounded-[1.75rem] glass lg:hidden"
          >
            <ul className="space-y-1 p-4" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="block rounded-2xl px-4 py-3 text-sm font-medium text-[var(--color-text-muted)] hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--color-text)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
