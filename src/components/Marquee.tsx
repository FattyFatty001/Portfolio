"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/projects";

export default function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = track.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Base drift, plus a velocity nudge from scroll direction.
      const drift = gsap.to(el, {
        xPercent: -50,
        repeat: -1,
        duration: 24,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const v = gsap.utils.clamp(-3, 3, self.getVelocity() / 300);
          gsap.to(drift, { timeScale: 1 + Math.abs(v), overwrite: true });
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const items = [...projects, ...projects];

  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-line py-5"
    >
      <div ref={track} className="flex w-max items-center">
        {items.map((project, i) => (
          <span
            key={i}
            className="mx-4 inline-flex shrink-0 items-center"
          >
            <span
              className="relative block h-28 w-44 overflow-hidden rounded-2xl ring-1 ring-white/60 md:h-36 md:w-56"
              style={{ backgroundColor: `${project.color}14` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
