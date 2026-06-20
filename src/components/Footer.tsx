"use client";

import { useReveal } from "@/hooks/useReveal";

export default function Footer() {
  const ref = useReveal<HTMLElement>();

  return (
    <footer
      id="contact"
      ref={ref}
      className="relative px-6 py-20 md:px-12 md:py-28"
    >
      <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-bone px-8 py-16 text-ink md:px-16 md:py-24">
        <p className="mb-6 inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.16em] text-ink/60">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          Contact
        </p>

        <div className="mt-12 flex flex-col gap-5">
          <a
            href="mailto:mpearson82.mp@gmail.com"
            data-cursor
            className="group inline-flex w-fit items-center gap-3 text-2xl font-medium md:text-4xl"
          >
            <span className="border-b-2 border-ink/25 pb-1 transition-colors group-hover:border-accent group-hover:text-accent">
              mpearson82.mp@gmail.com
            </span>
            <span className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-2 group-hover:text-accent">
              ↗
            </span>
          </a>
          <a
            href="tel:+17788149370"
            data-cursor
            className="w-fit text-lg text-ink/60 transition-colors hover:text-ink"
          >
            778 · 814 · 9370
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-3 text-sm text-bone-dim md:flex-row md:items-center md:justify-between">
        <span>Matt Pearson — Game UI/UX Designer</span>
        <span>Vancouver, CA · &copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
