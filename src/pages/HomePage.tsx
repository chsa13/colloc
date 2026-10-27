import { Link, useNavigate } from 'react-router-dom';
import type { Kind } from '../content/schema';
import { readiness, score, taskKey, visibleFacets, visibleTasks, visibleTopics } from '../engine/catalog';
import { useProgress } from '../store/progress';
import { ProgressBar } from '../ui/ProgressBar';

const KINDS: [Kind, string][] = [
  ['definition', 'Опр.'],
  ['statement', 'Форм.'],
  ['proof', 'Док.'],
];

export function HomePage() {
  const st = useProgress();
  const nav = useNavigate();
  const fs = visibleFacets(st.mode);
  const all = readiness(fs.map((f) => f.key), st);
  const ts = readiness(visibleTasks(st.mode).map(taskKey), st);
  const lastMock = st.mocks.filter((m) => m.mode === st.mode).at(-1);

  return (
    <div className="page">
      <section className="hero">
        <div>
          <h1>Подготовка к коллоквиуму</h1>
          <p className="muted">
            Математический анализ, ЦУ, 26–30 октября. 45 минут подготовки + 30 минут ответа, без материалов.{' '}
            <Link to="/how">Как устроен билет →</Link>
          </p>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">{Math.round(score(all) * 100)}%</div>
            <div className="stat-label">теории выучено</div>
          </div>
          <div className="stat">
            <div className="stat-num">
              {all.known}/{all.total}
            </div>
            <div className="stat-label">вопросов на «знаю»</div>
          </div>
          <div className="stat">
            <div className="stat-num">{lastMock ? `${fmt(lastMock.red)}/${fmt(lastMock.redMax)}` : '—'}</div>
            <div className="stat-label">последний пробный (🔴)</div>
          </div>
        </div>
      </section>

      <section className="actions">
        <button className="big primary" onClick={() => nav('/cards?focus=weak')}>
          <span className="big-title">Учить сейчас</span>
          <span className="big-sub">сначала слабое и новое</span>
        </button>
        <button className="big" onClick={() => nav('/mock')}>
          <span className="big-title">Пробный билет</span>
          <span className="big-sub">45 минут, затем самопроверка по баллам</span>
        </button>
        <button className="big" onClick={() => nav('/cards?focus=weak&last=1')}>
          <span className="big-title">Последний вечер</span>
          <span className="big-sub">только «не знаю» и «частично»</span>
        </button>
      </section>

      <section>
        <h2>Карта готовности</h2>
        <p className="muted small">
          Цвет — доля «знаю» (частично = половина). Нажми на тему, чтобы открыть справочник.
        </p>
        <div className="grid-table">
          <div className="gt-row gt-head">
            <div>Тема</div>
            {KINDS.map(([, l]) => (
              <div key={l}>{l}</div>
            ))}
          </div>
          {visibleTopics(st.mode).map((t) => (
            <div key={t.id} className="gt-row">
              <Link to={`/topic/${t.id}`} className="gt-topic">
                {t.title}
              </Link>
              {KINDS.map(([k]) => {
                const keys = fs.filter((f) => f.topic.id === t.id && f.kind === k).map((f) => f.key);
                if (!keys.length) return <div key={k} className="cell cell-empty" />;
                const r = readiness(keys, st);
                const s = score(r);
                return (
                  <Link
                    key={k}
                    to={k === 'proof' ? '/proofs' : `/cards?topic=${t.id}&kind=${k}`}
                    className="cell"
                    style={{ ['--p' as string]: s }}
                    title={`знаю ${r.known}, частично ${r.shaky}, не знаю ${r.weak}, новых ${r.fresh}`}
                  >
                    {r.known}/{r.total}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      <section className="two">
        <div className="panel">
          <h3>Теория</h3>
          <ProgressBar r={all} />
          <p className="small muted">
            {all.total} вопросов: определения, формулировки, доказательства.
          </p>
        </div>
        <div className="panel">
          <h3>Задачи</h3>
          <ProgressBar r={ts} />
          <p className="small muted">
            {ts.total} задач в стиле билета. <Link to="/quant">Тренажёр кванторов</Link> генерирует бесконечно.
          </p>
        </div>
      </section>
    </div>
  );
}

export const fmt = (x: number) => (Math.round(x * 100) / 100).toString().replace('.', ',');
