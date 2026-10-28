import { createContext, useContext } from 'react';
import type { Catalog } from './engine/catalog';

// Текущий экзамен: задаётся маршрутом /#/<examId>/..., страницы берут из него контент.

const ExamContext = createContext<Catalog | null>(null);

export const ExamProvider = ExamContext.Provider;

export function useCat(): Catalog {
  const c = useContext(ExamContext);
  if (!c) throw new Error('useCat() вне раздела экзамена');
  return c;
}

/** Путь внутри раздела текущего экзамена: p('/cards?topic=x') → '/<examId>/cards?topic=x'. */
export function usePath(): (path: string) => string {
  const id = useCat().exam.id;
  return (path) => (path === '/' ? `/${id}` : `/${id}${path}`);
}
