import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { caseStudies, caseStudySlugs } from "@/lib/caseStudies";
import WorkNav from "@/components/WorkNav";
import CaseStudyBody from "@/components/CaseStudyBody";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) return { title: "Case study — Matt Pearson" };
  const title = `${study.title} — Case Study — Matt Pearson`;
  const description = study.lead;
  return {
    title,
    description,
    openGraph: { title, description, type: "article", images: [study.banner] },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const study = caseStudies[slug];
  const project = projects.find((p) => p.slug === slug);
  if (!study || !project) notFound();

  const sections = study.blocks.filter((b) => b.kind === "section");

  return (
    <>
      <WorkNav />

      <main className="relative z-10">
        {/* ── Header ─────────────────────────────────────────────── */}
        <section className="mx-auto max-w-[1600px] px-6 pb-12 pt-32 md:px-12 md:pb-16 md:pt-40">
          <a
            href="/#work"
            data-cursor
            className="group inline-flex items-center gap-2 text-sm font-medium text-bone-dim transition-colors hover:text-bone"
          >
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:-translate-x-1"
            >
              ←
            </span>
            Back to selected work
          </a>

          <div className="mt-10">
            <span
              className="inline-flex items-center gap-2 rounded-full bg-ink-soft px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-bone-dim"
              style={{ border: "1px solid var(--color-line)" }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: study.color }}
              />
              Case study · {study.meta.client}
            </span>
          </div>

          <div className="mt-6 grid gap-12 md:grid-cols-[1fr_auto] md:items-start md:gap-20">
            <div>
              <h1 className="text-fluid-lg font-semibold">{study.title}</h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone-dim md:text-xl">
                {study.lead}
              </p>
            </div>

            {/* Client / Role / Timeline */}
            <dl className="grid grid-cols-3 gap-x-8 gap-y-1 md:grid-cols-1 md:gap-y-6 md:border-l md:border-line md:pl-8">
              {[
                ["Client", study.meta.client],
                ["Role", study.meta.role],
                ["Timeline", study.meta.timeline],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt
                    className="text-xs font-semibold uppercase tracking-[0.16em]"
                    style={{ color: study.color }}
                  >
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-bone md:text-base">
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
            className="aspect-[1191/511] overflow-hidden rounded-[2rem] border border-line md:rounded-[2.75rem]"
            style={{ backgroundColor: `${study.color}14` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={study.banner}
              alt={`${study.title} banner`}
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        {/* ── Contents ───────────────────────────────────────────── */}
        {sections.length > 1 && (
          <nav
            aria-label="On this page"
            className="mx-auto mt-16 max-w-[1040px] px-6 md:mt-20 md:px-12"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-bone-dim">
              On this page
            </p>
            <ul className="flex flex-wrap gap-2">
              {sections.map((s) =>
                s.kind === "section" ? (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      data-cursor
                      className="inline-block rounded-full border border-line px-3.5 py-1.5 text-sm font-medium text-bone-dim transition-colors hover:border-transparent hover:text-bone"
                      style={{ backgroundColor: `${study.color}10` }}
                    >
                      {s.title}
                    </a>
                  </li>
                ) : null,
              )}
            </ul>
          </nav>
        )}

        {/* ── Body ───────────────────────────────────────────────── */}
        <section className="mx-auto max-w-[1040px] px-6 py-16 md:px-12 md:py-24">
          <CaseStudyBody blocks={study.blocks} color={study.color} />
        </section>

        {/* ── Footer CTA ─────────────────────────────────────────── */}
        <section className="mx-auto max-w-[1600px] px-6 pb-24 md:px-12 md:pb-32">
          <div className="flex flex-col gap-8 rounded-[2rem] bg-bone px-8 py-12 text-ink md:flex-row md:items-center md:justify-between md:rounded-[2.75rem] md:px-14 md:py-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-ink/55">
                See the screens
              </p>
              <a
                href={project.href}
                data-cursor
                className="group mt-2 inline-flex items-center gap-3 text-3xl font-semibold md:text-4xl"
              >
                {project.title} UI assets
                <span
                  aria-hidden
                  className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-2"
                >
                  →
                </span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/#contact"
                data-cursor
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-bone transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5"
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
