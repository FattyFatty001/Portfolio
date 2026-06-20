import { readFileSync } from "node:fs";

function readEnvKey() {
  const txt = readFileSync(".env.local", "utf8");
  for (const line of txt.split(/\r?\n/)) {
    const m = line.match(/^\s*GEMINI_API_KEY\s*=\s*(.+?)\s*$/);
    if (m) return m[1].replace(/^["']|["']$/g, "");
  }
  return "";
}

const KEY = readEnvKey();
const res = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models?key=${KEY}&pageSize=200`,
);
const json = await res.json();
if (!res.ok) {
  console.error("HTTP", res.status, JSON.stringify(json).slice(0, 300));
  process.exit(1);
}
const models = json.models || [];
console.log("Total models:", models.length);
console.log("\n=== Image-capable / interesting models ===");
for (const m of models) {
  const name = m.name.replace("models/", "");
  const methods = (m.supportedGenerationMethods || []).join(",");
  if (/image|imagen|nano/i.test(name) || /image/i.test(methods)) {
    console.log(`${name}  ->  [${methods}]`);
  }
}
console.log("\n=== All model names ===");
console.log(models.map((m) => m.name.replace("models/", "")).join("\n"));
