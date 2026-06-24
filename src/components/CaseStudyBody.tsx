"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSBlock } from "@/lib/caseStudies";

type Props = {
  blocks: CSBlock[];
  color: string;
};

// Width of the editorial reading column for text blocks.
const COL = "max-w-full";

// Module-level so its identity stays stable across renders — otherwise toggling
// the lightbox would remount every figure and reset the scroll-reveal state.
function CaseFigure({
  src,
  caption,
  onOpen,
}: {
  src: string;
  caption?: string;
  onOpen: () => void;
}) {
  return (
    <figure data-reveal>
      <button
        type="button"
        data-cursor
        onClick={onOpen}
        className="group block w-full overflow-hidden rounded-2xl border-2 border-line bg-ink-soft text-left shadow-[0_8px_30px_-15px_rgba(61,32,20,0.15)] transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-[0_18px_50px_-15px_rgba(61,32,20,0.25)]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={caption ?? "Case study visual"}
          loading="lazy"
          className="w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.02]"
        />
      </button>
      {caption && (
        <figcaption className="mt-4 text-sm text-bone-dim">{caption}</figcaption>
      )}
    </figure>
  );
}

export default function CaseStudyBody({ blocks, color }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  // Flat, ordered list of every image so the lightbox can step through them.
  const images = useMemo(() => {
    const out: { src: string; caption?: string }[] = [];
    for (const b of blocks) {
      if (b.kind === "figure") out.push({ src: b.src, caption: b.caption });
      else if (b.kind === "figures") out.push(...b.items);
    }
    return out;
  }, [blocks]);

  const indexOf = useMemo(() => {
    const map = new Map<string, number>();
    images.forEach((img, i) => {
      if (!map.has(img.src)) map.set(img.src, i);
    });
    return map;
  }, [images]);

  // Fade media in as it scrolls into view.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const tiles = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (typeof IntersectionObserver === "undefined") {
      tiles.forEach((t) => t.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    tiles.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [blocks]);

  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );
  const prev = useCallback(
    () => setOpen((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, next, prev]);

  const openSrc = useCallback(
    (src: string) => setOpen(indexOf.get(src) ?? 0),
    [indexOf],
  );

  return (
    <div ref={rootRef}>
      <style>{`
        [data-reveal] {
          opacity: 0;
          transform: translateY(24px);
          transition:
            opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        [data-reveal].is-in { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: reduce) {
          [data-reveal] { opacity: 1; transform: none; transition: none; }
        }
      `}</style>

      <div className="flex flex-col gap-14">
        {blocks.map((b, i) => {
          switch (b.kind) {
            case "section":
              return (
                <header
                  key={i}
                  id={b.id}
                  className="mt-20 scroll-mt-28 border-t-2 border-line pt-14 first:mt-0 first:border-0 first:pt-0"
                >
                  {b.eyebrow && (() => {
                    const m = b.eyebrow!.match(/^(.+?)\s*(\d+)$/);
                    if (m) {
                      const [, label, num] = m;
                      return (
                        <span
                          className="text-lg font-extrabold uppercase tracking-[0.15em] md:text-xl"
                          style={{ color }}
                        >
                          {label} {num}
                        </span>
                      );
                    }
                    return (
                      <span
                        className="inline-flex items-center rounded-full border-2 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
                        style={{ borderColor: color, color }}
                      >
                        {b.eyebrow}
                      </span>
                    );
                  })()}
                  <h2
                    className="mt-6 text-fluid-md font-bold"
                    style={b.eyebrow ? undefined : { color }}
                  >
                    {b.title}
                  </h2>
                </header>
              );

            case "subhead":
              return (
                <h3
                  key={i}
                  className={`${COL} mt-10 flex items-center gap-3 text-xl font-bold md:text-2xl`}
                >
                  <span
                    aria-hidden
                    className="inline-block h-5 w-1 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  {b.title}
                </h3>
              );

            case "label":
              return (
                <p
                  key={i}
                  className={`${COL} mb-1.5 text-xs font-semibold uppercase tracking-[0.16em]`}
                  style={{ color }}
                >
                  {b.text}
                </p>
              );

            case "p":
              return (
                <p key={i} className={`${COL} text-lg leading-relaxed text-bone-dim`}>
                  {b.text}
                </p>
              );

            case "list":
              return (
                <ul key={i} className={`${COL} flex flex-col gap-5`}>
                  {b.items.map((it, j) => (
                    <li key={j} className="flex gap-3 text-lg leading-relaxed text-bone-dim">
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              );

            case "quotes":
              return (
                <div
                  key={i}
                  className={`${COL} grid gap-5 ${
                    b.items.length > 1 ? "sm:grid-cols-2" : ""
                  }`}
                >
                  {b.items.map((q, j) => (
                    <blockquote
                      key={j}
                      className="rounded-2xl border-2 border-line bg-ink-soft px-5 py-4"
                    >
                      <span
                        aria-hidden
                        className="font-display text-2xl leading-none"
                        style={{ color }}
                      >
                        “
                      </span>
                      <p className="mt-1 font-display text-lg italic text-bone">{q}</p>
                    </blockquote>
                  ))}
                </div>
              );

            case "quote":
              return (
                <blockquote
                  key={i}
                  className={`${COL} border-l-[3px] pl-5`}
                  style={{ borderColor: color }}
                >
                  <p className="font-display text-xl italic text-bone md:text-2xl">
                    {b.text}
                  </p>
                  {b.cite && (
                    <cite className="mt-2 block text-sm not-italic text-bone-dim">
                      — {b.cite}
                    </cite>
                  )}
                </blockquote>
              );

            case "callouts":
              return (
                <div
                  key={i}
                  className={`${COL} grid gap-5 ${
                    b.cols === 1 ? "" : "sm:grid-cols-2"
                  }`}
                >
                  {b.items.map((c, j) => (
                    <div
                      key={j}
                      className="rounded-2xl border-2 border-line bg-ink-soft p-5"
                    >
                      <p
                        className="text-sm font-semibold"
                        style={{ color }}
                      >
                        {c.label}
                      </p>
                      <p className="mt-2.5 leading-relaxed text-bone-dim">{c.text}</p>
                    </div>
                  ))}
                </div>
              );

            case "finding":
              return (
                <div
                  key={i}
                  className={`${COL} rounded-2xl border-2 border-line bg-ink-soft p-6 md:p-7`}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className="font-display text-3xl font-semibold leading-none md:text-4xl"
                      style={{ color }}
                    >
                      {b.n}
                    </span>
                    {b.title && (
                      <h3 className="text-lg font-semibold md:text-xl">{b.title}</h3>
                    )}
                  </div>
                  {b.text && (
                    <p className="mt-4 leading-relaxed text-bone-dim">{b.text}</p>
                  )}
                  {b.list && (
                    <ul className="mt-5 flex flex-col gap-3">
                      {b.list.map((it, j) => (
                        <li key={j} className="flex gap-3 text-bone-dim">
                          <span
                            aria-hidden
                            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {b.quote && (
                    <blockquote
                      className="mt-5 border-l-[3px] pl-4"
                      style={{ borderColor: color }}
                    >
                      <p className="font-display italic text-bone">{b.quote}</p>
                      {b.cite && (
                        <cite className="mt-1 block text-sm not-italic text-bone-dim">
                          — {b.cite}
                        </cite>
                      )}
                    </blockquote>
                  )}
                </div>
              );

            case "figure":
              return (
                <div key={i} className="my-8">
                  <CaseFigure
                    src={b.src}
                    caption={b.caption}
                    onOpen={() => openSrc(b.src)}
                  />
                </div>
              );

            case "figures": {
              const cols = b.cols ?? (b.items.length === 1 ? 1 : 2);
              const colClass =
                cols >= 5
                  ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                  : cols === 3
                    ? "grid-cols-1 sm:grid-cols-3"
                    : cols === 1
                      ? "grid-cols-1"
                      : "grid-cols-1 sm:grid-cols-2";
              return (
                <div key={i} className={`my-8 grid gap-6 ${colClass}`}>
                  {b.items.map((it) => (
                    <CaseFigure
                      key={it.src}
                      src={it.src}
                      caption={it.caption}
                      onOpen={() => openSrc(it.src)}
                    />
                  ))}
                </div>
              );
            }

            default:
              return null;
          }
        })}
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────── */}
      {open !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/92 backdrop-blur-md"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Case study image viewer"
        >
          <button
            onClick={close}
            data-cursor
            aria-label="Close"
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border-2 border-line bg-ink-soft text-xl font-bold text-bone transition-all duration-300 hover:border-accent hover:text-accent"
          >
            ✕
          </button>

          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              data-cursor
              aria-label="Previous"
              className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border-2 border-line bg-ink-soft text-2xl font-bold text-bone transition-all duration-300 hover:border-accent hover:text-accent md:left-8"
            >
              ‹
            </button>
          )}

          <figure
            className="flex max-h-[90vh] max-w-[92vw] flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[open].src}
              alt={images[open].caption ?? "Case study visual"}
              className="max-h-[82vh] max-w-[92vw] rounded-xl object-contain shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)]"
            />
            {images[open].caption && (
              <figcaption className="text-center text-sm text-bone-dim">
                {images[open].caption}
              </figcaption>
            )}
          </figure>

          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              data-cursor
              aria-label="Next"
              className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border-2 border-line bg-ink-soft text-2xl font-bold text-bone transition-all duration-300 hover:border-accent hover:text-accent md:right-8"
            >
              ›
            </button>
          )}

          <span
            className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full px-3 py-1.5 text-xs font-medium text-bone-dim"
            style={{ backgroundColor: `${color}1f` }}
          >
            {open + 1} / {images.length}
          </span>
        </div>
      )}
    </div>
  );
}
