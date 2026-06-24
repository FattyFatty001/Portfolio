"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const statement =
  "I believe the best game UI is invisible — it respects player time, deepens immersion, and makes complexity approachable. For 15+ years, across Dead Space, Battlefield, Plants vs. Zombies, Outriders and VHS, I've led interface work from first sketch to final in-engine screen — building for players and refining until it feels effortless.";

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const words = el.querySelectorAll<HTMLElement>("[data-word]");
      gsap.fromTo(
        words,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "bottom 75%",
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} className="relative px-6 pt-40 pb-24 md:px-12 md:pt-56 md:pb-36">
      {/* OLIPOP-style color-blocked background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -skew-y-2 origin-top-left"
        style={{
          background: "linear-gradient(180deg, var(--color-accent) 0%, var(--color-accent) 100%)",
          opacity: 0.04,
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[auto_1fr] md:gap-16">
        <div className="relative mx-auto w-56 shrink-0 md:w-72">
          <div className="absolute -inset-4 -rotate-6 rounded-[2.5rem] bg-grape/25 shadow-lg" />
          <div className="absolute -inset-4 rotate-6 rounded-[2.5rem] bg-sun/35" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/portrait-warm.webp"
            alt="Matt Pearson"
            className="relative aspect-square w-full rounded-[2rem] object-cover shadow-[0_20px_50px_-15px_rgba(61,32,20,0.35)] ring-2 ring-white/50"
          />
        </div>

        <div>
          <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border-2 border-accent/30 bg-accent/5 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.16em] text-accent">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            About
          </p>
          <h2 className="mb-6 text-fluid-md font-bold font-display">
            Philosophy &amp;{" "}
            <span className="font-display italic text-accent">craft</span>
          </h2>
          <p className="text-fluid-sm font-medium">
            {statement.split(" ").map((word, i) => (
              <span key={i} data-word className="inline-block">
                {word}&nbsp;
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
