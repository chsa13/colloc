import { md, type Topic } from '../../src/content/schema';

// Лонгриды 16, 17, 19, 20. Арифметика пределов, определение по Коши, непрерывность, пределы на бесконечности.

export const limitArith: Topic = {
  id: 'limit-arith',
  title: 'Арифметика пределов',
  longread: 16,
  units: [
    {
      id: 'limit-ops',
      title: 'Арифметические операции с пределами',
      source: 'Лонгрид 16, §1; лонгрид 17, теорема 17.1',
      statement: {
        level: 'basic',
        text: md`Пусть существуют конечные пределы $\lim\limits_{x\to a}f(x)$ и $\lim\limits_{x\to a}g(x)$, $c\in\mathbb R$. Тогда
1. $\lim\limits_{x\to a}[f(x)\pm g(x)]=\lim\limits_{x\to a}f(x)\pm\lim\limits_{x\to a}g(x)$;
2. $\lim\limits_{x\to a}[c\,f(x)]=c\lim\limits_{x\to a}f(x)$;
3. $\lim\limits_{x\to a}[f(x)\,g(x)]=\lim\limits_{x\to a}f(x)\cdot\lim\limits_{x\to a}g(x)$;
4. $\lim\limits_{x\to a}\dfrac{f(x)}{g(x)}=\dfrac{\lim_{x\to a}f(x)}{\lim_{x\to a}g(x)}$, если $\lim\limits_{x\to a}g(x)\ne0$.`,
      },
      notes: md`Следствия: $\lim c=c$, $\lim x=a$, $\lim x^n=a^n$, $\lim\sqrt[n]x=\sqrt[n]a$ (для чётного $n$ — при $a>0$); для многочлена $\lim P(x)=P(a)$, для рациональной функции $\lim\dfrac{P(x)}{Q(x)}=\dfrac{P(a)}{Q(a)}$ при $Q(a)\ne0$.

Если $f(x)=g(x)$ при всех $x\ne a$, то $\lim f=\lim g$ — так сокращают неопределённость $\tfrac00$: $\lim\limits_{x\to2}\dfrac{x^2-4}{x-2}=\lim\limits_{x\to2}(x+2)=4$.

Доказательство для суммы (лонгрид 17): для $\varepsilon>0$ берём $\delta_1,\delta_2$ для $\tfrac\varepsilon2$ и $\delta=\min(\delta_1,\delta_2)$; по неравенству треугольника $|f+g-b_1-b_2|\le|f-b_1|+|g-b_2|<\varepsilon$.`,
      pitfalls: [
        md`Теоремы требуют, чтобы **оба** предела существовали: $\lim(f+g)$ может существовать, когда $\lim f$ и $\lim g$ нет.`,
        md`При $\lim g=0$ правило частного не применяется — сначала преобразуй выражение (сократи, домножь на сопряжённое).`,
      ],
    },
    {
      id: 'limit-criterion',
      title: 'Критерий существования предела функции в точке',
      source: 'Лонгрид 16, теорема 16.1',
      statement: {
        level: 'basic',
        text: md`Предел функции в точке $a$ существует тогда и только тогда, когда существуют и совпадают односторонние пределы:
$$\lim_{x\to a}f(x)=b\iff\lim_{x\to a-}f(x)=\lim_{x\to a+}f(x)=b.$$`,
      },
      notes: md`Применение: доказать, что предела **нет**, — найти разные односторонние пределы. $\lim\limits_{x\to0}\dfrac{|x|}{x}$ не существует: слева $-1$, справа $1$.

Типично для кусочных функций и $\lfloor x\rfloor$ в целых точках.`,
      pitfalls: [
        'Одного одностороннего предела мало: нужно, чтобы оба существовали и были равны.',
        'Значение f(a) в критерии не участвует.',
      ],
    },
    {
      id: 'limit-ineq',
      title: 'Свойства пределов, связанные с неравенствами',
      source: 'Лонгрид 16, теоремы 16.2, 16.3',
      statement: {
        level: 'basic',
        text: md`**Предельный переход в неравенстве.** Если $f(x)\le g(x)$ при $x$ вблизи $a$ (кроме, может быть, самой $a$) и оба предела существуют, то
$$\lim_{x\to a}f(x)\le\lim_{x\to a}g(x).$$
**Теорема о зажатой функции.** Если $f(x)\le g(x)\le h(x)$ при $x$ вблизи $a$ и $\lim\limits_{x\to a}f(x)=\lim\limits_{x\to a}h(x)=b$, то $\lim\limits_{x\to a}g(x)=b$.`,
      },
      notes: md`Пример: $\lim\limits_{x\to0}x^2\sin\dfrac1x=0$, так как $-x^2\le x^2\sin\frac1x\le x^2$.

В теореме о зажатой функции существование $\lim g$ **выводится**, а в предельном переходе существование пределов — условие.`,
      pitfalls: [
        md`Строгое неравенство при переходе к пределу становится нестрогим: $-x^2<x^2$ при $x\ne0$, но пределы оба равны 0.`,
        'Для зажатой функции пределы f и h должны совпадать.',
      ],
    },
  ],
};

