"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/lib/projects";

const palette = [
  "#ff6b5e",
  "#ffb43d",
  "#2bb673",
  "#3a9ef5",
  "#7c5cff",
  "#ff7eb6",
];

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

  const items = [...services, ...services];

  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-line py-5"
    >
      <div ref={track} className="flex w-max whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={i}
            className="mx-6 inline-flex items-center gap-4 text-2xl font-medium md:text-3xl"
          >
            <span
              className="h-3 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: palette[i % palette.length] }}
            />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
