import { md, type Topic } from '../src/content/schema';

export const complex: Topic = {
  id: 'complex',
  title: 'Комплексные числа',
  longread: 12,
  units: [
    {
      id: 'euler-formula',
      title: 'Формула Эйлера',
      source: 'Лонгрид 12, определение 12',
      definition: {
        level: 'basic',
        text: md`По определению $$e^{i\varphi}=\cos\varphi+i\sin\varphi.$$ С её помощью тригонометрическая форма $z=r(\cos\varphi+i\sin\varphi)$ записывается в **показательной форме** $z=re^{i\varphi}$ ($r=|z|$, $\varphi$ — аргумент).`,
      },
      notes: md`Тогда $z_1z_2=r_1r_2e^{i(\varphi_1+\varphi_2)}$, $\frac{z_1}{z_2}=\frac{r_1}{r_2}e^{i(\varphi_1-\varphi_2)}$, $z^n=r^ne^{in\varphi}$.`,
    },
    {
      id: 'de-moivre',
      title: 'Формула Муавра',
      source: 'Лонгрид 12, лемма 4',
      statement: {
        level: 'basic',
        text: md`Если $z=r(\cos\varphi+i\sin\varphi)$, то для любого $n\in\mathbb N$
$$z^n=r^n(\cos n\varphi+i\sin n\varphi).$$`,
      },
      notes: md`Следует из того, что при умножении модули перемножаются, а аргументы складываются (индукция по $n$).`,
    },
  ],
};

export const functionsTopic: Topic = {
  id: 'functions',
  title: 'Функции и их свойства',
  longread: 13,
  units: [
    {
      id: 'rational-function',
      title: 'Рациональная функция',
      source: 'Лонгрид 13, определение 14',
      definition: {
        level: 'basic',
        text: md`**Рациональной** (дробно-рациональной) функцией называют отношение двух многочленов $\dfrac{P(x)}{Q(x)}$.`,
      },
      notes: md`Дробь **правильная**, если $\deg P<\deg Q$, и **неправильная**, если $\deg P\ge\deg Q$ (опр. 15).`,
    },
    {
      id: 'inverse-function-def',
      title: 'Обратная функция',
      source: 'Лонгрид 13, определение 2 и п. 1',
      definition: {
        level: 'basic',
        text: md`Пусть отображение $f:A\to B$ **биективно** (взаимно однозначно: каждому $y\in B$ соответствует ровно один $x\in A$ с $f(x)=y$). **Обратным** называется отображение $g:B\to A$, действующее по правилу: если $f(x)=y$, то $g(y)=x$. Обозначение: $f^{-1}$.

Для функций: если $f:X\to Y$ ($X,Y\subset\mathbb R$) взаимно однозначно отображает $X$ на $Y$, то $f^{-1}:Y\to X$ сопоставляет каждому $y\in Y$ единственное $x\in X$ такое, что $f(x)=y$.`,
      },
      notes: md`Отображение обратимо $\iff$ оно биективно. Графики $y=f(x)$ и $y=f^{-1}(x)$ симметричны относительно $y=x$. $f^{-1}(f(x))=x$, $f(f^{-1}(y))=y$.`,
    },
    {
      id: 'fundamental-algebra',
      title: 'Основная теорема алгебры',
      source: 'Лонгрид 13, теорема 6',
      statement: {
        level: 'basic',
        text: md`Любой многочлен степени $n\ge1$ (с комплексными коэффициентами) имеет **по крайней мере один комплексный корень**.`,
      },
      notes: md`**Следствие.** Многочлен степени $n$ имеет ровно $n$ комплексных корней с учётом кратности: $P_n(z)=a_n(z-z_1)\cdots(z-z_n)$ (по теореме Безу $P_n(z)=(z-z_0)Q_{n-1}(z)$ и т. д.).`,
    },
  ],
};