export const limitDef: Topic = {
  id: 'limit-def',
  title: 'Математически строгое определение предела функции в точке',
  longread: 17,
  units: [
    {
      id: 'limit-cauchy',
      title: 'Предел функции в точке',
      source: 'Лонгрид 17, определение 17.1',
      definition: {
        level: 'basic',
        text: md`Пусть $f$ определена в окрестности точки $a$, кроме, может быть, самой $a$. Число $b$ — **предел** $f$ при $x\to a$, если для любого $\varepsilon>0$ существует $\delta>0$ такое, что для всех $x$ с $0<|x-a|<\delta$ выполнено $|f(x)-b|<\varepsilon$:
$$\lim_{x\to a}f(x)=b\iff\forall\varepsilon>0\ \exists\delta>0:\ \forall x:\ 0<|x-a|<\delta\ \Rightarrow\ |f(x)-b|<\varepsilon.$$`,
      },
      notes: md`Интервальная форма: если $x\in(a-\delta;a+\delta)$, $x\ne a$, то $f(x)\in(b-\varepsilon;b+\varepsilon)$.

Значение $f(a)$ на предел не влияет — функция может быть даже не определена в $a$.

Как доказывать по определению: (1) черновик — из $|f(x)-b|<\varepsilon$ подобрать $\delta(\varepsilon)$; (2) чистовик — «пусть $\varepsilon>0$, положим $\delta=\dots$, тогда при $0<|x-a|<\delta$ …». Пример: $\lim\limits_{x\to3}(4x-5)=7$, $\delta=\varepsilon/4$.

Отрицание: $\exists\varepsilon>0\ \forall\delta>0\ \exists x:\ 0<|x-a|<\delta,\ |f(x)-b|\ge\varepsilon$.`,
      pitfalls: [
        md`$0<|x-a|$ — окрестность **проколотая**: точку $a$ исключаем.`,
        md`Порядок кванторов важен: $\delta$ подбирается по $\varepsilon$ ($\forall\varepsilon\ \exists\delta$), а не наоборот.`,
        md`$\delta$ не должна зависеть от $x$.`,
      ],
    },
    {
      id: 'one-sided',
      title: 'Односторонние пределы',
      source: 'Лонгрид 17, определения 17.2, 17.3',
      definition: {
        level: 'basic',
        text: md`**Левый предел** (предел слева):
$$\lim_{x\to a-}f(x)=b\iff\forall\varepsilon>0\ \exists\delta>0:\ \forall x\in(a-\delta;a)\ \ |f(x)-b|<\varepsilon.$$
**Правый предел** (предел справа):
$$\lim_{x\to a+}f(x)=b\iff\forall\varepsilon>0\ \exists\delta>0:\ \forall x\in(a;a+\delta)\ \ |f(x)-b|<\varepsilon.$$`,
      },
      notes: md`Отличие от обычного предела — только множество $x$: интервал слева $(a-\delta;a)$ или справа $(a;a+\delta)$. Другие обозначения: $x\to a-0$, $x\to a+0$.

Пример: $\lim\limits_{x\to0+}\sqrt x=0$ (взять $\delta=\varepsilon^2$); слева $\sqrt x$ не определена.`,
      pitfalls: ['Интервалы открытые: сама точка a не входит.', 'Левый предел — x < a, x приближается к a слева.'],
    },
    {
      id: 'infinite-limit',
      title: 'Предел, равный ±∞',
      source: 'Лонгрид 17, определения 17.4, 17.5',
      definition: {
        level: 'basic',
        text: md`Пусть $f$ определена в окрестности $a$, кроме, может быть, самой $a$.
$$\lim_{x\to a}f(x)=+\infty\iff\forall E>0\ \exists\delta>0:\ \forall x:\ 0<|x-a|<\delta\ \Rightarrow\ f(x)>E;$$
$$\lim_{x\to a}f(x)=-\infty\iff\forall E>0\ \exists\delta>0:\ \forall x:\ 0<|x-a|<\delta\ \Rightarrow\ f(x)<-E.$$`,
      },
      notes: md`Пример: $\lim\limits_{x\to0}\dfrac1{x^2}=+\infty$: при $0<|x|<\delta=\tfrac1{\sqrt E}$ имеем $\tfrac1{x^2}>E$.

Односторонние бесконечные пределы — так же с интервалами $(a-\delta;a)$ или $(a;a+\delta)$. Они дают вертикальные асимптоты.

Бесконечный предел — это **не** существующий предел в смысле числа: арифметика пределов к нему напрямую не применяется.`,
      pitfalls: [
        md`Для $-\infty$ неравенство $f(x)<-E$, а не $|f(x)|>E$ (это был бы предел $\infty$ без знака).`,
        md`$\lim\limits_{x\to0}\dfrac1x$ не равен ни $+\infty$, ни $-\infty$: справа $+\infty$, слева $-\infty$.`,
      ],
    },
  ],
};

