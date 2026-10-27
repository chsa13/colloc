import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { tasks } from '../../content';
import { KIND_LABEL } from '../content/schema';
import { facets, lemmaChain, taskKey } from '../engine/catalog';
import { generateTicket, totals, type Section, type TicketQuestion } from '../engine/ticket';
import { addMock, mark, useProgress, type Mode } from '../store/progress';
import { FacetBody } from '../ui/FacetView';
import { Stars } from '../ui/LevelSwitch';
import { Md } from '../ui/Md';
import { fmt } from './HomePage';

type Stage = 'intro' | 'prep' | 'answer' | 'result';

interface Saved {
  mode: Mode;
  stage: Stage;
  started: number;
  answerStarted: number;
  scores: Record<string, number>;
  qs: (Omit<TicketQuestion, 'facet' | 'task'> & { facetKey?: string; taskId?: string })[];
}

const SAVE_KEY = 'colloc-mock-current';
const PREP_MIN = 45;
const ANSWER_MIN = 30;

function restore(): { s: Saved; qs: TicketQuestion[] } | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as Saved;
    const qs = s.qs.map((q) => ({
      ...q,
      facet: q.facetKey ? facets.find((f) => f.key === q.facetKey) : undefined,
      task: q.taskId ? tasks.find((t) => t.id === q.taskId) : undefined,
    }));
    if (qs.some((q) => !q.facet && !q.task)) return null;
    return { s, qs };
  } catch {
    return null;
  }
}

function persist(s: Saved | null) {
  try {
    if (s) localStorage.setItem(SAVE_KEY, JSON.stringify(s));
    else localStorage.removeItem(SAVE_KEY);
  } catch {
    /* не критично */
  }
}

function useNow(active: boolean) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [active]);
  return now;
}

