import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const imageDir = path.join(root, "public/images");
const outputDir = path.join(root, "public/optimized");

await fs.mkdir(outputDir, { recursive: true });

const files = (await fs.readdir(imageDir)).filter((file) => /\.(png|jpe?g)$/i.test(file));

for (const file of files) {
  const input = path.join(imageDir, file);
  const name = path.parse(file).name;
  const desktop = path.join(outputDir, `${name}.avif`);
  const mobile = path.join(outputDir, `${name}.mobile.avif`);

  await sharp(input, { limitInputPixels: false })
    .rotate()
    .resize({ width: 1920, withoutEnlargement: true })
    .avif({ quality: 58, effort: 5, chromaSubsampling: "4:2:0" })
    .toFile(desktop);

  await sharp(input, { limitInputPixels: false })
    .rotate()
    .resize({ width: 960, withoutEnlargement: true })
    .avif({ quality: 50, effort: 5, chromaSubsampling: "4:2:0" })
    .toFile(mobile);
}

console.log(`Optimized ${files.length} images into ${outputDir}`);
