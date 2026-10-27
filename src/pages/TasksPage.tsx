import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TASK_TYPE_LABEL, type Task, type TaskType } from '../content/schema';
import { orderByPriority, taskKey, topicById, visibleTasks, visibleTopics } from '../engine/catalog';
import { getState, useProgress } from '../store/progress';
import { Grade } from '../ui/Grade';
import { StatusDot, Stars } from '../ui/LevelSwitch';
import { Md } from '../ui/Md';
import { fmt } from './HomePage';

export function TasksPage() {
  const st = useProgress();
  const [sp, setSp] = useSearchParams();
  const type = (sp.get('type') ?? '') as TaskType | '';
  const topic = sp.get('topic') ?? '';
  const set = (k: string, v: string) => {
    const n = new URLSearchParams(sp);
    if (v) n.set(k, v);
    else n.delete(k);
    setSp(n, { replace: true });
  };

  const list = useMemo(() => {
    const s = getState();
    const pool = visibleTasks(s.mode).filter((t) => (!type || t.type === type) && (!topic || t.topic === topic));
    return orderByPriority(pool, taskKey, s);
    // порядок фиксируем на фильтр, чтобы список не прыгал после оценки
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, topic, st.mode]);

  return (
    <div className="page">
      <h1>Задачи</h1>
      <p className="muted">
        Блок «Задачи» билета: 1–1,5 балла за каждую. Сначала реши сам, потом открывай подсказки по одной, и только потом ответ.
      </p>
      <div className="filters">
        <select value={type} onChange={(e) => set('type', e.target.value)}>
          <option value="">Все типы</option>
          {(Object.keys(TASK_TYPE_LABEL) as TaskType[]).map((t) => (
            <option key={t} value={t}>
              {TASK_TYPE_LABEL[t]}
            </option>
          ))}
        </select>
        <select value={topic} onChange={(e) => set('topic', e.target.value)}>
          <option value="">Все темы</option>
          {visibleTopics(st.mode).map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>
        <span className="muted small">{list.length} задач</span>
      </div>
      {list.map((t, i) => (
        <TaskCard key={t.id} task={t} n={i + 1} />
      ))}
    </div>
  );
}

export function TaskCard({ task, n, showGrade = true }: { task: Task; n?: number; showGrade?: boolean }) {
  const st = useProgress();
  const [hints, setHints] = useState(0);
  const [open, setOpen] = useState(false);
  const key = taskKey(task);
  return (
    <article className="task">
      <header className="task-head">
        {n !== undefined && <span className="task-n">{n}</span>}
        <Stars scales={task.scales} />
        <span className="tag">{TASK_TYPE_LABEL[task.type]}</span>
        <span className="muted small">
          {fmt(task.points)} б. · {topicById.get(task.topic)?.title}
          {task.source ? ` · ${task.source}` : ''}
        </span>
        <StatusDot status={st.items[key]?.status ?? 'new'} />
      </header>
      <Md text={task.prompt} />
      {task.hints.slice(0, hints).map((h, i) => (
        <div key={i} className="hint">
          <span className="label">Подсказка {i + 1}</span> <Md text={h} />
        </div>
      ))}
      {open && (
        <div className="answer">
          <div className="label">Решение</div>
          <Md text={task.answer} />
        </div>
      )}
      <div className="row">
        {hints < task.hints.length && !open && <button onClick={() => setHints(hints + 1)}>Подсказка</button>}
        {!open && <button onClick={() => setOpen(true)}>Показать решение</button>}
      </div>
      {open && showGrade && <Grade itemKey={key} current={st.items[key]?.status} hotkeys={false} />}
    </article>
  );
}