function clock(ms: number) {
  const neg = ms < 0;
  const s = Math.floor(Math.abs(ms) / 1000);
  return `${neg ? '−' : ''}${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

const SECTIONS: Section[] = ['Определения', 'Формулировки', 'Доказательства', 'Задачи'];

export function MockPage() {
  const st = useProgress();
  const restored = useMemo(restore, []);
  const [stage, setStage] = useState<Stage>(restored?.s.stage ?? 'intro');
  const [qs, setQs] = useState<TicketQuestion[]>(restored?.qs ?? []);
  const [mode, setModeLocal] = useState<Mode>(restored?.s.mode ?? st.mode);
  const [started, setStarted] = useState(restored?.s.started ?? 0);
  const [answerStarted, setAnswerStarted] = useState(restored?.s.answerStarted ?? 0);
  const [scores, setScores] = useState<Record<string, number>>(restored?.s.scores ?? {});
  const now = useNow(stage === 'prep' || stage === 'answer');

  useEffect(() => {
    if (stage === 'intro') {
      persist(null);
      return;
    }
    persist({
      mode,
      stage,
      started,
      answerStarted,
      scores,
      qs: qs.map(({ facet, task, ...rest }) => ({ ...rest, facetKey: facet?.key, taskId: task?.id })),
    });
  }, [stage, qs, mode, started, answerStarted, scores]);

  const start = () => {
    setModeLocal(st.mode);
    setQs(generateTicket(st.mode));
    setScores({});
    setStarted(Date.now());
    setStage('prep');
  };

  const toAnswer = () => {
    setAnswerStarted(Date.now());
    setStage('answer');
  };

  const finish = () => {
    const t = totals(qs, scores);
    addMock({ date: Date.now(), mode, ...t });
    // Переносим результат в прогресс: ≥90% — знаю, ≥40% — частично, иначе не знаю.
    const verdict = (got: number, max: number) => (got >= 0.9 * max ? 'known' : got >= 0.4 * max ? 'shaky' : 'weak');
    for (const q of qs) {
      const got = (i: number) => scores[`${q.n}:${i}`] ?? 0;
      if (q.task) mark(taskKey(q.task), verdict(got(0), q.parts[0].max));
      else if (q.facet) {
        if (q.facet.kind === 'proof') {
          if (q.facet.unit.statement) mark(`${q.facet.unit.id}:statement`, verdict(got(0), q.parts[0].max));
          mark(q.facet.key, verdict(got(1), q.parts[1].max));
        } else mark(q.facet.key, verdict(got(0), q.parts[0].max));
      }
    }
    setStage('result');
  };

  if (stage === 'intro') {
    return (
      <div className="page">
        <h1>Пробный билет</h1>
        <p>Билет собирается случайно по структуре демо-версии. Сейчас уровень: <b>{st.mode === 'basic' ? 'основной' : 'основной + продвинутый'}</b>.</p>
        <table className="tbl">
          <thead>
            <tr>
              <th>Блок</th>
              <th>Вопросов</th>
              <th>Баллы</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Определения</td>
              <td>3</td>
              <td>по 0,5</td>
            </tr>
            <tr>
              <td>Формулировки</td>
              <td>{st.mode === 'all' ? '3 + 1⚫' : 3}</td>
              <td>по 0,5</td>
            </tr>
            <tr>
              <td>Доказательства</td>
              <td>{st.mode === 'all' ? '2 + 1⚫' : 2}</td>
              <td>0,5 + 2 {st.mode === 'all' && '(⚫: 0,5 + 3)'}</td>
            </tr>
            <tr>
              <td>Задачи</td>
              <td>{st.mode === 'all' ? '3 + 1⚫' : 3}</td>
              <td>1–1,5</td>
            </tr>
          </tbody>
        </table>
        <ol>
          <li>
            <b>Подготовка — {PREP_MIN} минут.</b> Пиши ответы на бумаге, как на коллоквиуме. Без материалов.
          </li>
          <li>
            <b>Ответ — {ANSWER_MIN} минут.</b> Открывай эталон по каждому вопросу, сравнивай и честно ставь себе баллы.
          </li>
          <li>Результат сохранится, а вопросы получат статус в прогрессе.</li>
        </ol>
        <button className="primary big-btn" onClick={start}>
          Начать
        </button>
        <MockHistory />
      </div>
    );
  }

  if (stage === 'prep') {
    const left = started + PREP_MIN * 60_000 - now;
    return (
      <div className="page">
        <div className={`timer ${left < 0 ? 'timer-over' : left < 5 * 60_000 ? 'timer-warn' : ''}`}>
          Подготовка: {clock(left)} {left < 0 && '— время вышло'}
        </div>
        <TicketList qs={qs} />
        <div className="row">
          <button className="primary" onClick={toAnswer}>
            Перейти к ответу →
          </button>
          <button onClick={() => confirm('Бросить билет?') && setStage('intro')}>Бросить</button>
        </div>
      </div>
    );
  }

  if (stage === 'answer') {
    const left = answerStarted + ANSWER_MIN * 60_000 - now;
    const t = totals(qs, scores);
    return (
      <div className="page">
        <div className={`timer ${left < 0 ? 'timer-over' : ''}`}>
          Ответ: {clock(left)} · 🔴 {fmt(t.red)}/{fmt(t.redMax)}
          {mode === 'all' && ` · ⚫ ${fmt(t.black)}/${fmt(t.blackMax)}`}
        </div>
        <p className="muted small">Открывай эталон и отмечай, сколько баллов поставил бы себе экзаменатор.</p>
        {SECTIONS.map((sec) => {
          const list = qs.filter((q) => q.section === sec);
          if (!list.length) return null;
          return (
            <section key={sec}>
              <h2>{sec}</h2>
              {list.map((q) => (
                <AnswerQuestion
                  key={q.n}
                  q={q}
                  scores={scores}
                  setScore={(k, v) => setScores((s) => ({ ...s, [k]: v }))}
                />
              ))}
            </section>
          );
        })}
        <button className="primary big-btn" onClick={finish}>
          Завершить и сохранить
        </button>
      </div>
    );
  }

  const t = totals(qs, scores);
  return (
    <div className="page">
      <h1>Результат</h1>
      <div className="hero-stats">
        <div className="stat">
          <div className="stat-num">
            {fmt(t.red)} / {fmt(t.redMax)}
          </div>
          <div className="stat-label">🔴 основной уровень</div>
        </div>
        {mode === 'all' && (
          <div className="stat">
            <div className="stat-num">
              {fmt(t.black)} / {fmt(t.blackMax)}
            </div>
            <div className="stat-label">⚫ продвинутый уровень</div>
          </div>
        )}
      </div>
      <h3>Где потерял баллы</h3>
      <ul>
        {qs
          .filter((q) => q.parts.some((p, i) => (scores[`${q.n}:${i}`] ?? 0) < p.max))
          .map((q) => (
            <li key={q.n}>
              {q.n}. {q.facet ? q.facet.unit.title : <Md text={q.task!.prompt.split('\n')[0]} inline />}{' '}
              <span className="muted small">
                ({q.parts.map((p, i) => `${fmt(scores[`${q.n}:${i}`] ?? 0)}/${fmt(p.max)}`).join(' + ')})
              </span>
            </li>
          ))}
      </ul>
      <div className="row">
        <button className="primary" onClick={() => setStage('intro')}>
          Новый билет
        </button>
        <Link className="btn" to="/cards?last=1&kind=definition,statement,proof">
          Повторить слабое
        </Link>
      </div>
    </div>
  );
}

function questionTitle(q: TicketQuestion): string {
  if (q.task) return '';
  const f = q.facet!;
  const lemmas = f.kind === 'proof' ? lemmaChain(f.unit) : [];
  return lemmas.length ? `${f.unit.title} (вместе с ${lemmas.length === 1 ? 'леммой' : 'леммами'}: ${lemmas.map((l) => l.title).join('; ')})` : f.unit.title;
}

function TicketList({ qs }: { qs: TicketQuestion[] }) {
  return (
    <>
      {SECTIONS.map((sec) => {
        const list = qs.filter((q) => q.section === sec);
        if (!list.length) return null;
        return (
          <section key={sec}>
            <h2>{sec}</h2>
            {list.map((q) => (
              <div key={q.n} className="tq">
                <div className="tq-head">
                  <Stars scales={q.scales} />
                  <span className="tq-n">Вопрос {q.n}</span>
                  <b>{q.parts.map((p) => fmt(p.max)).join(' + ')} б.</b>
                </div>
                <div className="tq-body">{q.task ? <Md text={q.task.prompt} /> : questionTitle(q)}</div>
              </div>
            ))}
          </section>
        );
      })}
    </>
  );
}

function steps(max: number): number[] {
  const step = max <= 0.5 ? 0.25 : 0.5;
  const out: number[] = [];
  for (let x = 0; x <= max + 1e-9; x += step) out.push(Math.round(x * 100) / 100);
  return out;
}

function AnswerQuestion({
  q,
  scores,
  setScore,
}: {
  q: TicketQuestion;
  scores: Record<string, number>;
  setScore: (k: string, v: number) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="tq">
      <div className="tq-head">
        <Stars scales={q.scales} />
        <span className="tq-n">Вопрос {q.n}</span>
        {q.facet && <span className="tag">{KIND_LABEL[q.facet.kind]}</span>}
      </div>
      <div className="tq-body">{q.task ? <Md text={q.task.prompt} /> : <b>{q.facet!.unit.title}</b>}</div>
      {!open ? (
        <button onClick={() => setOpen(true)}>Показать эталон</button>
      ) : q.task ? (
        <div className="answer">
          <Md text={q.task.answer} />
        </div>
      ) : (
        <div className="answer">
          <FacetBody unit={q.facet!.unit} kind={q.facet!.kind} />
        </div>
      )}
      {q.parts.map((p, i) => {
        const k = `${q.n}:${i}`;
        return (
          <div key={i} className="score-row">
            <span className="small">{p.label}:</span>
            {steps(p.max).map((v) => (
              <button key={v} className={`sc ${scores[k] === v ? 'on' : ''}`} onClick={() => setScore(k, v)}>
                {fmt(v)}
              </button>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function MockHistory() {
  const st = useProgress();
  if (!st.mocks.length) return null;
  return (
    <section>
      <h3>История</h3>
      <table className="tbl">
        <thead>
          <tr>
            <th>Дата</th>
            <th>Уровень</th>
            <th>🔴</th>
            <th>⚫</th>
          </tr>
        </thead>
        <tbody>
          {[...st.mocks].reverse().map((m) => (
            <tr key={m.date}>
              <td>{new Date(m.date).toLocaleString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
              <td>{m.mode === 'basic' ? 'основной' : '+ продвинутый'}</td>
              <td>
                {fmt(m.red)}/{fmt(m.redMax)}
              </td>
              <td>{m.mode === 'all' ? `${fmt(m.black)}/${fmt(m.blackMax)}` : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
