"use client";

import { useReveal } from "@/hooks/useReveal";

export default function Footer() {
  const ref = useReveal<HTMLElement>();

  return (
    <footer
      id="contact"
      ref={ref}
      className="relative px-6 py-24 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <p
          data-reveal
          className="mb-10 inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.16em] text-accent"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          Contact
        </p>

        {/* Heading */}
        <h2
          data-reveal
          className="text-fluid-lg font-semibold"
        >
          Let&rsquo;s talk about
          <br />
          <span className="font-display italic text-accent">your project</span>
        </h2>

        {/* Contact links — card */}
        <div
          data-reveal
          className="mt-12 grid gap-0 rounded-[2rem] border border-line md:grid-cols-2"
        >
          <a
            href="mailto:mpearson82.mp@gmail.com"
            data-cursor
            className="group flex items-center gap-4 rounded-t-[2rem] px-8 py-8 transition-colors hover:bg-ink-soft md:rounded-l-[2rem] md:rounded-tr-none"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </span>
            <div>
              <p className="text-sm font-medium text-bone-dim">Email</p>
              <p className="text-base font-semibold text-bone group-hover:text-accent">
                mpearson82.mp@gmail.com
              </p>
            </div>
            <span className="ml-auto text-bone-dim transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">
              ↗
            </span>
          </a>

          <div className="hidden border-l border-line md:block" />
          <div className="block border-t border-line md:hidden" />

          <a
            href="tel:+17788149370"
            data-cursor
            className="group flex items-center gap-4 rounded-b-[2rem] px-8 py-8 transition-colors hover:bg-ink-soft md:rounded-r-[2rem] md:rounded-bl-none"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <div>
              <p className="text-sm font-medium text-bone-dim">Phone</p>
              <p className="text-base font-semibold text-bone group-hover:text-accent">
                778 · 814 · 9370
              </p>
            </div>
            <span className="ml-auto text-bone-dim transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">
              ↗
            </span>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto mt-16 flex max-w-6xl flex-col gap-3 text-sm text-bone-dim md:flex-row md:items-center md:justify-between">
        <span>Matt Pearson — Game UI/UX Designer</span>
        <span>Vancouver, CA · &copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
