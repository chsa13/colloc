import { topics, tasks } from '../../content';
import type { Kind, Level, Task, Topic, Unit } from '../content/schema';
import type { Mode, State, Status } from '../store/progress';

/** Грань единицы — отдельный «вопрос»: определение, формулировка или доказательство. */
export interface Facet {
  key: string;
  unit: Unit;
  topic: Topic;
  kind: Kind;
  level: Level;
}

export const unitById = new Map<string, { unit: Unit; topic: Topic }>();
export const facets: Facet[] = [];

for (const topic of topics) {
  for (const unit of topic.units) {
    unitById.set(unit.id, { unit, topic });
    for (const kind of ['definition', 'statement', 'proof'] as const) {
      const f = unit[kind];
      if (f) facets.push({ key: `${unit.id}:${kind}`, unit, topic, kind, level: f.level });
    }
  }
}

export const topicById = new Map(topics.map((t) => [t.id, t]));

export function levelVisible(level: Level, mode: Mode): boolean {
  return mode === 'all' || level === 'basic';
}

export function visibleFacets(mode: Mode): Facet[] {
  return facets.filter((f) => levelVisible(f.level, mode));
}

export function taskVisible(t: Task, mode: Mode): boolean {
  return mode === 'all' || t.scales.includes('red');
}

export function visibleTasks(mode: Mode): Task[] {
  return tasks.filter((t) => taskVisible(t, mode));
}

/** Темы, в которых при данном уровне есть хоть что-то. */
export function visibleTopics(mode: Mode): Topic[] {
  return topics.filter((t) => t.units.some((u) => unitVisible(u, mode)));
}

export function unitVisible(u: Unit, mode: Mode): boolean {
  return (['definition', 'statement', 'proof'] as const).some((k) => u[k] && levelVisible(u[k]!.level, mode));
}

export const taskKey = (t: Task) => `task:${t.id}`;

const RANK: Record<Status, number> = { weak: 0, new: 1, shaky: 2, known: 3 };

/**
 * Очередь «что учить сейчас»: сначала «не знаю», потом новое, потом «частично»,
 * потом «знаю». Внутри группы — давно не виденное раньше, с небольшим перемешиванием.
 */
export function orderByPriority<T>(items: T[], keyOf: (x: T) => string, st: State): T[] {
  const r = new Map(items.map((x) => [x, Math.random()]));
  return [...items].sort((a, b) => {
    const pa = st.items[keyOf(a)];
    const pb = st.items[keyOf(b)];
    const ra = RANK[pa?.status ?? 'new'];
    const rb = RANK[pb?.status ?? 'new'];
    if (ra !== rb) return ra - rb;
    const la = pa?.last ?? 0;
    const lb = pb?.last ?? 0;
    if (Math.abs(la - lb) > 60_000) return la - lb;
    return r.get(a)! - r.get(b)!;
  });
}

export interface Readiness {
  total: number;
  known: number;
  shaky: number;
  weak: number;
  fresh: number;
}

export function readiness(keys: string[], st: State): Readiness {
  const r: Readiness = { total: keys.length, known: 0, shaky: 0, weak: 0, fresh: 0 };
  for (const k of keys) {
    const s = st.items[k]?.status ?? 'new';
    if (s === 'known') r.known++;
    else if (s === 'shaky') r.shaky++;
    else if (s === 'weak') r.weak++;
    else r.fresh++;
  }
  return r;
}

/** Доля готовности: «знаю» = 1, «частично» = 0.5. */
export function score(r: Readiness): number {
  return r.total ? (r.known + r.shaky * 0.5) / r.total : 0;
}
