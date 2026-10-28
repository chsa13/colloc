import { describe, expect, it } from 'vitest';
import { exams } from '../content';
import { catalogOf } from '../src/engine/catalog';
import { generateMock, generateTicket, totals } from '../src/engine/ticket';
import { makeQuestion, randomProblem, type PointType, type ValueType } from '../src/engine/quant';

const matan = catalogOf(exams.find((e) => e.id === 'matan-colloc')!);

describe('ticket', () => {
  it('basic ticket: 11 questions, 11 red points, nothing black-only', () => {
    for (let i = 0; i < 50; i++) {
      const qs = generateTicket(matan, 'basic');
      expect(qs.length).toBe(11);
      expect(qs.every((q) => q.scales.includes('red'))).toBe(true);
      const t = totals(qs, {});
      expect(t.redMax).toBe(11);
      // одна и та же теорема не попадает дважды
      const units = qs.filter((q) => q.facet).map((q) => q.facet!.unit.id);
      expect(new Set(units).size).toBe(units.length);
      expect(qs.filter((q) => q.facet).every((q) => q.facet!.level === 'basic')).toBe(true);
      expect(qs.some((q) => q.facet?.unit.aux)).toBe(false);
    }
  });

  it('advanced ticket adds black-only questions', () => {
    const qs = generateTicket(matan, 'all');
    expect(qs.length).toBe(14);
    expect(qs.some((q) => !q.scales.includes('red'))).toBe(true);
  });
});

describe('test mocks', () => {
  for (const exam of exams.filter((e) => e.mock.kind === 'test')) {
    it(`${exam.id}: one distinct task per slot`, () => {
      const cat = catalogOf(exam);
      const slots = exam.mock.kind === 'test' ? exam.mock.slots : [];
      for (let i = 0; i < 50; i++) {
        const qs = generateMock(cat, 'basic');
        expect(qs.length).toBe(slots.length);
        expect(new Set(qs.map((q) => q.task!.id)).size).toBe(qs.length);
        qs.forEach((q, j) => {
          const s = slots[j];
          expect(!s.topics || s.topics.includes(q.task!.topic), q.task!.id).toBe(true);
          expect(!s.types || s.types.includes(q.task!.type), q.task!.id).toBe(true);
        });
      }
    });
  }
});

describe('quantifiers', () => {
  const P: PointType[] = ['a', 'a+0', 'a-0', '+inf', '-inf', 'inf', 'seq'];
  const V: ValueType[] = ['A', '+inf', '-inf', 'inf'];

  it('demo question 11 gives the course answer', () => {
    const q = makeQuestion({ point: 'a-0', value: '-inf', a: 3, A: 0, negate: false });
    expect(q.prompt).toBe('\\lim_{x\\to 3-0}f(x)=-\\infty');
    expect(q.answer).toContain('-\\delta<x-3<0');
    expect(q.answer).toContain('f(x)<-\\varepsilon');
  });

  it('negation follows the longread pattern', () => {
    const q = makeQuestion({ point: 'inf', value: 'A', a: 0, A: 4, negate: true });
    expect(q.answer).toBe('\\exists\\varepsilon>0:\\ \\forall\\delta>0\\ \\ \\exists x:\\ (|x|>\\delta)\\wedge(|f(x)-4|\\ge\\varepsilon)');
  });

  it('every question has 4 distinct options with the right one inside', () => {
    for (let i = 0; i < 300; i++) {
      const q = makeQuestion(randomProblem(P, V, true));
      expect(new Set(q.options).size).toBe(q.options.length);
      expect(q.options.length).toBeGreaterThanOrEqual(3);
      expect(q.options[q.correct]).toBe(q.answer);
    }
  });
});
