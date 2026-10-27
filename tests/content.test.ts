import { describe, expect, it } from 'vitest';
import katex from 'katex';
import { topics, tasks } from '../content';

// Все формулы из текста: $$...$$ и $...$
function formulas(text: string): string[] {
  const out: string[] = [];
  const re = /\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) out.push((m[1] ?? m[2]).trim());
  return out;
}

const units = topics.flatMap((t) => t.units.map((u) => ({ ...u, topic: t.id })));
const unitIds = new Set(units.map((u) => u.id));

function texts(): { where: string; text: string }[] {
  const all: { where: string; text: string }[] = [];
  for (const u of units) {
    const add = (k: string, s?: string) => s && all.push({ where: `${u.id}.${k}`, text: s });
    add('definition', u.definition?.text);
    add('statement', u.statement?.text);
    add('notes', u.notes);
    add('proof.idea', u.proof?.idea);
    u.proof?.steps.forEach((s, i) => {
      add(`proof.step${i}.title`, s.title);
      add(`proof.step${i}.body`, s.body);
    });
  }
  for (const t of tasks) {
    all.push({ where: `${t.id}.prompt`, text: t.prompt });
    all.push({ where: `${t.id}.answer`, text: t.answer });
    t.hints.forEach((h, i) => all.push({ where: `${t.id}.hint${i}`, text: h }));
  }
  return all;
}

describe('content', () => {
  it('ids are unique', () => {
    expect(unitIds.size).toBe(units.length);
    expect(new Set(tasks.map((t) => t.id)).size).toBe(tasks.length);
  });

  it('every unit has at least one facet', () => {
    for (const u of units) expect(u.definition || u.statement || u.proof, u.id).toBeTruthy();
  });

  it('uses and task topics point to existing items', () => {
    for (const u of units) for (const id of u.uses ?? []) expect(unitIds.has(id), `${u.id} -> ${id}`).toBe(true);
    const topicIds = new Set(topics.map((t) => t.id));
    for (const t of tasks) expect(topicIds.has(t.topic), t.id).toBe(true);
  });

  it('dollar signs are balanced', () => {
    for (const { where, text } of texts()) {
      const n = (text.replace(/\$\$/g, '').match(/\$/g) ?? []).length;
      expect(n % 2, where).toBe(0);
    }
  });

  it('all formulas render with KaTeX', () => {
    for (const { where, text } of texts())
      for (const f of formulas(text)) {
        expect(() => katex.renderToString(f, { throwOnError: true }), `${where}: ${f}`).not.toThrow();
      }
  });
});

describe('content source', () => {
  it('LaTeX is only inside md`...` strings (in quotes a backslash is lost)', async () => {
    const fs = await import('node:fs');
    const path = await import('node:path');
    const dir = path.resolve(__dirname, '../content');
    for (const f of fs.readdirSync(dir).filter((x: string) => x.endsWith('.ts'))) {
      const src = fs.readFileSync(path.join(dir, f), 'utf8');
      const bad = src.split('\n').filter((l: string) => /(:\s*|\[\s*|,\s*)'[^'\n]*\\[^'\n]*'/.test(l));
      expect(bad, f).toEqual([]);
    }
  });
});

describe('task bank', () => {
  it('red-scale tasks cost 1 point (the mock ticket expects 11 red points)', () => {
    for (const t of tasks) if (t.scales.includes('red')) expect(t.points, t.id).toBe(1);
  });

  it('has 60+ tasks, about 80% count toward the red scale', () => {
    expect(tasks.length).toBeGreaterThanOrEqual(60);
    const red = tasks.filter((t) => t.scales.includes('red')).length;
    expect(red / tasks.length).toBeGreaterThanOrEqual(0.75);
  });

  it('every unit has pitfalls', () => {
    for (const u of units) expect(u.pitfalls?.length ?? 0, u.id).toBeGreaterThan(0);
  });
});
