export type Project = {
  id: string;
  title: string;
  client: string;
  role: string;
  headline: string;
  discipline: string[];
  color: string;
  image: string;
  href: string;
  caseStudy?: string;
};

// UI work — each tile links out to the real project page.
export const projects: Project[] = [
  {
    id: "01",
    title: "Project Gemini",
    client: "People Can Fly",
    role: "Lead UI/UX Designer",
    headline: "evolving a looter-shooter into a seamless console experience",
    discipline: ["Console UX", "Prototyping", "UI Motion"],
    color: "#7c5cff",
    image: "/work/gemini.jpg",
    href: "https://mattpearson.net/project-gemini/",
    caseStudy: "https://mattpearson.net/casestudy-project-gemini/",
  },
  {
    id: "02",
    title: "Plants vs. Zombies",
    client: "Electronic Arts",
    role: "Lead UI/UX Designer",
    headline: "transparent, player-first progression for a hero shooter",
    discipline: ["Progression", "UX Research", "Metagame"],
    color: "#2bb673",
    image: "/work/pvz.png",
    href: "https://mattpearson.net/plants-vs-zombies-battle-for-neighbourville",
    caseStudy: "https://mattpearson.net/casestudy-plants-vs-zombies/",
  },
  {
    id: "03",
    title: "Outriders",
    client: "People Can Fly",
    role: "Lead UI/UX Designer",
    headline: "in-world HUD and menus for a co-op RPG shooter",
    discipline: ["HUD", "Menus", "UI Art"],
    color: "#ff6b5e",
    image: "/work/outriders.jpg",
    href: "https://mattpearson.net/outriders/",
  },
  {
    id: "04",
    title: "Star Wars: Ragtag",
    client: "Electronic Arts · Visceral",
    role: "UI/UX Designer",
    headline: "interface concepts for a story-driven Star Wars adventure",
    discipline: ["UI Design", "Concept"],
    color: "#ffb43d",
    image: "/work/ragtag.png",
    href: "https://mattpearson.net/Ragtag",
  },
  {
    id: "05",
    title: "Video Horror Society",
    client: "Hellbent Games",
    role: "Lead UI Designer",
    headline: "fast, readable UI for an asymmetric 80s horror game",
    discipline: ["First-Time UX", "HUD", "Social"],
    color: "#ff7eb6",
    image: "/work/vhs-cover.png",
    href: "https://mattpearson.net/vhs",
    caseStudy: "https://mattpearson.net/case-study-vhs/",
  },
  {
    id: "06",
    title: "Miscellaneous",
    client: "Various studios",
    role: "Selected UI",
    headline: "explorations, side quests and bits of UI craft",
    discipline: ["UI", "Motion", "Art Direction"],
    color: "#3a9ef5",
    image: "/work/misc.png",
    href: "https://mattpearson.net/misc",
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
