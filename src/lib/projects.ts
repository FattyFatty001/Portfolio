export type Project = {
  id: string;
  slug: string;
  title: string;
  client: string;
  role: string;
  headline: string;
  discipline: string[];
  color: string;
  image: string;
  href: string;
  caseStudy?: string;
  // Header copy mirrored from the original mattpearson.net project page.
  summary: string;
  meta: { client: string; role: string; timeline: string };
};

// UI work — each tile links out to the real project page.
export const projects: Project[] = [
  {
    id: "01",
    slug: "project-gemini",
    title: "Project Gemini",
    client: "People Can Fly",
    role: "Lead UI/UX Designer",
    headline: "Evolving a looter-shooter into a seamless console experience",
    discipline: ["Console UX", "Prototyping", "UI Motion"],
    color: "#7c5cff",
    image: "/work/gemini.jpg",
    href: "/work/project-gemini/",
    caseStudy: "https://mattpearson.net/casestudy-project-gemini/",
    summary: "A selection of UI assets",
    meta: { client: "People Can Fly", role: "UI/UX", timeline: "2021 – 2025" },
  },
  {
    id: "02",
    slug: "plants-vs-zombies",
    title: "Plants vs. Zombies",
    client: "Electronic Arts",
    role: "Lead UI/UX Designer",
    headline: "Transparent, player-first progression for a hero shooter",
    discipline: ["Progression", "UX Research", "Metagame"],
    color: "#2bb673",
    image: "/work/pvz.png",
    href: "/work/plants-vs-zombies/",
    caseStudy: "https://mattpearson.net/casestudy-plants-vs-zombies/",
    summary: "A selection of UI assets",
    meta: { client: "Visceral", role: "Senior UI Designer", timeline: "2012 – 2016" },
  },
  {
    id: "03",
    slug: "outriders",
    title: "Outriders",
    client: "People Can Fly",
    role: "Lead UI/UX Designer",
    headline: "In-world HUD and menus for a co-op RPG shooter",
    discipline: ["HUD", "Menus", "UI Art"],
    color: "#ff6b5e",
    image: "/work/outriders.jpg",
    href: "/work/outriders/",
    summary: "A selection of UI Assets",
    meta: { client: "People Can Fly", role: "UI/UX", timeline: "2021 – 2025" },
  },
  {
    id: "04",
    slug: "ragtag",
    title: "Star Wars: Ragtag",
    client: "Electronic Arts · Visceral",
    role: "UI/UX Designer",
    headline: "Interface concepts for a story-driven Star Wars adventure",
    discipline: ["UI Design", "Concept"],
    color: "#ffb43d",
    image: "/work/ragtag.png",
    href: "/work/ragtag/",
    summary: "A selection of UI assets",
    meta: { client: "Visceral", role: "Senior UI Designer", timeline: "2012 – 2016" },
  },
  {
    id: "05",
    slug: "vhs",
    title: "Video Horror Society",
    client: "Hellbent Games",
    role: "Lead UI Designer",
    headline: "Fast, readable UI for an asymmetric 80s horror game",
    discipline: ["First-Time UX", "HUD", "Social"],
    color: "#ff7eb6",
    image: "/work/vhs-cover.png",
    href: "/work/vhs/",
    caseStudy: "https://mattpearson.net/case-study-vhs/",
    summary: "A selection of UI Assets",
    meta: { client: "Hellbent", role: "Principal UI/UX Designer", timeline: "2016 – 2020" },
  },
  {
    id: "06",
    slug: "misc",
    title: "Miscellaneous",
    client: "Various studios",
    role: "Selected UI",
    headline: "Explorations, side quests and bits of UI craft",
    discipline: ["UI", "Motion", "Art Direction"],
    color: "#3a9ef5",
    image: "/work/misc.png",
    href: "/work/misc/",
    summary: "A selection of miscellaneous UI Assets",
    meta: { client: "Multiple", role: "UI/UX", timeline: "2006 – 2025" },
  },
];

// Disciplines ticker shown in the marquee.
export const services = [
  "Game UI Design",
  "UX Research",
  "UI Motion",
  "HUD & Menu Systems",
  "Design Systems",
  "Unreal Engine / UMG",
  "Art Direction",
  "Accessibility",
];
