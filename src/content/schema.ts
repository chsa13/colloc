// Типы базы знаний. Тексты — Markdown с формулами KaTeX ($...$ и $$...$$).

/** Уровень курса: basic = основной (🔴), advanced = продвинутый (⚫). */
export type Level = 'basic' | 'advanced';

/** Шкала зачёта в билете: красная (основной) и/или чёрная (продвинутый). */
export type Scale = 'red' | 'black';

/** Грань единицы знания — то, что спрашивают отдельным вопросом. */
export type Kind = 'definition' | 'statement' | 'proof';

export interface TextFacet {
  level: Level;
  text: string;
}

export interface ProofStep {
  /** Короткое название шага — его и надо вспомнить. */
  title: string;
  body: string;
}

export interface ProofFacet {
  level: Level;
  /** Идея доказательства в одну-две строки. */
  idea: string;
  steps: ProofStep[];
}

export interface Unit {
  id: string;
  title: string;
  /** Где искать в лонгридах, например «Лонгрид 10, теорема 2». */
  source: string;
  definition?: TextFacet;
  statement?: TextFacet;
  proof?: ProofFacet;
  /** Примеры, замечания, следствия — показываются в справочнике. */
  notes?: string;
  pitfalls?: string[];
  /** id теорем из курса, на которые доказательство ссылается (их доказывать в ответе не нужно). */
  uses?: string[];
  /**
   * id лемм, которые доказательство использует и которые нужно доказать в ответе.
   * Их доказательства показываются прямо перед основными шагами.
   */
  lemmas?: string[];
  /** Вспомогательное утверждение не из списка вопросов: не попадает в билет как отдельный вопрос. */
  aux?: boolean;
}

export interface Topic {
  id: string;
  title: string;
  /** Номер лонгрида в «Сборнике лонгридов». */
  longread: number;
  units: Unit[];
}

export type TaskType = 'quantifiers' | 'true-false' | 'prove' | 'compute' | 'construct';

export interface Task {
  id: string;
  topic: string;
  /** В какие шкалы идут баллы (как цвет звёздочек в билете). */
  scales: Scale[];
  type: TaskType;
  points: number;
  prompt: string;
  hints: string[];
  answer: string;
  source?: string;
}

/** Разделы сайта, которые есть у экзамена. */
export type Feature = 'topics' | 'cards' | 'proofs' | 'quant' | 'tasks' | 'mock';

/** Позиция пробной контрольной: одна задача из подходящих по теме и типу. */
export interface MockSlot {
  label: string;
  topics?: string[];
  types?: TaskType[];
}

/**
 * Пробник. ticket — билет коллоквиума (теория + задачи, подготовка и ответ по таймеру);
 * test — письменная контрольная из задач банка: решаешь по таймеру, потом проверяешь себя.
 */
export type MockSpec =
  | { kind: 'ticket'; title: string; prepMin: number; answerMin: number }
  | { kind: 'test'; title: string; minutes: number; slots: MockSlot[] };

/** Экзамен (коллоквиум, контрольная…) — всё, что нужно сайту, чтобы собрать для него раздел. */
export interface Exam {
  /** Часть адреса: #/<id>/cards. */
  id: string;
  subject: string;
  /** «Коллоквиум», «Контрольная работа 2». */
  kind: string;
  /** Короткое название для шапки. */
  short: string;
  /** Один символ для значка. */
  icon: string;
  /** Первый и последний день проведения (ISO, YYYY-MM-DD). */
  dates: [string, string];
  /** Когда — по-человечески: «26–30 октября», «5 ноября, 10:00–11:00». */
  when: string;
  /** Формат одной строкой: время, что можно, как сдаётся. */
  format: string;
  /** Что входит: «Лонгриды 1–15», «Темы недель 6–8». */
  scope: string;
  /** Есть ли продвинутый уровень (переключатель 🔴 / 🔴+⚫). */
  levels: boolean;
  features: Feature[];
  mock: MockSpec;
  /** Пояснение над банком задач. */
  tasksNote: string;
  /** Страница «Как устроено»: регламент и советы, Markdown. */
  how: string;
  topics: Topic[];
  tasks: Task[];
}

export const KIND_LABEL: Record<Kind, string> = {
  definition: 'Определение',
  statement: 'Формулировка',
  proof: 'Доказательство',
};

export const TASK_TYPE_LABEL: Record<TaskType, string> = {
  quantifiers: 'Кванторы',
  'true-false': 'Верно ли',
  prove: 'Доказать',
  compute: 'Найти',
  construct: 'Построить',
};

/** Строка с LaTeX без экранирования обратных слешей. */
export const md = String.raw;
