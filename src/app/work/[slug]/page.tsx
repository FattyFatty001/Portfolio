import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { galleries } from "@/lib/workGalleries";
import WorkNav from "@/components/WorkNav";
import WorkGallery from "@/components/WorkGallery";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Work — Matt Pearson" };
  const title = `${project.title} — Matt Pearson`;
  const description = `${project.headline}. ${project.meta.role} for ${project.meta.client}.`;
  return {
    title,
    description,
    openGraph: { title, description, type: "article", images: [project.image] },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const gallery = galleries[slug];
  if (!project || !gallery) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(index + 1) % projects.length];

  return (
    <>
      <WorkNav />

      <main className="relative z-10">
        {/* ── Header ─────────────────────────────────────────────── */}
        <section className="mx-auto max-w-[1600px] px-6 pb-12 pt-32 md:px-12 md:pb-16 md:pt-40">
          <a
            href="/#work"
            data-cursor
            className="group inline-flex items-center gap-2 text-sm font-semibold text-bone-dim transition-colors hover:text-bone"
          >
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:-translate-x-1"
            >
              ←
            </span>
            Back to selected work
          </a>

          <div className="mt-10 grid gap-10 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
            <div>
              <span
                className="inline-flex items-center gap-2 rounded-full border-2 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-bone-dim"
                style={{ borderColor: `${project.color}4d` }}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                {project.id} · {project.meta.client}
              </span>

              <h1 className="mt-6 text-fluid-lg font-bold">
                {project.title}
              </h1>

              <p className="mt-4 max-w-xl text-lg text-bone-dim md:text-xl">
                {project.summary}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {project.discipline.map((d) => (
                  <span
                    key={d}
                    className="rounded-full border-2 border-line px-3.5 py-1.5 text-xs font-semibold text-bone-dim"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Original project meta — Client / Role / Timeline */}
            <dl className="grid grid-cols-3 gap-x-8 gap-y-1 md:grid-cols-1 md:gap-y-5 md:border-l-2 md:border-line md:pl-8">
              {[
                ["Client", project.meta.client],
                ["Role", project.meta.role],
                ["Timeline", project.meta.timeline],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt
                    className="text-xs font-bold uppercase tracking-[0.16em]"
                    style={{ color: project.color }}
                  >
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-bone md:text-base">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Banner ─────────────────────────────────────────────── */}
        <section className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div
            className="overflow-hidden rounded-[2rem] border-2 border-line shadow-[0_4px_20px_rgba(61,32,20,0.06)] md:rounded-[2.75rem]"
            style={{ backgroundColor: `${project.color}0d` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={gallery.banner}
              alt={`${project.title} banner`}
              className="w-full object-cover"
            />
          </div>
        </section>

        {/* ── Gallery ────────────────────────────────────────────── */}
        <section className="mx-auto max-w-[1600px] px-6 py-16 md:px-12 md:py-24">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2 className="text-fluid-md font-bold">
              Selected{" "}
              <span className="font-display italic text-accent">assets</span>
            </h2>
            <span className="hidden text-sm font-medium text-bone-dim sm:block">
              {gallery.images.length} pieces · click to enlarge
            </span>
          </div>

          <WorkGallery
            images={gallery.images}
            title={project.title}
            color={project.color}
          />
        </section>

        {/* ── Footer CTA ─────────────────────────────────────────── */}
        <section className="mx-auto max-w-[1600px] px-6 pb-24 md:px-12 md:pb-32">
          <div className="flex flex-col gap-8 rounded-[2rem] bg-bone px-8 py-12 text-ink shadow-[0_12px_40px_rgba(61,32,20,0.12)] md:flex-row md:items-center md:justify-between md:rounded-[2.75rem] md:px-14 md:py-16">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-ink/50">
                Next project
              </p>
              <a
                href={nextProject.href}
                data-cursor
                className="group mt-3 inline-flex items-center gap-3 text-3xl font-bold md:text-4xl"
              >
                {nextProject.title}
                <span
                  aria-hidden
                  className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-2"
                >
                  →
                </span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {project.caseStudy && (
                <a
                  href={project.caseStudy}
                  {...(project.caseStudy.startsWith("/")
                    ? {}
                    : { target: "_blank", rel: "noreferrer" })}
                  data-cursor
                  className="inline-flex items-center gap-2 rounded-full border-2 border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:border-ink/40 hover:-translate-y-0.5"
                >
                  Read case study
                  <span aria-hidden>
                    {project.caseStudy.startsWith("/") ? "→" : "↗"}
                  </span>
                </a>
              )}
              <a
                href="/#contact"
                data-cursor
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-bone shadow-[0_4px_12px_rgba(255,248,242,0.15)] transition-all duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(255,248,242,0.22)]"
              >
                Get in touch
                <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
