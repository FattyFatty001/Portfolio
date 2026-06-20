"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  images: string[];
  title: string;
  color: string;
};

export default function WorkGallery({ images, title, color }: Props) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  // Fade each tile in as it scrolls into view (no layout impact on masonry).
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const tiles = Array.from(
      grid.querySelectorAll<HTMLElement>("[data-tile]"),
    );

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
  }, [images]);

  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );
  const prev = useCallback(
    () =>
      setOpen((i) =>
        i === null ? i : (i - 1 + images.length) % images.length,
      ),
    [images.length],
  );

  // Keyboard controls + scroll lock while the lightbox is open.
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

  return (
    <>
      <style>{`
        [data-tile] {
          opacity: 0;
          transform: translateY(26px);
          transition:
            opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        [data-tile].is-in { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: reduce) {
          [data-tile] { opacity: 1; transform: none; transition: none; }
        }
      `}</style>

      <div
        ref={gridRef}
        className="columns-1 gap-6 sm:columns-2 lg:columns-2 [&>*]:mb-6"
      >
        {images.map((src, i) => (
          <button
            key={src}
            data-tile
            data-cursor
            onClick={() => setOpen(i)}
            style={{ transitionDelay: `${(i % 2) * 70}ms` }}
            className="group block w-full overflow-hidden rounded-2xl border border-line bg-ink-soft text-left shadow-[0_18px_45px_-30px_rgba(36,31,26,0.5)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${title} — UI asset ${i + 1}`}
              loading="lazy"
              className="w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/92 backdrop-blur-md"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} image viewer`}
        >
          {/* Close */}
          <button
            onClick={close}
            data-cursor
            aria-label="Close"
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-line bg-ink-soft text-xl text-bone transition-colors hover:text-accent"
          >
            ✕
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              data-cursor
              aria-label="Previous"
              className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-ink-soft text-2xl text-bone transition-colors hover:text-accent md:left-8"
            >
              ‹
            </button>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[open]}
            alt={`${title} — UI asset ${open + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] max-w-[92vw] rounded-xl object-contain shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)]"
          />

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              data-cursor
              aria-label="Next"
              className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-ink-soft text-2xl text-bone transition-colors hover:text-accent md:right-8"
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
    </>
  );
}
