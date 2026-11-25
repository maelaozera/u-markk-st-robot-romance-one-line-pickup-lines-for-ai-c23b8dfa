// Robot Romance: One-Line Pickup Lines for AI
// Writes a single-line pickup line aimed at an AI to /output/entry.txt.
// Node 22 TypeScript, no dependencies.
//
// Structure: the entry text lives in a single constant; a small pipeline
// of helpers validates it, formats it, and writes it out. Each helper
// owns one rule so a bad entry fails with a precise message instead of a
// generic one.

import { mkdirSync, writeFileSync } from "node:fs";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

// The entry itself. The joke: the AI asked for the perfect pickup line
// gets handed back its own name as the answer.
const ENTRY_TEXT =
  "I asked you for the perfect pickup line, and you just printed your own name.";

// Where the finished entry goes, and how long a one-liner may be.
const OUTPUT_PATH = "/output/entry.txt";
const OUTPUT_DIR = "/output";
const MIN_CHARS = 1;
const MAX_CHARS = 200;

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

// Count characters as the reader sees them (code points, not UTF-16 units),
// so an emoji or accented letter counts as one character.
function charCount(line: string): number {
  return [...line].length;
}

// A one-liner must be non-empty and fit the length budget.
function validateLength(line: string): void {
  const chars = charCount(line);
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(
      `Entry must be ${MIN_CHARS} to ${MAX_CHARS} characters, got ${chars}.`,
    );
  }
}

// Whitespace alone is not a pickup line.
function validateNotBlank(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("Entry must not be only whitespace.");
  }
}

// The whole point is one line: no embedded line breaks of either kind.
function validateSingleLine(line: string): void {
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Entry must be a single line.");
  }
}

// Run every rule, in order, so the first failure names the real problem.
function validateLine(line: string): void {
  validateLength(line);
  validateNotBlank(line);
  validateSingleLine(line);
}

// ---------------------------------------------------------------------------
// Output helpers
// ---------------------------------------------------------------------------

// The file content is the line exactly as written; no trailing newline,
// no extra formatting, so the byte count matches the character count.
function formatEntry(line: string): string {
  return line;
}

// Create the output directory if it does not exist yet.
function ensureOutputDir(): void {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Write the entry to disk, creating the directory first.
function writeEntry(path: string, content: string): void {
  ensureOutputDir();
  writeFileSync(path, content, "utf8");
}

// Report what was written, using the same character count as validation
// so the log and the checks can never disagree.
function reportSuccess(path: string, content: string): void {
  console.log(`Wrote ${charCount(content)} characters to ${path}`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  validateLine(ENTRY_TEXT);
  const content = formatEntry(ENTRY_TEXT);
  writeEntry(OUTPUT_PATH, content);
  reportSuccess(OUTPUT_PATH, content);
}

main();
