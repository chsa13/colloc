// Анонимная статистика посещений через Umami (без cookies и личных данных).
// Скрипт подключён в index.html с data-auto-track="false": просмотры страниц
// отправляем сами при смене адреса внутри сайта (без перезагрузки страницы). На localhost скрипт не работает (data-domains).

type Payload = Record<string, unknown>;
type Umami = { track: (eventOrFn?: string | ((p: Payload) => Payload), data?: Payload) => void };

declare global {
  interface Window {
    umami?: Umami;
  }
}

// Скрипт грузится с defer и может появиться позже первого рендера — копим вызовы до его загрузки.
// Важно: у тега скрипта id НЕ «umami» — элементы с id доступны как window.<id>, и трекер решил бы,
// что window.umami уже есть, и не создал бы себя.
const queue: ((u: Umami) => void)[] = [];

const ready = (): Umami | undefined => (typeof window.umami?.track === 'function' ? window.umami : undefined);

function run(call: (u: Umami) => void) {
  if (typeof window === 'undefined') return;
  const u = ready();
  if (u) {
    try {
      call(u);
    } catch {
      // статистика не должна ломать сайт
    }
  } else queue.push(call);
}

function flush() {
  const u = ready();
  if (!u) return;
  for (const call of queue.splice(0)) {
    try {
      call(u);
    } catch {
      /* не критично */
    }
  }
}

if (typeof window !== 'undefined') {
  document.getElementById('umami-script')?.addEventListener('load', flush);
  // на случай, если скрипт загрузился раньше этого модуля
  queueMicrotask(flush);
}

export function trackPage(path: string, title: string) {
  run((u) => u.track((p) => ({ ...p, url: path, title })));
}

export function trackEvent(name: string, data?: Payload) {
  run((u) => u.track(name, data));
}

// Активность («насколько много пользуются») копим и шлём сводкой раз в несколько минут
// и при уходе со страницы, а не на каждый клик — чтобы не упереться в лимит бесплатного тарифа.

type Counter = 'theory' | 'tasks';
const counts = new Map<string, Record<Counter, number>>();
const FLUSH_MS = 5 * 60_000;

export function countActivity(examId: string, what: Counter) {
  const c = counts.get(examId) ?? { theory: 0, tasks: 0 };
  c[what]++;
  counts.set(examId, c);
}

function sendActivity() {
  for (const [exam, c] of counts) if (c.theory || c.tasks) trackEvent('activity', { exam, ...c });
  counts.clear();
}

if (typeof window !== 'undefined') {
  setInterval(sendActivity, FLUSH_MS);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') sendActivity();
  });
}
