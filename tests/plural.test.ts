import { describe, expect, it } from 'vitest';
import { count } from '../src/plural';

describe('plural', () => {
  it('chooses the Russian form after a number', () => {
    const q = (n: number) => count(n, 'вопрос', 'вопроса', 'вопросов');
    expect([1, 2, 4, 5, 11, 12, 14, 20, 21, 22, 25, 111, 112, 121, 124].map(q)).toEqual([
      '1 вопрос', '2 вопроса', '4 вопроса', '5 вопросов', '11 вопросов', '12 вопросов', '14 вопросов', '20 вопросов',
      '21 вопрос', '22 вопроса', '25 вопросов', '111 вопросов', '112 вопросов', '121 вопрос', '124 вопроса',
    ]);
  });
});
