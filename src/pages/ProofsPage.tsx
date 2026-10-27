import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { lemmaChain, orderByPriority, proofPlan, unitById, visibleFacets, visibleTopics } from '../engine/catalog';
import { shuffle } from '../engine/ticket';
import { getState, useProgress } from '../store/progress';
import { FacetBody, UsesLinks } from '../ui/FacetView';
import { Grade } from '../ui/Grade';
import { LevelBadge, StatusDot } from '../ui/LevelSwitch';
import { Md } from '../ui/Md';

export function ProofsPage() {
  const st = useProgress();
  const proofs = visibleFacets(st.mode).filter((f) => f.kind === 'proof');
  const nextUp = orderByPriority(proofs, (f) => f.key, getState())[0];
  return (
    <div className="page">
      <h1>Доказательства</h1>
      <p className="muted">
        В билете за доказательство дают 0,5 за формулировку + 2 балла (⚫: + 3). Тренируй по шагам: вспомни шаг → открой → сравни.
      </p>
      {nextUp && (
        <p>
          <Link className="btn primary" to={`/proofs/${nextUp.unit.id}`}>
            Следующее по приоритету: {nextUp.unit.title}
          </Link>
        </p>
      )}
      {visibleTopics(st.mode).map((t) => {
        const ps = proofs.filter((p) => p.topic.id === t.id);
        if (!ps.length) return null;
        return (
          <section key={t.id}>
            <h3>{t.title}</h3>
            <ul className="plist">
              {ps.map((p) => (
                <li key={p.key}>
                  <StatusDot status={st.items[p.key]?.status ?? 'new'} /> <LevelBadge level={p.level} />{' '}
                  <Link to={`/proofs/${p.unit.id}`}>{p.unit.title}</Link>{' '}
                  <span className="muted small">
                    · {p.unit.proof!.steps.length} шагов
                    {lemmaChain(p.unit).length > 0 && ` + ${lemmaChain(p.unit).length} лемм.`}
                  </span>
                  {p.unit.aux && <span className="tag">лемма</span>}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

type TrainMode = 'steps' | 'order' | 'full';

export function ProofPage() {
  const { id } = useParams();
  const st = useProgress();
  const found = unitById.get(id ?? '');
  const [mode, setMode] = useState<TrainMode>('steps');
  if (!found || !found.unit.proof) return <div className="page">Доказательство не найдено. <Link to="/proofs">К списку</Link></div>;
  const { unit, topic } = found;
  const key = `${unit.id}:proof`;

  const all = visibleFacets(st.mode).filter((f) => f.kind === 'proof');
  const i = all.findIndex((f) => f.unit.id === unit.id);
  const nextProof = all[(i + 1) % all.length];

  return (
    <div className="page">
      <div className="crumbs">
        <Link to="/proofs">Доказательства</Link> / {topic.title}
      </div>
      <h1>
        <LevelBadge level={unit.proof!.level} /> {unit.title}
      </h1>
      <div className="tabs">
        <button className={mode === 'steps' ? 'on' : ''} onClick={() => setMode('steps')}>
          По шагам
        </button>
        <button className={mode === 'order' ? 'on' : ''} onClick={() => setMode('order')}>
          Расставь шаги
        </button>
        <button className={mode === 'full' ? 'on' : ''} onClick={() => setMode('full')}>
          Целиком
        </button>
      </div>

      {mode === 'steps' && <StepsMode key={unit.id} unitId={unit.id} />}
      {mode === 'order' && <OrderMode key={unit.id} unitId={unit.id} />}
      {mode === 'full' && <FacetBody unit={unit} kind="proof" />}

      <UsesLinks unit={unit} />
      <div className="panel">
        <div className="small muted">
          Как ты знаешь это доказательство? Сейчас: <StatusDot status={st.items[key]?.status ?? 'new'} />
        </div>
        <Grade itemKey={key} current={st.items[key]?.status} alsoKeys={unit.statement ? [`${unit.id}:statement`] : []} />
      </div>
      {nextProof && nextProof.unit.id !== unit.id && (
        <p>
          <Link to={`/proofs/${nextProof.unit.id}`}>Следующее: {nextProof.unit.title} →</Link>
        </p>
      )}
    </div>
  );
}

function StepsMode({ unitId }: { unitId: string }) {
  const { unit } = unitById.get(unitId)!;
  const p = unit.proof!;
  const plan = proofPlan(unit);
  const lemmas = lemmaChain(unit);
  const [stmtOpen, setStmtOpen] = useState(false);
  const [ideaOpen, setIdeaOpen] = useState(false);
  const [shown, setShown] = useState(0);
  const [titlesOnly, setTitlesOnly] = useState(false);

  return (
    <div className="trainer">
      {unit.statement && (
        <div className="block">
          <div className="label">1. Сформулируй теорему (0,5 балла)</div>
          {stmtOpen ? <Md text={unit.statement.text} /> : <button onClick={() => setStmtOpen(true)}>Показать формулировку</button>}
        </div>
      )}
      <div className="block">
        <div className="label">2. Идея одной фразой</div>
        {ideaOpen ? <Md text={p.idea} /> : <button onClick={() => setIdeaOpen(true)}>Показать идею</button>}
      </div>
      <div className="block">
        {lemmas.length > 0 && (
          <p className="small">
            Сначала шаги {lemmas.length === 1 ? 'леммы' : 'лемм'}: {lemmas.map((l) => `«${l.title}»`).join(', ')} — их тоже надо доказать в ответе.
          </p>
        )}
        <div className="label">
          3. Шаги ({shown}/{plan.length}){' '}
          <label className="chk small">
            <input type="checkbox" checked={titlesOnly} onChange={(e) => setTitlesOnly(e.target.checked)} /> только названия
          </label>
        </div>
        <ol className="steps">
          {plan.slice(0, shown).map((s, i) => (
            <li key={i}>
              {s.lemma && <span className="step-lemma">{lemmaLabel(s.lemma)}</span>}
              <div className="step-title">
                <Md text={s.title} inline />
              </div>
              {!titlesOnly && <Md text={s.body} />}
            </li>
          ))}
          {shown < plan.length && <li className="step-hidden">Вспомни, что дальше…</li>}
        </ol>
        {shown < plan.length ? (
          <div className="row">
            <button className="primary" onClick={() => setShown(shown + 1)}>
              Открыть шаг {shown + 1}
            </button>
            <button onClick={() => setShown(plan.length)}>Открыть все</button>
          </div>
        ) : (
          <button onClick={() => setShown(0)}>Скрыть шаги и начать заново</button>
        )}
      </div>
    </div>
  );
}

function OrderMode({ unitId }: { unitId: string }) {
  const { unit } = unitById.get(unitId)!;
  const steps = useMemo(() => proofPlan(unit), [unit]);
  const order = useMemo(() => shuffle(steps.map((_, i) => i)), [steps]);
  const [placed, setPlaced] = useState<number[]>([]);
  const [wrong, setWrong] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState(0);

  const click = (i: number) => {
    if (i === placed.length) {
      setPlaced([...placed, i]);
      setWrong(null);
    } else {
      setWrong(i);
      setMistakes(mistakes + 1);
    }
  };
  const done = placed.length === steps.length;

  return (
    <div className="trainer">
      <p className="muted small">Нажимай названия шагов в правильном порядке.</p>
      <ol className="steps">
        {placed.map((i) => (
          <li key={i}>
            {steps[i].lemma && <span className="step-lemma">{lemmaLabel(steps[i].lemma!)}</span>}
            <div className="step-title">
              <Md text={steps[i].title} inline />
            </div>
          </li>
        ))}
      </ol>
      {!done ? (
        <div className="chips">
          {order
            .filter((i) => !placed.includes(i))
            .map((i) => (
              <button key={i} className={`chip ${wrong === i ? 'chip-wrong' : ''}`} onClick={() => click(i)}>
                {steps[i].lemma && <span className="step-lemma">лемма</span>}
                <Md text={steps[i].title} inline />
              </button>
            ))}
        </div>
      ) : (
        <div className="ok">
          Готово! Ошибок: {mistakes}.{' '}
          <button
            onClick={() => {
              setPlaced([]);
              setMistakes(0);
            }}
          >
            Ещё раз
          </button>
        </div>
      )}
    </div>
  );
}

function lemmaLabel(title: string) {
  return /^лемма/i.test(title) ? title : `Лемма: ${title}`;
}
