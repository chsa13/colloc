// Сессия карточек: порядок карточек, текущая позиция и что уже открыто.
// Хранится в браузере отдельно для каждого набора фильтров, переживает перезагрузку.

export interface CardSession {
  /** набор фильтров, для которого построена очередь */
  fk: string;
  /** ключи граней в порядке показа */
  keys: string[];
  pos: number;
  /** 0 — ответ скрыт; 1 — открыт первый блок; 2 — первый оценён; 3 — открыто доказательство */
  step: number;
  updated: number;
}

const KEY = 'colloc-cards-sessions-v1';
const MAX_SESSIONS = 20;

function loadAll(): Record<string, CardSession> {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Record<string, CardSession>) : {};
  } catch {
    return {};
  }
}

export function loadSession(fk: string): CardSession | null {
  const s = loadAll()[fk];
  if (!s || !Array.isArray(s.keys) || typeof s.pos !== 'number') return null;
  return s;
}

export function saveSession(s: CardSession) {
  try {
    const all = loadAll();
    all[s.fk] = { ...s, updated: Date.now() };
    // храним только последние сессии
    const keep = Object.values(all)
      .sort((a, b) => b.updated - a.updated)
      .slice(0, MAX_SESSIONS);
    localStorage.setItem(KEY, JSON.stringify(Object.fromEntries(keep.map((x) => [x.fk, x]))));
  } catch {
    // нет доступа к хранилищу — сессия просто не сохранится
  }
}