export const funcLimit: Topic = {
  id: 'func-limit',
  title: 'Предел функции',
  longread: 14,
  units: [
    {
      id: 'cauchy-limit-def',
      title: 'Предел функции в точке по Коши',
      source: 'Лонгрид 14, определение 1',
      definition: {
        level: 'basic',
        text: md`Пусть $f$ определена в некоторой проколотой окрестности точки $x_0$. $\lim\limits_{x\to x_0}f(x)=A$, если
$$\forall\varepsilon>0\ \ \exists\delta>0:\ \forall x\in\mathring U_\delta(x_0)\ \ f(x)\in U_\varepsilon(A),$$
или в неравенствах (для конечных $x_0$, $A$):
$$\forall\varepsilon>0\ \ \exists\delta>0:\ \forall x:\ 0<|x-x_0|<\delta\ \ |f(x)-A|<\varepsilon.$$`,
      },
      notes: md`Значение $f(x_0)$ на предел не влияет (его может вовсе не быть) — поэтому окрестность проколотая.`,
      pitfalls: ['Забыть «0 <» в 0 < |x − x₀| < δ — тогда это уже почти непрерывность.'],
    },
    {
      id: 'heine-limit-def',
      title: 'Предел функции в точке по Гейне',
      source: 'Лонгрид 14, определения 3, 4',
      definition: {
        level: 'basic',
        text: md`**Последовательность Гейне** в точке $x_0$ — последовательность $\{x_n\}$ такая, что (1) $\lim\limits_{n\to\infty}x_n=x_0$ и (2) $\forall n\ \ x_n\ne x_0$.

Пусть $f$ определена в некоторой проколотой окрестности $x_0$. $\lim\limits_{x\to x_0}f(x)=A$, если **для любой** последовательности Гейне $\{x_n\}$ в точке $x_0$ (из этой окрестности) $\lim\limits_{n\to\infty}f(x_n)=A$.`,
      },
      pitfalls: ['«Для любой» последовательности — одной подходящей мало. Зато чтобы доказать, что предела нет, достаточно двух последовательностей с разными пределами f(xₙ).'],
    },
    {
      id: 'one-sided-limit-def',
      title: 'Пределы справа и слева по Коши',
      source: 'Лонгрид 14, определение 2',
      definition: {
        level: 'basic',
        text: md`Пусть $f$ определена на $(x_0;x_0+a)$. $A$ — **предел справа** ($\lim\limits_{x\to x_0+0}f(x)=f(x_0+0)$), если
$$\forall\varepsilon>0\ \exists\delta>0:\ \forall x\in(x_0;x_0+\delta)\ \ f(x)\in U_\varepsilon(A)\quad(0<x-x_0<\delta\Rightarrow|f(x)-A|<\varepsilon).$$
Пусть $f$ определена на $(x_0-a;x_0)$. $A$ — **предел слева** ($\lim\limits_{x\to x_0-0}f(x)=f(x_0-0)$), если
$$\forall\varepsilon>0\ \exists\delta>0:\ \forall x\in(x_0-\delta;x_0)\ \ f(x)\in U_\varepsilon(A)\quad(-\delta<x-x_0<0\Rightarrow|f(x)-A|<\varepsilon).$$`,
      },
    },
    {
      id: 'one-sided-equal',
      title: 'Теорема о равенстве односторонних пределов',
      source: 'Лонгрид 14, теорема 1',
      statement: {
        level: 'basic',
        text: md`Функция $f$, определённая в некоторой проколотой окрестности $x_0$, имеет предел $A$ в точке $x_0$ тогда и только тогда, когда односторонние пределы $f(x_0-0)$ и $f(x_0+0)$ существуют и равны $A$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Записываем оба условия в кванторах; переход: $\delta=\min\{\delta_1;\delta_2\}$ в одну сторону и $\delta_1=\delta_2=\delta$ в другую.`,
        steps: [
          {
            title: 'Односторонние пределы в кванторах',
            body: md`Оба существуют и равны $A$ $\iff$ $$\forall\varepsilon>0\ \exists\delta_1,\delta_2>0:\ \forall x\in(x_0-\delta_1;x_0)\cup(x_0;x_0+\delta_2)\ \ f(x)\in U_\varepsilon(A).\quad(1)$$`,
          },
          {
            title: 'Предел в кванторах',
            body: md`$\lim\limits_{x\to x_0}f(x)=A$ $\iff$ $$\forall\varepsilon>0\ \exists\delta>0:\ \forall x\in(x_0-\delta;x_0)\cup(x_0;x_0+\delta)\ \ f(x)\in U_\varepsilon(A).\quad(2)$$`,
          },
          {
            title: '(1) ⇒ (2)',
            body: md`Берём $\delta=\min\{\delta_1;\delta_2\}$: множество $(x_0-\delta;x_0)\cup(x_0;x_0+\delta)$ содержится в множестве из (1), и на нём $f(x)\in U_\varepsilon(A)$.`,
          },
          { title: '(2) ⇒ (1)', body: md`Берём $\delta_1=\delta_2=\delta$. $\blacksquare$` },
        ],
      },
    },
    {
      id: 'func-limit-ineq',
      title: 'Теорема о предельном переходе в неравенствах для функций',
      source: 'Лонгрид 14, теорема 4',
      statement: {
        level: 'basic',
        text: md`Если $\lim\limits_{x\to x_0}f(x)=A$, $\lim\limits_{x\to x_0}g(x)=B$ ($A,B\in\overline{\mathbb R}$) и $\exists\delta>0:\ \forall x\in\mathring U_\delta(x_0)\ \ f(x)\le g(x)$, то $A\le B$.`,
      },
      notes: md`Доказывается через Гейне: для последовательности Гейне $f(x_n)\le g(x_n)$, $f(x_n)\to A$, $g(x_n)\to B$, и по теореме для последовательностей $A\le B$.`,
    },
    {
      id: 'squeeze-func',
      title: 'Теорема о пределе зажатой функции',
      source: 'Лонгрид 14, теорема 3',
      statement: {
        level: 'basic',
        text: md`Пусть $f,g,h$ определены в некоторой проколотой окрестности $x_0$, в ней $f(x)\le g(x)\le h(x)$, и $\lim\limits_{x\to x_0}f(x)=\lim\limits_{x\to x_0}h(x)=A\in\overline{\mathbb R}$. Тогда $\exists\lim\limits_{x\to x_0}g(x)=A$.`,
      },
      proof: {
        level: 'basic',
        idea: md`По Гейне сводим к теореме о зажатой последовательности.`,
        steps: [
          { title: 'Произвольная последовательность Гейне', body: md`Возьмём любую последовательность Гейне $\{x_n\}$ в точке $x_0$ из этой окрестности.` },
          { title: 'Неравенства для значений', body: md`Неравенства верны для всех $x$ из окрестности, поэтому $f(x_n)\le g(x_n)\le h(x_n)$ для всех $n$.` },
          { title: 'Гейне для $f$ и $h$', body: md`По определению Гейне $f(x_n)\to A$ и $h(x_n)\to A$.` },
          { title: 'Зажатая последовательность', body: md`По теореме о зажатой последовательности $g(x_n)\to A$.` },
          { title: 'Вывод', body: md`Последовательность Гейне была произвольной, значит, по Гейне $\lim\limits_{x\to x_0}g(x)=A$. $\blacksquare$` },
        ],
      },
      uses: ['squeeze-seq', 'heine-limit-def'],
    },
    {
      id: 'func-arithmetic',
      title: 'Теорема об арифметических операциях с пределами функции',
      source: 'Лонгрид 14, теорема 7',
      statement: {
        level: 'basic',
        text: md`Если $\lim\limits_{x\to x_0}f(x)=A\in\mathbb R$ и $\lim\limits_{x\to x_0}g(x)=B\in\mathbb R$, то
1. $\exists\lim\limits_{x\to x_0}(f(x)\pm g(x))=A\pm B$;
2. $\exists\lim\limits_{x\to x_0}f(x)g(x)=AB$;
3. если $B\ne0$, то $f/g$ определена в некоторой $\mathring U_{\delta_0}(x_0)$ и $\exists\lim\limits_{x\to x_0}\dfrac{f(x)}{g(x)}=\dfrac AB$.`,
      },
      notes: md`Через Гейне из теоремы для последовательностей. В п. 3 сначала: $|g(x)|\to|B|>0$, при $\varepsilon=|B|/2$ в некоторой $\mathring U_{\delta_0}(x_0)$ $g(x)\ne0$.`,
    },
    {
      id: 'cauchy-criterion-func',
      title: 'Критерий Коши существования конечного предела функции',
      source: 'Лонгрид 14, теорема 8',
      statement: {
        level: 'basic',
        text: md`Пусть $f$ определена в некоторой проколотой окрестности $x_0$. **Конечный** предел $\lim\limits_{x\to x_0}f(x)$ существует тогда и только тогда, когда выполнено **условие Коши**:
$$\forall\varepsilon>0\ \ \exists\delta>0:\ \forall x',x''\in\mathring U_\delta(x_0)\ \ |f(x')-f(x'')|<\varepsilon.$$`,
      },
      proof: {
        level: 'advanced',
        idea: md`(⇒) обе точки в $U_\varepsilon(A)$. (⇐) для любой последовательности Гейне $\{f(x_n)\}$ фундаментальна → сходится; по лемме 14.1 предел функции существует.`,
        steps: [
          {
            title: md`(⇒) Обе точки в $U_\varepsilon(A)$`,
            body: md`$\lim f=A\in\mathbb R$: $\forall\varepsilon\ \exists\delta:\ \forall x\in\mathring U_\delta(x_0)\ f(x)\in U_\varepsilon(A)$. Для $x',x''\in\mathring U_\delta(x_0)$: $|f(x')-f(x'')|<2\varepsilon$.`,
          },
          {
            title: '(⇐) Последовательность Гейне',
            body: md`Пусть выполнено условие Коши. Возьмём любую последовательность Гейне $x_n\to x_0$, $x_n\ne x_0$. Для $\varepsilon>0$ найдём $\delta$ из условия Коши; с некоторого $N$ все $x_n\in\mathring U_\delta(x_0)$.`,
          },
          {
            title: md`(⇐) $\{f(x_n)\}$ фундаментальна`,
            body: md`$\forall k,n\ge N\ |f(x_n)-f(x_k)|<\varepsilon$ — по критерию Коши для последовательностей $\exists\lim f(x_n)\in\mathbb R$.`,
          },
          {
            title: '(⇐) Лемма 14.1',
            body: md`Если для любой последовательности Гейне $\lim f(x_n)$ существует, то все эти пределы равны и $\exists\lim\limits_{x\to x_0}f(x)$. $\blacksquare$`,
          },
        ],
      },
      uses: ['cauchy-criterion-seq'],
    },
    {
      id: 'cauchy-heine-equiv',
      title: 'Эквивалентность определений предела функции по Коши и по Гейне',
      source: 'Лонгрид 14, теорема 6',
      statement: { level: 'advanced', text: md`Определения предела функции по Коши и по Гейне эквивалентны.` },
      proof: {
        level: 'advanced',
        idea: md`(К ⇒ Г) последовательность Гейне с некоторого номера попадает в $\mathring U_\delta$. (Г ⇒ К) от противного: из отрицания Коши при $\delta=\delta_0/n$ строим последовательность Гейне, для которой $f(x_n)\not\to A$.`,
        steps: [
          {
            title: '(К ⇒ Г) Условие Коши',
            body: md`$\forall\varepsilon>0\ \exists\delta\in(0;\delta_0]:\ \forall x\in\mathring U_\delta(x_0)\ f(x)\in U_\varepsilon(A)$.`,
          },
          {
            title: '(К ⇒ Г) Последовательность Гейне',
            body: md`Для любой последовательности Гейне: $\forall\delta>0\ \exists N:\ \forall n\ge N\ x_n\in\mathring U_\delta(x_0)$ (так как $x_n\to x_0$, $x_n\ne x_0$). Берём $\delta$ из Коши — получаем $f(x_n)\in U_\varepsilon(A)$, т. е. $f(x_n)\to A$.`,
          },
          {
            title: '(Г ⇒ К) Отрицание Коши',
            body: md`Пусть предел $A$ по Гейне, но не по Коши: $\exists\varepsilon>0:\ \forall\delta\in(0;\delta_0]\ \exists x\in\mathring U_\delta(x_0):\ f(x)\notin U_\varepsilon(A)$.`,
          },
          {
            title: md`(Г ⇒ К) $\delta=\delta_0/n$`,
            body: md`Подставим $\delta=\frac{\delta_0}n$, получим $x_n\in\mathring U_{\delta_0/n}(x_0)$ с $f(x_n)\notin U_\varepsilon(A)$. Тогда $x_n\to x_0$, $x_n\ne x_0$ — последовательность Гейне, но $f(x_n)\not\to A$. Противоречие. $\blacksquare$`,
          },
        ],
      },
    },
  ],
};
