import { Link } from 'react-router-dom';
import { exams } from '../../content';
import type { Exam } from '../content/schema';
import { catalogOf, readiness, score, taskKey } from '../engine/catalog';
import { useProgressOf } from '../store/progress';
import { ProgressBar } from '../ui/ProgressBar';

const DAY = 86_400_000;

/** Полночь по местному времени для даты YYYY-MM-DD. */
function day(iso: string): number {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).getTime();
}

type Phase = 'soon' | 'now' | 'past';

export function phaseOf(exam: Exam, now = Date.now()): { phase: Phase; days: number } {
  const today = new Date(now);
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const [start, end] = exam.dates.map(day);
  if (t < start) return { phase: 'soon', days: Math.round((start - t) / DAY) };
  if (t <= end) return { phase: 'now', days: 0 };
  return { phase: 'past', days: Math.round((t - end) / DAY) };
}

function plural(n: number, one: string, few: string, many: string): string {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
}

/** «через 8 дней», «завтра», «идёт сейчас», «прошёл». */
export function Countdown({ exam }: { exam: Exam }) {
  const { phase, days } = phaseOf(exam);
  if (phase === 'now') return <span className="badge badge-now">идёт сейчас</span>;
  if (phase === 'past') return <span className="badge badge-past">прошло</span>;
  const text = days === 1 ? 'завтра' : `через ${days} ${plural(days, 'день', 'дня', 'дней')}`;
  return <span className={`badge ${days <= 3 ? 'badge-hot' : 'badge-soon'}`}>{text}</span>;
}

export function HubPage() {
  // Сначала текущие и ближайшие, прошедшие — в конце, самые свежие выше.
  const order: Record<Phase, number> = { now: 0, soon: 1, past: 2 };
  const sorted = [...exams].sort((a, b) => {
    const pa = phaseOf(a);
    const pb = phaseOf(b);
    if (pa.phase !== pb.phase) return order[pa.phase] - order[pb.phase];
    return pa.phase === 'past' ? pa.days - pb.days : day(a.dates[0]) - day(b.dates[0]);
  });
  return (
    <div className="page">
      <h1>Подготовка к экзаменам</h1>
      <p className="muted">
        Коллоквиумы и контрольные ЦУ: справочник по теории, карточки, тренажёр доказательств, банк задач и пробники с таймером. Устроены
        одинаково, прогресс у каждого свой.
      </p>
      <div className="exam-list">
        {sorted.map((e) => (
          <ExamCard key={e.id} exam={e} />
        ))}
      </div>
    </div>
  );
}

function ExamCard({ exam }: { exam: Exam }) {
  const st = useProgressOf(exam.id);
  const cat = catalogOf(exam);
  const theory = readiness(cat.visibleFacets(st.mode).map((f) => f.key), st);
  const tasks = readiness(cat.visibleTasks(st.mode).map(taskKey), st);
  const past = phaseOf(exam).phase === 'past';
  return (
    <Link to={`/${exam.id}`} className={`exam-card ${past ? 'exam-past' : ''}`}>
      <div className="exam-icon">{exam.icon}</div>
      <div className="exam-main">
        <div className="exam-top">
          <span className="exam-subject">{exam.subject}</span>
          <Countdown exam={exam} />
        </div>
        <div className="exam-title">{exam.kind}</div>
        <div className="muted small">
          {exam.when} · {exam.format}
        </div>
        <div className="muted small">{exam.scope}</div>
        <div className="exam-bars">
          <div>
            <span className="label">Теория · {Math.round(score(theory) * 100)}%</span>
            <ProgressBar r={theory} />
          </div>
          <div>
            <span className="label">Задачи · {Math.round(score(tasks) * 100)}%</span>
            <ProgressBar r={tasks} />
          </div>
        </div>
      </div>
    </Link>
  );
}