export const continuity: Topic = {
  id: 'continuity',
  title: 'Непрерывность функции в точке',
  longread: 19,
  units: [
    {
      id: 'continuous',
      title: 'Функция, непрерывная в точке',
      source: 'Лонгрид 19, определение 19.1',
      definition: {
        level: 'basic',
        text: md`Функция $f$ **непрерывна в точке** $a$, если
1. $f$ определена в точке $a$;
2. существует $\lim\limits_{x\to a}f(x)$;
3. $\lim\limits_{x\to a}f(x)=f(a)$.

В кванторах: $\forall\varepsilon>0\ \exists\delta>0:\ |x-a|<\delta\Rightarrow|f(x)-f(a)|<\varepsilon$.`,
      },
      notes: md`Если хоть одно условие нарушено, $a$ — точка разрыва.

Непрерывность справа: $\lim\limits_{x\to a+}f(x)=f(a)$, слева: $\lim\limits_{x\to a-}f(x)=f(a)$. Непрерывность на промежутке — в каждой точке (на концах — односторонняя).

Равносильная запись: $\lim\limits_{h\to0}f(a+h)=f(a)$.

Интуиция: график можно нарисовать, не отрывая карандаша; малое изменение $x$ даёт малое изменение $f$.`,
      pitfalls: [
        'Три условия — проверяй все: функция может иметь предел, но быть не определена в точке.',
        md`В кванторной записи окрестность **не** проколотая: при $x=a$ неравенство выполнено автоматически.`,
      ],
    },
    {
      id: 'discontinuity',
      title: 'Классификация точек разрыва',
      source: 'Лонгрид 19, определение 19.2',
      definition: {
        level: 'basic',
        text: md`Пусть $a$ — точка разрыва $f$.
- **Устранимый разрыв:** существует конечный $\lim\limits_{x\to a}f(x)$, но $f$ в точке $a$ не определена или $f(a)\ne\lim\limits_{x\to a}f(x)$.
- **Разрыв первого рода** (скачок): конечные односторонние пределы существуют, но различны.
- **Разрыв второго рода:** хотя бы один односторонний предел не существует или бесконечен.`,
      },
      notes: md`Примеры: $\dfrac{x^2-1}{x-1}$ в $x=1$ — устранимый (предел 2, функция не определена); $\lfloor x\rfloor$ в целых точках — первого рода (скачок 1); $\dfrac1{x^2}$ в $0$ — второго рода (предел $+\infty$); $\sin\dfrac1x$ в $0$ — второго рода (предела нет).

Устранимый разрыв убирается переопределением одного значения $f(a)$.`,
      pitfalls: [
        'Скачок — разрыв первого рода, а не второго.',
        'Бесконечный односторонний предел — уже второй род, даже если другой односторонний предел конечен.',
      ],
    },
    {
      id: 'cont-arith',
      title: 'Теорема о непрерывной функции',
      source: 'Лонгрид 19, теорема 19.1',
      statement: {
        level: 'basic',
        text: md`Если $f$ и $g$ непрерывны в точке $a$, то в этой точке непрерывны $f+g$, $f-g$, $c\cdot f$ ($c$ — константа), $f\cdot g$ и $\dfrac fg$ при $g(a)\ne0$.`,
      },
      notes: md`Доказательство (для суммы): $\lim\limits_{x\to a}(f+g)=\lim f+\lim g=f(a)+g(a)=(f+g)(a)$ по арифметике пределов; остальные — так же.

То же на промежутке: непрерывные на нём $f,g$ дают непрерывные $f\pm g$, $cf$, $fg$, $f/g$ (если $g\ne0$ на промежутке).

Ещё: композиция непрерывных непрерывна — если $g$ непрерывна в $a$, а $f$ в $g(a)$, то $f\circ g$ непрерывна в $a$; и $\lim\limits_{x\to a}f(g(x))=f\left(\lim\limits_{x\to a}g(x)\right)$ при $f$, непрерывной в точке $\lim g$.`,
      pitfalls: [
        md`Для частного нужно $g(a)\ne0$.`,
        md`Сумма разрывных функций может быть непрерывной: $f=\operatorname{sign}x$, $g=-\operatorname{sign}x$. Теорема работает только в одну сторону.`,
      ],
      uses: ['limit-ops'],
    },
    {
      id: 'cont-rational',
      title: 'Теорема о непрерывности рациональной функции',
      source: 'Лонгрид 19, теорема 19.2',
      statement: {
        level: 'basic',
        text: md`1. Любой многочлен $P(x)=b_nx^n+\dots+b_1x+b_0$ непрерывен на $\mathbb R$.
2. Любая рациональная функция $\dfrac{P(x)}{Q(x)}$ непрерывна на своей области определения (везде, где $Q(x)\ne0$).`,
      },
      notes: md`Почему: $\lim\limits_{x\to a}x=a$, $\lim c=c$, по арифметике пределов $\lim P(x)=b_na^n+\dots+b_0=P(a)$; для дроби — предел частного при $Q(a)\ne0$.

Практический вывод: предел рациональной функции в точке области определения — просто подстановка.`,
      pitfalls: ['В нулях знаменателя рациональная функция не определена — там разрыв (устранимый или второго рода), а не непрерывность.'],
      uses: ['limit-ops', 'cont-arith'],
    },
    {
      id: 'cont-elementary',
      title: 'Теорема о непрерывности элементарных функций (непрерывность sin x)',
      source: 'Лонгрид 19, теорема 19.3, пример 19.5',
      statement: {
        level: 'basic',
        text: md`Элементарные функции — многочлены, рациональные функции, корни, тригонометрические и обратные тригонометрические, показательные функции и логарифмы — **непрерывны на своей области определения**.

В частности, $y=\sin x$ непрерывна на $\mathbb R$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Непрерывность в $a$ равносильна $\lim\limits_{h\to0}\sin(a+h)=\sin a$; раскрываем синус суммы и пользуемся $\sin h\to0$, $\cos h\to1$.`,
        steps: [
          {
            title: md`Переходим к приращению $h$`,
            body: md`Замена $x=a+h$: условие $\lim\limits_{x\to a}f(x)=f(a)$ равносильно $\lim\limits_{h\to0}f(a+h)=f(a)$ ($x\to a\iff h\to0$, $|x-a|=|h|$). Нужно доказать $\lim\limits_{h\to0}\sin(a+h)=\sin a$ для любого $a$.`,
          },
          {
            title: 'Синус суммы',
            body: md`$\sin(a+h)=\sin a\cos h+\cos a\sin h$, где $\sin a$, $\cos a$ — константы.`,
          },
          {
            title: 'Арифметика пределов',
            body: md`$\lim\limits_{h\to0}\sin(a+h)=\sin a\cdot\lim\limits_{h\to0}\cos h+\cos a\cdot\lim\limits_{h\to0}\sin h=\sin a\cdot1+\cos a\cdot0=\sin a$.`,
          },
          {
            title: md`Откуда $\sin h\to0$ и $\cos h\to1$`,
            body: md`$|\sin h|\le|h|$ (дуга единичной окружности длиннее хорды), так что $\sin h\to0$ по теореме о зажатой функции. $\cos h=1-2\sin^2\tfrac h2\to1$ по арифметике пределов.`,
          },
        ],
      },
      notes: md`$\cos x$ — аналогично ($\cos(a+h)=\cos a\cos h-\sin a\sin h$). $\operatorname{tg}x$ и $\operatorname{ctg}x$ непрерывны на области определения как частные непрерывных. Обратная к непрерывной монотонной функции непрерывна (график отражается относительно $y=x$).

Пример: $f(x)=\dfrac{\ln x+\operatorname{arctg}x}{x^2-1}$ непрерывна на $(0;1)\cup(1;+\infty)$.`,
      pitfalls: [
        'Непрерывность — на области определения: tg x разрывна в π/2 + πk, потому что там не определена.',
        md`В доказательстве для $\sin x$ точка $a$ произвольная — нужно получить ответ для всех $a\in\mathbb R$, а не только для $a=0$.`,
      ],
      uses: ['limit-ops', 'limit-ineq'],
    },
  ],
};

