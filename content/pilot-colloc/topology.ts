import { md, type Topic } from '../../src/content/schema';

// Конспект, глава 2: открытые и замкнутые множества, индуцированная топология, компактность.

export const topology: Topic = {
  id: 'topology',
  title: 'Открытые и замкнутые множества',
  longread: 2,
  units: [
    {
      id: 'q-open-closed',
      title: 'Открытые и замкнутые множества',
      source: 'Конспект, определения 2.1.1, 2.1.2, 2.1.4, теорема 2.1.8',
      definition: {
        level: 'basic',
        text: md`- **$\varepsilon$-окрестность** точки $a$: $B_\varepsilon(a)=\{x: |x-a|<\varepsilon\}=(a-\varepsilon;a+\varepsilon)$, $\varepsilon>0$.
- **Открытое множество** $U\subseteq\mathbb R$: вместе с каждой точкой содержит её $\varepsilon$-окрестность: $\forall a\in U\ \exists\varepsilon>0:\ B_\varepsilon(a)\subseteq U$. **Окрестность точки** — любое открытое множество, содержащее её.
- **Замкнутое множество** $F$: содержит все свои точки прикосновения, $F=\overline F$. Равносильно: $\mathbb R\setminus F$ открыто.`,
      },
      notes: md`Открыты: интервалы $(a;b)$, лучи $(a;+\infty)$, $\mathbb R$, $\varnothing$. Не открыты: $\{a\}$, $[0;1)$. Замкнуты: $[a;b]$, $\{a\}$, $[a;+\infty)$, $\mathbb R$, $\varnothing$. Каждое открытое множество на прямой — объединение непересекающихся интервалов.

Интервал $(0{,}5;100)$ — окрестность точки $1$, но не её $\varepsilon$-окрестность (не симметричен).`,
      pitfalls: ['«Замкнутое» — не отрицание «открытого»: бывают и то и другое, и ни то ни другое.', 'ε-окрестность симметрична и открыта; окрестность — любое открытое множество с точкой.'],
    },
    {
      id: 'q-closure',
      title: 'Прикосновение и замыкание',
      source: 'Конспект, определение 2.1.3',
      definition: {
        level: 'basic',
        text: md`**Точка прикосновения** множества $A$: каждая окрестность $x$ пересекает $A$ (достаточно проверять $\varepsilon$-окрестности: $\forall\varepsilon>0\ (x-\varepsilon;x+\varepsilon)\cap A\ne\varnothing$).

**Замыкание** $\overline A$ — множество всех точек прикосновения $A$. Всегда $A\subseteq\overline A$.

**Точка прикосновения не обязана принадлежать множеству:** $0$ и $1$ — точки прикосновения $(0;1)$, но не его элементы; $\overline{(0;1)}=[0;1]$.`,
      },
      notes: md`Эквивалентно: $x\in\overline A\iff$ существует последовательность $a_n\in A$, $a_n\to x$.

$\overline{\mathbb Q}=\mathbb R$; $\overline{\{1/n\}}=\{1/n\}\cup\{0\}$.`,
      pitfalls: ['Точка самого A — всегда точка прикосновения (изолированная тоже).', 'Не путай с предельной точкой: там окрестность должна содержать точку A, отличную от x.'],
    },
    {
      id: 'q-set-examples',
      title: 'Примеры множеств',
      source: 'Конспект, важное замечание после определения 2.1.4, наблюдение 2.3',
      definition: {
        level: 'basic',
        text: md`**Одновременно открыты и замкнуты** в $\mathbb R$: $\varnothing$ и $\mathbb R$. $\mathbb R$ открыто (содержит любую окрестность), $\varnothing$ открыто (нет точек — нечего проверять); каждое — дополнение другого, значит, оба и замкнуты. (Других таких множеств в $\mathbb R$ нет — это связность прямой.)

**Ни открыто, ни замкнуто:** $[0;1)$.
- Не открыто: любая окрестность $(-\varepsilon;\varepsilon)$ точки $0$ содержит отрицательные числа, которых нет в $[0;1)$.
- Не замкнуто: $1$ — точка прикосновения (в $(1-\varepsilon;1+\varepsilon)$ есть точки $1-\varepsilon/2\in[0;1)$ при $\varepsilon<2$), но $1\notin[0;1)$.

Ещё пример — $\mathbb Q$: в любом интервале есть иррациональные числа (не открыто), и $\overline{\mathbb Q}=\mathbb R\ne\mathbb Q$ (не замкнуто).`,
      },
      pitfalls: ['Для «не открыто» достаточно одной плохой точки, для «не замкнуто» — одной точки прикосновения вне множества.'],
    },
    {
      id: 'q-relative-topology',
      title: 'Относительная топология',
      source: 'Конспект, §2.2, определения 2.2.1–2.2.3',
      definition: {
        level: 'basic',
        text: md`Пусть $A\subseteq X\subseteq\mathbb R$.
- $A$ **открыто в $X$**, если $A=X\cap U$ для некоторого открытого в $\mathbb R$ множества $U$. Равносильно: $\forall x\in A\ \exists\varepsilon>0:\ (x-\varepsilon;x+\varepsilon)\cap X\subseteq A$.
- $A$ **замкнуто в $X$**, если $X\setminus A$ открыто в $X$. Равносильно: $A=X\cap F$ для некоторого замкнутого в $\mathbb R$ множества $F$.

**Почему нужно указывать объемлющее пространство:** открытость и замкнутость — относительные свойства. $[0;\frac12)=[0;1]\cap(-1;\frac12)$ открыто в $[0;1]$, но не открыто в $\mathbb R$. $(0;\frac12]$ замкнуто в $(0;1]$ (дополнение $(\frac12;1]$ открыто в нём), но не замкнуто в $\mathbb R$. Без указания $X$ вопрос «открыто ли множество» не имеет однозначного ответа.`,
      },
      notes: md`В $X=[0;1]$ окрестность точки $0$ — это $[0;\varepsilon)$: отрицательных чисел в пространстве просто нет.

В $\mathbb N$ с относительной топологией каждое подмножество открыто: $\{n\}=\mathbb N\cap(n-\frac12;n+\frac12)$.`,
      pitfalls: ['Открытое в X не обязано быть открытым в ℝ (и наоборот, если A ⊄ X, вопрос вообще не ставится).', 'Сам X всегда и открыт, и замкнут в X.'],
    },
    {
      id: 't-open-ops',
      title: 'Операции с открытыми множествами',
      source: 'Конспект, леммы 2.1.1, 2.1.4, пример 2.4',
      statement: {
        level: 'basic',
        text: md`Объединение любого семейства открытых множеств $\{U_\alpha\}_{\alpha\in A}$ открыто; пересечение конечного числа открытых множеств открыто. Бесконечное пересечение открытых может быть не открыто: $\bigcap_{n\ge1}(-\frac1n;\frac1n)=\{0\}$. Одноточечное множество не открыто в $\mathbb R$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Для объединения окрестность берём из того $U_\alpha$, где лежит точка; для пересечения — наименьший из конечного числа радиусов.`,
        steps: [
          {
            title: 'Объединение',
            body: md`$x\in\bigcup U_\alpha$ $\Rightarrow$ $x\in U_{\alpha_0}$ для некоторого $\alpha_0$; $U_{\alpha_0}$ открыто: $B_\varepsilon(x)\subseteq U_{\alpha_0}\subseteq\bigcup U_\alpha$.`,
          },
          {
            title: md`Пересечение: $\varepsilon=\min\varepsilon_i$`,
            body: md`$x\in U_1\cap\dots\cap U_n$: $B_{\varepsilon_i}(x)\subseteq U_i$. Для $\varepsilon=\min(\varepsilon_1,\dots,\varepsilon_n)>0$: $B_\varepsilon(x)\subseteq U_i$ для всех $i$, т. е. $B_\varepsilon(x)\subseteq\bigcap U_i$. Минимум конечного набора положительных чисел положителен — поэтому нужна конечность.`,
          },
          {
            title: md`$\{a\}$ не открыто`,
            body: md`Любая $B_\varepsilon(a)$ содержит, например, $a+\varepsilon/2\ne a$, так что $B_\varepsilon(a)\not\subseteq\{a\}$.`,
          },
          {
            title: 'Бесконечное пересечение',
            body: md`$x\in(-\frac1n;\frac1n)$ для всех $n$ $\iff|x|<\frac1n$ для всех $n\iff x=0$. Итак, $\bigcap(-\frac1n;\frac1n)=\{0\}$ — не открыто. $\blacksquare$`,
          },
        ],
      },
      pitfalls: [
        'Для бесконечного пересечения инфимум радиусов может быть нулём — вот где ломается доказательство.',
        'Интервалы открыты — это надо уметь показать: ε = min(x − a, b − x).',
      ],
    },
    {
      id: 't-local-open',
      title: 'Локальный критерий открытости',
      source: 'Конспект, предложение 2.1.6',
      statement: {
        level: 'basic',
        text: md`$U\subseteq\mathbb R$ открыто тогда и только тогда, когда для каждого $x\in U$ найдётся открытое $V$ с $x\in V\subseteq U$.`,
      },
      proof: {
        level: 'basic',
        idea: md`В одну сторону — $V=B_\varepsilon(x)$; в другую — $U$ есть объединение всех $V_x$, а объединение открытых открыто.`,
        steps: [
          { title: md`$\Rightarrow$`, body: md`$U$ открыто: для $x\in U$ есть $B_\varepsilon(x)\subseteq U$; $V=B_\varepsilon(x)$ открыто (интервал) и $x\in V\subseteq U$.` },
          { title: md`$\Leftarrow$: $\tilde U=\bigcup_{x\in U}V_x$`, body: md`Для каждого $x\in U$ выберем открытое $V_x$, $x\in V_x\subseteq U$, и положим $\tilde U=\bigcup_{x\in U}V_x$.` },
          {
            title: md`$\tilde U=U$`,
            body: md`$\tilde U\subseteq U$, так как все $V_x\subseteq U$. $U\subseteq\tilde U$, так как каждая $x\in U$ лежит в своём $V_x$.`,
          },
          { title: 'Итог', body: md`$U$ — объединение открытых множеств, значит, открыто. $\blacksquare$` },
        ],
      },
      uses: ['t-open-ops'],
      pitfalls: ['Обе включения в равенстве U = ⋃ Vₓ нужны.'],
    },
    {
      id: 't-closed-ops',
      title: 'Операции с замкнутыми множествами',
      source: 'Конспект, лемма 2.1.9, наблюдение 2.4',
      statement: {
        level: 'basic',
        text: md`Пересечение любого семейства замкнутых множеств замкнуто, объединение конечного числа замкнутых замкнуто. Бесконечное объединение замкнутых может быть не замкнуто: $\bigcup_{n\ge3}[\frac1n;1-\frac1n]=(0;1)$. Одноточечное множество замкнуто в $\mathbb R$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Переходим к дополнениям (замкнуто $\iff$ дополнение открыто) и применяем законы де Моргана и свойства открытых множеств.`,
        steps: [
          {
            title: 'Де Морган',
            body: md`$F_\alpha$ замкнуты $\iff U_\alpha=\mathbb R\setminus F_\alpha$ открыты. $\mathbb R\setminus\bigcap F_\alpha=\bigcup U_\alpha$ и $\mathbb R\setminus(F_1\cup\dots\cup F_n)=U_1\cap\dots\cap U_n$.`,
          },
          {
            title: 'Открытость дополнений',
            body: md`$\bigcup U_\alpha$ открыто (любое объединение), $U_1\cap\dots\cap U_n$ открыто (конечное пересечение). Значит, $\bigcap F_\alpha$ и $F_1\cup\dots\cup F_n$ замкнуты.`,
          },
          {
            title: 'Бесконечное объединение',
            body: md`Каждое $x\in(0;1)$ лежит в $[\frac1n;1-\frac1n]$ при больших $n$, а $0,1$ — ни в одном. Объединение равно $(0;1)$, а $0$ — его точка прикосновения вне него.`,
          },
          {
            title: md`$\{a\}$ замкнуто`,
            body: md`$\mathbb R\setminus\{a\}=(-\infty;a)\cup(a;+\infty)$ — объединение открытых лучей, открыто. $\blacksquare$`,
          },
        ],
      },
      uses: ['t-closed-complement', 't-open-ops'],
      pitfalls: ['Любое множество — объединение одноточечных (замкнутых), поэтому про бесконечные объединения ничего сказать нельзя.'],
    },
    {
      id: 't-closed-complement',
      title: 'Замкнутость и замыкание',
      source: 'Конспект, теорема 2.1.8',
      statement: {
        level: 'basic',
        text: md`Для $F\subseteq\mathbb R$ равносильно: $F=\overline F$ (содержит все свои точки прикосновения) и $\mathbb R\setminus F$ открыто. То есть два описания замкнутости совпадают.`,
      },
      proof: {
        level: 'basic',
        idea: md`Точка вне $F$ не является точкой прикосновения $\iff$ у неё есть окрестность, не пересекающая $F$, т. е. лежащая в дополнении.`,
        steps: [
          { title: md`Всегда $F\subseteq\overline F$`, body: md`Каждая окрестность точки $x\in F$ содержит $x$, т. е. пересекает $F$. Поэтому $F=\overline F\iff\overline F\subseteq F$.` },
          {
            title: md`$F=\overline F\Rightarrow$ дополнение открыто`,
            body: md`Пусть $x\notin F$. Тогда $x\notin\overline F$, т. е. есть окрестность $U\ni x$ с $U\cap F=\varnothing$, и $x\in U\subseteq\mathbb R\setminus F$. По локальному критерию $\mathbb R\setminus F$ открыто.`,
          },
          {
            title: md`Дополнение открыто $\Rightarrow F=\overline F$`,
            body: md`Пусть $y\in\overline F$, но $y\notin F$. Тогда $y\in\mathbb R\setminus F$ — открытое множество, это окрестность $y$, не пересекающая $F$. Противоречие с $y\in\overline F$. $\blacksquare$`,
          },
        ],
      },
      uses: ['t-local-open'],
      pitfalls: ['В конспекте «замкнутое» определено как F = F̄; теорема говорит, что это то же, что «дополнение открыто».'],
    },
    {
      id: 't-rel-closed',
      title: 'Относительно замкнутые множества',
      source: 'Конспект, наблюдение 2.5',
      statement: {
        level: 'basic',
        text: md`Пусть $F\subseteq A\subseteq\mathbb R$. $F$ замкнуто в $A$ тогда и только тогда, когда существует замкнутое в $\mathbb R$ множество $\tilde F$ с $F=A\cap\tilde F$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Переходим к дополнениям: открытые в $A$ — это $A\cap U$, а дополнение в $A$ к $A\cap U$ — это $A\cap(\mathbb R\setminus U)$.`,
        steps: [
          {
            title: 'Тождество',
            body: md`Для любых $B,C$: $B\cap(\mathbb R\setminus C)=B\setminus(B\cap C)$ — обе части состоят из точек $B$, не лежащих в $C$.`,
          },
          {
            title: md`$\Rightarrow$`,
            body: md`$F$ замкнуто в $A$: $A\setminus F$ открыто в $A$, т. е. $A\setminus F=A\cap U$, $U$ открыто в $\mathbb R$. Положим $\tilde F=\mathbb R\setminus U$ — замкнуто в $\mathbb R$. Тогда $A\cap\tilde F=A\setminus(A\cap U)=A\setminus(A\setminus F)=F$.`,
          },
          {
            title: md`$\Leftarrow$`,
            body: md`$\tilde F$ замкнуто: $\tilde F=\mathbb R\setminus U$, $U$ открыто. $A\cap\tilde F=A\setminus(A\cap U)$, а $A\cap U$ открыто в $A$. Значит, $A\cap\tilde F$ — дополнение в $A$ к открытому в $A$, т. е. замкнуто в $A$. $\blacksquare$`,
          },
        ],
      },
      notes: md`Пример: $(0;\frac12]=(0;1]\cap[0;\frac12]$ замкнуто в $(0;1]$, но не в $\mathbb R$.`,
      pitfalls: [md`Равенство $A\setminus(A\setminus F)=F$ использует $F\subseteq A$.`],
    },
  ],
};

