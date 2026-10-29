import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { exams } from './content';

// Сайт живёт на GitHub Pages по адресу chsa13.github.io/exams/.
const BASE = '/exams/';

/** Все адреса сайта (без BASE): '', 'linal-kr2', 'linal-kr2/cards', 'linal-kr2/topic/maps', ... */
function siteRoutes(): string[] {
  const routes = [''];
  for (const e of exams) {
    routes.push(e.id, `${e.id}/how`, `${e.id}/settings`);
    for (const f of e.features) routes.push(`${e.id}/${f}`);
    if (e.features.includes('topics')) for (const t of e.topics) routes.push(`${e.id}/topic/${t.id}`);
    if (e.features.includes('proofs'))
      for (const t of e.topics) for (const u of t.units) if (u.proof) routes.push(`${e.id}/proofs/${u.id}`);
  }
  return routes;
}

// GitHub Pages отдаёт только существующие файлы, а сайт одностраничный. Поэтому кладём копию
// index.html на каждый адрес (<путь>.html — Pages отдаёт его по адресу без .html), а 404.html —
// на всё остальное: так прямые ссылки и обновление страницы работают на любом адресе.
function pagesRoutes(): Plugin {
  let outDir = 'dist';
  return {
    name: 'pages-routes',
    apply: 'build',
    configResolved(c) {
      outDir = resolve(c.root, c.build.outDir);
    },
    closeBundle() {
      const index = resolve(outDir, 'index.html');
      copyFileSync(index, resolve(outDir, '404.html'));
      for (const r of siteRoutes()) {
        if (!r) continue;
        const file = resolve(outDir, `${r}.html`);
        mkdirSync(dirname(file), { recursive: true });
        copyFileSync(index, file);
      }
    },
  };
}

export default defineConfig({
  base: BASE,
  plugins: [react(), pagesRoutes()],
  build: { chunkSizeWarningLimit: 1000 },
});
