/** Форма слова после числа: plural(1, 'вопрос', 'вопроса', 'вопросов') → «вопрос», 2 → «вопроса», 5 → «вопросов». */
export function plural(n: number, one: string, few: string, many: string): string {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
}

/** Число со словом в нужной форме: «124 вопроса», «11 вопросов», «1 лемма». */
export const count = (n: number, one: string, few: string, many: string) => `${n} ${plural(n, one, few, many)}`;
