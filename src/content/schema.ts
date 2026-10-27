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

export type TaskType = 'quantifiers' | 'true-false' | 'prove' | 'compute';

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
};

/** Строка с LaTeX без экранирования обратных слешей. */
export const md = String.raw;
