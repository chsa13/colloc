import { md, type Topic } from '../src/content/schema';

export const seqLimit2: Topic = {
  id: 'seq-limit-2',
  title: 'Предел последовательности. Часть 2',
  longread: 10,
  units: [
    {
      id: 'weierstrass-monotone',
      title: 'Теорема Вейерштрасса о пределе монотонной последовательности',
      source: 'Лонгрид 10, теорема 1',
      statement: {
        level: 'basic',
        text: md`Если $\{x_n\}$ **возрастает и ограничена сверху**, то она сходится и $\lim\limits_{n\to\infty}x_n=\sup\limits_{n}x_n$; если возрастает и не ограничена сверху, то $\lim x_n=+\infty$.

Аналогично: убывающая ограниченная снизу сходится к $\inf x_n$, неограниченная снизу стремится к $-\infty$. (Итог: любая монотонная последовательность имеет предел в $\overline{\mathbb R}$.)`,
      },
      proof: {
        level: 'basic',
        idea: md`Предел — это $\sup$: по определению $\sup$ найдётся член $x_N>X-\varepsilon$, а из монотонности все следующие ещё ближе.`,
        steps: [
          { title: md`Существует $X=\sup x_n$`, body: md`Пусть $\{x_n\}$ возрастает и ограничена сверху. Множество значений ограничено сверху, поэтому $\exists X=\sup x_n\in\mathbb R$.` },
          { title: md`Определение $\sup$`, body: md`$\forall\varepsilon>0\ \exists N:\ x_N>X-\varepsilon$.` },
          { title: 'Монотонность', body: md`Так как последовательность возрастает, $\forall n\ge N\ \ x_n\ge x_N>X-\varepsilon$.` },
          { title: '$X$ — верхняя грань', body: md`$\forall n\ \ x_n\le X<X+\varepsilon$.` },
          {
            title: md`Итог: $|x_n-X|<\varepsilon$`,
            body: md`$\forall\varepsilon>0\ \exists N:\ \forall n\ge N\ \ X-\varepsilon<x_n<X+\varepsilon$, т. е. $\lim x_n=X$.`,
          },
          {
            title: md`Неограниченная сверху $\Rightarrow +\infty$`,
            body: md`$\forall M>0\ \exists N:\ x_N>M$, и из возрастания $\forall n\ge N\ x_n\ge x_N>M$ — это определение $\lim x_n=+\infty$. $\blacksquare$`,
          },
        ],
      },
    },
    {
      id: 'squeeze-seq',
      title: 'Теорема о зажатой последовательности',
      source: 'Лонгрид 10, теорема 2',
      statement: {
        level: 'basic',
        text: md`Пусть $\forall n\in\mathbb N\ \ x_n\le y_n\le z_n$ и $\lim\limits_{n\to\infty}x_n=\lim\limits_{n\to\infty}z_n=A\in\overline{\mathbb R}$. Тогда последовательность $\{y_n\}$ **имеет предел** (это не дано в условии!) и $\lim\limits_{n\to\infty}y_n=A$.`,
      },
      proof: {
        level: 'basic',
        idea: md`С некоторого номера $x_n$ и $z_n$ лежат в $U_\varepsilon(A)$, а окрестность — промежуток, значит, и $y_n$ между ними.`,
        steps: [
          {
            title: 'Определение предела для $x_n$ и $z_n$',
            body: md`Возьмём $\varepsilon>0$. $\exists N_1:\ \forall n\ge N_1\ x_n\in U_\varepsilon(A)$ и $\exists N_2:\ \forall n\ge N_2\ z_n\in U_\varepsilon(A)$.`,
          },
          { title: md`$N=\max\{N_1;N_2\}$`, body: md`При $n\ge N$ оба числа $x_n$ и $z_n$ лежат в $U_\varepsilon(A)$.` },
          { title: 'Окрестность — промежуток', body: md`$y_n$ лежит между $x_n$ и $z_n$, а $U_\varepsilon(A)$ — промежуток, поэтому $y_n\in U_\varepsilon(A)$.` },
          { title: 'Итог', body: md`$\forall\varepsilon>0\ \exists N:\ \forall n\ge N\ y_n\in U_\varepsilon(A)$, т. е. $\lim y_n=A$. $\blacksquare$` },
        ],
      },
      notes: md`Верна и если неравенства выполнены лишь с некоторого номера. Работает и для $A=\pm\infty$ (окрестности $\pm\infty$ — тоже промежутки).`,
    },
    {
      id: 'seq-limit-ineq',
      title: 'Теорема о предельном переходе в неравенствах для последовательностей',
      source: 'Лонгрид 10, теорема 3',
      statement: {
        level: 'basic',
        text: md`Пусть $\forall n\ \ x_n\le y_n$ и $\lim\limits_{n\to\infty}x_n=A$, $\lim\limits_{n\to\infty}y_n=B$. Тогда $A\le B$.`,
      },
      proof: {
        level: 'basic',
        idea: md`От противного: если $A>B$, непересекающиеся окрестности дадут $x_n>y_n$ с некоторого номера.`,
        steps: [
          { title: 'От противного', body: md`Пусть $A>B$.` },
          {
            title: 'Непересекающиеся окрестности',
            body: md`По лемме найдутся $U_{\varepsilon_1}(A)$ и $U_{\varepsilon_2}(B)$, которые не пересекаются; так как $A>B$, вся $U_{\varepsilon_1}(A)$ лежит правее $U_{\varepsilon_2}(B)$.`,
          },
          { title: 'Определение предела', body: md`С некоторого номера (берём максимум из двух $N$) $x_n\in U_{\varepsilon_1}(A)$ и $y_n\in U_{\varepsilon_2}(B)$.` },
          { title: 'Противоречие', body: md`Значит, с этого номера $x_n>y_n$ — противоречит условию $x_n\le y_n$. $\blacksquare$` },
        ],
      },
      pitfalls: ['Строгое неравенство в пределе может стать нестрогим: 0 < 1/n, но lim 0 = lim 1/n = 0.'],
    },
    {
      id: 'std-limits',
      title: 'Стандартные пределы: aⁿ/n!, nᵏ/aⁿ, ⁿ√n, ⁿ√a, logₐn/n',
      source: 'Лонгрид 10, примеры 3–8 и задачи',
      statement: {
        level: 'basic',
        text: md`$$\lim_{n\to\infty}\frac{a^n}{n!}=0;\quad \lim_{n\to\infty}\frac{n^k}{a^n}=0\ (a>1,\ k\in\mathbb N);\quad \lim_{n\to\infty}\sqrt[n]n=1;$$
$$\lim_{n\to\infty}\sqrt[n]a=1\ (a>0);\quad \lim_{n\to\infty}\frac{\log_an}{n}=0\ (a>0,\ a\ne1).$$
Вспомогательный: $\lim q^n=0$ при $|q|<1$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Бином Ньютона / Бернулли оставляют одно слагаемое → оценка → теорема о зажатой. Для $a^n/n!$ — монотонность с некоторого номера + Вейерштрасс.`,
        steps: [
          {
            title: md`$q^n\to0$ при $|q|<1$`,
            body: md`Для $0<q<1$: $\frac1q>1$, по Бернулли $\frac1{q^n}=\bigl(1+(\tfrac1q-1)\bigr)^n\ge1+n(\tfrac1q-1)>n(\tfrac1q-1)$. Значит, $0<q^n<\frac1{n(1/q-1)}\to0$; по теореме о зажатой $q^n\to0$.`,
          },
          {
            title: md`$\frac{a^n}{n!}\to0$: отношение соседних`,
            body: md`$x_n=\frac{|a|^n}{n!}$, $\frac{x_{n+1}}{x_n}=\frac{|a|}{n+1}<1$ при $n+1>|a|$ — с некоторого номера убывает, ограничена снизу нулём $\Rightarrow\exists\lim x_n=X$ (Вейерштрасс).`,
          },
          {
            title: md`$\frac{a^n}{n!}\to0$: переход к пределу`,
            body: md`В $x_{n+1}=\frac{|a|}{n+1}x_n$ слева $\to X$, справа $\to0\cdot X=0$, значит, $X=0$. Так как $-x_n\le\frac{a^n}{n!}\le x_n$, по теореме о зажатой $\frac{a^n}{n!}\to0$.`,
          },
          {
            title: md`$\frac n{a^n}\to0$: бином`,
            body: md`При $a>1$, $n\ge2$: $a^n=(1+(a-1))^n>C_n^2(a-1)^2=\frac{n(n-1)}2(a-1)^2$. Тогда $0<\frac n{a^n}<\frac2{(n-1)(a-1)^2}\to0$.`,
          },
          {
            title: md`$\frac{n^k}{a^n}\to0$`,
            body: md`$b=\sqrt[k]a>1$, $\frac{n^k}{a^n}=\left(\frac n{b^n}\right)^k\to0^k=0$ (произведение $k$ сомножителей, $k$ фиксировано).`,
          },
          {
            title: md`$\sqrt[n]n\to1$`,
            body: md`$x_n=\sqrt[n]n-1>0$, $n=(1+x_n)^n>C_n^2x_n^2=\frac{n(n-1)}2x_n^2$, откуда $0<x_n<\sqrt{\frac2{n-1}}\to0$.`,
          },
          {
            title: md`$\sqrt[n]a\to1$`,
            body: md`$a>1$: $x_n=\sqrt[n]a-1>0$, по Бернулли $a=(1+x_n)^n\ge1+nx_n\Rightarrow0<x_n\le\frac{a-1}n\to0$. $0<a<1$: $\sqrt[n]a=\frac1{\sqrt[n]{1/a}}\to1$. $a=1$ — очевидно.`,
          },
          {
            title: md`$\frac{\log_an}n\to0$`,
            body: md`Пусть $a>1$. Фиксируем $\varepsilon>0$, $c=a^\varepsilon>1$. Так как $\frac n{c^n}\to0$, с некоторого номера $n<c^n=a^{n\varepsilon}$. Логарифмируем: $0\le\log_an<n\varepsilon$, т. е. $0\le\frac{\log_an}n<\varepsilon$. При $0<a<1$: $\log_an=-\log_{1/a}n$. $\blacksquare$`,
          },
        ],
      },
      notes: md`Следствие: $\sqrt[n]{n^k}=(\sqrt[n]n)^k\to1$. Шкала роста: $\log_a n\ll n^k\ll a^n\ll n!$.`,
    },
  ],
};

