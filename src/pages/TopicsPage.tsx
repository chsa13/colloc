import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { topics } from '../../content';
import { facets, readiness, topicById, unitVisible, visibleTopics } from '../engine/catalog';
import { useProgress } from '../store/progress';
import { UnitCard } from '../ui/FacetView';
import { ProgressBar } from '../ui/ProgressBar';

export function TopicsPage() {
  const st = useProgress();
  const [q, setQ] = useState('');
  const query = q.trim().toLowerCase();
  const hits = useMemo(() => {
    if (query.length < 2) return [];
    return topics.flatMap((t) =>
      t.units
        .filter((u) => unitVisible(u, st.mode) && u.title.toLowerCase().includes(query))
        .map((u) => ({ t, u })),
    );
  }, [query, st.mode]);

  return (
    <div className="page">
      <h1>Справочник</h1>
      <input className="search" placeholder="Поиск по названию: «Коши», «зажат», «асимптот»…" value={q} onChange={(e) => setQ(e.target.value)} />
      {query.length >= 2 && (
        <ul className="hits">
          {hits.length === 0 && <li className="muted">Ничего не найдено</li>}
          {hits.map(({ t, u }) => (
            <li key={u.id}>
              <Link to={`/topic/${t.id}?u=${u.id}`}>{u.title}</Link> <span className="muted small">— {t.title}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="topic-list">
        {visibleTopics(st.mode).map((t) => {
          const keys = facets.filter((f) => f.topic.id === t.id && (st.mode === 'all' || f.level === 'basic')).map((f) => f.key);
          return (
            <Link key={t.id} to={`/topic/${t.id}`} className="topic-card">
              <div className="topic-title">{t.title}</div>
              <div className="muted small">Лонгрид {t.longread} · {keys.length} вопросов</div>
              <ProgressBar r={readiness(keys, st)} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function TopicPage() {
  const { id } = useParams();
  const [sp] = useSearchParams();
  const st = useProgress();
  const topic = topicById.get(id ?? '');
  const focus = sp.get('u');

  useEffect(() => {
    if (!focus) return;
    const el = document.getElementById(`u-${focus}`);
    if (el) {
      el.scrollIntoView({ block: 'start' });
      el.classList.add('flash');
      setTimeout(() => el.classList.remove('flash'), 1600);
    }
  }, [focus, id]);

  if (!topic) return <div className="page">Тема не найдена. <Link to="/topics">К списку тем</Link></div>;
  const idx = topics.indexOf(topic);
  const units = topic.units.filter((u) => unitVisible(u, st.mode));
  const hidden = topic.units.length - units.length;

  return (
    <div className="page">
      <div className="crumbs">
        <Link to="/topics">Справочник</Link> / {topic.title}
      </div>
      <h1>{topic.title}</h1>
      <p className="muted">
        Лонгрид {topic.longread}.{' '}
        <Link to={`/cards?topic=${topic.id}`}>Учить карточками →</Link>
      </p>
      {units.map((u) => (
        <UnitCard key={u.id} unit={u} mode={st.mode} />
      ))}
      {hidden > 0 && <p className="muted small">Ещё {hidden} вопросов только продвинутого уровня скрыто.</p>}
      <div className="pager">
        {idx > 0 && <Link to={`/topic/${topics[idx - 1].id}`}>← {topics[idx - 1].title}</Link>}
        <span />
        {idx < topics.length - 1 && <Link to={`/topic/${topics[idx + 1].id}`}>{topics[idx + 1].title} →</Link>}
      </div>
    </div>
  );
}
