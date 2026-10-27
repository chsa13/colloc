import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { KIND_LABEL, type Kind } from '../content/schema';
import { lemmaChain, orderByPriority, visibleFacets, visibleTopics, type Facet } from '../engine/catalog';
import { getState, useProgress } from '../store/progress';
import { FacetBody, UsesLinks } from '../ui/FacetView';
import { Md } from '../ui/Md';
import { Grade } from '../ui/Grade';
import { LevelBadge, StatusDot } from '../ui/LevelSwitch';

const ASK: Record<Kind, string> = {
  definition: 'Дай определение',
  statement: 'Сформулируй',
  proof: 'Докажи — вспомни шаги',
};

/** Что спросить по карточке: у теоремы с доказательством — формулировку и доказательство сразу. */
function askFor(f: Facet): string {
  if (f.kind !== 'proof') return ASK[f.kind];
  const lemmas = lemmaChain(f.unit).length;
  const head = f.unit.statement ? 'Сформулируй и докажи' : 'Докажи';
  return lemmas ? `${head} (вместе с ${lemmas === 1 ? 'леммой' : 'леммами'})` : head;
}

export function CardsPage() {
  const [sp, setSp] = useSearchParams();
  const st = useProgress();
  const topic = sp.get('topic') ?? '';
  const kindParam = sp.get('kind');
  const kinds: Kind[] = kindParam ? (kindParam.split(',') as Kind[]) : ['definition', 'statement', 'proof'];
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
    const visible = visibleFacets(s.mode);
    // Если доказательства в наборе, теорема спрашивается одной карточкой «сформулируй и докажи».
    const withProof = new Set(kinds.includes('proof') ? visible.filter((f) => f.kind === 'proof').map((f) => f.unit.id) : []);
    let pool = visible.filter(
      (f) => kinds.includes(f.kind) && (!topic || f.topic.id === topic) && !(f.kind === 'statement' && withProof.has(f.unit.id)),
    );
    const weak = (key: string) => ['weak', 'shaky'].includes(s.items[key]?.status ?? 'new');
    if (onlyWeak) pool = pool.filter((f) => weak(f.key) || (isCombined(f) && weak(`${f.unit.id}:statement`)));
    return orderByPriority(pool, (f) => f.key, s);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterKey]);

  const [pos, setPos] = useState(0);
  // 0 — ответ скрыт; 1 — открыт первый блок; 2 — первый оценён, доказательство скрыто; 3 — открыто доказательство
  const [step, setStep] = useState(0);
  useEffect(() => {
    setPos(0);
    setStep(0);
  }, [filterKey]);

  const card: Facet | undefined = queue[pos];
  const next = () => {
    setStep(0);
    setPos((p) => p + 1);
  };

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setStep((x) => (x === 0 || x === 2 ? x + 1 : x));
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
              <LevelBadge level={card.level} />{' '}
              {isCombined(card) ? (
                <>
                  Формулировка <StatusDot status={st.items[`${card.unit.id}:statement`]?.status ?? 'new'} /> + доказательство{' '}
                  <StatusDot status={st.items[card.key]?.status ?? 'new'} />
                </>
              ) : (
                <>
                  {KIND_LABEL[card.kind]} <StatusDot status={st.items[card.key]?.status ?? 'new'} />
                </>
              )}
            </div>
            <h2>{card.unit.title}</h2>
            <div className="muted">{askFor(card)}</div>
          </div>
          {isCombined(card) ? (
            <CombinedAnswer card={card} step={step} setStep={setStep} onDone={next} />
          ) : step === 0 ? (
            <button className="reveal" onClick={() => setStep(1)}>
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

/** Теорема, у которой спрашиваются и формулировка, и доказательство. */
function isCombined(f: Facet): boolean {
  return f.kind === 'proof' && !!f.unit.statement;
}

const STATUS_WORD: Record<string, string> = { weak: 'не знаю', shaky: 'частично', known: 'знаю' };

/** Два блока в одной карточке: формулировка и доказательство открываются и оцениваются по отдельности. */
function CombinedAnswer({
  card,
  step,
  setStep,
  onDone,
}: {
  card: Facet;
  step: number;
  setStep: (s: number) => void;
  onDone: () => void;
}) {
  const st = useProgress();
  const stmtKey = `${card.unit.id}:statement`;
  const stmtStatus = st.items[stmtKey]?.status;
  return (
    <>
      <section className="card-part">
        <div className="label">1. Формулировка</div>
        {step === 0 ? (
          <button className="reveal" onClick={() => setStep(1)}>
            Показать формулировку <kbd>пробел</kbd>
          </button>
        ) : (
          <>
            <Md text={card.unit.statement!.text} />
            {step === 1 ? (
              <>
                <p className="muted small">Как ты знаешь формулировку?</p>
                <Grade itemKey={stmtKey} onDone={() => setStep(2)} />
              </>
            ) : (
              <p className="small muted">
                Оценка: <StatusDot status={stmtStatus ?? 'new'} /> {stmtStatus ? STATUS_WORD[stmtStatus] : '—'}{' '}
                <button className="link small" onClick={() => setStep(1)}>
                  изменить
                </button>
              </p>
            )}
          </>
        )}
      </section>
      <section className="card-part">
        <div className="label">2. Доказательство</div>
        {step < 2 ? (
          <div className="muted small">Сначала оцени формулировку, потом вспомни доказательство.</div>
        ) : step === 2 ? (
          <button className="reveal" onClick={() => setStep(3)}>
            Показать доказательство <kbd>пробел</kbd>
          </button>
        ) : (
          <>
            <FacetBody unit={card.unit} kind="proof" withStatement={false} />
            <UsesLinks unit={card.unit} />
            <p className="muted small">Как ты знаешь доказательство?</p>
            <Grade itemKey={card.key} onDone={onDone} />
          </>
        )}
      </section>
    </>
  );
}
