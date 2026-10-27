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

describe('lemmas', () => {
  const byId = new Map(units.map((u) => [u.id, u]));

  it('every lemma exists and has a proof; no cycles', () => {
    const visiting = new Set<string>();
    const done = new Set<string>();
    const dfs = (id: string, path: string[]) => {
      if (done.has(id)) return;
      expect(visiting.has(id), `цикл лемм: ${[...path, id].join(' -> ')}`).toBe(false);
      visiting.add(id);
      for (const l of byId.get(id)?.lemmas ?? []) {
        const lu = byId.get(l);
        expect(lu, `${id}: нет леммы ${l}`).toBeTruthy();
        expect(lu!.proof, `${l}: у леммы нет доказательства`).toBeTruthy();
        dfs(l, [...path, id]);
      }
      visiting.delete(id);
      done.add(id);
    };
    for (const u of units) dfs(u.id, []);
  });

  it('auxiliary lemmas are used somewhere', () => {
    const used = new Set(units.flatMap((u) => u.lemmas ?? []));
    for (const u of units.filter((x) => x.aux)) expect(used.has(u.id), `${u.id} никем не используется`).toBe(true);
  });

  // Если доказательство ссылается на вспомогательный факт, его доказательство должно быть подключено.
  const RULES: [RegExp, string][] = [
    [/Бернулли/i, 'bernoulli'],
    [/непересекающ/i, 'lemma-disjoint-nbhd'],
    [/C_n\^2|бином/i, 'binomial-bound'],
    [/подпоследовательност[ьи] сходящ|сдвиг/i, 'subseq-limit'],
    [/лемм[аеуы] 14\.1|последовательностей Гейне все/i, 'heine-lemma'],
    [/образ[ае]? промежутка/i, 'interval-image'],
  ];
  const chain = (u: (typeof units)[number]): Set<string> => {
    const out = new Set<string>();
    const go = (x: (typeof units)[number]) => {
      for (const id of x.lemmas ?? []) if (!out.has(id)) { out.add(id); go(byId.get(id)!); }
    };
    go(u);
    return out;
  };

  it('proofs that mention a lemma include its proof', () => {
    for (const u of units) {
      if (!u.proof) continue;
      const text = [u.proof.idea, ...u.proof.steps.flatMap((s) => [s.title, s.body])].join(' ');
      const have = chain(u);
      for (const [re, id] of RULES) {
        if (id === u.id || !re.test(text)) continue;
        // лемма, которая сама по себе и есть этот факт (например, оценка через бином), не обязана ссылаться на себя
        expect(have.has(id), `${u.id} упоминает «${re.source}», но не подключает лемму ${id}`).toBe(true);
      }
    }
  });

  it('no proof cites a lemma by name without proving it', () => {
    for (const u of units) {
      if (!u.proof) continue;
      for (const s of u.proof.steps) {
        expect(/лемм[аеуы] об отделимости/i.test(s.body), `${u.id}: ссылка на лемму об отделимости`).toBe(false);
      }
    }
  });
});
