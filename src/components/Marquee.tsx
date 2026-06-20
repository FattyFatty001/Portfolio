"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gameCovers } from "@/lib/projects";

const strip = [...gameCovers, ...gameCovers];

const sizeClass = {
  sm: "h-40 w-28 md:h-52 md:w-36",
  md: "h-52 w-40 md:h-64 md:w-48",
  lg: "h-60 w-44 md:h-80 md:w-56",
} as const;

type MarqueeProps = {
  // Tilt of the row in degrees (positive or negative).
  angle?: number;
  // Reverse the horizontal drift direction.
  reverse?: boolean;
  // Vertical placement within the parent (backdrop mode only).
  top?: string;
  // Render as an in-flow, full-opacity band instead of an absolute backdrop.
  inline?: boolean;
  // Show covers in full color instead of grayscale.
  color?: boolean;
  // Cover size.
  size?: keyof typeof sizeClass;
};

export default function Marquee({
  angle = 15,
  reverse = false,
  top = "25%",
  inline = false,
  color = false,
  size = inline ? "md" : "lg",
}: MarqueeProps) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = track.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Slow horizontal drift, plus a nudge from scroll velocity.
      const drift = reverse
        ? gsap.fromTo(
            el,
            { xPercent: -50 },
            { xPercent: 0, repeat: -1, duration: 560, ease: "none" }
          )
        : gsap.to(el, {
            xPercent: -50,
            repeat: -1,
            duration: 560,
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
    });

    return () => ctx.revert();
  }, [reverse]);

  const row = (
    <div ref={track} className="flex w-max items-center">
      {strip.map((cover, i) => (
        <span key={i} className="mx-3 inline-flex shrink-0">
          <span
            className={`block overflow-hidden rounded-xl ${sizeClass[size]}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cover.src}
              alt=""
              loading="lazy"
              className={`h-full w-full object-cover ${color ? "" : "grayscale"}`}
            />
          </span>
        </span>
      ))}
    </div>
  );

  // In-flow band: a visible, full-opacity strip between sections.
  if (inline) {
    return (
      <div
        aria-hidden
        className="relative w-full overflow-hidden border-y border-line py-12 md:py-16"
      >
        {row}
      </div>
    );
  }

  // Backdrop: angled, faded layer sitting behind a section's content.
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{
        // Visible toward the screen edges, fading to ~20% through a wide center band.
        WebkitMaskImage:
          "linear-gradient(to right, black, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.3) 80%, black)",
        maskImage:
          "linear-gradient(to right, black, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.3) 80%, black)",
      }}
    >
      <div
        className="absolute left-1/2 w-[200%] opacity-[0.1]"
        style={{ top, transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
      >
        {row}
      </div>
    </div>
  );
}
