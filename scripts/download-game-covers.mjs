// Downloads a cover image for each game in games-worked-on.txt.
// Source: Wikipedia REST summary API (originalimage), with a search fallback.
import { mkdir, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "game-covers");

const UA = "PortfolioCoverFetcher/1.0 (contact: matt@mattpearson.net)";

// game label -> { wiki: explicit Wikipedia article title, slug: output filename }
const GAMES = [
  ["Project Gemini", null],
  ["Outriders", "Outriders (video game)"],
  ["Star Wars: Ragtag", null],
  ["Video Horror Society", "Video Horror Society"],
  ["Dead Space", "Dead Space (2008 video game)"],
  ["Plants vs. Zombies: Battle for Neighborville", "Plants vs. Zombies: Battle for Neighborville"],
  ["Battlefield: Hardline", "Battlefield Hardline"],
  ["Battlefield V", "Battlefield V"],
  ["EA Sports FIFA", "FIFA (video game series)"],
  ["EA Sports NHL", "NHL (video game series)"],
  ["Star Wars Battlefront", "Star Wars Battlefront (2015 video game)"],
  ["Mirror's Edge", "Mirror's Edge"],
  ["Resonance of Fate: 4K/HD Edition", "Resonance of Fate"],
  ["Resonance of Fate", "Resonance of Fate"],
  ["Total War: Shogun 2", "Total War: Shogun 2"],
  ["Napoleon: Total War", "Napoleon: Total War"],
  ["Space Channel 5: Part 2", "Space Channel 5: Part 2"],
  ["Crazy Taxi", "Crazy Taxi (video game)"],
  ["Football Manager 2010", "Football Manager 2010"],
  ["Football Manager 2011", "Football Manager 2011"],
  ["Football Manager 2012", "Football Manager 2012"],
  ["Football Manager Handheld 2012", "Football Manager 2012"],
  ["Sonic Free Riders", "Sonic Free Riders"],
  ["Sonic & SEGA All-Stars Racing", "Sonic & Sega All-Stars Racing"],
  ["Sonic & All-Stars Racing: Transformed", "Sonic & All-Stars Racing Transformed"],
  ["Sonic Generations", "Sonic Generations"],
  ["Sonic & Knuckles", "Sonic & Knuckles"],
  ["Sonic the Hedgehog 3", "Sonic the Hedgehog 3"],
  ["Alpha Protocol", "Alpha Protocol"],
  ["Iron Man 2", "Iron Man 2 (video game)"],
  ["Aliens vs Predator", "Aliens vs. Predator (2010 video game)"],
  ["Vancouver 2010", "Vancouver 2010 (video game)"],
  ["Planet 51: The Game", "Planet 51 (video game)"],
  ["Phantasy Star II", "Phantasy Star II"],
  ["Gunstar Heroes", "Gunstar Heroes"],
  ["Shinobi", "The Revenge of Shinobi"],
  ["Stormrise", "Stormrise"],
  ["Banjo-Kazooie: Nuts & Bolts", "Banjo-Kazooie: Nuts & Bolts"],
  ["SEGA Bass Fishing", "Sega Bass Fishing"],
  ["Hell Yeah!: Wrath of the Dead Rabbit", "Hell Yeah! Wrath of the Dead Rabbit"],
  ["Super Monkey Ball: Banana Splitz", "Super Monkey Ball: Banana Splitz"],
  ["Binary Domain", "Binary Domain"],
  ["Mario & Sonic at the London 2012 Olympic Games", "Mario & Sonic at the London 2012 Olympic Games"],
  ["Rhythm Thief & the Emperor's Treasure", "Rhythm Thief & the Emperor's Treasure"],
  ["Crush", "Crush 3D"],
  ["Renegade Ops", "Renegade Ops"],
];

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extFromUrl(url) {
  const m = url.split("?")[0].match(/\.(jpe?g|png|gif|webp|svg)$/i);
  return m ? m[1].toLowerCase().replace("jpeg", "jpg") : "jpg";
}

async function summaryImage(title) {
  const url =
    "https://en.wikipedia.org/api/rest_v1/page/summary/" +
    encodeURIComponent(title.replace(/ /g, "_"));
  const res = await fetch(url, { headers: { "User-Agent": UA, accept: "application/json" } });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.originalimage?.source || data?.thumbnail?.source || null;
}

async function searchTitle(query) {
  const url =
    "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srlimit=1&srsearch=" +
    encodeURIComponent(query + " video game");
  const res = await fetch(url, { headers: { "User-Agent": UA, accept: "application/json" } });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.query?.search?.[0]?.title || null;
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  return buf.length;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const ok = [];
  const missing = [];

  for (const [label, wiki] of GAMES) {
    const slug = slugify(label);
    try {
      let title = wiki;
      let img = title ? await summaryImage(title) : null;

      if (!img) {
        const found = await searchTitle(label);
        if (found) {
          title = found;
          img = await summaryImage(found);
        }
      }

      if (!img) {
        missing.push(label);
        console.log(`MISS  ${label}`);
        continue;
      }

      const dest = join(OUT_DIR, `${slug}.${extFromUrl(img)}`);
      const bytes = await download(img, dest);
      ok.push(label);
      console.log(`OK    ${label}  ->  ${slug} (${(bytes / 1024).toFixed(0)} KB)  [${title}]`);
    } catch (err) {
      missing.push(label);
      console.log(`ERR   ${label}: ${err.message}`);
    }
  }

  console.log(`\nDownloaded ${ok.length}/${GAMES.length}.`);
  if (missing.length) console.log(`Missing: ${missing.join(", ")}`);
}

main();
