import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { KIND_LABEL, type Kind } from '../content/schema';
import { orderByPriority, visibleFacets, visibleTopics, type Facet } from '../engine/catalog';
import { getState, useProgress } from '../store/progress';
import { FacetBody, UsesLinks } from '../ui/FacetView';
import { Grade } from '../ui/Grade';
import { LevelBadge, StatusDot } from '../ui/LevelSwitch';

const ASK: Record<Kind, string> = {
  definition: 'Дай определение',
  statement: 'Сформулируй',
  proof: 'Докажи — вспомни шаги',
};

export function CardsPage() {
  const [sp, setSp] = useSearchParams();
  const st = useProgress();
  const topic = sp.get('topic') ?? '';
  const kindParam = sp.get('kind');
  const kinds: Kind[] = kindParam ? (kindParam.split(',') as Kind[]) : ['definition', 'statement'];
  const onlyWeak = sp.get('last') === '1';

  const update = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(sp);
    for (const [k, v] of Object.entries(patch)) {
      if (v === null || v === '') next.delete(k);
      else next.set(k, v);
    }
    setSp(next, { replace: true });
  };

  // Очередь строится один раз на набор фильтров (оценки не перетасовывают её на ходу).
  const filterKey = `${st.mode}|${topic}|${kinds.join(',')}|${onlyWeak}`;
  const queue = useMemo(() => {
    const s = getState();
    let pool = visibleFacets(s.mode).filter((f) => kinds.includes(f.kind) && (!topic || f.topic.id === topic));
    if (onlyWeak) pool = pool.filter((f) => ['weak', 'shaky'].includes(s.items[f.key]?.status ?? 'new'));
    return orderByPriority(pool, (f) => f.key, s);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterKey]);

  const [pos, setPos] = useState(0);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setPos(0);
    setOpen(false);
  }, [filterKey]);

  const card: Facet | undefined = queue[pos];
  const next = () => {
    setOpen(false);
    setPos((p) => p + 1);
  };

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  const toggleKind = (k: Kind) => {
    const set = new Set(kinds);
    if (set.has(k)) set.delete(k);
    else set.add(k);
    if (set.size === 0) return;
    update({ kind: [...set].join(',') });
  };

  return (
    <div className="page">
      <h1>Карточки</h1>
      <div className="filters">
        {(['definition', 'statement', 'proof'] as Kind[]).map((k) => (
          <label key={k} className="chk">
            <input type="checkbox" checked={kinds.includes(k)} onChange={() => toggleKind(k)} /> {KIND_LABEL[k]}
          </label>
        ))}
        <select value={topic} onChange={(e) => update({ topic: e.target.value })}>
          <option value="">Все темы</option>
          {visibleTopics(st.mode).map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>
        <label className="chk">
          <input type="checkbox" checked={onlyWeak} onChange={(e) => update({ last: e.target.checked ? '1' : null })} /> Только «не знаю» и
          «частично»
        </label>
      </div>

      {queue.length === 0 ? (
        <div className="empty">
          {onlyWeak ? 'Слабых мест не осталось — отлично! Сними фильтр или пройди пробный билет.' : 'Под эти фильтры ничего не подходит.'}
        </div>
      ) : !card ? (
        <div className="empty">
          <h2>Круг пройден: {queue.length} карточек</h2>
          <p>
            <button onClick={() => setPos(0)}>Ещё раз</button> <Link to="/mock">Пробный билет →</Link>
          </p>
        </div>
      ) : (
        <div className="card">
          <div className="card-meta">
            <span>
              {pos + 1} / {queue.length}
            </span>
            <span className="muted">{card.topic.title}</span>
          </div>
          <div className="card-q">
            <div className="card-kind">
              <LevelBadge level={card.level} /> {KIND_LABEL[card.kind]} <StatusDot status={st.items[card.key]?.status ?? 'new'} />
            </div>
            <h2>{card.unit.title}</h2>
            <div className="muted">{ASK[card.kind]}</div>
          </div>
          {!open ? (
            <button className="reveal" onClick={() => setOpen(true)}>
              Показать ответ <kbd>пробел</kbd>
            </button>
          ) : (
            <>
              <FacetBody unit={card.unit} kind={card.kind} />
              <UsesLinks unit={card.unit} />
              <p className="muted small">Сравни со своим ответом и честно оцени:</p>
              <Grade itemKey={card.key} onDone={next} />
            </>
          )}
          <div className="card-foot">
            <Link className="small" to={`/topic/${card.topic.id}?u=${card.unit.id}`}>
              Открыть в справочнике
            </Link>
            <button className="link small" onClick={next}>
              Пропустить →
            </button>
          </div>
        </div>
      )}
      <p className="muted small">Порядок: сначала «не знаю», затем новые, «частично», «знаю».</p>
    </div>
  );
}
