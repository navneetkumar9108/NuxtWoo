import { productsV4 } from "./server/data/data2.js";
import fs from "fs";

function colorCode(color) {
  const base = color.slug || color.name || "CLR";
  return base
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .slice(0, 3);
}

function sizeCode(size) {
  return (size.slug || size.name || "SZ").toUpperCase();
}

const updated = productsV4.map((product) => {
  const colors = (product.colors || []).map((color) => {
    const cSku = color.sku || `${product.sku}-${colorCode(color)}`;
    const sizes = (color.sizes || []).map((size) => ({
      ...size,
      sku: size.sku || `${cSku}-${sizeCode(size)}`,
    }));
    return { ...color, sku: cSku, sizes };
  });
  return { ...product, colors };
});

const output = `export const productsV4 = ${JSON.stringify(updated, null, 2)};\n`;
fs.writeFileSync("./server/data/data2.updated.js", output);
console.log(`✔ Done. ${updated.length} products processed.`);
console.log("Check server/data/data2.updated.js");
