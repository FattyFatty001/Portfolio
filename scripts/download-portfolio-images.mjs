// Downloads all portfolio images from the mattpearson.net project pages
// referenced in src/lib/projects.ts, organised into per-project folders.
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT_ROOT = "portfolio-images";

// Page URL -> destination folder (case studies merge into the game folder)
const PAGES = [
  ["https://mattpearson.net/project-gemini/", "gemini"],
  ["https://mattpearson.net/casestudy-project-gemini/", "gemini"],
  ["https://mattpearson.net/plants-vs-zombies-battle-for-neighbourville", "pvz"],
  ["https://mattpearson.net/casestudy-plants-vs-zombies/", "pvz"],
  ["https://mattpearson.net/outriders/", "outriders"],
  ["https://mattpearson.net/Ragtag", "ragtag"],
  ["https://mattpearson.net/vhs", "vhs"],
  ["https://mattpearson.net/case-study-vhs/", "vhs"],
  ["https://mattpearson.net/misc", "misc"],
];

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";

const IMG_EXT = /\.(png|jpe?g|gif|webp|avif|svg)$/i;

function extractUrls(html) {
  const urls = new Set();
  // src / data-src / srcset / data-srcset attributes
  const attrRe = /(?:src|data-src|srcset|data-srcset|content)\s*=\s*"([^"]+)"/gi;
  let m;
  while ((m = attrRe.exec(html))) {
    for (const part of m[1].split(",")) {
      const u = part.trim().split(/\s+/)[0];
      if (/wp-content\/uploads/.test(u) && IMG_EXT.test(u)) urls.add(u);
    }
  }
  // any bare uploads URL (inline styles, JSON, og:image, url(...))
  const bareRe =
    /https?:\/\/[^"'\s)]+wp-content\/uploads\/[^"'\s)]+\.(?:png|jpe?g|gif|webp|avif|svg)/gi;
  while ((m = bareRe.exec(html))) urls.add(m[0]);
  return [...urls].map((u) => (u.startsWith("//") ? "https:" + u : u));
}

// Strip WordPress "-1024x385" size suffix to group resolution variants.
function baseKey(url) {
  const path = new URL(url).pathname;
  return path.replace(/-\d+x\d+(\.[a-z0-9]+)$/i, "$1");
}
function sizeOf(url) {
  const m = new URL(url).pathname.match(/-(\d+)x(\d+)\.[a-z0-9]+$/i);
  return m ? parseInt(m[1], 10) * parseInt(m[2], 10) : Infinity; // original = best
}

async function main() {
  // Collect best variant per image, tracked per destination folder.
  const byFolder = new Map(); // folder -> Map(baseKey -> {url,size})

  for (const [page, folder] of PAGES) {
    process.stdout.write(`Fetching ${page} ... `);
    let html;
    try {
      const res = await fetch(page, { headers: { "User-Agent": UA } });
      if (!res.ok) {
        console.log(`HTTP ${res.status}`);
        continue;
      }
      html = await res.text();
    } catch (e) {
      console.log(`ERR ${e.message}`);
      continue;
    }
    const found = extractUrls(html);
    if (!byFolder.has(folder)) byFolder.set(folder, new Map());
    const best = byFolder.get(folder);
    for (const url of found) {
      const key = baseKey(url);
      const size = sizeOf(url);
      const cur = best.get(key);
      if (!cur || size > cur.size) best.set(key, { url, size });
    }
    console.log(`${found.length} refs`);
  }

  // Download.
  let total = 0,
    ok = 0,
    fail = 0;
  for (const [folder, best] of byFolder) {
    const dir = join(OUT_ROOT, folder);
    await mkdir(dir, { recursive: true });
    const usedNames = new Set();
    for (const { url } of best.values()) {
      total++;
      let name = decodeURIComponent(new URL(url).pathname.split("/").pop());
      while (usedNames.has(name)) name = name.replace(IMG_EXT, "_dup$&");
      usedNames.add(name);
      try {
        const res = await fetch(url, { headers: { "User-Agent": UA } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buf = Buffer.from(await res.arrayBuffer());
        await writeFile(join(dir, name), buf);
        ok++;
        console.log(`  ✓ ${folder}/${name} (${(buf.length / 1024).toFixed(0)} KB)`);
      } catch (e) {
        fail++;
        console.log(`  ✗ ${folder}/${name} — ${e.message}`);
      }
    }
  }
  console.log(`\nDone: ${ok}/${total} downloaded, ${fail} failed.`);
}

main();
