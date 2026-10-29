import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { KIND_LABEL, TASK_TYPE_LABEL, type TicketLayout } from '../content/schema';
import { taskKey, type Catalog } from '../engine/catalog';
import { generateMock, totals, type Section, type TicketQuestion } from '../engine/ticket';
import { trackEvent } from '../analytics';
import { useCat, usePath } from '../exam';
import { storageKey, useProgress, useStore, type Mode } from '../store/progress';
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

function restore(cat: Catalog): { s: Saved; qs: TicketQuestion[] } | null {
  try {
    const raw = localStorage.getItem(storageKey(cat.exam.id, 'mock'));
    if (!raw) return null;
    const s = JSON.parse(raw) as Saved;
    const qs = s.qs.map((q) => ({
      ...q,
      facet: q.facetKey ? cat.facetByKey.get(q.facetKey) : undefined,
      task: q.taskId ? cat.tasks.find((t) => t.id === q.taskId) : undefined,
    }));
    if (qs.some((q) => !q.facet && !q.task)) return null;
    return { s, qs };
  } catch {
    return null;
  }
}

function persist(examId: string, s: Saved | null) {
  try {
    const key = storageKey(examId, 'mock');
    if (s) localStorage.setItem(key, JSON.stringify(s));
    else localStorage.removeItem(key);
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
  const cat = useCat();
  const { exam } = cat;
  const spec = exam.mock;
  const isTest = spec.kind === 'test';
  // Время на работу и на ответ (у контрольной проверка без таймера).
  const PREP_MIN = spec.kind === 'ticket' ? spec.prepMin : spec.minutes;
  const ANSWER_MIN = spec.kind === 'ticket' ? spec.answerMin : null;
  const path = usePath();
  const store = useStore();
  const st = useProgress();
  const restored = useMemo(() => restore(cat), [cat]);
  const [stage, setStage] = useState<Stage>(restored?.s.stage ?? 'intro');
  const [qs, setQs] = useState<TicketQuestion[]>(restored?.qs ?? []);
  const [mode, setModeLocal] = useState<Mode>(restored?.s.mode ?? st.mode);
  const [started, setStarted] = useState(restored?.s.started ?? 0);
  const [answerStarted, setAnswerStarted] = useState(restored?.s.answerStarted ?? 0);
  const [scores, setScores] = useState<Record<string, number>>(restored?.s.scores ?? {});
  const now = useNow(stage === 'prep' || (stage === 'answer' && ANSWER_MIN !== null));

  useEffect(() => {
    if (stage === 'intro') {
      persist(exam.id, null);
      return;
    }
    persist(exam.id, {
      mode,
      stage,
      started,
      answerStarted,
      scores,
      qs: qs.map(({ facet, task, ...rest }) => ({ ...rest, facetKey: facet?.key, taskId: task?.id })),
    });
  }, [exam.id, stage, qs, mode, started, answerStarted, scores]);

  const start = () => {
    setModeLocal(st.mode);
    setQs(generateMock(cat, st.mode));
    trackEvent('mock-start', { exam: exam.id });
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
    store.addMock({ date: Date.now(), mode, ...t });
    trackEvent('mock-finish', { exam: exam.id, percent: t.redMax ? Math.round((t.red / t.redMax) * 100) : 0 });
    // Переносим результат в прогресс: ≥90% — знаю, ≥40% — частично, иначе не знаю.
    const verdict = (got: number, max: number) => (got >= 0.9 * max ? 'known' : got >= 0.4 * max ? 'shaky' : 'weak');
    for (const q of qs) {
      const got = (i: number) => scores[`${q.n}:${i}`] ?? 0;
      if (q.task) store.mark(taskKey(q.task), verdict(got(0), q.parts[0].max));
      else if (q.facet) {
        if (q.facet.kind === 'proof') {
          if (q.facet.unit.statement) store.mark(`${q.facet.unit.id}:statement`, verdict(got(0), q.parts[0].max));
          store.mark(q.facet.key, verdict(got(1), q.parts[1].max));
        } else store.mark(q.facet.key, verdict(got(0), q.parts[0].max));
      }
    }
    setStage('result');
  };

  if (stage === 'intro' && spec.kind === 'test') {
    return (
      <div className="page">
        <h1>{spec.title}</h1>
        <p>
          Контрольная собирается случайно из банка задач: по одной задаче на каждую позицию. {exam.format}.
        </p>
        <table className="tbl">
          <thead>
            <tr>
              <th>№</th>
              <th>Что будет</th>
            </tr>
          </thead>
          <tbody>
            {spec.slots.map((s, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{s.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ol>
          <li>
            <b>Работа — {spec.minutes} минут.</b> Решай на бумаге, без конспектов и калькулятора, с обоснованиями.
          </li>
          <li>
            <b>Проверка.</b> Открывай решение по каждой задаче и честно ставь себе баллы: за ответ без объяснения «почему» — не больше половины.
          </li>
          <li>Результат сохранится, а задачи получат статус в прогрессе.</li>
        </ol>
        <button className="primary big-btn" onClick={start}>
          Начать
        </button>
        <MockHistory />
      </div>
    );
  }

  if (stage === 'intro') {
    return (
      <div className="page">
        <h1>{spec.title}</h1>
        <p>
          Билет собирается случайно по структуре демо-версии.
          {exam.levels && (
            <>
              {' '}
              Сейчас уровень: <b>{st.mode === 'basic' ? 'основной' : 'основной + продвинутый'}</b>.
            </>
          )}
        </p>
        <table className="tbl">
          <thead>
            <tr>
              <th>Блок</th>
              <th>Вопросов</th>
              <th>Баллы</th>
            </tr>
          </thead>
          <tbody>
            {ticketBlocks(spec.kind === 'ticket' ? spec.layout : undefined, st.mode).map(([block, count, points]) => (
              <tr key={block}>
                <td>{block}</td>
                <td>{count}</td>
                <td>{points}</td>
              </tr>
            ))}
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
          {isTest ? 'Контрольная' : 'Подготовка'}: {clock(left)} {left < 0 && '— время вышло'}
        </div>
        <TicketList qs={qs} />
        <div className="row">
          <button className="primary" onClick={toAnswer}>
            {isTest ? 'Сдать и проверить →' : 'Перейти к ответу →'}
          </button>
          <button onClick={() => confirm('Бросить пробник?') && setStage('intro')}>Бросить</button>
        </div>
      </div>
    );
  }

  if (stage === 'answer') {
    const left = ANSWER_MIN === null ? 0 : answerStarted + ANSWER_MIN * 60_000 - now;
    const t = totals(qs, scores);
    return (
      <div className="page">
        <div className={`timer ${left < 0 ? 'timer-over' : ''}`}>
          {ANSWER_MIN === null ? 'Проверка' : `Ответ: ${clock(left)}`} · {exam.levels && '🔴 '}
          {fmt(t.red)}/{fmt(t.redMax)}
          {mode === 'all' && exam.levels && ` · ⚫ ${fmt(t.black)}/${fmt(t.blackMax)}`}
        </div>
        <p className="muted small">
          {isTest
            ? 'Открывай решение и отмечай, сколько баллов поставил бы себе проверяющий. Ответ без обоснования — не больше половины.'
            : 'Открывай эталон и отмечай, сколько баллов поставил бы себе экзаменатор.'}
        </p>
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
          <div className="stat-label">{exam.levels ? '🔴 основной уровень' : 'баллов'}</div>
        </div>
        {mode === 'all' && exam.levels && (
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
              {q.n}. {q.facet ? q.facet.unit.title : q.label ?? <Md text={q.task!.prompt.split('\n')[0]} inline />}{' '}
              <span className="muted small">
                ({q.parts.map((p, i) => `${fmt(scores[`${q.n}:${i}`] ?? 0)}/${fmt(p.max)}`).join(' + ')})
              </span>
            </li>
          ))}
      </ul>
      <div className="row">
        <button className="primary" onClick={() => setStage('intro')}>
          Ещё раз
        </button>
        {isTest ? (
          <Link className="btn" to={path('/tasks')}>
            К банку задач
          </Link>
        ) : (
          <Link className="btn" to={path('/cards?last=1&kind=definition,statement,proof')}>
            Повторить слабое
          </Link>
        )}
      </div>
    </div>
  );
}

/** Строки таблицы «состав билета»: по layout экзамена или по демо-билету матана. */
function ticketBlocks(layout: TicketLayout | undefined, mode: Mode): [string, string | number, string][] {
  if (layout) {
    return [
      ['Определения', layout.definitions, 'по 0,5'],
      ['Формулировки', layout.statements, 'по 0,5'],
      ['Доказательства', layout.proofs, '0,5 + 2'],
      [`Задачи: ${layout.taskSlots.map((s) => s.label.toLowerCase()).join('; ')}`, layout.taskSlots.length, 'по 1'],
    ];
  }
  const all = mode === 'all';
  return [
    ['Определения', 3, 'по 0,5'],
    ['Формулировки', all ? '3 + 1⚫' : 3, 'по 0,5'],
    ['Доказательства', all ? '2 + 1⚫' : 2, all ? '0,5 + 2 (⚫: 0,5 + 3)' : '0,5 + 2'],
    ['Задачи', all ? '3 + 1⚫' : 3, '1–1,5'],
  ];
}

function questionTitle(cat: Catalog, q: TicketQuestion): string {
  if (q.task) return '';
  const f = q.facet!;
  const lemmas = f.kind === 'proof' ? cat.lemmaChain(f.unit) : [];
  return lemmas.length ? `${f.unit.title} (вместе с ${lemmas.length === 1 ? 'леммой' : 'леммами'}: ${lemmas.map((l) => l.title).join('; ')})` : f.unit.title;
}

function TicketList({ qs }: { qs: TicketQuestion[] }) {
  const cat = useCat();
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
                  {cat.exam.levels && <Stars scales={q.scales} />}
                  <span className="tq-n">{q.task && cat.exam.mock.kind === 'test' ? 'Задача' : 'Вопрос'} {q.n}</span>
                  <b>{q.parts.map((p) => fmt(p.max)).join(' + ')} б.</b>
                </div>
                <div className="tq-body">{q.task ? <Md text={q.task.prompt} /> : questionTitle(cat, q)}</div>
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
  const cat = useCat();
  return (
    <div className="tq">
      <div className="tq-head">
        {cat.exam.levels && <Stars scales={q.scales} />}
        <span className="tq-n">{q.task && cat.exam.mock.kind === 'test' ? 'Задача' : 'Вопрос'} {q.n}</span>
        {q.facet && <span className="tag">{KIND_LABEL[q.facet.kind]}</span>}
        {q.task && cat.exam.mock.kind === 'test' && <span className="tag">{TASK_TYPE_LABEL[q.task.type]}</span>}
      </div>
      <div className="tq-body">{q.task ? <Md text={q.task.prompt} /> : <b>{q.facet!.unit.title}</b>}</div>
      {!open ? (
        <button onClick={() => setOpen(true)}>{q.task ? 'Показать решение' : 'Показать эталон'}</button>
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
  const { exam } = useCat();
  const st = useProgress();
  if (!st.mocks.length) return null;
  if (!exam.levels)
    return (
      <section>
        <h3>История</h3>
        <table className="tbl">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Баллы</th>
            </tr>
          </thead>
          <tbody>
            {[...st.mocks].reverse().map((m) => (
              <tr key={m.date}>
                <td>{when(m.date)}</td>
                <td>
                  {fmt(m.red)}/{fmt(m.redMax)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
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
              <td>{when(m.date)}</td>
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

const when = (d: number) => new Date(d).toLocaleString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
