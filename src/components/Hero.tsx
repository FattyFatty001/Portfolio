"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// ─── 20 emotionally expressive fonts for the "feel" word ─────────────────────
const FEEL_FONTS = [
  "Pacifico",
  "Abril Fatface",
  "Dancing Script",
  "Lobster",
  "Caveat",
  "Permanent Marker",
  "Cinzel Decorative",
  "Sacramento",
  "Satisfy",
  "Bangers",
  "Amatic SC",
  "Great Vibes",
  "Playfair Display",
  "Righteous",
  "Alfa Slab One",
  "Kaushan Script",
  "Reenie Beanie",
  "Boogaloo",
  "Leckerli One",
  "Rubik Beastly",
] as const;

// Lazily inject a Google Fonts <link> (deduped by id)
function loadFont(family: string) {
  if (typeof document === "undefined") return;
  const id = `gf-feel-${family.replace(/\s+/g, "-").toLowerCase()}`;
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@400;700&display=swap`;
  document.head.appendChild(link);
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [feelIndex, setFeelIndex] = useState(0);

  // Preload current + next 2 feel fonts
  useEffect(() => {
    const n = FEEL_FONTS.length;
    loadFont(FEEL_FONTS[feelIndex]);
    loadFont(FEEL_FONTS[(feelIndex + 1) % n]);
    loadFont(FEEL_FONTS[(feelIndex + 2) % n]);
  }, [feelIndex]);

  // Begin cycling after the hero entrance animation (~2 s)
  useEffect(() => {
    const t = setTimeout(() => {
      const iv = setInterval(
        () => setFeelIndex((i) => (i + 1) % FEEL_FONTS.length),
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
        // Unlock overflow on the feel line so tall cycling fonts aren't clipped
        .set("[data-feel-line]", { overflow: "visible" });
    }, root);

    return () => ctx.revert();
  }, []);

  const currentFont = FEEL_FONTS[feelIndex];

  return (
    <section
      ref={root}
      id="top"
      className="relative mx-auto flex min-h-screen w-full max-w-[1600px] flex-col justify-center px-6 pb-24 pt-36 md:px-12"
    >
      {/* Animation keyframes — kept here to avoid the Turbopack/Windows PostCSS filter bug */}
      <style>{`
        @keyframes feel-in {
          from { opacity: 0; filter: blur(10px); }
          to   { opacity: 1; filter: blur(0px); }
        }
        .animate-feel-in {
          animation: feel-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <p
        data-hero-fade
        className="mb-8 inline-flex w-fit items-center gap-2.5 text-sm font-medium uppercase tracking-[0.16em] text-bone-dim"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        UI/UX &amp; Experience Designer · 15+ Years in Games
      </p>

      <h1 className="text-fluid-xl font-semibold" style={{ lineHeight: 1.05 }}>
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
        {/* data-feel-line lets GSAP switch overflow to visible after entrance */}
        <span className="mask-line" data-feel-line>
          <span data-hero-line className="inline-block">
            {/* Fixed-width wrapper: sizer uses Fraunces so layout never shifts */}
            <span className="relative mr-[0.4em] inline-block">
              {/* Invisible sizer — determines the space "feel" always occupies */}
              <span
                className="invisible font-normal font-display italic"
                aria-hidden
              >
                feel
              </span>
              {/* Cycling feel text — key remount triggers blur-in animation */}
              <span
                key={feelIndex}
                className="animate-feel-in absolute inset-0 flex items-center justify-center font-normal italic text-accent"
                style={{ fontFamily: `'${currentFont}', cursive, serif` }}
              >
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
            </span>
            right.
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
        <span className="grid h-10 w-10 place-items-center rounded-full border border-line transition-colors group-hover:border-accent group-hover:text-accent">
          <span className="animate-bounce">↓</span>
        </span>
        Scroll to explore
      </a>
    </section>
  );
}
