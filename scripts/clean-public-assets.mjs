import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourceDirs = ["app", "components"];
const sourceFiles = [];

async function walk(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (/\.(css|js|jsx|ts|tsx)$/.test(entry.name)) sourceFiles.push(full);
  }
}

for (const directory of sourceDirs) await walk(path.join(root, directory));
const source = (await Promise.all(sourceFiles.map((file) => fs.readFile(file, "utf8")))).join("\n");
const used = new Set();

for (const match of source.matchAll(/\/(?:images|optimized)\/([^"')]+?)(?:\.mobile)?\.(?:png|jpe?g|webp|avif)/gi)) {
  used.add(path.parse(match[1]).name);
}

const optimizedDir = path.join(root, "public/optimized");
for (const file of await fs.readdir(optimizedDir)) {
  const base = file.replace(/\.mobile\.avif$/, "").replace(/\.avif$/, "");
  if (!used.has(base)) await fs.unlink(path.join(optimizedDir, file));
}

await fs.rm(path.join(root, "public/images"), { recursive: true, force: true });
console.log(`Kept ${used.size} optimized image families and removed source images.`);
