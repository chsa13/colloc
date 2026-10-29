import type { Exam } from '../../src/content/schema';
import { spaces } from './spaces';
import { maps } from './maps';
import { kernel } from './kernel';
import { tasks } from './tasks';
import { how } from './how';

export const linalKr2: Exam = {
  id: 'linal-kr2',
  subject: 'Линейная алгебра и геометрия',
  kind: 'Контрольная работа 2',
  short: 'КР2 по линалу',
  icon: 'λ',
  dates: ['2026-11-05', '2026-11-05'],
  when: '5 ноября, 10:00–11:00',
  format: '60 минут письменно, без материалов',
  scope: 'Недели 6–8: пространства и базисы, линейные отображения и их матрицы, ядро, образ, прямая сумма',
  levels: false,
  star: 'red',
  features: ['topics', 'cards', 'proofs', 'tasks', 'mock'],
  mock: {
    kind: 'test',
    title: 'Пробная КР',
    minutes: 60,
    slots: [
      { label: 'Подпространства, базис, размерность, координаты', topics: ['spaces'], types: ['compute', 'construct'] },
      { label: 'Матрица отображения, замена базиса', topics: ['maps'], types: ['compute', 'construct'] },
      { label: 'Ядро, образ, сумма, пересечение, проекции', topics: ['kernel'], types: ['compute', 'construct'] },
      { label: 'Верно ли? (с обоснованием)', types: ['true-false'] },
      { label: 'Верно ли? (с обоснованием)', types: ['true-false'] },
      { label: 'Докажите', types: ['prove'] },
    ],
  },
  tasksNote:
    'Задачи по мотивам ДЗ и семинаров недель 6–8, числа изменены. Лектор обещает мало счёта и упор на «почему»: попробуй увидеть ответ без вычислений. Сначала реши сам, потом открывай подсказки по одной, и только потом решение.',
  how,
  topics: [spaces, maps, kernel],
  tasks,
};
