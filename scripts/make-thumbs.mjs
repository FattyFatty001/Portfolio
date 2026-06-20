// Generates small JPEG thumbnails of a project's images so the montage
// renders/captures quickly. Usage: node scripts/make-thumbs.mjs <project> [width]
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { join, parse } from "node:path";
import sharp from "sharp";

const project = process.argv[2] || "gemini";
const width = parseInt(process.argv[3] || "520", 10);
const src = join("portfolio-images", project);
const out = join("scripts", "banner", "thumbs", project);

await mkdir(out, { recursive: true });
const files = await readdir(src);
let ok = 0, fail = 0;
for (const f of files) {
  if (!/\.(png|jpe?g|webp|avif|gif)$/i.test(f)) continue;
  const name = parse(f).name + ".jpg";
  try {
    const buf = await sharp(join(src, f), { animated: false })
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality: 82 })
      .toBuffer();
    await writeFile(join(out, name), buf);
    ok++;
  } catch (e) {
    fail++;
    console.log(`  ✗ ${f} — ${e.message}`);
  }
}
console.log(`${project}: ${ok} thumbs written to ${out} (${fail} failed)`);
