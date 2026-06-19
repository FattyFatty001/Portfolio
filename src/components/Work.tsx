"use client";

import { projects } from "@/lib/projects";
import { useReveal } from "@/hooks/useReveal";

export default function Work() {
  const containerRef = useReveal<HTMLElement>();

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
        <h2 className="text-fluid-lg font-semibold">
          <span className="mask-line">
            <span data-reveal className="inline-block">
              Selected
            </span>
          </span>
          <span className="mask-line">
            <span
              data-reveal
              className="inline-block font-display italic text-accent"
            >
              work
            </span>
          </span>
        </h2>
        <p className="max-w-sm text-base text-bone-dim">
          UI crafted with players and usability in mind — a sample of shipped
          game interfaces. Tap through to the real work.
        </p>
      </div>

      <div className="flex flex-col gap-8 md:gap-12">
        {projects.map((project, i) => {
          const flip = i % 2 === 1;
          return (
            <article
              key={project.id}
              className="group relative overflow-hidden rounded-[2rem] border border-line md:rounded-[2.75rem]"
              style={{ backgroundColor: `${project.color}14` }}
            >
              <div className="grid items-center gap-8 p-6 md:grid-cols-2 md:gap-12 md:p-12">
                {/* Cover */}
                <div className={`relative ${flip ? "md:order-2" : ""}`}>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-8 rounded-full opacity-40 blur-3xl"
                    style={{ backgroundColor: project.color }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={`${project.title} — ${project.client}`}
                    loading="lazy"
                    className="relative mx-auto aspect-square w-full max-w-sm rounded-3xl object-cover shadow-[0_30px_70px_-25px_rgba(36,31,26,0.55)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-2 group-hover:rotate-1"
                  />
                </div>

                {/* Detail */}
                <div className={flip ? "md:order-1" : ""}>
                  <span className="inline-flex items-center gap-2 rounded-full bg-ink-soft px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-bone-dim">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                    {project.id} · {project.client}
                  </span>

                  <p className="mt-5 text-3xl font-semibold lowercase leading-[1.06] tracking-tight md:text-[2.6rem]">
                    {project.headline}
                  </p>

                  <p className="mt-4 text-sm font-medium text-bone-dim">
                    {project.title} · {project.role}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.discipline.map((d) => (
                      <span
                        key={d}
                        className="rounded-full border border-line px-3 py-1 text-xs font-medium text-bone-dim"
                      >
                        {d}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-5">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor
                      className="inline-flex items-center gap-2 rounded-full bg-bone px-5 py-2.5 text-sm font-semibold text-ink transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5"
                    >
                      View UI work
                      <span aria-hidden>↗</span>
                    </a>
                    {project.caseStudy && (
                      <a
                        href={project.caseStudy}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor
                        className="group/cs inline-flex items-center gap-1.5 text-sm font-medium text-bone transition-colors hover:text-accent"
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
