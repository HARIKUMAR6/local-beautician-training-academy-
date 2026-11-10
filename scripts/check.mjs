// Project lint (zero dependencies): enforces the Phase 1 RTL rule "logical properties only".
// A line may opt out with the marker `physical-ok` (comment) where a physical value is deliberate.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SCAN = ['src', 'public/assets/js'];
const EXT = /\.(html|css|js|mjs)$/;

const rules = [
  [/\b(?:ml|mr|pl|pr|left|right)-(?:\d|\[|px|auto|full)/, 'Tailwind physical utility (use ms/me/ps/pe/start/end)'],
  [/\b(?:text-left|text-right|float-left|float-right|border-[lr]\b|border-[lr]-|rounded-[lr]\b|rounded-[lr]-)/, 'Tailwind physical utility (use logical equivalent)'],
  [/\b(?:margin|padding)-(?:left|right)\s*:/, 'CSS physical margin/padding (use *-inline-*)'],
  [/(?:^|[\s;{])(?:left|right)\s*:\s*[^;]*;/, 'CSS left/right offset (use inset-inline-*)'],
  [/text-align\s*:\s*(?:left|right)/, 'text-align left/right (use start/end; headings: left/center only)'],
  [/border-(?:left|right)(?:-\w+)?\s*:/, 'CSS physical border (use border-inline-*)'],
];

const walk = (d) => readdirSync(d).flatMap((f) => {
  const p = join(d, f);
  return statSync(p).isDirectory() ? walk(p) : EXT.test(p) ? [p] : [];
});

let problems = 0;
for (const dir of SCAN) {
  for (const file of walk(join(ROOT, dir))) {
    readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
      if (line.includes('physical-ok')) return;
      for (const [re, msg] of rules) {
        if (re.test(line)) {
          problems++;
          console.log(`${relative(ROOT, file)}:${i + 1}  ${msg}\n    ${line.trim()}`);
        }
      }
    });
  }
}
console.log(problems ? `\n${problems} problem(s)` : 'check: OK (no physical-direction properties found)');
process.exit(problems ? 1 : 0);
