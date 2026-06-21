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
    caseStudy: "/work/project-gemini/case-study/",
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
    caseStudy: "/work/plants-vs-zombies/case-study/",
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
    caseStudy: "/work/vhs/case-study/",
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

export type GameCover = {
  src: string;
  title: string;
  // Featured titles render larger and brighter in the marquee.
  featured?: boolean;
};

// Game covers scrolled in the marquee — every title worked on.
// Flip `featured` to promote/demote a title's prominence in the ticker.
export const gameCovers: GameCover[] = [
  { src: "/game-covers/aliens-vs-predator.jpg", title: "Aliens vs. Predator" },
  { src: "/game-covers/alpha-protocol.jpg", title: "Alpha Protocol" },
  { src: "/game-covers/banjo-kazooie-nuts-and-bolts.jpg", title: "Banjo-Kazooie: Nuts & Bolts" },
  { src: "/game-covers/battlefield-hardline.jpg", title: "Battlefield Hardline" },
  { src: "/game-covers/battlefield-v.jpg", title: "Battlefield V", featured: true },
  { src: "/game-covers/binary-domain.png", title: "Binary Domain" },
  { src: "/game-covers/crazy-taxi.png", title: "Crazy Taxi" },
  { src: "/game-covers/crush.png", title: "Crush" },
  { src: "/game-covers/dead-space.jpg", title: "Dead Space", featured: true },
  { src: "/game-covers/ea-sports-fifa.png", title: "EA Sports FIFA" },
  { src: "/game-covers/ea-sports-nhl.jpg", title: "EA Sports NHL" },
  { src: "/game-covers/football-manager-2010.jpg", title: "Football Manager 2010" },
  { src: "/game-covers/football-manager-2011.jpg", title: "Football Manager 2011" },
  { src: "/game-covers/football-manager-2012.jpg", title: "Football Manager 2012" },
  { src: "/game-covers/gunstar-heroes.jpg", title: "Gunstar Heroes" },
  { src: "/game-covers/hell-yeah-wrath-of-the-dead-rabbit.png", title: "Hell Yeah! Wrath of the Dead Rabbit" },
  { src: "/game-covers/iron-man-2.png", title: "Iron Man 2" },
  { src: "/game-covers/mario-and-sonic-at-the-london-2012-olympic-games.jpg", title: "Mario & Sonic at the London 2012 Olympic Games" },
  { src: "/game-covers/mirror-s-edge.jpg", title: "Mirror's Edge", featured: true },
  { src: "/game-covers/napoleon-total-war.jpg", title: "Napoleon: Total War" },
  { src: "/game-covers/outriders.jpg", title: "Outriders", featured: true },
  { src: "/game-covers/phantasy-star-ii.jpg", title: "Phantasy Star II" },
  { src: "/game-covers/planet-51-the-game.jpg", title: "Planet 51: The Game" },
  { src: "/game-covers/plants-vs-zombies-battle-for-neighborville.jpg", title: "Plants vs. Zombies: Battle for Neighborville", featured: true },
  { src: "/game-covers/renegade-ops.png", title: "Renegade Ops" },
  { src: "/game-covers/resonance-of-fate.jpg", title: "Resonance of Fate" },
  { src: "/game-covers/rhythm-thief-and-the-emperor-s-treasure.png", title: "Rhythm Thief & the Emperor's Treasure" },
  { src: "/game-covers/sega-bass-fishing.png", title: "Sega Bass Fishing" },
  { src: "/game-covers/shinobi.png", title: "Shinobi" },
  { src: "/game-covers/sonic-and-all-stars-racing-transformed.png", title: "Sonic & All-Stars Racing Transformed" },
  { src: "/game-covers/sonic-and-knuckles.jpg", title: "Sonic & Knuckles" },
  { src: "/game-covers/sonic-and-sega-all-stars-racing.jpg", title: "Sonic & Sega All-Stars Racing" },
  { src: "/game-covers/sonic-free-riders.jpg", title: "Sonic Free Riders" },
  { src: "/game-covers/sonic-generations.jpg", title: "Sonic Generations", featured: true },
  { src: "/game-covers/sonic-the-hedgehog-3.jpg", title: "Sonic the Hedgehog 3" },
  { src: "/game-covers/space-channel-5-part-2.png", title: "Space Channel 5: Part 2" },
  { src: "/game-covers/star-wars-battlefront.jpg", title: "Star Wars Battlefront", featured: true },
  { src: "/game-covers/star-wars-ragtag.png", title: "Star Wars: Ragtag" },
  { src: "/game-covers/stormrise.jpg", title: "Stormrise" },
  { src: "/game-covers/super-monkey-ball-banana-splitz.jpg", title: "Super Monkey Ball: Banana Splitz" },
  { src: "/game-covers/total-war-shogun-2.jpg", title: "Total War: Shogun 2", featured: true },
  { src: "/game-covers/vancouver-2010.jpg", title: "Vancouver 2010" },
  { src: "/game-covers/video-horror-society.png", title: "Video Horror Society", featured: true },
];
