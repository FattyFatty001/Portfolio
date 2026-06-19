"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from("[data-hero-line]", {
        yPercent: 120,
        duration: 1.3,
        stagger: 0.12,
      })
        .from(
          "[data-hero-fade]",
          { opacity: 0, y: 20, duration: 1, stagger: 0.1 },
          "-=0.8",
        )
        .from("[data-hero-meta]", { opacity: 0, duration: 1 }, "-=0.6");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-screen flex-col justify-center px-6 pb-24 pt-36 md:px-12"
    >
      <p
        data-hero-fade
        className="mb-8 inline-flex w-fit items-center gap-2.5 text-sm font-medium uppercase tracking-[0.16em] text-bone-dim"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        UI/UX &amp; Experience Designer · 15+ Years in Games
      </p>

      <h1 className="text-fluid-xl font-semibold">
        <span className="mask-line">
          <span data-hero-line className="inline-block">
            Designing
          </span>
        </span>
        <span className="mask-line">
          <span data-hero-line className="inline-block">
            interfaces players
          </span>
        </span>
        <span className="mask-line">
          <span data-hero-line className="inline-block">
            <span className="relative mr-3 inline-block font-display italic text-accent">
              feel
              <svg
                className="absolute left-0 top-[92%] w-full text-accent"
                height="14"
                viewBox="0 0 220 14"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M3 9.5C44 3.5 168 1.5 217 7.5"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            right.
          </span>
        </span>
      </h1>

      <p
        data-hero-fade
        className="mt-10 max-w-xl text-lg leading-relaxed text-bone-dim md:text-xl"
      >
        I design seamless, intuitive player experiences across AAA, indie, and
        live service — blending design fundamentals, accessibility, and player
        psychology into systems that feel right in play.
      </p>

      <a
        href="#work"
        data-hero-meta
        className="group absolute bottom-10 left-6 flex items-center gap-3 text-sm font-medium text-bone-dim transition-colors hover:text-bone md:left-12"
      >
        <span className="grid h-10 w-10 place-items-center rounded-full border border-line transition-colors group-hover:border-accent group-hover:text-accent">
          <span className="animate-bounce">↓</span>
        </span>
        Scroll to explore
      </a>
    </section>
  );
}
