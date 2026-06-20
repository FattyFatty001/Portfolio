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

// --- Input portrait -> PNG base64 ---
const pngBuf = await sharp(readFileSync("public/portrait.webp"))
  .png()
  .toBuffer();
const b64 = pngBuf.toString("base64");

const prompt = `Recolor and restyle this hand-drawn cartoon portrait to match a warm, light, friendly brand palette.
- Replace the teal/green background with a soft, flat warm cream/ivory color (hex #FBF7F0), keeping a subtle paper texture and a clean look.
- Keep the EXACT same character and likeness: same face, expression, beard, hair and pose. Do not change his identity.
- Keep the loose hand-drawn ink line-art illustration style.
- Shift the line work and shading from cool gray to a warm soft charcoal (around hex #241F1A) with gentle warm mid-tones.
- Keep the colouring calm and mostly neutral. AVOID red, pink and coral tones. Do NOT give him rosy, red or pink cheeks; keep the skin, beard and shirt a natural, muted, warm beige/grey. At most the faintest hint of warmth.
- The overall result should be a warm, near-monochrome cream-and-charcoal look. Output a single square image with the same composition.`;

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
  `Saved public/portrait-warm.png (${meta.width}x${meta.height}) and public/portrait-warm.webp`,
);
