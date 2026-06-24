"use client";

import { projects } from "@/lib/projects";
import { useReveal } from "@/hooks/useReveal";

export default function Work() {
  const containerRef = useReveal<HTMLElement>();

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative mx-auto max-w-[1600px] px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
        <h2 className="text-fluid-lg font-bold font-display-serif">
          <span className="mask-line pr-[0.15em]">
            <span
              data-reveal
              className="inline-block font-display italic"
            >
              Work
            </span>
          </span>
        </h2>
        <p className="max-w-sm text-base text-bone-dim">
          UI crafted with players and usability in mind — a sample of shipped
          game interfaces. Tap through to the real work.
        </p>
      </div>

      <div className="flex flex-col gap-16 md:gap-24">
        {projects.map((project, i) => {
          const flip = i % 2 === 1;
          return (
            <article
              key={project.id}
              className="group relative rounded-[2rem] border-2 border-line bg-ink-soft backdrop-blur-[6px] shadow-[0_2px_12px_rgba(61,32,20,0.04)] transition-all duration-500 ease-[var(--ease-out-expo)] hover:shadow-[0_8px_40px_rgba(61,32,20,0.10)] hover:-translate-y-1 md:rounded-[2.75rem]"
              style={{ backgroundColor: `${project.color}0d` }}
            >
              <div className="grid items-center gap-8 p-6 md:grid-cols-2 md:gap-12 md:p-12">
                {/* Cover */}
                <div className={`relative ${flip ? "md:order-2" : ""}`}>
                  {/* Soft color bloom anchoring the cover to the tile */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-6 rounded-full opacity-50 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
                    style={{ backgroundColor: project.color }}
                  />

                  {/* Stacked frames cradle the image into the design */}
                  <div
                    className={`relative mx-auto w-full max-w-md -my-6 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03] md:-my-14 ${
                      flip ? "md:-rotate-2" : "md:rotate-2"
                    }`}
                  >
                    <div
                      aria-hidden
                      className="absolute -inset-2.5 -rotate-3 rounded-[2rem] transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:-rotate-[6deg] group-hover:scale-[1.04]"
                      style={{ backgroundColor: `${project.color}2e` }}
                    />
                    <div
                      aria-hidden
                      className="absolute -inset-2.5 rotate-2 rounded-[2rem] transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-[5deg] group-hover:scale-[1.04]"
                      style={{ backgroundColor: `${project.color}1f` }}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={`${project.title} — ${project.client}`}
                      loading="lazy"
                      className="relative aspect-square w-full rounded-[1.7rem] object-cover shadow-[0_30px_70px_-25px_rgba(36,31,26,0.6)] ring-1 ring-white/60 transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-3 group-hover:shadow-[0_40px_90px_-20px_rgba(36,31,26,0.7)]"
                    />
                  </div>
                </div>

                {/* Detail */}
                <div className={flip ? "md:order-1" : ""}>
                  <span
                    className="inline-flex items-center gap-2 rounded-full border-2 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-bone-dim"
                    style={{ borderColor: `${project.color}4d` }}
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                    {project.id} · {project.client}
                  </span>

                  <p className="mt-6 text-4xl font-bold leading-[1.06] tracking-tight md:text-[3.2rem]">
                    {project.headline}
                  </p>

                  <p className="mt-4 text-sm font-semibold text-bone-dim">
                    {project.title} · {project.role}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-5">
                    <a
                      href={project.href}
                      data-cursor
                      className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-[0_12px_28px_-10px_var(--btn-color)] transition-all duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-[0_18px_38px_-8px_var(--btn-color)]"
                      style={{
                        backgroundColor: project.color,
                        ["--btn-color" as string]: project.color,
                      }}
                    >
                      View UI work
                      <span aria-hidden>→</span>
                    </a>
                    {project.caseStudy && (
                      <a
                        href={project.caseStudy}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor
                        className="group/cs inline-flex items-center gap-1.5 rounded-full border-2 border-line px-5 py-2.5 text-sm font-semibold text-bone transition-all duration-300 hover:border-accent hover:text-accent hover:-translate-y-0.5"
                      >
                        Read case study
                        <span
                          aria-hidden
                          className="transition-transform duration-300 group-hover/cs:translate-x-1"
                        >
                          →
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
