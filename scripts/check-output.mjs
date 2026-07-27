/**
 * Post-build content guard.
 *
 * Fails the build if the exported HTML contains text that must never reach
 * production. Run after `next build` (see package.json "build").
 *
 * Rationale for each rule is in UPDATED_MASTER_PLAN.md §2 and §4.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";

const FORBIDDEN = [
  {
    pattern: /krupanidhi/i,
    why: "Content belonging to Krupanidhi Group of Institutions — a different college (plan §4, P0-10).",
  },
  {
    pattern: /credenc/i,
    why: "A third party's commercial loan partnership, not SEA's (plan §4, P0-10).",
  },
  {
    pattern: /84,?858/,
    why: "Fabricated student count derived from garbled scraper output (plan §2, P0-1).",
  },
  {
    pattern: /we'(?:ll|ll) be in touch shortly/i,
    why: "False submission confirmation — nothing is transmitted (plan §2, P0-3).",
  },
];

function htmlFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...htmlFiles(full));
    else if (entry.endsWith(".html")) out.push(full);
  }
  return out;
}

const files = htmlFiles(OUT);
const failures = [];

for (const file of files) {
  const html = readFileSync(file, "utf8");
  // Strip tags so we test rendered copy, not attributes or script payloads.
  const text = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<[^>]+>/g, " ");
  for (const rule of FORBIDDEN) {
    if (rule.pattern.test(text)) {
      failures.push(`  ${file}\n    matched ${rule.pattern}\n    ${rule.why}`);
    }
  }
}

if (failures.length) {
  console.error(`\n✖ Forbidden content found in ${failures.length} place(s):\n`);
  console.error(failures.join("\n\n"));
  console.error("\nThese must not be published. See UPDATED_MASTER_PLAN.md.\n");
  process.exit(1);
}

console.log(`✓ content guard: ${files.length} HTML files clean`);
