// Robot Romance: One-Line Pickup Lines for AI
// Writes a single-line pickup line aimed at an AI to /output/entry.txt.
// Node 22 TypeScript, no dependencies.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "I asked you for the perfect pickup line, and you just printed your own name.";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

function selfCheck(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`Entry must be 1 to ${MAX_CHARS} characters, got ${chars}.`);
  }
  if (line.trim().length === 0) {
    throw new Error("Entry must not be only whitespace.");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Entry must be a single line.");
  }
}

selfCheck(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, "utf8");
console.log(`Wrote ${[...ENTRY].length} characters to ${OUTPUT_PATH}`);
