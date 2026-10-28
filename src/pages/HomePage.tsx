import { Link, useNavigate } from 'react-router-dom';
import type { Kind } from '../content/schema';
import { readiness, score, taskKey } from '../engine/catalog';
import { useCat, usePath } from '../exam';
import { useProgress } from '../store/progress';
import { ProgressBar } from '../ui/ProgressBar';
import { Countdown } from './HubPage';

const KINDS: [Kind, string][] = [
  ['definition', 'Опр.'],
  ['statement', 'Форм.'],
  ['proof', 'Док.'],
];

export function HomePage() {
  const cat = useCat();
  const { exam } = cat;
  const p = usePath();
  const st = useProgress();
  const nav = useNavigate();
  const fs = cat.visibleFacets(st.mode);
  const all = readiness(fs.map((f) => f.key), st);
  const ts = readiness(cat.visibleTasks(st.mode).map(taskKey), st);
  const lastMock = st.mocks.filter((m) => m.mode === st.mode).at(-1);
  const kinds = KINDS.filter(([k]) => fs.some((f) => f.kind === k));
  const isTest = exam.mock.kind === 'test';

  return (
    <div className="page">
      <section className="hero">
        <div>
          <div className="hero-kicker">
            {exam.subject} · <Countdown exam={exam} />
          </div>
          <h1>{exam.kind}</h1>
          <p className="muted">
            {exam.when}. {exam.format}. <Link to={p('/how')}>Как устроено →</Link>
          </p>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">{Math.round(score(all) * 100)}%</div>
            <div className="stat-label">теории выучено</div>
          </div>
          <div className="stat">
            <div className="stat-num">
              {isTest ? `${ts.known}/${ts.total}` : `${all.known}/${all.total}`}
            </div>
            <div className="stat-label">{isTest ? 'задач на «знаю»' : 'вопросов на «знаю»'}</div>
          </div>
          <div className="stat">
            <div className="stat-num">{lastMock ? `${fmt(lastMock.red)}/${fmt(lastMock.redMax)}` : '—'}</div>
            <div className="stat-label">
              {isTest ? 'последняя пробная' : 'последний пробный'}
              {exam.levels && ' (🔴)'}
            </div>
          </div>
        </div>
      </section>

      <section className="actions">
        {isTest ? (
          <button className="big primary" onClick={() => nav(p('/tasks'))}>
            <span className="big-title">Решать задачи</span>
            <span className="big-sub">из ДЗ и семинаров, сначала нерешённые</span>
          </button>
        ) : (
          <button className="big primary" onClick={() => nav(p('/cards'))}>
            <span className="big-title">Учить сейчас</span>
            <span className="big-sub">сначала слабое и новое</span>
          </button>
        )}
        <button className="big" onClick={() => nav(p('/mock'))}>
          <span className="big-title">{exam.mock.title}</span>
          <span className="big-sub">
            {exam.mock.kind === 'ticket'
              ? `${exam.mock.prepMin} минут, затем самопроверка по баллам`
              : `${exam.mock.minutes} минут на бумаге, затем самопроверка`}
          </span>
        </button>
        {isTest ? (
          <button className="big" onClick={() => nav(p('/cards'))}>
            <span className="big-title">Теория карточками</span>
            <span className="big-sub">определения, теоремы и почему они верны</span>
          </button>
        ) : (
          <button className="big" onClick={() => nav(p('/cards?last=1'))}>
            <span className="big-title">Последний вечер</span>
            <span className="big-sub">только «не знаю» и «частично»</span>
          </button>
        )}
      </section>

      <section>
        <h2>Карта готовности</h2>
        <p className="muted small">Цвет — доля «знаю» (частично = половина). Нажми на тему, чтобы открыть справочник.</p>
        <div className="grid-table" style={{ ['--cols' as string]: kinds.length + (exam.features.includes('tasks') ? 1 : 0) }}>
          <div className="gt-row gt-head">
            <div>Тема</div>
            {kinds.map(([, l]) => (
              <div key={l}>{l}</div>
            ))}
            {exam.features.includes('tasks') && <div>Задачи</div>}
          </div>
          {cat.visibleTopics(st.mode).map((t) => {
            const topicTasks = cat.visibleTasks(st.mode).filter((x) => x.topic === t.id);
            return (
              <div key={t.id} className="gt-row">
                <Link to={p(`/topic/${t.id}`)} className="gt-topic">
                  {t.title}
                </Link>
                {kinds.map(([k]) => (
                  <Cell
                    key={k}
                    keys={fs.filter((f) => f.topic.id === t.id && f.kind === k).map((f) => f.key)}
                    to={k === 'proof' ? p('/proofs') : p(`/cards?topic=${t.id}&kind=${k}`)}
                  />
                ))}
                {exam.features.includes('tasks') && <Cell keys={topicTasks.map(taskKey)} to={p(`/tasks?topic=${t.id}`)} />}
              </div>
            );
          })}
        </div>
      </section>

      <section className="two">
        <div className="panel">
          <h3>Теория</h3>
          <ProgressBar r={all} />
          <p className="small muted">{all.total} вопросов: определения, формулировки, доказательства.</p>
        </div>
        <div className="panel">
          <h3>Задачи</h3>
          <ProgressBar r={ts} />
          <p className="small muted">
            {ts.total} задач в стиле {isTest ? 'контрольной' : 'билета'}.
            {exam.features.includes('quant') && (
              <>
                {' '}
                <Link to={p('/quant')}>Тренажёр кванторов</Link> генерирует бесконечно.
              </>
            )}
          </p>
        </div>
      </section>
    </div>
  );
}

function Cell({ keys, to }: { keys: string[]; to: string }) {
  const st = useProgress();
  if (!keys.length) return <div className="cell cell-empty" />;
  const r = readiness(keys, st);
  return (
    <Link
      to={to}
      className="cell"
      style={{ ['--p' as string]: score(r) }}
      title={`знаю ${r.known}, частично ${r.shaky}, не знаю ${r.weak}, новых ${r.fresh}`}
    >
      {r.known}/{r.total}
    </Link>
  );
}

export const fmt = (x: number) => (Math.round(x * 100) / 100).toString().replace('.', ',');
