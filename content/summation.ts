import { md, type Topic } from '../src/content/schema';

export const summation: Topic = {
  id: 'summation',
  title: 'Суммирование',
  longread: 5,
  units: [
    {
      id: 'means-def',
      title: 'Среднее арифметическое, геометрическое, гармоническое, квадратическое',
      source: 'Лонгрид 5, определение 1',
      definition: {
        level: 'advanced',
        text: md`Для чисел $x_1,\dots,x_n$:
- **среднее арифметическое**: $\dfrac{x_1+\dots+x_n}n=\dfrac1n\sum\limits_{k=1}^nx_k$;
- **среднее геометрическое** (для неотрицательных): $\sqrt[n]{x_1x_2\cdots x_n}$;
- **среднее гармоническое** (для ненулевых): $\dfrac n{\frac1{x_1}+\dots+\frac1{x_n}}$;
- **среднее квадратическое**: $\sqrt{\dfrac{x_1^2+\dots+x_n^2}n}$.`,
      },
    },
    {
      id: 'means-ineq',
      title: 'Неравенства о средних',
      source: 'Лонгрид 5, лемма 3, теорема 1',
      statement: {
        level: 'advanced',
        text: md`Для положительных $x_1,\dots,x_n$:
$$\frac n{\sum\frac1{x_k}}\ \le\ \sqrt[n]{\prod x_k}\ \le\ \frac1n\sum x_k\ \le\ \sqrt{\frac1n\sum x_k^2},$$
причём в каждом равенство $\iff x_1=\dots=x_n$. (гармоническое $\le$ геометрическое $\le$ арифметическое $\le$ квадратическое)`,
      },
      proof: {
        level: 'advanced',
        idea: md`Лемма: если $\prod x_k=1$, то $\sum x_k\ge n$ (индукция, склеиваем $x_1>1$ и $x_2<1$). Первые два неравенства — лемма для чисел $\frac{G}{x_k}$ и $\frac{x_k}G$; третье — сумма квадратов разностей.`,
        steps: [
          {
            title: 'Лемма: база $n=2$',
            body: md`$x_1x_2=1$: $x_1+\frac1{x_1}=\frac{(x_1-1)^2}{x_1}+2\ge2$, равенство только при $x_1=1$.`,
          },
          {
            title: md`Лемма: шаг, случай «все $\le1$»`,
            body: md`Если среди $x_1,\dots,x_{n+1}$ (произведение 1) нет чисел $>1$, то все равны 1.`,
          },
          {
            title: 'Лемма: шаг, $x_1>1>x_2$',
            body: md`Есть $x_1>1$ — тогда есть и $x_2<1$. По предположению для $n$ чисел $(x_1x_2),x_3,\dots,x_{n+1}$: $x_1x_2+x_3+\dots+x_{n+1}\ge n$. Прибавим $x_1+x_2-x_1x_2$: $$\sum x_k\ge n+1-(x_1-1)(x_2-1)>n+1.$$`,
          },
          {
            title: 'Гарм. ≤ геом. и геом. ≤ арифм.',
            body: md`Пусть $G=\sqrt[n]{\prod x_k}$. Числа $\frac G{x_k}$ и числа $\frac{x_k}G$ имеют произведение 1, по лемме $\sum\frac G{x_k}\ge n$ и $\sum\frac{x_k}G\ge n$ — это и есть оба неравенства.`,
          },
          {
            title: 'Арифм. ≤ квадр.',
            body: md`Равносильно $\left(\sum x_k\right)^2\le n\sum x_k^2\iff(n-1)\sum x_k^2-\sum_{i\ne j}x_ix_j\ge0$, а левая часть равна $\sum_{i<j}(x_i-x_j)^2\ge0$. $\blacksquare$`,
          },
        ],
      },
    },
  ],
};