export const seqLimit3: Topic = {
  id: 'seq-limit-3',
  title: 'Предел последовательности. Часть 3',
  longread: 11,
  units: [
    {
      id: 'subsequence',
      title: 'Подпоследовательность, частичный предел, предельная точка',
      source: 'Лонгрид 11, определения 1, 2',
      definition: {
        level: 'basic',
        text: md`Пусть $\{n_k\}$ — **строго возрастающая** последовательность натуральных чисел. Тогда $\{x_{n_k}\}$ называется **подпоследовательностью** $\{x_n\}$.

**Частичный предел** $\{x_n\}$ — элемент $a\in\overline{\mathbb R}$, являющийся пределом какой-либо её подпоследовательности.

**Предельная точка** $\{x_n\}$ — элемент $a\in\overline{\mathbb R}$ такой, что **в любой его окрестности лежит бесконечно много членов** последовательности.`,
      },
      pitfalls: ['«Бесконечно много членов» — с разными номерами, а не значений: у xₙ ≡ 5 точка 5 — предельная.'],
    },
    {
      id: 'limsup',
      title: 'Верхний и нижний (частичные) пределы',
      source: 'Лонгрид 11, определение 3',
      definition: {
        level: 'basic',
        text: md`Пусть $L$ — множество всех частичных пределов $\{x_n\}$. Тогда $\sup L$ называется **верхним пределом** $\{x_n\}$ ($\varlimsup\limits_{n\to\infty}x_n$), а $\inf L$ — **нижним пределом** ($\varliminf\limits_{n\to\infty}x_n$).

Если последовательность не ограничена сверху, её верхний предел $+\infty$; если не ограничена снизу — нижний предел $-\infty$.`,
      },
      notes: md`Пример: $a_n=\frac{(-1)^n}n+\frac{1+(-1)^n}2$: $L=\{0;1\}$, $\varlimsup a_n=1$, $\varliminf a_n=0$.`,
    },
    {
      id: 'cauchy-seq-def',
      title: 'Фундаментальная последовательность',
      source: 'Лонгрид 11, определение 4',
      definition: {
        level: 'basic',
        text: md`$\{x_n\}$ называется **фундаментальной** (последовательностью Коши), если
$$\forall\varepsilon>0\ \ \exists N:\ \forall m,n\ge N\ \ |x_m-x_n|<\varepsilon.$$
Эквивалентно: $\forall\varepsilon>0\ \exists N:\ \forall n\ge N\ \forall p\in\mathbb N\ \ |x_{n+p}-x_n|<\varepsilon$.`,
      },
    },
    {
      id: 'number-e-def',
      title: 'Число e',
      source: 'Лонгрид 11, определение 5',
      definition: {
        level: 'basic',
        text: md`$$e=\lim_{n\to\infty}\left(1+\frac1n\right)^n\approx2{,}718281828\ldots$$`,
      },
    },
    {
      id: 'partial-limit-equiv',
      title: 'Эквивалентность определений частичного предела и предельной точки',
      source: 'Лонгрид 11, теорема 1',
      statement: { level: 'basic', text: md`Элемент $a\in\overline{\mathbb R}$ является частичным пределом последовательности тогда и только тогда, когда он является её предельной точкой.` },
      proof: {
        level: 'basic',
        idea: md`(⇒) хвост подпоследовательности — бесконечно много членов в окрестности. (⇐) строим подпоследовательность, выбирая $x_{n_k}\in U_{1/k}(a)$ с растущими номерами.`,
        steps: [
          {
            title: '(⇒) Частичный предел — предельная точка',
            body: md`Пусть $a=\lim\limits_{k\to\infty}x_{n_k}$. Тогда $\forall\varepsilon>0\ \exists K:\ \forall k\ge K\ x_{n_k}\in U_\varepsilon(a)$. Членов с $k\ge K$ бесконечно много (номера $n_k$ разные) — значит, $a$ предельная точка.`,
          },
          { title: '(⇐) Первый член', body: md`Пусть $a\in\mathbb R$ — предельная точка. В $U_1(a)$ бесконечно много членов — выберем один, $x_{n_1}$.` },
          {
            title: '(⇐) Шаг построения',
            body: md`На $k$-м шаге в $U_{1/k}(a)$ бесконечно много членов, а номеров $\le n_{k-1}$ — конечное число, поэтому можно выбрать $x_{n_k}\in U_{1/k}(a)$ с $n_k>n_{k-1}$.`,
          },
          {
            title: '(⇐) Зажатая подпоследовательность',
            body: md`$\forall k\ \ a-\frac1k<x_{n_k}<a+\frac1k$; крайние $\to a$, по теореме о зажатой $x_{n_k}\to a$ — $a$ частичный предел.`,
          },
          { title: md`Случай $a=\pm\infty$`, body: md`Аналогично, беря окрестности $U_{1/k}(\pm\infty)$, т. е. $x_{n_k}>k$ (или $<-k$). $\blacksquare$` },
        ],
      },
    },
    {
      id: 'partial-limit-sufficient',
      title: 'Достаточное условие частичного предела',
      source: 'Лонгрид 11, теорема 2',
      statement: {
        level: 'basic',
        text: md`Если в **любой проколотой** окрестности числа $a$ лежит хотя бы один член последовательности $\{x_n\}$, то $a$ — частичный предел $\{x_n\}$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Сужая окрестность меньше расстояния до уже найденного члена, получаем бесконечно много различных членов в любой окрестности → предельная точка → частичный предел (теорема 1).`,
        steps: [
          { title: 'Первый член', body: md`$\varepsilon_1=1$: в $\mathring U_{\varepsilon_1}(a)$ есть член $x_{n_1}\ne a$.` },
          {
            title: 'Сужаем окрестность',
            body: md`Берём $\varepsilon_2<|a-x_{n_1}|$ (и $\varepsilon_2<\varepsilon_1$). Тогда $x_{n_1}\notin\mathring U_{\varepsilon_2}(a)$, а там по условию есть член $x_{n_2}$ — он отличен от $x_{n_1}$.`,
          },
          { title: 'Повторяем', body: md`$\varepsilon_3<|a-x_{n_2}|$ и т. д. (можно брать $\varepsilon_k<\frac1k$). Получаем бесконечно много различных членов, расстояния от которых до $a$ стремятся к нулю.` },
          {
            title: 'Вывод',
            body: md`В любой окрестности $a$ бесконечно много членов — $a$ предельная точка, по теореме 1 — частичный предел. $\blacksquare$`,
          },
        ],
      },
      pitfalls: ['Проколотость важна: если x_p = a для одного p, то в любой окрестности a есть член, но a не обязана быть частичным пределом.'],
      uses: ['partial-limit-equiv'],
    },
    {
      id: 'bolzano-weierstrass',
      title: 'Теорема Больцано — Вейерштрасса',
      source: 'Лонгрид 11, лемма 1, теорема 3',
      statement: {
        level: 'basic',
        text: md`**Лемма 1.** Всякая последовательность содержит монотонную подпоследовательность.

**Теорема 3.** Любая последовательность имеет хотя бы один частичный предел (конечный или бесконечный). Если последовательность **ограничена**, то она имеет **конечный** частичный предел (из ограниченной последовательности можно выделить сходящуюся подпоследовательность).`,
      },
      proof: {
        level: 'basic',
        idea: md`«Пиковые» номера: если их бесконечно много — возрастающая подпоследовательность, если конечно — убывающая. Дальше Вейерштрасс.`,
        steps: [
          { title: 'Лемма 1: множество $P$', body: md`$P=\{n:\ \forall k>n\ \ x_k>x_n\}$ — номера, после которых все члены больше $x_n$.` },
          {
            title: '$P$ бесконечно',
            body: md`Выпишем его элементы по возрастанию $p_1<p_2<\dots$ Так как $p_j\in P$ и $p_{j+1}>p_j$, то $x_{p_{j+1}}>x_{p_j}$ — строго возрастающая подпоследовательность.`,
          },
          {
            title: '$P$ конечно',
            body: md`Возьмём $n_1$ больше всех чисел из $P$. $n_1\notin P\Rightarrow\exists n_2>n_1:\ x_{n_2}\le x_{n_1}$; $n_2\notin P\Rightarrow\exists n_3>n_2:\ x_{n_3}\le x_{n_2}$ и т. д. — убывающая подпоследовательность.`,
          },
          {
            title: 'Теорема: Вейерштрасс',
            body: md`По лемме 1 есть монотонная $\{x_{n_k}\}$; по теореме Вейерштрасса она имеет предел — это частичный предел $\{x_n\}$.`,
          },
          {
            title: 'Ограниченный случай',
            body: md`Если $\{x_n\}$ ограничена, то ограничена и $\{x_{n_k}\}$, поэтому её предел конечен. $\blacksquare$`,
          },
        ],
      },
      uses: ['weierstrass-monotone'],
    },
    {
      id: 'unique-partial-limit',
      title: 'Теорема о единственном частичном пределе',
      source: 'Лонгрид 11, теорема 4',
      statement: {
        level: 'basic',
        text: md`Последовательность имеет предел $a\in\overline{\mathbb R}$ тогда и только тогда, когда $a$ — её **единственный** частичный предел.`,
      },
      proof: {
        level: 'basic',
        idea: md`(⇒) у другой точки $b$ найдётся окрестность, где лишь конечное число членов. (⇐) если не предел — вне окрестности бесконечно много членов, из них по Б–В получаем второй частичный предел.`,
        steps: [
          { title: '(⇒) $a$ — частичный предел', body: md`Пусть $\lim x_n=a$. Любая подпоследовательность сходится к $a$, так что $a$ — частичный предел.` },
          {
            title: '(⇒) Другого нет',
            body: md`Пусть $b\ne a$. Возьмём непересекающиеся $U_{\varepsilon_1}(a)$ и $U_{\varepsilon_2}(b)$. Вне $U_{\varepsilon_1}(a)$ лишь конечное число членов — значит, и в $U_{\varepsilon_2}(b)$ конечное число. $b$ не предельная точка.`,
          },
          {
            title: '(⇐) От противного',
            body: md`Пусть $a$ — единственный частичный предел, но не предел. Тогда есть $U_\varepsilon(a)$, вне которой бесконечно много членов — составим из них подпоследовательность $\{x_{n_k}\}$.`,
          },
          {
            title: '(⇐) Второй частичный предел',
            body: md`По теореме Больцано–Вейерштрасса у $\{x_{n_k}\}$ есть частичный предел $b$ (он же частичный предел $\{x_n\}$). Все $x_{n_k}\notin U_\varepsilon(a)$, поэтому $b\ne a$ — противоречие. $\blacksquare$`,
          },
        ],
      },
      notes: md`Следствие: если есть два разных частичных предела, последовательность расходится.`,
      uses: ['bolzano-weierstrass'],
    },
    {
      id: 'cauchy-criterion-seq',
      title: 'Критерий Коши сходимости числовой последовательности',
      source: 'Лонгрид 11, леммы 2, 3, теорема 6',
      statement: {
        level: 'basic',
        text: md`**Лемма 2.** Фундаментальная последовательность ограничена.

**Лемма 3.** Сходящаяся последовательность фундаментальна.

**Теорема 6.** Последовательность сходится $\iff$ она фундаментальна.`,
      },
      proof: {
        level: 'basic',
        idea: md`(⇐) фундаментальная ограничена → по Б–В есть конечный частичный предел $a$ → через $x_m$ близкий к $a$ и неравенство треугольника вся последовательность $\to a$.`,
        steps: [
          {
            title: 'Лемма 2',
            body: md`$\varepsilon=1$, $m=N$: $\forall n\ge N\ |x_n-x_N|<1$, т. е. члены с номерами $\ge N$ в $(x_N-1;x_N+1)$, а вне — только $x_1,\dots,x_{N-1}$. Ограничена.`,
          },
          {
            title: 'Лемма 3',
            body: md`$x_n\to a$: $\forall\varepsilon\ \exists N:\ \forall n\ge N\ |x_n-a|<\varepsilon$. Для $m,n\ge N$: $|x_n-x_m|\le|x_n-a|+|a-x_m|<2\varepsilon$.`,
          },
          {
            title: '(⇐) Конечный частичный предел',
            body: md`$\{x_n\}$ фундаментальна $\Rightarrow$ ограничена (лемма 2) $\Rightarrow$ по теореме Больцано–Вейерштрасса есть частичный предел $a\in\mathbb R$.`,
          },
          {
            title: '(⇐) Выбираем $x_m$ рядом с $a$',
            body: md`Возьмём $\varepsilon>0$, по фундаментальности $\exists N:\ \forall n,m\ge N\ |x_n-x_m|<\varepsilon$. В $U_\varepsilon(a)$ бесконечно много членов — найдётся $m\ge N$ с $|x_m-a|<\varepsilon$.`,
          },
          {
            title: '(⇐) Неравенство треугольника',
            body: md`$\forall n\ge N:\ |x_n-a|\le|x_n-x_m|+|x_m-a|<2\varepsilon$, т. е. $x_n\to a$. $\blacksquare$`,
          },
        ],
      },
      notes: md`Отрицание: $\{a_n\}$ расходится $\iff\exists\varepsilon>0\ \forall N\ \exists n\ge N\ \exists p\in\mathbb N:\ |a_{n+p}-a_n|\ge\varepsilon$. Например, для $(-1)^n$: $|a_N-a_{N+1}|=2$.`,
      uses: ['bolzano-weierstrass'],
    },
    {
      id: 'number-e-correct',
      title: 'Корректность определения числа e',
      source: 'Лонгрид 11, теорема 7',
      proof: {
        level: 'basic',
        idea: md`$x_n=(1+\frac1n)^{n+1}$ строго убывает (Бернулли для отношения $x_{n-1}/x_n$) и ограничена снизу нулём → сходится; $(1+\frac1n)^n=\frac{x_n}{1+1/n}$ имеет тот же предел.`,
        steps: [
          { title: md`Вводим $x_n=(1+\frac1n)^{n+1}$`, body: md`Докажем, что $\{x_n\}$ строго убывает: достаточно $\frac{x_{n-1}}{x_n}>1$ при $n\ge2$.` },
          {
            title: 'Преобразуем отношение',
            body: md`$$\frac{x_{n-1}}{x_n}=\left(\frac n{n-1}\right)^n:\left(\frac{n+1}n\right)^{n+1}=\left(\frac{n^2}{n^2-1}\right)^{n+1}\cdot\frac{n-1}n.$$`,
          },
          {
            title: 'Бернулли',
            body: md`$\frac{n^2}{n^2-1}=1+\frac1{n^2-1}$, по Бернулли $(1+t)^{n+1}>1+(n+1)t$: $$\frac{x_{n-1}}{x_n}>\left(1+\frac{n+1}{n^2-1}\right)\frac{n-1}n=\frac n{n-1}\cdot\frac{n-1}n=1.$$`,
          },
          { title: 'Вейерштрасс', body: md`$x_n>0$ — ограничена снизу; убывающая ограниченная снизу сходится. Её предел обозначают $e$.` },
          {
            title: md`Переход к $(1+\frac1n)^n$`,
            body: md`$\left(1+\frac1n\right)^n=\dfrac{x_n}{1+\frac1n}\to\dfrac e1=e$ (предел частного). Значит, предел из определения $e$ существует. $\blacksquare$`,
          },
        ],
      },
      notes: md`Попутно: $\left(1+\frac1n\right)^n<e<\left(1+\frac1n\right)^{n+1}$ для любого $n$.`,
      uses: ['weierstrass-monotone'],
    },
    {
      id: 'limsup-is-partial',
      title: 'Верхний и нижний пределы являются частичными пределами',
      source: 'Лонгрид 11, теорема 5',
      statement: { level: 'advanced', text: md`Верхний и нижний пределы последовательности являются её частичными пределами.` },
      proof: {
        level: 'advanced',
        idea: md`Около $M=\sup L$ есть частичный предел $x$, а около $x$ — бесконечно много членов, т. е. в любой левой полуокрестности $M$ бесконечно много членов.`,
        steps: [
          { title: 'Случай $L$ ограничено сверху', body: md`Докажем, что $M=\sup L$ — частичный предел. Выберем $\varepsilon>0$.` },
          { title: md`Определение $\sup$`, body: md`В $(M-\varepsilon;M]$ есть элемент $x\in L$. Выберем $U_{\varepsilon'}(x)\subset(M-\varepsilon;M+\varepsilon)$.` },
          {
            title: '$x$ — частичный предел',
            body: md`В $U_{\varepsilon'}(x)$ бесконечно много членов, а значит, и в $U_\varepsilon(M)$ бесконечно много членов.`,
          },
          { title: 'Вывод', body: md`$\varepsilon$ произвольно, значит, $M$ — предельная точка, т. е. частичный предел. Если $L$ не ограничено сверху, $\sup L=+\infty$ и аналогично. $\blacksquare$` },
        ],
      },
    },
    {
      id: 'stolz',
      title: 'Теорема Штольца',
      source: 'Лонгрид 11, теорема 10',
      statement: {
        level: 'advanced',
        text: md`Пусть $\{y_n\}$ **строго возрастает** и $y_n\to+\infty$, и существует
$$\lim_{n\to\infty}\frac{x_{n+1}-x_n}{y_{n+1}-y_n}=a,\quad a\in\mathbb R.$$
Тогда существует $\lim\limits_{n\to\infty}\dfrac{x_n}{y_n}=a$.`,
      },
      notes: md`Аналог правила Лопиталя для последовательностей. Пример: $\frac{1+2+\dots+n}{n^2}\to\lim\frac{n+1}{(n+1)^2-n^2}=\frac12$.`,
    },
  ],
};