export const compactness: Topic = {
  id: 'compactness',
  title: 'Компактность',
  longread: 2,
  units: [
    {
      id: 'q-compact',
      title: 'Компактность',
      source: 'Конспект, §2.3, определения 2.3.1–2.3.3',
      definition: {
        level: 'basic',
        text: md`- **Покрытие** множества $K$ — семейство множеств $\{U_\lambda\}_{\lambda\in\Lambda}$ с $K\subseteq\bigcup_\lambda U_\lambda$. **Подпокрытие** — часть семейства ($\Lambda'\subseteq\Lambda$), которая всё ещё покрывает $K$. **Открытое** покрытие — из открытых множеств (в $\mathbb R$ или в $K$ — это равносильно).
- $K$ **компактно**, если из **каждого** открытого покрытия $K$ можно выбрать **конечное** подпокрытие.

**Отличие от «есть одно конечное открытое покрытие»:** такое покрытие есть у любого множества — $\{\mathbb R\}$. Компактность — свойство **всех** покрытий: даже «плохое» бесконечное покрытие должно содержать конечное подпокрытие.`,
      },
      notes: md`$\mathbb R$ не компактно: $\{(-n;n)\}$ без конечного подпокрытия. $(0;1)$ не компактно: $\{(\frac1n;1)\}_{n\ge2}$. $[a;b]$ компактен. На прямой: компактно $\iff$ замкнуто и ограничено.`,
      pitfalls: ['Квантор «для каждого покрытия», а не «существует покрытие».', 'Подпокрытие берётся из данного покрытия, а не строится заново.'],
    },
    {
      id: 't-compact-two',
      title: 'Два описания компактности',
      source: 'Конспект, теорема 2.3.1',
      statement: {
        level: 'basic',
        text: md`Для $K\subseteq\mathbb R$ равносильно:
- (a) из каждого покрытия $K$ множествами, открытыми в $\mathbb R$, можно выбрать конечное подпокрытие;
- (b) из каждого покрытия $K$ множествами, открытыми в $K$, можно выбрать конечное подпокрытие.`,
      },
      proof: {
        level: 'basic',
        idea: md`Покрытия переводятся друг в друга пересечением с $K$ и обратно — выбором $\tilde U_\alpha$ с $U_\alpha=K\cap\tilde U_\alpha$.`,
        steps: [
          {
            title: md`(a) $\Rightarrow$ (b): поднимаем в $\mathbb R$`,
            body: md`Пусть $K=\bigcup U_\alpha$, $U_\alpha$ открыты в $K$: $U_\alpha=K\cap\tilde U_\alpha$, $\tilde U_\alpha$ открыты в $\mathbb R$. Тогда $K\subseteq\bigcup\tilde U_\alpha$ — открытое в $\mathbb R$ покрытие.`,
          },
          {
            title: md`Возвращаемся в $K$`,
            body: md`По (a) $K\subseteq\tilde U_{\alpha_1}\cup\dots\cup\tilde U_{\alpha_n}$. Пересекая с $K$: $K=U_{\alpha_1}\cup\dots\cup U_{\alpha_n}$.`,
          },
          {
            title: md`(b) $\Rightarrow$ (a): опускаем в $K$`,
            body: md`Пусть $K\subseteq\bigcup V_\alpha$, $V_\alpha$ открыты в $\mathbb R$. Множества $K\cap V_\alpha$ открыты в $K$ и покрывают $K$.`,
          },
          {
            title: 'Конечное подпокрытие',
            body: md`По (b) $K=(K\cap V_{\alpha_1})\cup\dots\cup(K\cap V_{\alpha_n})\subseteq V_{\alpha_1}\cup\dots\cup V_{\alpha_n}$. $\blacksquare$`,
          },
        ],
      },
      pitfalls: ['Индексы подпокрытия переносятся: выбираем те же α в обоих покрытиях.'],
    },
    {
      id: 't-segment-compact',
      title: 'Компактность отрезка',
      source: 'Конспект, теорема 2.3.2, пример 2.17',
      statement: {
        level: 'basic',
        text: md`Каждый отрезок $[a;b]\subseteq\mathbb R$ компактен. При $a<b$ интервал $(a;b)$ не компактен.`,
      },
      proof: {
        level: 'basic',
        idea: md`От противного: делим пополам, сохраняя «плохую» половину; общая точка вложенных отрезков лежит в одном $U_{\alpha_0}$, который целиком накрывает маленькие отрезки.`,
        steps: [
          {
            title: 'От противного',
            body: md`Пусть $\{U_\alpha\}$ — открытое покрытие $I_0=[a;b]$, из которого нельзя выбрать конечное подпокрытие.`,
          },
          {
            title: 'Деление пополам',
            body: md`Если бы обе половины $I_0$ покрывались конечным числом $U_\alpha$, то и $I_0$ покрывался бы. Значит, одна половина — $I_1$ — не покрывается конечным числом. Повторяем: $I_0\supseteq I_1\supseteq\dots$, $|I_k|=\dfrac{b-a}{2^k}\to0$, ни один $I_k$ не покрывается конечным набором.`,
          },
          { title: 'Общая точка', body: md`По теореме о вложенных отрезках есть $c\in\bigcap I_k$; $c\in[a;b]$, поэтому $c\in U_{\alpha_0}$ для некоторого $\alpha_0$.` },
          {
            title: md`$I_k\subseteq U_{\alpha_0}$`,
            body: md`$U_{\alpha_0}$ открыто: $(c-\varepsilon;c+\varepsilon)\subseteq U_{\alpha_0}$. Выберем $k$ с $\dfrac{b-a}{2^k}<\varepsilon$: так как $c\in I_k$, весь $I_k\subseteq(c-\varepsilon;c+\varepsilon)\subseteq U_{\alpha_0}$ — покрыт **одним** множеством. Противоречие.`,
          },
          {
            title: md`$(a;b)$ не компактен`,
            body: md`$U_n=\bigl(a+\frac{b-a}n;b\bigr)$, $n\ge2$, — открытое покрытие $(a;b)$. Любой конечный набор $U_{n_1},\dots,U_{n_k}$ даёт $\bigl(a+\frac{b-a}N;b\bigr)$, $N=\max n_i$, и точка $a+\frac{b-a}{2N}$ не покрыта. $\blacksquare$`,
          },
        ],
      },
      uses: ['t-nested-segments'],
      pitfalls: ['Покрытие произвольное — нельзя предполагать, что оно из интервалов.', 'Для (a; b) нужно предъявить конкретное покрытие и показать, что любой конечный поднабор не годится.'],
    },
    {
      id: 't-compact-criterion',
      title: 'Критерий компактности на прямой',
      source: 'Конспект, теоремы 2.3.3, 2.3.4',
      statement: {
        level: 'basic',
        text: md`- (a) Всякое компактное $K\subseteq\mathbb R$ ограничено;
- (b) замкнуто в $\mathbb R$;
- (c) всякое замкнутое в компактном $K$ подмножество компактно;
- (d) $K\subseteq\mathbb R$ компактно $\iff$ оно замкнуто и ограничено.`,
      },
      proof: {
        level: 'basic',
        idea: md`(a) покрытие $(-n;n)$; (b) покрытие дополнениями к $[y-\frac1n;y+\frac1n]$; (c) добавить к покрытию $K\setminus F$; (d) вложить $K$ в отрезок.`,
        steps: [
          {
            title: '(a) Ограниченность',
            body: md`$\{(-n;n)\}_{n\ge1}$ покрывает $K$. Конечное подпокрытие — $(-N;N)$ с $N=\max n_i$, так как интервалы вложены. Значит, $K\subseteq(-N;N)$.`,
          },
          {
            title: '(b) Точка вне K',
            body: md`Пусть $y\notin K$. Множества $V_n=\mathbb R\setminus[y-\frac1n;y+\frac1n]$ открыты, и $\bigcup V_n=\mathbb R\setminus\{y\}\supseteq K$.`,
          },
          {
            title: '(b) Окрестность без K',
            body: md`Конечное подпокрытие сводится к одному $V_N$ (они растут): $K\subseteq V_N$, т. е. $(y-\frac1N;y+\frac1N)\cap K=\varnothing$. Значит, $y\notin\overline K$. Итак, $\overline K\subseteq K$ — $K$ замкнуто.`,
          },
          {
            title: md`(c) Добавляем $K\setminus F$`,
            body: md`$F$ замкнуто в $K$, значит, $K\setminus F$ открыто в $K$. Если $\{U_\alpha\}$ — покрытие $F$ множествами, открытыми в $K$, то $\{U_\alpha\}\cup\{K\setminus F\}$ покрывает $K$. Выберем конечное подпокрытие; выбросив из него $K\setminus F$ (оно не содержит точек $F$), получим конечное подпокрытие $F$.`,
          },
          {
            title: '(d) Замкнутое и ограниченное',
            body: md`$\Rightarrow$ — это (a) и (b). $\Leftarrow$: $K\subseteq[a;b]$, отрезок компактен. $K$ замкнуто в $\mathbb R$ и $K=[a;b]\cap K$, поэтому $K$ замкнуто в $[a;b]$; по (c) $K$ компактно. $\blacksquare$`,
          },
        ],
      },
      uses: ['t-segment-compact', 't-rel-closed', 't-compact-two'],
      pitfalls: [
        'В (c) покрытие F множествами, открытыми в K, — по двум описаниям компактности это неважно.',
        'В (b) в конспекте другое покрытие (окрестности точек K, не задевающие окрестность y) — тоже правильно; главное — найти окрестность y без точек K.',
      ],
    },
  ],
};