export const limitInf: Topic = {
  id: 'limit-inf',
  title: 'Предел функции на бесконечности',
  longread: 20,
  units: [
    {
      id: 'asymptotes',
      title: 'Вертикальные и горизонтальные асимптоты',
      source: 'Лонгрид 20, определение 20.3, §4; лонгрид 14, определение 14.4',
      definition: {
        level: 'basic',
        text: md`Прямая $y=b$ — **горизонтальная асимптота** графика $y=f(x)$, если $\lim\limits_{x\to+\infty}f(x)=b$ или $\lim\limits_{x\to-\infty}f(x)=b$.

Прямая $x=a$ — **вертикальная асимптота**, если хотя бы один односторонний предел бесконечен: $\lim\limits_{x\to a-}f(x)=\pm\infty$ или $\lim\limits_{x\to a+}f(x)=\pm\infty$.`,
      },
      notes: md`Пример: $f(x)=\dfrac{x^2-1}{x^2+1}$ — горизонтальная $y=1$; $f(x)=\dfrac{2x+1}{x-3}$ — горизонтальная $y=2$, вертикальная $x=3$.

Вертикальные асимптоты ищем в нулях знаменателя и на границах области определения; но $\dfrac{x^2-1}{x-1}$ в $x=1$ асимптоты не имеет (устранимый разрыв).`,
      pitfalls: [
        'Ноль знаменателя — только кандидат на вертикальную асимптоту: сначала посчитай односторонние пределы.',
        md`Горизонтальные асимптоты при $+\infty$ и $-\infty$ могут быть разными (например, у $\operatorname{arctg}x$: $y=\pm\frac\pi2$).`,
      ],
    },
    {
      id: 'limit-at-inf',
      title: 'Предел функции при x → ±∞',
      source: 'Лонгрид 20, определения 20.4, 20.5',
      definition: {
        level: 'basic',
        text: md`Пусть $f$ определена на $(a;+\infty)$.
$$\lim_{x\to+\infty}f(x)=b\iff\forall\varepsilon>0\ \exists x_0:\ \forall x>x_0\ \ |f(x)-b|<\varepsilon.$$
Пусть $f$ определена на $(-\infty;a)$.
$$\lim_{x\to-\infty}f(x)=b\iff\forall\varepsilon>0\ \exists x_0:\ \forall x<x_0\ \ |f(x)-b|<\varepsilon.$$`,
      },
      notes: md`Смысл: значения $f$ сколь угодно близки к $b$ при достаточно больших (по модулю отрицательных) $x$. $\pm\infty$ — не числа, а указание на неограниченный рост/убывание $x$.

Полезное: $\lim\limits_{x\to\pm\infty}\dfrac1{x^r}=0$ при $r>0$; для отношения многочленов одинаковой степени предел равен отношению старших коэффициентов.

Пример по определению: $\lim\limits_{x\to+\infty}\dfrac1x=0$, $x_0=\tfrac1\varepsilon$.`,
      pitfalls: [
        md`Для $x\to-\infty$ условие $x<x_0$, а не $x>x_0$.`,
        md`$x_0$ подбирается по $\varepsilon$ и не зависит от $x$.`,
      ],
    },
    {
      id: 'inf-at-inf',
      title: 'Предел, равный ±∞ при x → ±∞',
      source: 'Лонгрид 20, определение 20.6',
      definition: {
        level: 'basic',
        text: md`$$\lim_{x\to+\infty}f(x)=+\infty\iff\forall E>0\ \exists x_0:\ \forall x>x_0\ \ f(x)>E.$$
Аналогично остальные случаи:
- $\lim\limits_{x\to+\infty}f(x)=-\infty$: $\forall E>0\ \exists x_0:\ \forall x>x_0\ \ f(x)<-E$;
- $\lim\limits_{x\to-\infty}f(x)=+\infty$: $\forall E>0\ \exists x_0:\ \forall x<x_0\ \ f(x)>E$;
- $\lim\limits_{x\to-\infty}f(x)=-\infty$: $\forall E>0\ \exists x_0:\ \forall x<x_0\ \ f(x)<-E$.`,
      },
      notes: md`Пример: $\lim\limits_{x\to+\infty}x^3=+\infty$: при $x>x_0=\sqrt[3]E$ имеем $x^3>E$. $\lim\limits_{x\to-\infty}x^3=-\infty$, $\lim\limits_{x\to-\infty}x^2=+\infty$.`,
      pitfalls: [
        'Два «бесконечных» места: куда стремится x (условие x > x₀ или x < x₀) и куда стремится f (f > E или f < −E). Не перепутай.',
      ],
    },
  ],
};
