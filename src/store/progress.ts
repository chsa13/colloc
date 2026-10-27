import { useSyncExternalStore } from 'react';

// Прогресс хранится в браузере (localStorage). Сервер не нужен.

export type Status = 'new' | 'weak' | 'shaky' | 'known';
export type Mode = 'basic' | 'all';

export interface ItemProgress {
  status: Status;
  seen: number;
  last: number;
}

export interface MockResult {
  date: number;
  mode: Mode;
  red: number;
  redMax: number;
  black: number;
  blackMax: number;
}

export interface State {
  version: 1;
  mode: Mode;
  /** ключ — `${unitId}:${kind}` для граней и `task:${id}` для задач */
  items: Record<string, ItemProgress>;
  mocks: MockResult[];
}

const KEY = 'colloc-matan-v1';

const empty = (): State => ({ version: 1, mode: 'basic', items: {}, mocks: [] });

function load(): State {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as State;
    if (parsed.version !== 1) return empty();
    return { ...empty(), ...parsed };
  } catch {
    return empty();
  }
}

let state: State = load();
const listeners = new Set<() => void>();

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // приватный режим / нет места — прогресс просто не сохранится
  }
}

function set(next: State) {
  state = next;
  save();
  listeners.forEach((l) => l());
}

export function getState(): State {
  return state;
}

export function useProgress(): State {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => state,
  );
}

export function setMode(mode: Mode) {
  set({ ...state, mode });
}

export function mark(key: string, status: Exclude<Status, 'new'>) {
  const prev = state.items[key];
  set({
    ...state,
    items: { ...state.items, [key]: { status, seen: (prev?.seen ?? 0) + 1, last: Date.now() } },
  });
}

export function statusOf(key: string): Status {
  return state.items[key]?.status ?? 'new';
}

export function addMock(r: MockResult) {
  set({ ...state, mocks: [...state.mocks, r] });
}

export function exportJson(): string {
  return JSON.stringify(state, null, 2);
}

export function importJson(json: string) {
  const parsed = JSON.parse(json) as State;
  if (parsed.version !== 1 || typeof parsed.items !== 'object') throw new Error('Неверный файл прогресса');
  set({ ...empty(), ...parsed });
}

export function resetProgress() {
  set({ ...empty(), mode: state.mode });
}

// Обновление между вкладками
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === KEY) {
      state = load();
      listeners.forEach((l) => l());
    }
  });
}
