import type { MockSlot, Scale, Task } from '../content/schema';
import type { Mode } from '../store/progress';
import type { Catalog, Facet } from './catalog';

export type Section = 'Определения' | 'Формулировки' | 'Доказательства' | 'Задачи';

export interface Part {
  label: string;
  max: number;
}

export interface TicketQuestion {
  n: number;
  section: Section;
  /** название позиции пробной контрольной */
  label?: string;
  scales: Scale[];
  parts: Part[];
  facet?: Facet;
  task?: Task;
}

export function shuffle<T>(xs: T[]): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function take<T>(pool: T[], n: number, used: Set<string>, id: (x: T) => string): T[] {
  const out: T[] = [];
  for (const x of shuffle(pool)) {
    if (out.length >= n) break;
    if (used.has(id(x))) continue;
    used.add(id(x));
    out.push(x);
  }
  return out;
}

/** Пробник экзамена: билет коллоквиума или контрольная — по конфигу экзамена. */
export function generateMock(cat: Catalog, mode: Mode): TicketQuestion[] {
  const spec = cat.exam.mock;
  return spec.kind === 'ticket' ? generateTicket(cat, mode) : generateTest(cat, mode, spec.slots);
}

/**
 * Билет по структуре демо-версии коллоквиума:
 * 3 определения, 3(+1⚫) формулировки, 2(+1⚫) доказательства, 3(+1⚫) задачи.
 */
export function generateTicket(cat: Catalog, mode: Mode): TicketQuestion[] {
  const usedUnits = new Set<string>();
  const byUnit = (f: Facet) => f.unit.id;
  const pick = (kind: Facet['kind'], level: Facet['level'], n: number) =>
    take(
      cat.facets.filter((f) => f.kind === kind && f.level === level && !f.unit.aux),
      n,
      usedUnits,
      byUnit,
    );

  // Доказательства выбираем первыми, чтобы та же теорема не попала в формулировки.
  const proofsBasic = pick('proof', 'basic', 2);
  const proofsAdv = mode === 'all' ? pick('proof', 'advanced', 1) : [];
  const defs = pick('definition', 'basic', 3);
  const stmts = pick('statement', 'basic', 3);
  const stmtsAdv = mode === 'all' ? pick('statement', 'advanced', 1) : [];

  const all = cat.visibleTasks(mode);
  const usedTasks = new Set<string>();
  const tid = (t: Task) => t.id;
  const redOnly = all.filter((t) => t.scales.length === 1 && t.scales[0] === 'red');
  const both = all.filter((t) => t.scales.includes('red') && t.scales.includes('black'));
  const blackOnly = all.filter((t) => !t.scales.includes('red'));
  const tasksPicked = [
    ...take(redOnly, 2, usedTasks, tid),
    ...take(both.length ? both : redOnly, 1, usedTasks, tid),
    ...(mode === 'all' ? take(blackOnly, 1, usedTasks, tid) : []),
  ];

  const qs: Omit<TicketQuestion, 'n'>[] = [
    ...defs.map((f) => ({ section: 'Определения' as const, scales: ['red'] as Scale[], parts: [{ label: 'Определение', max: 0.5 }], facet: f })),
    ...stmts.map((f) => ({ section: 'Формулировки' as const, scales: ['red'] as Scale[], parts: [{ label: 'Формулировка', max: 0.5 }], facet: f })),
    ...stmtsAdv.map((f) => ({ section: 'Формулировки' as const, scales: ['black'] as Scale[], parts: [{ label: 'Формулировка', max: 0.5 }], facet: f })),
    ...proofsBasic.map((f) => ({
      section: 'Доказательства' as const,
      scales: ['red', 'black'] as Scale[],
      parts: [
        { label: 'Формулировка', max: 0.5 },
        { label: 'Доказательство', max: 2 },
      ],
      facet: f,
    })),
    ...proofsAdv.map((f) => ({
      section: 'Доказательства' as const,
      scales: ['black'] as Scale[],
      parts: [
        { label: 'Формулировка', max: 0.5 },
        { label: 'Доказательство', max: 3 },
      ],
      facet: f,
    })),
    ...tasksPicked.map((t) => ({ section: 'Задачи' as const, scales: t.scales, parts: [{ label: 'Решение', max: t.points }], task: t })),
  ];
  return qs.map((q, i) => ({ ...q, n: i + 1 }));
}

/** Контрольная: по одной задаче на каждую позицию, без повторов. */
export function generateTest(cat: Catalog, mode: Mode, slots: MockSlot[]): TicketQuestion[] {
  const used = new Set<string>();
  const pool = cat.visibleTasks(mode);
  const qs: TicketQuestion[] = [];
  for (const slot of slots) {
    const fits = pool.filter((t) => (!slot.topics || slot.topics.includes(t.topic)) && (!slot.types || slot.types.includes(t.type)));
    const [t] = take(fits, 1, used, (x) => x.id);
    if (!t) continue;
    qs.push({ n: qs.length + 1, section: 'Задачи', label: slot.label, scales: t.scales, parts: [{ label: 'Решение', max: t.points }], task: t });
  }
  return qs;
}

export interface Totals {
  red: number;
  redMax: number;
  black: number;
  blackMax: number;
}

export function totals(qs: TicketQuestion[], scores: Record<string, number>): Totals {
  const t: Totals = { red: 0, redMax: 0, black: 0, blackMax: 0 };
  for (const q of qs) {
    q.parts.forEach((p, i) => {
      const got = scores[`${q.n}:${i}`] ?? 0;
      if (q.scales.includes('red')) {
        t.red += got;
        t.redMax += p.max;
      }
      if (q.scales.includes('black')) {
        t.black += got;
        t.blackMax += p.max;
      }
    });
  }
  return t;
}
