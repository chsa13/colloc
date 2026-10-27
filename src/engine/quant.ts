// Генератор заданий «запиши в кванторах и неравенствах» в обозначениях курса
// (ε для значения, δ для аргумента; как в лонгриде 14, пример 6).

import { shuffle } from './ticket';

export type PointType = 'a' | 'a+0' | 'a-0' | '+inf' | '-inf' | 'inf' | 'seq';
export type ValueType = 'A' | '+inf' | '-inf' | 'inf';

export interface QuantProblem {
  point: PointType;
  value: ValueType;
  a: number;
  A: number;
  negate: boolean;
}

export const POINT_LABEL: Record<PointType, string> = {
  a: 'x → a',
  'a+0': 'x → a+0',
  'a-0': 'x → a−0',
  '+inf': 'x → +∞',
  '-inf': 'x → −∞',
  inf: 'x → ∞',
  seq: 'n → ∞ (последовательность)',
};

export const VALUE_LABEL: Record<ValueType, string> = {
  A: 'конечное A',
  '+inf': '+∞',
  '-inf': '−∞',
  inf: '∞',
};

const pick = <T,>(xs: readonly T[]): T => xs[Math.floor(Math.random() * xs.length)];

export function randomProblem(points: PointType[], values: ValueType[], allowNegation: boolean): QuantProblem {
  return {
    point: pick(points),
    value: pick(values),
    a: pick([-3, -2, -1, 0, 1, 2, 3, 5]),
    A: pick([-4, -1, 0, 2, 4, 7, 47]),
    negate: allowNegation && Math.random() < 0.4,
  };
}

/** x − a с аккуратными знаками: x − 3, x + 2, x. */
function shift(v: string, a: number): string {
  if (a === 0) return v;
  return a > 0 ? `${v}-${a}` : `${v}+${-a}`;
}

function limitTex(p: QuantProblem): string {
  const val = { A: String(p.A), '+inf': '+\\infty', '-inf': '-\\infty', inf: '\\infty' }[p.value];
  const rel = p.negate ? '\\ne' : '=';
  if (p.point === 'seq') return `\\lim_{n\\to\\infty}x_n${rel}${val}`;
  const to = {
    a: String(p.a),
    'a+0': `${p.a}+0`,
    'a-0': `${p.a}-0`,
    '+inf': '+\\infty',
    '-inf': '-\\infty',
    inf: '\\infty',
  }[p.point];
  return `\\lim_{x\\to ${to}}f(x)${rel}${val}`;
}

function pointCond(t: PointType, a: number): string {
  const d = shift('x', a);
  switch (t) {
    case 'a':
      return a === 0 ? '0<|x|<\\delta' : `0<|${d}|<\\delta`;
    case 'a+0':
      return `0<${d}<\\delta`;
    case 'a-0':
      return `-\\delta<${d}<0`;
    case '+inf':
      return 'x>\\delta';
    case '-inf':
      return 'x<-\\delta';
    case 'inf':
      return '|x|>\\delta';
    case 'seq':
      return 'n\\ge N';
  }
}

function valueCond(t: ValueType, A: number, seq: boolean, negated: boolean): string {
  const f = seq ? 'x_n' : 'f(x)';
  const diff = A === 0 ? `|${f}|` : `|${shift(f, A)}|`;
  if (!negated) {
    return { A: `${diff}<\\varepsilon`, '+inf': `${f}>\\varepsilon`, '-inf': `${f}<-\\varepsilon`, inf: `|${f}|>\\varepsilon` }[t];
  }
  return { A: `${diff}\\ge\\varepsilon`, '+inf': `${f}\\le\\varepsilon`, '-inf': `${f}\\ge-\\varepsilon`, inf: `|${f}|\\le\\varepsilon` }[t];
}

type Mistake = 'none' | 'swap-quantifiers' | 'half-negation';

function formula(p: QuantProblem, mistake: Mistake = 'none'): string {
  const seq = p.point === 'seq';
  const P = pointCond(p.point, p.a);
  const negate = p.negate;
  if (!negate || mistake === 'half-negation') {
    // утверждение (или «полуотрицание»: отрицали только неравенство)
    const Q = valueCond(p.value, p.A, seq, negate);
    if (seq) {
      const head =
        mistake === 'swap-quantifiers'
          ? '\\exists N\\in\\mathbb N:\\ \\forall\\varepsilon>0\\ \\ \\forall n\\ge N'
          : '\\forall\\varepsilon>0\\ \\ \\exists N\\in\\mathbb N:\\ \\forall n\\ge N';
      return `${head}\\ \\ ${Q}`;
    }
    const head =
      mistake === 'swap-quantifiers'
        ? '\\exists\\delta>0:\\ \\forall\\varepsilon>0\\ \\ \\forall x:'
        : '\\forall\\varepsilon>0\\ \\ \\exists\\delta>0:\\ \\forall x:';
    return `${head}\\ ${P}\\ \\ ${Q}`;
  }
  const Q = valueCond(p.value, p.A, seq, true);
  if (seq) {
    const head =
      mistake === 'swap-quantifiers'
        ? '\\forall N\\in\\mathbb N\\ \\ \\exists\\varepsilon>0:\\ \\exists n\\ge N:'
        : '\\exists\\varepsilon>0:\\ \\forall N\\in\\mathbb N\\ \\ \\exists n\\ge N:';
    return `${head}\\ ${Q}`;
  }
  const head =
    mistake === 'swap-quantifiers'
      ? '\\forall\\delta>0\\ \\ \\exists\\varepsilon>0:\\ \\exists x:'
      : '\\exists\\varepsilon>0:\\ \\forall\\delta>0\\ \\ \\exists x:';
  return `${head}\\ (${P})\\wedge(${Q})`;
}

export interface QuantQuestion {
  problem: QuantProblem;
  prompt: string;
  answer: string;
  /** варианты для режима «выбери верную запись»; correct — индекс верного */
  options: string[];
  correct: number;
}

const NEIGHBOR_POINT: Record<PointType, PointType[]> = {
  a: ['a+0', 'a-0'],
  'a+0': ['a-0', 'a'],
  'a-0': ['a+0', 'a'],
  '+inf': ['inf', '-inf'],
  '-inf': ['inf', '+inf'],
  inf: ['+inf', '-inf'],
  seq: [],
};

const NEIGHBOR_VALUE: Record<ValueType, ValueType[]> = {
  A: ['inf'],
  '+inf': ['inf', '-inf'],
  '-inf': ['inf', '+inf'],
  inf: ['+inf', '-inf'],
};

export function makeQuestion(p: QuantProblem): QuantQuestion {
  const answer = formula(p);
  const distractors = new Set<string>();
  const cands: string[] = [formula(p, 'swap-quantifiers')];
  if (p.negate) cands.push(formula(p, 'half-negation'));
  for (const pt of NEIGHBOR_POINT[p.point]) cands.push(formula({ ...p, point: pt }));
  for (const v of NEIGHBOR_VALUE[p.value]) cands.push(formula({ ...p, value: v }));
  if (p.point === 'a') cands.push(formula(p).replace('0<|', '|'));
  for (const c of shuffle(cands)) {
    if (c !== answer) distractors.add(c);
    if (distractors.size >= 3) break;
  }
  const options = shuffle([answer, ...distractors]);
  return {
    problem: p,
    prompt: limitTex(p),
    answer,
    options,
    correct: options.indexOf(answer),
  };
}
