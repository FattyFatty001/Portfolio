"use client";

import { useEffect, useState } from "react";

export default function WorkNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ink/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-12">
        <a href="/" className="text-lg font-semibold tracking-tight">
          Matt Pearson<span className="text-accent">.</span>
        </a>

        <div className="flex items-center gap-4">
          <a
            href="/#work"
            data-cursor
            className="group inline-flex items-center gap-2 text-sm font-medium text-bone-dim transition-colors hover:text-bone"
          >
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:-translate-x-1"
            >
              ←
            </span>
            All work
          </a>
          <a
            href="/#contact"
            className="rounded-full bg-bone px-5 py-2.5 text-sm font-medium text-ink transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5"
          >
            Let&rsquo;s talk
          </a>
        </div>
      </nav>
    </header>
  );
}
