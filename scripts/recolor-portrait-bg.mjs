import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

// --- Read the API key from .env.local (never printed) ---
function readEnvKey() {
  const txt = readFileSync(".env.local", "utf8");
  for (const line of txt.split(/\r?\n/)) {
    const m = line.match(/^\s*GEMINI_API_KEY\s*=\s*(.+?)\s*$/);
    if (m) return m[1].replace(/^["']|["']$/g, "");
  }
  return "";
}

const KEY = readEnvKey();
if (!KEY) {
  console.error("ERROR: GEMINI_API_KEY is empty in .env.local");
  process.exit(1);
}
console.log("API key loaded:", KEY.length, "chars");

// --- New background color, pulled from the site theme ---
// Soft warm buttercream / light amber, derived from --color-sun (#ffb43d).
// Distinct enough from the page background (--color-ink #fbf7f0) so the
// portrait reads as its own warm card, and it echoes the sun-coloured
// frame sitting directly behind the portrait in About.tsx.
const NEW_BG = "#FBEBCB";

// --- Source: the already-approved warm portrait (cream background) ---
const pngBuf = await sharp(readFileSync("scripts/portrait-warm-source.png"))
  .png()
  .toBuffer();
const b64 = pngBuf.toString("base64");

const prompt = `You are making a precise, minimal edit to this hand-drawn cartoon portrait.
Change ONLY the background colour. Do not redraw or alter the figure in any way.
- Replace the flat cream/ivory background with a soft, flat warm buttercream / light amber colour (hex ${NEW_BG}). Keep it clean with only a very subtle paper texture.
- Keep the EXACT same character and likeness: identical face, eyes, expression, beard, hair, neck, shoulders, shirt and pose. Do not change his identity, proportions or any details.
- Keep the loose hand-drawn ink line-art style and the existing warm soft-charcoal line work and shading exactly as they are.
- Keep the figure's colours unchanged: natural, muted, warm beige/grey skin, beard and shirt. AVOID red, pink and coral tones. Do NOT add rosy or pink cheeks.
- The ONLY difference from the input should be the background colour. Output a single square image with the same composition and framing.`;

const models = [
  "gemini-3-pro-image",
  "gemini-2.5-flash-image",
  "gemini-3.1-flash-image",
];

async function tryModel(model) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${KEY}`;
  const body = {
    contents: [
      {
        role: "user",
        parts: [
          { text: prompt },
          { inlineData: { mimeType: "image/png", data: b64 } },
        ],
      },
    ],
    generationConfig: { responseModalities: ["IMAGE", "TEXT"] },
  };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = json?.error?.message || JSON.stringify(json).slice(0, 300);
    console.error(`[${model}] HTTP ${res.status}: ${msg}`);
    return null;
  }
  const parts = json?.candidates?.[0]?.content?.parts || [];
  const textPart = parts.find((p) => p.text);
  if (textPart)
    console.log(`[${model}] model note: ${textPart.text.slice(0, 160)}`);
  const imgPart = parts.find((p) => p.inlineData?.data);
  if (!imgPart) {
    console.error(`[${model}] no image returned.`);
    return null;
  }
  return Buffer.from(imgPart.inlineData.data, "base64");
}

let out = null;
for (const m of models) {
  console.log("Trying model:", m);
  out = await tryModel(m);
  if (out) {
    console.log("SUCCESS with", m);
    break;
  }
}
if (!out) {
  console.error("All models failed.");
  process.exit(2);
}

writeFileSync("public/portrait-warm.png", out);
await sharp(out)
  .resize(640, 640, { fit: "cover" })
  .webp({ quality: 90 })
  .toFile("public/portrait-warm.webp");

const meta = await sharp(out).metadata();
console.log(
  `Saved public/portrait-warm.png (${meta.width}x${meta.height}) and public/portrait-warm.webp with background ${NEW_BG}`,
);
