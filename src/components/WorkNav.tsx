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
        scrolled ? "bg-ink/85 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-12">
        <a href="/" className="text-xl font-bold font-display tracking-tight">
          Matt Pearson<span className="text-accent">.</span>
        </a>

        <div className="flex items-center gap-4">
          <a
            href="/#work"
            data-cursor
            className="group inline-flex items-center gap-2 text-sm font-semibold text-bone-dim transition-colors hover:text-bone"
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
            className="rounded-full bg-bone px-5 py-2.5 text-sm font-semibold text-ink shadow-[0_4px_14px_rgba(61,32,20,0.15)] transition-all duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(61,32,20,0.22)]"
          >
            Let&rsquo;s talk
          </a>
        </div>
      </nav>
    </header>
  );
}
