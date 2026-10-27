import { HashRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LevelSwitch } from './ui/LevelSwitch';
import { HomePage } from './pages/HomePage';
import { TopicsPage, TopicPage } from './pages/TopicsPage';
import { CardsPage } from './pages/CardsPage';
import { ProofsPage, ProofPage } from './pages/ProofsPage';
import { QuantPage } from './pages/QuantPage';
import { TasksPage } from './pages/TasksPage';
import { MockPage } from './pages/MockPage';
import { HowPage } from './pages/HowPage';
import { SettingsPage } from './pages/SettingsPage';

const NAV = [
  ['/', 'Главная'],
  ['/topics', 'Справочник'],
  ['/cards', 'Карточки'],
  ['/proofs', 'Доказательства'],
  ['/quant', 'Кванторы'],
  ['/tasks', 'Задачи'],
  ['/mock', 'Пробный билет'],
] as const;

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <HashRouter>
      <ScrollTop />
      <header className="top">
        <div className="top-inner">
          <NavLink to="/" className="brand">
            <span className="brand-mark">∫</span> Коллок по матану
          </NavLink>
          <LevelSwitch />
        </div>
        <nav className="nav">
          {NAV.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/topic/:id" element={<TopicPage />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/proofs" element={<ProofsPage />} />
          <Route path="/proofs/:id" element={<ProofPage />} />
          <Route path="/quant" element={<QuantPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/mock" element={<MockPage />} />
          <Route path="/how" element={<HowPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <footer className="foot">
        <NavLink to="/how">Как отвечать</NavLink>
        <NavLink to="/settings">Прогресс и настройки</NavLink>
        <span className="muted">Неофициальный конспект, составленный студентами по программе курса; не заменяет лонгриды. Прогресс хранится только в этом браузере.</span>
      </footer>
    </HashRouter>
  );
}
