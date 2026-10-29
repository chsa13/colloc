import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'katex/dist/katex.min.css';
import './styles.css';
import { App } from './App';

// Раньше адреса были вида /exams/#/linal-kr2/cards. Старые ссылки и закладки переводим на новые —
// и при открытии, и если такую ссылку открыли на уже загруженном сайте (меняется только #).
function fromOldHash() {
  if (!location.hash.startsWith('#/')) return;
  history.replaceState(null, '', import.meta.env.BASE_URL + location.hash.slice(2));
  window.dispatchEvent(new PopStateEvent('popstate')); // роутер перечитает адрес
}
fromOldHash();
window.addEventListener('hashchange', fromOldHash);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
