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
    <section id="about" ref={root} className="px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[auto_1fr] md:gap-16">
        <div className="relative mx-auto w-56 shrink-0 md:w-72">
          <div className="absolute -inset-3 -rotate-6 rounded-[2.2rem] bg-grape/20" />
          <div className="absolute -inset-3 rotate-6 rounded-[2.2rem] bg-sun/30" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/portrait.webp"
            alt="Matt Pearson"
            className="relative aspect-square w-full rounded-[1.9rem] object-cover shadow-lg"
          />
        </div>

        <div>
          <p className="mb-6 inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            About
          </p>
          <p className="text-fluid-md font-medium leading-snug">
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
