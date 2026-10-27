import { md, type Topic } from '../src/content/schema';

export const sets: Topic = {
  id: 'sets',
  title: 'Теория множеств',
  longread: 1,
  units: [
    {
      id: 'equivalent-sets',
      title: 'Эквивалентные множества',
      source: 'Лонгрид 1, определение 8',
      definition: {
        level: 'basic',
        text: md`Множества $A$ и $B$ называются **эквивалентными** (равномощными), $A\sim B$, если между ними можно установить **взаимно однозначное соответствие**, то есть такое, при котором:
1. каждому $a\in A$ соответствует единственный $b\in B$;
2. каждый $b\in B$ соответствует некоторому $a\in A$;
3. разным элементам $A$ соответствуют разные элементы $B$.`,
      },
      notes: md`Пример: $\mathbb N\sim\{2,4,6,\dots\}$ через $n\leftrightarrow 2n$. Бесконечное множество может быть равномощно своей собственной части — у конечных так не бывает.`,
    },
    {
      id: 'countable-set',
      title: 'Счётное множество',
      source: 'Лонгрид 1, определение 9',
      definition: {
        level: 'basic',
        text: md`Множество, **эквивалентное множеству натуральных чисел** $\mathbb N$, называется **счётным**. Иначе: все его элементы можно занумеровать натуральными числами $a_1,a_2,a_3,\dots$`,
      },
      notes: md`Счётны: чётные числа, $\mathbb Z$ (нумерация $0,1,-1,2,-2,\dots$), $\mathbb Q$. Несчётно: $\mathbb R$.`,
    },
    {
      id: 'union-intersection',
      title: 'Свойства операций объединения и пересечения',
      source: 'Лонгрид 1, теорема 1',
      statement: {
        level: 'basic',
        text: md`Для любых множеств $A,B,C$:
1. $A\cup B=B\cup A$, $\;A\cap B=B\cap A$ — коммутативность;
2. $(A\cup B)\cup C=A\cup(B\cup C)$, $\;(A\cap B)\cap C=A\cap(B\cap C)$ — ассоциативность;
3. $A\cup A=A$, $\;A\cap A=A$;
4. $A\cup(B\cap C)=(A\cup B)\cap(A\cup C)$ — дистрибутивность объединения относительно пересечения;
5. $A\cap(B\cup C)=(A\cap B)\cup(A\cap C)$ — дистрибутивность пересечения относительно объединения;
6. если $B\subset A$, то $A\cup B=A$, $\;A\cap B=B$.`,
      },
    },
    {
      id: 'de-morgan',
      title: 'Законы де Моргана',
      source: 'Лонгрид 1, теорема 2',
      statement: {
        level: 'basic',
        text: md`Для любых подмножеств $A$ и $B$ основного множества $E$ (черта — дополнение до $E$: $\overline A=E\setminus A$):
$$\text{а) }\ \overline{A\cup B}=\overline A\cap\overline B;\qquad \text{б) }\ \overline{A\cap B}=\overline A\cup\overline B.$$`,
      },
      notes: md`Идея доказательства (б): $x\in\overline{A\cap B}\iff x\notin A\cap B\iff x\notin A$ или $x\notin B\iff x\in\overline A\cup\overline B$. Круги Эйлера только иллюстрируют закон, но не доказывают его.`,
      pitfalls: ['Не забыть сказать, что A и B — подмножества основного множества E (иначе дополнение не определено).'],
    },
    {
      id: 'inclusion-exclusion',
      title: 'Формула включений и исключений',
      source: 'Лонгрид 1, теорема 4',
      statement: {
        level: 'basic',
        text: md`Для конечных множеств:
$$|A\cup B|=|A|+|B|-|A\cap B|,$$
$$|A\cup B\cup C|=|A|+|B|+|C|-|A\cap B|-|A\cap C|-|B\cap C|+|A\cap B\cap C|.$$
В общем виде для $A_1,\dots,A_n$:
$$\Bigl|\bigcup_{i=1}^n A_i\Bigr|=\sum_{i}|A_i|-\sum_{i<j}|A_i\cap A_j|+\sum_{i<j<k}|A_i\cap A_j\cap A_k|-\dots+(-1)^{n-1}|A_1\cap\dots\cap A_n|.$$`,
      },
    },
    {
      id: 'q-countable',
      title: 'Счётность множества рациональных чисел',
      source: 'Лонгрид 1, пример 9',
      statement: {
        level: 'basic',
        text: md`Множество рациональных чисел $\mathbb Q$ **счётно**.`,
      },
      notes: md`**Обоснование.** Запишем положительные рациональные числа несократимыми дробями в бесконечную таблицу: в $i$-й строке по возрастанию все несократимые дроби со знаменателем $i$. Каждое число встречается ровно один раз. Нумеруем, обходя таблицу по диагоналям («змейкой»): $1,2,\tfrac12,\tfrac13,\tfrac32,3,\dots$ — значит, $\mathbb Q_+=\{q_1,q_2,\dots\}$ счётно. Тогда и $\mathbb Q$ счётно: $0,q_1,-q_1,q_2,-q_2,\dots$`,
    },
  ],
};

export const logic: Topic = {
  id: 'logic',
  title: 'Элементы логики',
  longread: 2,
  units: [
    {
      id: 'logic-ops',
      title: 'Свойства логических операций',
      source: 'Лонгрид 2, теорема 1 (в списке вопросов ошибочно под заголовком «Теория множеств»)',
      statement: {
        level: 'basic',
        text: md`Для любых высказываний $A,B,C$ ($A+B$ — «или», $AB$ — «и», $\overline A$ — «не»):
- коммутативность: $A+B=B+A$, $\;AB=BA$;
- ассоциативность: $(A+B)+C=A+(B+C)$, $\;(AB)C=A(BC)$;
- дистрибутивность: $A(B+C)=AB+AC$;
- формулы поглощения: $A+AB=A$, $\;(A+B)(A+C)=A+BC$;
- законы де Моргана: $\overline{A+B}=\overline A\cdot\overline B$, $\;\overline{AB}=\overline A+\overline B$;
- двойное отрицание: $\overline{\overline A}=A$;
- представление импликации: $A\Rightarrow B=\overline A+B$.`,
      },
      notes: md`Доказываются перебором случаев (таблица истинности). Например, $A\Rightarrow B$ ложна только при $A=1,B=0$ — ровно тогда ложно и $\overline A+B$.`,
    },
  ],
};
