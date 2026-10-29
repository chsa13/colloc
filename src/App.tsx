import { HashRouter, Navigate, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { useEffect, type ReactElement } from 'react';
import type { Feature } from './content/schema';
import { trackPage } from './analytics';
import { catalogOf, examById } from './engine/catalog';
import { ExamProvider, useCat, usePath } from './exam';
import { ExamStars, LevelSwitch } from './ui/LevelSwitch';
import { HubPage } from './pages/HubPage';
import { HomePage } from './pages/HomePage';
import { TopicsPage, TopicPage } from './pages/TopicsPage';
import { CardsPage } from './pages/CardsPage';
import { ProofsPage, ProofPage } from './pages/ProofsPage';
import { QuantPage } from './pages/QuantPage';
import { TasksPage } from './pages/TasksPage';
import { MockPage } from './pages/MockPage';
import { HowPage } from './pages/HowPage';
import { SettingsPage } from './pages/SettingsPage';

export const SITE_TITLE = 'Подготовка к экзаменам ЦУ';

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    // заголовок страницы выставляют эффекты раздела, поэтому читаем его чуть позже
    const t = setTimeout(() => trackPage(pathname, document.title), 0);
    return () => clearTimeout(t);
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <HashRouter>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<HubLayout />} />
        <Route path="/:examId/*" element={<ExamLayout />} />
      </Routes>
    </HashRouter>
  );
}

function HubLayout() {
  useEffect(() => {
    document.title = SITE_TITLE;
  }, []);
  return (
    <>
      <header className="top">
        <div className="top-inner">
          <NavLink to="/" className="brand">
            <span className="brand-mark">∑</span> {SITE_TITLE}
          </NavLink>
        </div>
      </header>
      <main className="main">
        <HubPage />
      </main>
      <Footer />
    </>
  );
}

const NAV: [string, string, Feature | null][] = [
  ['/', 'Главная', null],
  ['/topics', 'Справочник', 'topics'],
  ['/cards', 'Карточки', 'cards'],
  ['/proofs', 'Доказательства', 'proofs'],
  ['/quant', 'Кванторы', 'quant'],
  ['/tasks', 'Задачи', 'tasks'],
  ['/mock', '', 'mock'],
];

function ExamLayout() {
  const { examId } = useParams();
  const exam = examById.get(examId ?? '');
  useEffect(() => {
    document.title = exam ? `${exam.short} · ${SITE_TITLE}` : SITE_TITLE;
  }, [exam]);
  if (!exam) return <Navigate to="/" replace />;
  return (
    <ExamProvider value={catalogOf(exam)}>
      {/* key: при смене экзамена страницы монтируются заново и не тащат состояние чужого экзамена */}
      <ExamShell key={exam.id} />
    </ExamProvider>
  );
}

function ExamShell() {
  const p = usePath();
  const { exam } = useCat();
  const has = (f: Feature | null) => !f || exam.features.includes(f);
  const only = (f: Feature, el: ReactElement) => (has(f) ? el : <Navigate to={p('/')} replace />);
  return (
    <>
      <header className="top">
        <div className="top-inner">
          <div className="brand-row">
            <NavLink to="/" className="brand brand-hub" title="Все экзамены">
              <span className="brand-mark">∑</span>
            </NavLink>
            <span className="brand-sep">/</span>
            <NavLink to={p('/')} className="brand">
              <span className="brand-mark">{exam.icon}</span> {exam.short} <ExamStars exam={exam} />
            </NavLink>
          </div>
          {exam.levels && <LevelSwitch />}
        </div>
        <nav className="nav">
          {NAV.filter(([, , f]) => has(f)).map(([to, label]) => (
            <NavLink key={to} to={p(to)} end={to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
              {to === '/mock' ? exam.mock.title : label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="main">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="topics" element={only('topics', <TopicsPage />)} />
          <Route path="topic/:id" element={only('topics', <TopicPage />)} />
          <Route path="cards" element={only('cards', <CardsPage />)} />
          <Route path="proofs" element={only('proofs', <ProofsPage />)} />
          <Route path="proofs/:id" element={only('proofs', <ProofPage />)} />
          <Route path="quant" element={only('quant', <QuantPage />)} />
          <Route path="tasks" element={only('tasks', <TasksPage />)} />
          <Route path="mock" element={only('mock', <MockPage />)} />
          <Route path="how" element={<HowPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to={p('/')} replace />} />
        </Routes>
      </main>
      <Footer exam />
    </>
  );
}

function Footer({ exam = false }: { exam?: boolean }) {
  return (
    <footer className="foot">
      {exam && <ExamFooterLinks />}
      <span className="muted">
        Неофициальный конспект, составленный студентами по программе курсов; не заменяет лонгриды. Прогресс хранится только в этом браузере.
      </span>
    </footer>
  );
}

function ExamFooterLinks() {
  const p = usePath();
  return (
    <>
      <NavLink to={p('/how')}>Как устроено и как готовиться</NavLink>
      <NavLink to={p('/settings')}>Прогресс и настройки</NavLink>
      <NavLink to="/">Все экзамены</NavLink>
    </>
  );
}
