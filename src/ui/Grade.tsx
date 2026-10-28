import { useEffect } from 'react';
import { useStore, type Status } from '../store/progress';

/** Три кнопки самооценки; клавиши 1/2/3. */
export function Grade({
  itemKey,
  onDone,
  current,
  hotkeys = true,
  alsoKeys = [],
}: {
  itemKey: string;
  /** Дополнительные ключи, которым ставится та же оценка (формулировка вместе с доказательством). */
  alsoKeys?: string[];
  onDone?: () => void;
  current?: Status;
  hotkeys?: boolean;
}) {
  const store = useStore();
  const go = (s: Exclude<Status, 'new'>) => {
    store.mark(itemKey, s);
    for (const k of alsoKeys) store.mark(k, s);
    onDone?.();
  };
  useEffect(() => {
    if (!hotkeys) return;
    const h = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === '1') go('weak');
      if (e.key === '2') go('shaky');
      if (e.key === '3') go('known');
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  });
  return (
    <div className="grade">
      <button className={`g g-weak ${current === 'weak' ? 'cur' : ''}`} onClick={() => go('weak')}>
        Не знаю {hotkeys && <kbd>1</kbd>}
      </button>
      <button className={`g g-shaky ${current === 'shaky' ? 'cur' : ''}`} onClick={() => go('shaky')}>
        Частично {hotkeys && <kbd>2</kbd>}
      </button>
      <button className={`g g-known ${current === 'known' ? 'cur' : ''}`} onClick={() => go('known')}>
        Знаю {hotkeys && <kbd>3</kbd>}
      </button>
    </div>
  );
}
