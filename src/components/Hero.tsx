"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// ─── Platforms that cycle with their brand fonts + colors ──────────────────
const PLATFORMS = [
  { name: "Xbox",       color: "#107C10", font: "Share Tech Mono",   scale: 1,    spacing: 0.02 },
  { name: "PlayStation", color: "#003087", font: "Orbitron",         scale: 0.9,  spacing: 0.06 },
  { name: "Steam",       color: "#309ad9", font: "Rajdhani",          scale: 0.9,  spacing: 0.03 },
  { name: "Unreal",      color: "#686868", font: "Audiowide",         scale: 0.92, spacing: 0.04 },
  { name: "VR",          color: "#8B5CF6", font: "Orbitron",          scale: 0.9,    spacing: 0.08 },
  { name: "Epic",        color: "#e255c8", font: "Barlow Condensed",  scale: 1.05, spacing: 0.05 },
  { name: "Switch",      color: "#E60012", font: "Luckiest Guy",      scale: 0.8,  spacing: 0.02 },
  { name: "Nintendo",    color: "#E60012", font: "Press Start 2P",    scale: 0.58, spacing: 0 },
  { name: "iOS",      color: "#34A853", font: "Quicksand",         scale: 1,    spacing: 0.02 },
] as const;

// Lazily inject a Google Fonts <link> (deduped by id)
function loadFont(family: string) {
  if (typeof document === "undefined") return;
  const id = `gf-plat-${family.replace(/\s+/g, "-").toLowerCase()}`;
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@400;700&display=swap`;
  document.head.appendChild(link);
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [platformIndex, setPlatformIndex] = useState(0);

  // Preload current + next 2 platform fonts
  useEffect(() => {
    const n = PLATFORMS.length;
    loadFont(PLATFORMS[platformIndex].font);
    loadFont(PLATFORMS[(platformIndex + 1) % n].font);
    loadFont(PLATFORMS[(platformIndex + 2) % n].font);
  }, [platformIndex]);

  // Begin cycling after the hero entrance animation (~2 s)
  useEffect(() => {
    const t = setTimeout(() => {
      const iv = setInterval(
        () => setPlatformIndex((i) => (i + 1) % PLATFORMS.length),
        3000,
      );
      return () => clearInterval(iv);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  // GSAP hero entrance
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
        .from("[data-hero-meta]", { opacity: 0, duration: 1 }, "-=0.6")
        // Unlock overflow on the platform line so cycling text isn't clipped
        .set("[data-platform-line]", { overflow: "visible" });
    }, root);

    return () => ctx.revert();
  }, []);

  const currentPlatform = PLATFORMS[platformIndex];

  return (
    <section
      ref={root}
      id="top"
      className="relative mx-auto flex min-h-screen w-full max-w-[1600px] flex-col justify-center px-6 pb-24 pt-36 md:px-12"
    >
      {/* Animation keyframes — platform cycling blur-in */}
      <style>{`
        @keyframes platform-in {
          from { opacity: 0; filter: blur(8px); transform: translateY(0.15em); }
          to   { opacity: 1; filter: blur(0px); transform: translateY(0); }
        }
        .animate-platform-in {
          animation: platform-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <p
        data-hero-fade
        className="mb-8 inline-flex w-fit items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.16em] text-bone-dim"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        UI/UX &amp; Experience Designer · 15+ Years in Games
      </p>

      <h1 className="font-semibold font-display" style={{ lineHeight: 1.08, fontSize: "clamp(2.4rem, 8vw, 7rem)" }}>
        <span className="mask-line">
          <span data-hero-line className="inline-block">
            Designing &amp; implementing
          </span>
        </span>
        <span className="mask-line">
          <span data-hero-line className="inline-block">
            feel good interfaces
          </span>
        </span>
        {/* data-platform-line lets GSAP switch overflow to visible after entrance */}
        <span className="mask-line" data-platform-line>
          <span data-hero-line className="inline-block">
            on{" "}
            {/* Cycling platform name — key remount triggers blur-in + font switch */}
            <span
              key={platformIndex}
              className="animate-platform-in inline-block"
              style={{
                color: currentPlatform.color,
                fontFamily: `'${currentPlatform.font}', var(--font-display)`,
                fontSize: `${currentPlatform.scale}em`,
                letterSpacing: `${currentPlatform.spacing}em`,
                lineHeight: 1,
              }}
            >
              {currentPlatform.name}
            </span>
          </span>
        </span>
      </h1>

      <p
        data-hero-fade
        className="mt-10 max-w-xl text-lg leading-[1.85] text-bone-dim md:text-xl"
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
        <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-line bg-accent/5 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
          <span className="animate-bounce">↓</span>
        </span>
        Scroll to explore
      </a>
    </section>
  );
}
