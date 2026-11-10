// Dev loop: Tailwind CLI in watch mode + page rebuild on src changes + static server.
import { spawn, spawnSync } from 'node:child_process';
import { watch } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { serve } from './serve.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const shell = process.platform === 'win32';

const buildPages = () => spawnSync(process.execPath, [join(ROOT, 'scripts', 'build-pages.mjs')], { stdio: 'inherit' });
buildPages();

const css = spawn('npx', ['tailwindcss', '-i', 'src/css/main.css', '-o', 'public/assets/css/styles.css', '--watch'], {
  cwd: ROOT, stdio: 'inherit', shell,
});

let timer;
for (const dir of ['pages', 'partials', 'icons', 'config']) {
  watch(join(ROOT, 'src', dir), { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(buildPages, 80);
  });
}
serve();
process.on('SIGINT', () => { css.kill(); process.exit(0); });
