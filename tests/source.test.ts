import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

function files(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? files(path.join(dir, e.name)) : /\.tsx?$/.test(e.name) ? [path.join(dir, e.name)] : [],
  );
}

describe('src', () => {
  // Эффект без фигурных скобок возвращает значение выражения; если это не функция
  // (например, Promise из window.scrollTo в новых Chrome), React падает при размонтировании.
  it('useEffect callbacks always have a block body', () => {
    for (const f of files(path.resolve(__dirname, '../src'))) {
      const bad = fs.readFileSync(f, 'utf8').split('\n').filter((l) => /useEffect\(\(\)\s*=>\s*[^{\s]/.test(l));
      expect(bad, f).toEqual([]);
    }
  });
});
