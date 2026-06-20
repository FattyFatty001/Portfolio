"use client";

import { useEffect, useState, useRef } from "react";
import {
  Pacifico,
  Abril_Fatface,
  Dancing_Script,
  Lobster,
  Caveat,
  Permanent_Marker,
  Cinzel_Decorative,
  Sacramento,
  Satisfy,
  Bangers,
  Amatic_SC,
  Great_Vibes,
  Playfair_Display,
  Righteous,
  Alfa_Slab_One,
  Kaushan_Script,
  Reenie_Beanie,
  Boogaloo,
  Leckerli_One,
  Rubik_Beastly,
} from "next/font/google";

// ─── 20 emotionally expressive "feel" fonts ──────────────────────────────────
// Defined at module level as required by next/font

const fPacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const fAbril = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const fDancing = Dancing_Script({ subsets: ["latin"], display: "swap" });
const fLobster = Lobster({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const fCaveat = Caveat({ subsets: ["latin"], display: "swap" });
const fMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const fCinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});
const fSacramento = Sacramento({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const fSatisfy = Satisfy({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const fBangers = Bangers({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const fAmatic = Amatic_SC({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});
const fGreatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const fPlayfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});
const fRighteous = Righteous({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const fAlfaSlab = Alfa_Slab_One({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const fKaushan = Kaushan_Script({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const fReenie = Reenie_Beanie({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const fBoogaloo = Boogaloo({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const fLeckerli = Leckerli_One({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const fBeastly = Rubik_Beastly({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const FEEL_FONTS = [
  {
    name: "Pacifico",
    desc: "bouncy retro surf script",
    className: fPacifico.className,
  },
  {
    name: "Abril Fatface",
    desc: "bold dramatic editorial",
    className: fAbril.className,
  },
  {
    name: "Dancing Script",
    desc: "romantic flowing handwriting",
    className: fDancing.className,
  },
  {
    name: "Lobster",
    desc: "retro diner sign script",
    className: fLobster.className,
  },
  {
    name: "Caveat",
    desc: "raw scrawled marker energy",
    className: fCaveat.className,
  },
  {
    name: "Permanent Marker",
    desc: "expressive sharpie force",
    className: fMarker.className,
  },
  {
    name: "Cinzel Decorative",
    desc: "ancient roman grandeur",
    className: fCinzel.className,
  },
  {
    name: "Sacramento",
    desc: "delicate ink calligraphy",
    className: fSacramento.className,
  },
  {
    name: "Satisfy",
    desc: "smooth elegant cursive",
    className: fSatisfy.className,
  },
  {
    name: "Bangers",
    desc: "comic book explosion",
    className: fBangers.className,
  },
  {
    name: "Amatic SC",
    desc: "hand-stamped thin artisan",
    className: fAmatic.className,
  },
  {
    name: "Great Vibes",
    desc: "formal wedding calligraphy",
    className: fGreatVibes.className,
  },
  {
    name: "Playfair Display",
    desc: "literary high-contrast serif",
    className: fPlayfair.className,
  },
  {
    name: "Righteous",
    desc: "art deco bold confidence",
    className: fRighteous.className,
  },
  {
    name: "Alfa Slab One",
    desc: "massive heavyweight billboard",
    className: fAlfaSlab.className,
  },
  {
    name: "Kaushan Script",
    desc: "expressive brush calligraphy",
    className: fKaushan.className,
  },
  {
    name: "Reenie Beanie",
    desc: "organic energetic scrawl",
    className: fReenie.className,
  },
  {
    name: "Boogaloo",
    desc: "casual friendly warmth",
    className: fBoogaloo.className,
  },
  {
    name: "Leckerli One",
    desc: "sweet swash softness",
    className: fLeckerli.className,
  },
  {
    name: "Rubik Beastly",
    desc: "morphed creature mutation",
    className: fBeastly.className,
  },
];

// ─── ~350 Google Font families for the main headline ─────────────────────────

const ALL_GOOGLE_FONTS = [
  "ABeeZee",
  "Abel",
  "Acme",
  "Actor",
  "Adamina",
  "Advent Pro",
  "Afacad",
  "Albert Sans",
  "Aldrich",
  "Alegreya",
  "Alegreya Sans",
  "Aleo",
  "Alex Brush",
  "Alexandria",
  "Alfa Slab One",
  "Alice",
  "Almendra",
  "Amethysta",
  "Amiko",
  "Anaheim",
  "Antic",
  "Arapey",
  "Arbutus",
  "Arbutus Slab",
  "Archivo",
  "Archivo Black",
  "Archivo Narrow",
  "Arima",
  "Armata",
  "Arsenal",
  "Artifika",
  "Arvo",
  "Asap",
  "Asap Condensed",
  "Assistant",
  "Average",
  "Average Sans",
  "Averia Libre",
  "Averia Sans Libre",
  "Bad Script",
  "Baloo 2",
  "Balthazar",
  "Bangers",
  "Barlow",
  "Barlow Condensed",
  "Barlow Semi Condensed",
  "Baskervville",
  "Be Vietnam Pro",
  "Bebas Neue",
  "Belgrano",
  "Bellefair",
  "Belleza",
  "Bellota",
  "BenchNine",
  "Besley",
  "BioRhyme",
  "Bitter",
  "Blinker",
  "Bodoni Moda",
  "Boogaloo",
  "Bowlby One",
  "Brawler",
  "Bree Serif",
  "Bricolage Grotesque",
  "Bruno Ace",
  "Cabin",
  "Caesar Dressing",
  "Caladea",
  "Calistoga",
  "Cambo",
  "Candal",
  "Cantarell",
  "Caprasimo",
  "Capriola",
  "Cardo",
  "Carlito",
  "Carme",
  "Carter One",
  "Castoro",
  "Catamaran",
  "Caveat",
  "Caudex",
  "Changa",
  "Chewy",
  "Chicle",
  "Chivo",
  "Cinzel",
  "Cinzel Decorative",
  "Coda",
  "Combo",
  "Comfortaa",
  "Comic Neue",
  "Concert One",
  "Cookie",
  "Copse",
  "Corben",
  "Cormorant",
  "Cormorant Garamond",
  "Courgette",
  "Courier Prime",
  "Coustard",
  "Crete Round",
  "Crimson Pro",
  "Crimson Text",
  "Croissant One",
  "Cuprum",
  "DM Sans",
  "DM Serif Display",
  "DM Serif Text",
  "Dancing Script",
  "Darker Grotesque",
  "Days One",
  "Dekko",
  "Delius",
  "Denk One",
  "Devonshire",
  "Didact Gothic",
  "Domine",
  "Donegal One",
  "Dosis",
  "Dr Sugiyama",
  "Duru Sans",
  "DynaPuff",
  "EB Garamond",
  "Eagle Lake",
  "Encode Sans",
  "Encode Sans Expanded",
  "Epilogue",
  "Euphoria Script",
  "Ewert",
  "Fahkwang",
  "Familjen Grotesk",
  "Fanwood Text",
  "Faustina",
  "Federant",
  "Federo",
  "Festive",
  "Figtree",
  "Finger Paint",
  "Fjalla One",
  "Fjord One",
  "Fondamento",
  "Forum",
  "Francois One",
  "Frank Ruhl Libre",
  "Fraunces",
  "Freckle Face",
  "Fredoka",
  "Freeman",
  "Fresca",
  "Frijole",
  "Fugaz One",
  "Gabarito",
  "Gabriela",
  "Gafata",
  "Galindo",
  "Gantari",
  "Genos",
  "Geo",
  "Geologica",
  "Georama",
  "Germania One",
  "Gideon Roman",
  "Gilda Display",
  "Girassol",
  "Give You Glory",
  "Gloria Hallelujah",
  "Glory",
  "Gluten",
  "Goblin One",
  "Gochi Hand",
  "Goldman",
  "Golos Text",
  "Gorditas",
  "Graduate",
  "Grand Hotel",
  "Grandstander",
  "Grape Nuts",
  "Gravitas One",
  "Great Vibes",
  "Griffy",
  "Gruppo",
  "Gudea",
  "Habibi",
  "Happy Monkey",
  "Headland One",
  "Heebo",
  "Henny Penny",
  "Hepta Slab",
  "Herr Von Muellerhoff",
  "Hind",
  "Holtwood One SC",
  "IBM Plex Sans",
  "IBM Plex Serif",
  "Ibarra Real Nova",
  "Iceberg",
  "Iceland",
  "Imprima",
  "Inclusive Sans",
  "Inder",
  "Indie Flower",
  "Instrument Sans",
  "Instrument Serif",
  "Inter",
  "Inter Tight",
  "Jim Nightshade",
  "Joan",
  "Jockey One",
  "Josefin Sans",
  "Josefin Slab",
  "Jost",
  "Judson",
  "Julee",
  "Julius Sans One",
  "Junge",
  "Jura",
  "Just Another Hand",
  "Kadwa",
  "Kanit",
  "Karma",
  "Karla",
  "Kavoon",
  "Keania One",
  "Kelly Slab",
  "Kenia",
  "Khand",
  "Kranky",
  "Kreon",
  "Krona One",
  "Krub",
  "Labrada",
  "Lacquer",
  "La Belle Aurore",
  "League Gothic",
  "League Spartan",
  "Leckerli One",
  "Ledger",
  "Lekton",
  "Lemon",
  "Lemonada",
  "Lexend",
  "Lexend Deca",
  "Libre Baskerville",
  "Libre Bodoni",
  "Libre Caslon Display",
  "Libre Franklin",
  "Lilita One",
  "Lily Script One",
  "Limelight",
  "Lobster",
  "Lobster Two",
  "Londrina Solid",
  "Lora",
  "Macondo",
  "Maven Pro",
  "McLaren",
  "Medula One",
  "Merienda",
  "Merriweather",
  "Merriweather Sans",
  "Michroma",
  "Milonga",
  "Miltonian",
  "Mitr",
  "Modak",
  "Modern Antiqua",
  "Mohave",
  "Molengo",
  "Monda",
  "Monoton",
  "Montserrat",
  "Montserrat Alternates",
  "Mouse Memoirs",
  "Mr De Haviland",
  "Mulish",
  "MuseoModerno",
  "Mystery Quest",
  "Neuton",
  "News Cycle",
  "Nixie One",
  "Nobile",
  "Norican",
  "Noticia Text",
  "Nova Cut",
  "Nova Flat",
  "Nova Round",
  "Nova Script",
  "Nunito",
  "Nunito Sans",
  "Odibee Sans",
  "Offside",
  "Oleo Script",
  "Onest",
  "Open Sans",
  "Oranienbaum",
  "Orbit",
  "Orbitron",
  "Oregano",
  "Oswald",
  "Outfit",
  "PT Sans",
  "PT Serif",
  "Pacifico",
  "Pangolin",
  "Parisienne",
  "Parkinsans",
  "Passero One",
  "Passion One",
  "Patua One",
  "Paytone One",
  "Peralta",
  "Permanent Marker",
  "Philosopher",
  "Piazzolla",
  "Piedra",
  "Pinyon Script",
  "Play",
  "Playball",
  "Playfair Display",
  "Playfair Display SC",
  "Playpen Sans",
  "Plus Jakarta Sans",
  "Podkova",
  "Poiret One",
  "Poller One",
  "Poly",
  "Pompiere",
  "Poppins",
  "Prosto One",
  "Proza Libre",
  "Public Sans",
  "Quicksand",
  "Quattrocento",
  "Quattrocento Sans",
  "Questrial",
  "Racing Sans One",
  "Radio Canada",
  "Radley",
  "Raleway",
  "Rambla",
  "Ranchers",
  "Rancho",
  "Rasa",
  "Rationale",
  "Readex Pro",
  "Red Hat Display",
  "Red Hat Text",
  "Rethink Sans",
  "Righteous",
  "Roboto",
  "Roboto Condensed",
  "Roboto Slab",
  "Rochester",
  "Rokkitt",
  "Rosario",
  "Rowdies",
  "Rozha One",
  "Rubik",
  "Ruda",
  "Rufina",
  "Ruge Boogie",
  "Russo One",
  "Sacramento",
  "Sail",
  "Saira",
  "Saira Condensed",
  "Sanchez",
  "Sancreek",
  "Sarabun",
  "Satisfy",
  "Scada",
  "Schoolbell",
  "Scope One",
  "Seaweed Script",
  "Secular One",
  "Sen",
  "Shadows Into Light",
  "Share",
  "Share Tech",
  "Sigmar",
  "Sigmar One",
  "Signika",
  "Slackey",
  "Smokum",
  "Smooch",
  "Sniglet",
  "Sofadi One",
  "Sofia",
  "Sofia Sans",
  "Solway",
  "Sono",
  "Sora",
  "Sorts Mill Goudy",
  "Source Sans 3",
  "Source Serif 4",
  "Space Grotesk",
  "Space Mono",
  "Special Elite",
  "Spline Sans",
  "Squada One",
  "Staatliches",
  "Stardos Stencil",
  "Stoke",
  "Strait",
  "Style Script",
  "Suez One",
  "Sulphur Point",
  "Tajawal",
  "Tangerine",
  "Tapestry",
  "Tauri",
  "Tektur",
  "Telex",
  "Tenor Sans",
  "Texturina",
  "Tienne",
  "Titan One",
  "Titillium Web",
  "Trocchi",
  "Trochut",
  "Truculenta",
  "Ubuntu",
  "Ubuntu Condensed",
  "Ubuntu Sans",
  "Unbounded",
  "Unica One",
  "Varela",
  "Varela Round",
  "Vibur",
  "Vidaloka",
  "Viga",
  "Volkhov",
  "Vollkorn",
  "Voltaire",
  "Waiting for the Sunrise",
  "Wallpoet",
  "Walter Turncoat",
  "Wellfleet",
  "Wendy One",
  "Wire One",
  "Wix Madefor Display",
  "Work Sans",
  "Yanone Kaffeesatz",
  "Yellowtail",
  "Yeseva One",
  "Yesteryear",
  "Young Serif",
  "Yrsa",
  "Zen Dots",
  "Zeyada",
  "Zilla Slab",
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function FontTestPage() {
  const [feelIndex, setFeelIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const feelIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // "feel" font — cycles every 3 s
  useEffect(() => {
    if (feelIntervalRef.current) clearInterval(feelIntervalRef.current);
    if (paused) return;
    feelIntervalRef.current = setInterval(() => {
      setFeelIndex((i) => (i + 1) % FEEL_FONTS.length);
    }, 3000);
    return () => {
      if (feelIntervalRef.current) clearInterval(feelIntervalRef.current);
    };
  }, [paused]);

  const currentFeel = FEEL_FONTS[feelIndex];

  return (
    <main className="min-h-screen px-6 py-16 md:px-12 md:py-24">
      {/* Keyframe injected here to avoid Turbopack/Windows PostCSS filter bug */}
      <style>{`
        @keyframes feel-in {
          from { opacity: 0; filter: blur(10px); }
          to   { opacity: 1; filter: blur(0px); }
        }
        .animate-feel-in {
          animation: feel-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      {/* ── Top bar ─────────────────────────────────────────────────── */}
      <div className="mb-10 flex items-center justify-between">
        <p className="inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.16em] text-accent">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
          Live font test
        </p>
        <button
          onClick={() => setPaused((p) => !p)}
          className="rounded-full bg-bone px-5 py-2.5 text-xs font-semibold text-ink transition-transform hover:-translate-y-0.5"
        >
          {paused ? "▶ Resume" : "⏸ Pause"}
        </button>
      </div>

      {/* ── Headline ────────────────────────────────────────────────── */}
      <div className="mb-14">
        <h1 className="text-fluid-lg font-semibold leading-[0.95] tracking-[-0.03em]">
          Designing interfaces players{" "}
          {/* Fixed-width wrapper: invisible Fraunces sizer holds the space */}
          <span className="relative mr-[0.1em] inline-block">
            {/* Invisible sizer — width/height always from the base display font */}
            <span
              className="invisible font-semibold italic"
              style={{ fontFamily: "var(--font-display)" }}
              aria-hidden
            >
              feel
            </span>
            {/* Animated text — absolutely overlaid, key forces remount on change */}
            <span
              key={feelIndex}
              className={`animate-feel-in absolute inset-0 flex items-center justify-center italic text-accent ${currentFeel.className}`}
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
          </span>{" "}
          right.
        </h1>
      </div>

      {/* ── Status bar ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-8 border-t border-bone/10 pt-8 sm:grid-cols-2">
        {/* "feel" font */}
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-bone-dim">
            <span className="italic text-accent">feel</span> font
          </p>
          <p
            className={`mb-1 text-xl italic text-accent ${currentFeel.className}`}
          >
            feel — {currentFeel.name}
          </p>
          <p className="text-sm text-bone-dim">
            {currentFeel.desc} · {feelIndex + 1} / {FEEL_FONTS.length}
          </p>
        </div>

        {/* Status */}
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-bone-dim">
            Status
          </p>
          <p className="mb-1 text-xl font-semibold">
            {paused ? "Paused" : "Live"}
          </p>
          <p className="text-sm text-bone-dim">
            {feelIndex + 1} / {FEEL_FONTS.length} fonts
          </p>
        </div>
      </div>

      {/* ── "feel" font selector ─────────────────────────────────────── */}
      <div className="mt-12 border-t border-bone/10 pt-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-bone-dim">
          20 expressive <span className="italic text-accent">feel</span> fonts —
          click to preview
        </p>
        <div className="flex flex-wrap gap-2">
          {FEEL_FONTS.map((f, i) => (
            <button
              key={f.name}
              title={f.desc}
              onClick={() => {
                setFeelIndex(i);
                setPaused(true);
              }}
              className={`rounded-full px-3 py-1.5 text-sm italic transition-all duration-200 ${
                i === feelIndex
                  ? "bg-accent text-ink font-semibold scale-105"
                  : "bg-bone/10 text-bone-dim hover:bg-bone/20"
              } ${f.className}`}
            >
              feel
              <span className="not-italic font-sans text-xs ml-1.5 opacity-60">
                {f.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
