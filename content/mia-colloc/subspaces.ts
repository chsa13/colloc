import { md, type Topic } from '../../src/content/schema';

// Лонгриды 7, 8, 10, 11. Подпространства, размерность, базис, формула Фурье, проекции, Грам — Шмидт.

export const subspaces: Topic = {
  id: 'subspaces',
  title: 'Подпространства. Линейная оболочка системы векторов',
  longread: 7,
  units: [
    {
      id: 'collinear',
      title: 'Коллинеарные и неколлинеарные векторы в Rⁿ',
      source: 'Лонгрид 7, определение 7.1',
      definition: {
        level: 'basic',
        text: md`Ненулевые векторы $\mathbf u,\mathbf v\in\mathbb R^n$ **коллинеарны** ($\mathbf u\parallel\mathbf v$), если они пропорциональны: существует $\lambda\in\mathbb R$, что $\mathbf u=\lambda\mathbf v$. Иначе векторы **неколлинеарны**.`,
      },
      notes: md`Геометрически: одинаковое или противоположное направление, угол $0$ или $180^\circ$. Нулевой вектор считается коллинеарным любому.

Проверка: координаты пропорциональны. $(2;-4;6)\parallel(-1;2;-3)$ ($\lambda=-2$); $(1;2;3)$ и $(2;4;5)$ — нет.`,
      pitfalls: [
        md`Пропорциональны должны быть **все** координаты с одним и тем же $\lambda$.`,
        'Противоположно направленные векторы тоже коллинеарны (λ < 0).',
      ],
    },
    {
      id: 'span',
      title: 'Линейная оболочка векторов в Rⁿ',
      source: 'Лонгрид 7, определение 7.2',
      definition: {
        level: 'basic',
        text: md`**Линейной оболочкой** векторов $\mathbf v_1,\dots,\mathbf v_k\in\mathbb R^n$ называется множество всех их линейных комбинаций:
$$\operatorname{span}(\mathbf v_1;\dots;\mathbf v_k)=\{\mathbf x:\ \mathbf x=\alpha_1\mathbf v_1+\dots+\alpha_k\mathbf v_k,\ \alpha_i\in\mathbb R\}.$$
Выражение $\alpha_1\mathbf v_1+\dots+\alpha_k\mathbf v_k$ — **линейная комбинация**.`,
      },
      notes: md`Оболочка всегда содержит $\mathbf 0$ (все $\alpha_i=0$).

Примеры: $\operatorname{span}(\mathbf u)$ при $\mathbf u\ne\mathbf 0$ — прямая через начало координат; оболочка двух неколлинеарных векторов в $\mathbb R^3$ — плоскость через начало координат; $\operatorname{span}(\mathbf e_1;\mathbf e_2)=\mathbb R^2$.`,
      pitfalls: [
        'Оболочка — бесконечное множество (если есть ненулевой вектор), а не набор из k векторов.',
        md`Коэффициенты $\alpha_i$ — любые действительные числа (не только из $[0;1]$, это была бы выпуклая комбинация).`,
      ],
    },
    {
      id: 'subspace',
      title: 'Линейное подпространство в Rⁿ',
      source: 'Лонгрид 7, определение 7.3',
      definition: {
        level: 'basic',
        text: md`**Линейным подпространством** $\mathbb R^n$ называется линейная оболочка конечного числа векторов $\mathbf v_1,\dots,\mathbf v_k\in\mathbb R^n$:
$$V=\operatorname{span}(\mathbf v_1;\dots;\mathbf v_k).$$`,
      },
      notes: md`В курсе подпространство и линейная оболочка — одно и то же понятие: каждая оболочка задаёт подпространство, каждое подпространство — оболочка.

Не подпространство: прямая $y=x+1$ (не проходит через $\mathbf 0$).`,
      pitfalls: [
        md`Если множество не содержит $\mathbf 0$, оно точно не подпространство — проверяй это первым.`,
        'Объединение двух разных прямых через 0 — не подпространство: сумма векторов с разных прямых выходит из объединения.',
      ],
    },
    {
      id: 'affine',
      title: 'Аффинное подпространство в Rⁿ',
      source: 'Лонгрид 7, определение 7.4',
      definition: {
        level: 'basic',
        text: md`**Аффинным подпространством** $\mathbb R^n$ называется множество векторов вида $\mathbf a+\mathbf v$, где $\mathbf a\in\mathbb R^n$ фиксирован, а $\mathbf v$ пробегает линейное подпространство $V$:
$$A=\mathbf a+V=\{\mathbf a+\mathbf v:\ \mathbf v\in V\}=\{\mathbf a+\alpha_1\mathbf v_1+\dots+\alpha_k\mathbf v_k\}.$$`,
      },
      notes: md`Это сдвиг линейного подпространства на вектор $\mathbf a$. Прямая $y=x+1$ — аффинное подпространство: $(0;1)+\operatorname{span}((1;1))$.

Размерность аффинного подпространства: $\dim A=\dim V$.`,
      pitfalls: [
        md`Аффинное подпространство, как правило, **не** линейное: оно содержит $\mathbf 0$ только если $\mathbf a\in V$ (и тогда $A=V$).`,
      ],
    },
    {
      id: 'dimension',
      title: 'Размерность линейного подпространства в Rⁿ',
      source: 'Лонгрид 7, определение 7.5',
      definition: {
        level: 'basic',
        text: md`**Размерность** подпространства $V\subseteq\mathbb R^n$ — **минимальное** количество векторов $\mathbf v_1,\dots,\mathbf v_k$, необходимых, чтобы задать $V=\operatorname{span}(\mathbf v_1;\dots;\mathbf v_k)$. Обозначение $\dim V$. Для $V=\{\mathbf 0\}$ считают $\dim V=0$.`,
      },
      notes: md`Интуитивно: сколько параметров нужно, чтобы задать точку $V$. Плоскость $\operatorname{span}(\mathbf u;\mathbf v)$ в $\mathbb R^{100}$ при неколлинеарных $\mathbf u,\mathbf v$ имеет размерность 2, хотя у её точек по 100 координат.`,
      pitfalls: [
        md`Размерность — это не число координат и не число векторов в каком-то порождающем наборе, а **минимальное** число: $\dim\operatorname{span}((1;0);(2;0))=1$.`,
      ],
    },
    {
      id: 'lin-indep',
      title: 'Линейно независимые и линейно зависимые векторы',
      source: 'Лонгрид 7, определение 7.6; лонгрид 11, определение 11.1, теорема 11.1',
      definition: {
        level: 'basic',
        text: md`Векторы $\mathbf v_1,\dots,\mathbf v_k$ **линейно независимы**, если равенство
$$\alpha_1\mathbf v_1+\alpha_2\mathbf v_2+\dots+\alpha_k\mathbf v_k=\mathbf 0$$
выполняется **только** при $\alpha_1=\dots=\alpha_k=0$. Если оно возможно, когда хотя бы один $\alpha_i\ne0$, векторы **линейно зависимы**.`,
      },
      notes: md`Равносильно (лонгрид 11): набор зависим $\iff$ хотя бы один вектор выражается через остальные (лежит в оболочке остальных). Один вектор зависим $\iff$ он нулевой.

Признаки: набор с $\mathbf 0$ зависим; два вектора зависимы $\iff$ коллинеарны; больше $n$ векторов в $\mathbb R^n$ всегда зависимы; ненулевые попарно ортогональные векторы независимы.`,
      pitfalls: [
        md`Для зависимости нужен хотя бы **один** ненулевой коэффициент, а не все.`,
        'Попарная неколлинеарность не даёт независимости трёх и более векторов: (1;0), (0;1), (1;1) попарно неколлинеарны, но зависимы.',
      ],
    },
    {
      id: 'subspace-examples',
      title: 'Примеры линейных подпространств в R² и R³',
      source: 'Лонгрид 7, пример 7.4; лонгрид 8, теорема 8.2',
      statement: {
        level: 'basic',
        text: md`Все подпространства $\mathbb R^2$: $\{\mathbf 0\}$ (размерность 0); прямые через начало координат $\operatorname{span}(\mathbf u)$, $\mathbf u\ne\mathbf 0$ (размерность 1); всё $\mathbb R^2$ (размерность 2).

Все подпространства $\mathbb R^3$: $\{\mathbf 0\}$ (0); прямые через начало координат (1); плоскости через начало координат $\operatorname{span}(\mathbf u;\mathbf v)$, $\mathbf u\not\parallel\mathbf v$, они же $\{\mathbf x:\ \langle\mathbf x;\mathbf n\rangle=0\}$ (2); всё $\mathbb R^3$ (3).`,
      },
      notes: md`Подпространство обязано проходить через начало координат: прямая $y=x+1$ и плоскость $x+y+z=1$ — не подпространства (аффинные).`,
      pitfalls: [
        'Прямая или плоскость, не проходящая через 0, — не линейное подпространство.',
        md`$\mathbb R^2$ — не подпространство $\mathbb R^3$ (векторы разной размерности); подпространство $\mathbb R^3$ — плоскость $z=0$.`,
      ],
    },
    {
      id: 'dim-props',
      title: 'Свойства размерности',
      source: 'Лонгрид 7, теорема 7.1 и следствие',
      statement: {
        level: 'basic',
        text: md`Пусть $V,W$ — подпространства $\mathbb R^n$ и $V\subseteq W$ (каждый вектор $V$ лежит в $W$). Тогда
$$\dim V\le\dim W,$$
причём равенство $\dim V=\dim W$ выполнено тогда и только тогда, когда $V=W$.

**Следствие.** Единственное подпространство $\mathbb R^n$ размерности $n$ — само $\mathbb R^n$.`,
      },
      notes: md`Почему $\dim V\le\dim W$: если $\dim W$ векторов хватает, чтобы выразить все векторы $W$, то их хватает и для $V\subseteq W$.

Ещё полезно: $0\le\dim V\le n$; $\dim\operatorname{span}(\mathbf v_1;\dots;\mathbf v_k)\le k$.`,
      pitfalls: [
        md`Равенство размерностей даёт равенство пространств **только если** одно вложено в другое: две разные прямые через 0 обе имеют размерность 1.`,
      ],
    },
    {
      id: 'dim-indep',
      title: 'Теорема о размерности оболочки линейно независимых векторов',
      source: 'Лонгрид 7, теорема 7.2',
      statement: {
        level: 'basic',
        text: md`Размерность подпространства $V=\operatorname{span}(\mathbf v_1;\dots;\mathbf v_k)$ равна $k$ тогда и только тогда, когда векторы $\mathbf v_1,\dots,\mathbf v_k$ линейно независимы.`,
      },
      notes: md`Идея: если какой-то вектор выражается через остальные, его можно выкинуть, не меняя оболочку, — значит $\dim V<k$. Если ни один не выражается, сократить набор без потерь нельзя.

Пример: $\operatorname{span}((1;0;1);(0;1;1);(1;1;2))$ — третий равен сумме первых двух, размерность 2.`,
      pitfalls: [
        'Из k векторов размерность оболочки ≤ k; равна k ровно при независимости.',
      ],
    },
    {
      id: 'subspace-props',
      title: 'Свойства линейных подпространств',
      source: 'Лонгрид 7, §2, свойства 1–3',
      statement: {
        level: 'basic',
        text: md`Пусть $V$ — линейное подпространство $\mathbb R^n$. Тогда:
1. $\mathbf 0\in V$;
2. если $\mathbf x_1,\mathbf x_2\in V$, то $\mathbf x_1+\mathbf x_2\in V$;
3. если $\mathbf x\in V$ и $\lambda\in\mathbb R$, то $\lambda\mathbf x\in V$.`,
      },
      proof: {
        level: 'basic',
        idea: md`$V=\operatorname{span}(\mathbf v_1;\dots;\mathbf v_k)$; в каждом пункте предъявляем вектор как линейную комбинацию $\mathbf v_1,\dots,\mathbf v_k$.`,
        steps: [
          {
            title: md`Записываем $V$ как оболочку`,
            body: md`По определению $V=\operatorname{span}(\mathbf v_1;\dots;\mathbf v_k)$ для некоторых векторов $\mathbf v_1,\dots,\mathbf v_k$; вектор лежит в $V$ $\iff$ он их линейная комбинация.`,
          },
          {
            title: md`Ноль: все коэффициенты нули`,
            body: md`$\mathbf 0=0\cdot\mathbf v_1+\dots+0\cdot\mathbf v_k$ — линейная комбинация, значит $\mathbf 0\in V$.`,
          },
          {
            title: 'Сумма: складываем коэффициенты',
            body: md`$\mathbf x_1=\sum\alpha_i\mathbf v_i$, $\mathbf x_2=\sum\beta_i\mathbf v_i$, тогда $\mathbf x_1+\mathbf x_2=(\alpha_1+\beta_1)\mathbf v_1+\dots+(\alpha_k+\beta_k)\mathbf v_k\in V$.`,
          },
          {
            title: 'Умножение: умножаем коэффициенты',
            body: md`$\mathbf x=\sum\alpha_i\mathbf v_i$, тогда $\lambda\mathbf x=(\lambda\alpha_1)\mathbf v_1+\dots+(\lambda\alpha_k)\mathbf v_k\in V$.`,
          },
        ],
      },
      notes: md`Свойства 2 и 3 вместе: любая линейная комбинация векторов из $V$ лежит в $V$.

Как применять: чтобы показать, что множество **не** подпространство, достаточно нарушить одно свойство: нет нуля, или нашлись два вектора с суммой вне множества, или вектор и число.`,
      pitfalls: [
        'Доказательство опирается на определение подпространства как оболочки — начни с записи V = span(v₁; …; vₖ).',
        'Коэффициенты суммы — αᵢ + βᵢ при тех же vᵢ; не забудь, что оба вектора раскладываются по одному и тому же набору.',
      ],
    },
    {
      id: 'perp-dim',
      title: 'Теорема о размерности подпространства, перпендикулярного вектору',
      source: 'Лонгрид 7, теорема 7.3',
      statement: {
        level: 'basic',
        text: md`Пусть $\mathbf w\in\mathbb R^n$ — ненулевой вектор. Тогда множество векторов, перпендикулярных $\mathbf w$,
$$P=\{\mathbf x:\ \langle\mathbf x;\mathbf w\rangle=0\}$$
является линейным подпространством размерности $n-1$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Выражаем одну координату через остальные, раскладываем общий вектор $P$ по $n-1$ свободным координатам и видим оболочку $n-1$ независимых векторов.`,
        steps: [
          {
            title: 'Уравнение и выбор ненулевой координаты',
            body: md`$\mathbf x\in P\iff w_1x_1+\dots+w_nx_n=0$. Так как $\mathbf w\ne\mathbf 0$, некоторая $w_i\ne0$; без ограничения общности $w_n\ne0$.`,
          },
          {
            title: md`Выражаем $x_n$`,
            body: md`$x_n=-\dfrac{w_1}{w_n}x_1-\dots-\dfrac{w_{n-1}}{w_n}x_{n-1}$, а $x_1,\dots,x_{n-1}$ произвольны.`,
          },
          {
            title: md`Раскладываем по свободным координатам`,
            body: md`$\mathbf x=x_1\mathbf u_1+\dots+x_{n-1}\mathbf u_{n-1}$, где $\mathbf u_i=\mathbf e_i-\dfrac{w_i}{w_n}\mathbf e_n$ (единица на $i$-м месте, $-w_i/w_n$ на последнем, остальные нули).`,
          },
          {
            title: 'P — подпространство',
            body: md`Свободные координаты пробегают все значения, поэтому $P=\operatorname{span}(\mathbf u_1;\dots;\mathbf u_{n-1})$ — линейное подпространство по определению.`,
          },
          {
            title: 'Векторы независимы — размерность n − 1',
            body: md`Если $\sum_{i<n}\alpha_i\mathbf u_i=\mathbf 0$, то $i$-я координата ($i<n$) этой комбинации равна $\alpha_i$, значит все $\alpha_i=0$. Векторы $\mathbf u_1,\dots,\mathbf u_{n-1}$ независимы, и по теореме о размерности оболочки независимых векторов $\dim P=n-1$.`,
          },
        ],
      },
      notes: md`В $\mathbb R^2$ это прямая, в $\mathbb R^3$ — плоскость через начало координат с нормалью $\mathbf w$, в $\mathbb R^n$ — гиперплоскость.

Пример: $x_1-2x_2+3x_3+2x_4=0$ в $\mathbb R^4$: $x_4=-\tfrac12x_1+x_2-\tfrac32x_3$, $P=\operatorname{span}((1;0;0;-\tfrac12),(0;1;0;1),(0;0;1;-\tfrac32))$, $\dim P=3$.`,
      pitfalls: [
        md`Условие $\mathbf w\ne\mathbf 0$ существенно: для $\mathbf w=\mathbf 0$ получится всё $\mathbb R^n$.`,
        md`Делить можно только на ненулевую $w_i$ — поэтому выбираем её явно («без ограничения общности $w_n\ne0$»).`,
        'Мало показать, что P — оболочка n − 1 векторов: нужно ещё доказать их независимость.',
      ],
      uses: ['dim-indep'],
    },
  ],
};

export const basis: Topic = {
  id: 'basis',
  title: 'Базис',
  longread: 8,
  units: [
    {
      id: 'basis-def',
      title: 'Базис линейного подпространства V',
      source: 'Лонгрид 8, определение 8.1',
      definition: {
        level: 'basic',
        text: md`**Базисом** подпространства $V$ размерности $\dim V=k$ называется любой набор из $k$ векторов $\{\mathbf v_1;\dots;\mathbf v_k\}$, для которого $V=\operatorname{span}(\mathbf v_1;\dots;\mathbf v_k)$.`,
      },
      notes: md`Равносильно: линейно независимый набор, порождающий $V$ (минимальное порождающее множество). Разложение вектора по базису единственно.

У подпространства размерности $>0$ бесконечно много базисов. В $\mathbb R^2$ два ненулевых вектора — базис $\iff$ неколлинеарны; в $\mathbb R^3$ три вектора — базис $\iff$ линейно независимы.`,
      pitfalls: [
        md`В базисе ровно $\dim V$ векторов: лишний вектор делает набор зависимым, недостача не порождает $V$.`,
        md`Векторы базиса должны лежать в $V$: $(1;0;0),(0;1;0)$ — не базис плоскости $x+y+z=0$.`,
      ],
    },
    {
      id: 'std-basis',
      title: 'Стандартный базис Rⁿ',
      source: 'Лонгрид 8, определение 8.2',
      definition: {
        level: 'basic',
        text: md`**Стандартный базис** $\mathbb R^n$ — набор из $n$ векторов
$$\mathbf e_1=(1;0;\dots;0),\ \mathbf e_2=(0;1;0;\dots;0),\ \dots,\ \mathbf e_n=(0;\dots;0;1),$$
у $\mathbf e_i$ на $i$-м месте 1, на остальных 0. $\mathbb R^n=\operatorname{span}(\mathbf e_1;\dots;\mathbf e_n)$.`,
      },
      notes: md`Координаты вектора — это и есть коэффициенты разложения по стандартному базису: $\mathbf x=x_1\mathbf e_1+\dots+x_n\mathbf e_n$. Стандартный базис ортонормирован, отсюда $\dim\mathbb R^n=n$.`,
      pitfalls: ['Стандартный базис — базис всего Rⁿ, а не любого подпространства.'],
    },
    {
      id: 'orthogonal-set',
      title: 'Ортогональный и ортонормированный набор векторов в Rⁿ',
      source: 'Лонгрид 8, определение 8.3, теорема 8.3',
      definition: {
        level: 'basic',
        text: md`Набор **ненулевых** векторов $\mathbf v_1,\dots,\mathbf v_k\in\mathbb R^n$ называется **ортогональным**, если $\langle\mathbf v_i;\mathbf v_j\rangle=0$ для всех $i\ne j$.

Если вдобавок $\|\mathbf v_i\|=1$ для всех $i$, набор **ортонормированный**.`,
      },
      notes: md`**Теорема 8.3.** Оболочка $k$ ненулевых ортогональных векторов имеет размерность $k$, и они образуют её базис (они линейно независимы: если $\mathbf v_1=\sum_{j>1}\gamma_j\mathbf v_j$, то $\|\mathbf v_1\|^2=\langle\mathbf v_1;\sum\gamma_j\mathbf v_j\rangle=0$ — противоречие).

Следствие: $n$ ортогональных ненулевых векторов в $\mathbb R^n$ — базис. Любое подпространство имеет ортогональный и ортонормированный базис (строится процессом Грама — Шмидта).

Из ортогонального набора ортонормированный получают делением каждого вектора на его длину.`,
      pitfalls: [
        'Ортогональность — попарная: проверяй все пары, а не только соседние.',
        'Векторы ортогонального набора по определению ненулевые.',
      ],
    },
    {
      id: 'fourier',
      title: 'Формула Фурье',
      source: 'Лонгрид 8, теорема 8.5',
      statement: {
        level: 'basic',
        text: md`Пусть $\mathbf v_1,\dots,\mathbf v_k\in\mathbb R^n$ — ортогональный набор. Тогда любой вектор $\mathbf x\in\operatorname{span}(\mathbf v_1;\dots;\mathbf v_k)$ представляется в виде
$$\mathbf x=\sum_{i=1}^k\frac{\langle\mathbf x;\mathbf v_i\rangle}{\|\mathbf v_i\|^2}\mathbf v_i.$$
Для ортонормированного набора знаменатели равны 1: $\mathbf x=\sum\langle\mathbf x;\mathbf v_i\rangle\mathbf v_i$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Записываем $\mathbf x$ как комбинацию с неизвестными коэффициентами и умножаем скалярно на $\mathbf v_i$: из-за ортогональности выживает одно слагаемое.`,
        steps: [
          {
            title: 'Разложение с неизвестными коэффициентами',
            body: md`$\mathbf x$ лежит в оболочке, значит $\mathbf x=\alpha_1\mathbf v_1+\dots+\alpha_k\mathbf v_k$ для некоторых чисел $\alpha_1,\dots,\alpha_k$.`,
          },
          {
            title: md`Умножаем скалярно на $\mathbf v_i$`,
            body: md`По линейности скалярного произведения: $\langle\mathbf x;\mathbf v_i\rangle=\alpha_1\langle\mathbf v_1;\mathbf v_i\rangle+\dots+\alpha_k\langle\mathbf v_k;\mathbf v_i\rangle$.`,
          },
          {
            title: 'Ортогональность убивает все слагаемые, кроме одного',
            body: md`$\langle\mathbf v_j;\mathbf v_i\rangle=0$ при $j\ne i$, а $\langle\mathbf v_i;\mathbf v_i\rangle=\|\mathbf v_i\|^2$. Остаётся $\langle\mathbf x;\mathbf v_i\rangle=\alpha_i\|\mathbf v_i\|^2$.`,
          },
          {
            title: 'Выражаем коэффициент',
            body: md`$\mathbf v_i\ne\mathbf 0$, поэтому $\|\mathbf v_i\|^2\ne0$ и $\alpha_i=\dfrac{\langle\mathbf x;\mathbf v_i\rangle}{\|\mathbf v_i\|^2}$. Подставляем в разложение — получаем формулу.`,
          },
        ],
      },
      notes: md`Каждое слагаемое — проекция $\mathbf x$ на $\mathbf v_i$. Для неортогонального базиса коэффициенты так не находятся — приходится решать систему.

Пример: плоскость $x_1+x_2+x_3=0$, базис $\mathbf v_1=(1;-\tfrac12;-\tfrac12)$, $\mathbf v_2=(0;1;-1)$, $\mathbf x=(10;3;-13)$: $\alpha_1=\dfrac{15}{1{,}5}=10$, $\alpha_2=\dfrac{16}{2}=8$.`,
      pitfalls: [
        md`В знаменателе квадрат длины $\|\mathbf v_i\|^2$, а не $\|\mathbf v_i\|$.`,
        md`Формула верна только для $\mathbf x$ **из оболочки**; для других $\mathbf x$ та же сумма даёт проекцию на оболочку, а не сам $\mathbf x$.`,
        'Набор должен быть ортогональным — для произвольного базиса формула неверна.',
      ],
      uses: ['dot-props'],
    },
  ],
};

export const projections: Topic = {
  id: 'projections',
  title: 'Проекции',
  longread: 10,
  units: [
    {
      id: 'proj-line',
      title: 'Проекция вектора на подпространство размерности 1',
      source: 'Лонгрид 10, теорема 10.1',
      statement: {
        level: 'basic',
        text: md`Пусть $\ell=\operatorname{span}(\mathbf w)$, $\mathbf w\ne\mathbf 0$ — подпространство размерности 1. Проекция вектора $\mathbf x$ на $\ell$ (ближайший к $\mathbf x$ вектор прямой) равна
$$\operatorname{Proj}_\ell(\mathbf x)=\frac{\langle\mathbf x;\mathbf w\rangle}{\|\mathbf w\|^2}\,\mathbf w.$$`,
      },
      proof: {
        level: 'basic',
        idea: md`Ищем проекцию в виде $\lambda\mathbf w$; ближайшая точка — основание перпендикуляра, поэтому $\mathbf x-\lambda\mathbf w\perp\mathbf w$, отсюда $\lambda$. (Или минимизируем $\|\mathbf x-\lambda\mathbf w\|^2$ по $\lambda$.)`,
        steps: [
          {
            title: md`Проекция лежит на прямой: $\lambda\mathbf w$`,
            body: md`Любой вектор $\ell=\operatorname{span}(\mathbf w)$ имеет вид $\lambda\mathbf w$; ищем $\lambda$, при котором $\|\mathbf x-\lambda\mathbf w\|$ минимально.`,
          },
          {
            title: 'Квадрат расстояния — квадратный трёхчлен',
            body: md`$f(\lambda)=\|\mathbf x-\lambda\mathbf w\|^2=\langle\mathbf x-\lambda\mathbf w;\mathbf x-\lambda\mathbf w\rangle=\|\mathbf w\|^2\lambda^2-2\langle\mathbf x;\mathbf w\rangle\lambda+\|\mathbf x\|^2$. Минимизировать $\|\cdot\|$ и $\|\cdot\|^2$ — одно и то же.`,
          },
          {
            title: 'Минимум в вершине параболы',
            body: md`Коэффициент при $\lambda^2$ равен $\|\mathbf w\|^2>0$, ветви вверх; минимум в $\lambda=\dfrac{\langle\mathbf x;\mathbf w\rangle}{\|\mathbf w\|^2}$ (вершина, или $f'(\lambda)=0$). Значит, $\operatorname{Proj}_\ell(\mathbf x)=\dfrac{\langle\mathbf x;\mathbf w\rangle}{\|\mathbf w\|^2}\mathbf w$.`,
          },
          {
            title: 'Проверка: остаток перпендикулярен прямой',
            body: md`$\langle\mathbf x-\lambda\mathbf w;\mathbf w\rangle=\langle\mathbf x;\mathbf w\rangle-\lambda\|\mathbf w\|^2=0$ — это и есть геометрический способ: условие перпендикулярности сразу даёт то же $\lambda$.`,
          },
        ],
      },
      notes: md`Длина проекции: $\|\operatorname{Proj}_\ell\mathbf x\|=\dfrac{|\langle\mathbf x;\mathbf w\rangle|}{\|\mathbf w\|}$. Проекция не зависит от выбора направляющего вектора: для $c\mathbf w$ множители $c$ сокращаются.

Пример: $\mathbf x=(5;1)$ на прямую $y=2x$, $\mathbf w=(1;2)$: $\dfrac{7}{5}(1;2)=(\tfrac75;\tfrac{14}5)$.`,
      pitfalls: [
        md`Знаменатель — $\|\mathbf w\|^2$, а не $\|\mathbf w\|$: иначе ответ зависит от длины $\mathbf w$.`,
        'Проекция — вектор (лежит на прямой), а не число.',
        md`В геометрическом выводе нужно объяснить, почему ближайшая точка даёт перпендикулярный остаток (или вывести через минимум квадратного трёхчлена).`,
      ],
      uses: ['dot-props'],
    },
    {
      id: 'proj-combo',
      title: 'Проекция линейной комбинации векторов на подпространство размерности 1',
      source: 'Лонгрид 10, следствие теоремы 10.1',
      statement: {
        level: 'basic',
        text: md`Проекция линейной комбинации на прямую $\ell=\operatorname{span}(\mathbf w)$ равна той же линейной комбинации проекций:
$$\operatorname{Proj}_\ell(c_1\mathbf x_1+\dots+c_k\mathbf x_k)=c_1\operatorname{Proj}_\ell(\mathbf x_1)+\dots+c_k\operatorname{Proj}_\ell(\mathbf x_k).$$`,
      },
      notes: md`Следует из формулы проекции и линейности скалярного произведения: $\dfrac{\langle\sum c_i\mathbf x_i;\mathbf w\rangle}{\|\mathbf w\|^2}\mathbf w=\sum c_i\dfrac{\langle\mathbf x_i;\mathbf w\rangle}{\|\mathbf w\|^2}\mathbf w$.

Геометрически это неочевидно: ближайшая точка к комбинации — комбинация ближайших точек.`,
      pitfalls: ['Проекция линейна, но длина проекции — нет: ‖Proj(x + y)‖ ≠ ‖Proj x‖ + ‖Proj y‖ в общем случае.'],
      uses: ['proj-line'],
    },
    {
      id: 'orth-proj-thm',
      title: 'Теорема об ортогональной проекции',
      source: 'Лонгрид 10, определение 10.2, теорема 10.2',
      statement: {
        level: 'basic',
        text: md`**Проекция** $\mathbf x$ на подпространство $V$ — ближайший к $\mathbf x$ вектор $V$: $\operatorname{Proj}_V(\mathbf x)=\arg\min_{\mathbf v\in V}\|\mathbf x-\mathbf v\|$.

**Теорема.** Для любого $\mathbf x\in\mathbb R^n$ и любого подпространства $V$ проекция существует и единственна, причём $\mathbf x-\operatorname{Proj}_V(\mathbf x)$ ортогонален всем векторам $V$. Если $\mathbf v_1,\dots,\mathbf v_k$ — ортогональный базис $V$, то
$$\operatorname{Proj}_V(\mathbf x)=\sum_{i=1}^k\operatorname{Proj}_{\mathbf v_i}(\mathbf x)=\sum_{i=1}^k\frac{\langle\mathbf x;\mathbf v_i\rangle}{\|\mathbf v_i\|^2}\mathbf v_i.$$`,
      },
      notes: md`Если $\mathbf x\in V$, формула превращается в формулу Фурье и $\operatorname{Proj}_V\mathbf x=\mathbf x$.

Если базис не ортогональный, сначала ортогонализуем его процессом Грама — Шмидта: сумма проекций на неортогональные векторы **не** даёт проекцию на $V$.

Расстояние от $\mathbf x$ до $V$ — $\|\mathbf x-\operatorname{Proj}_V\mathbf x\|$.`,
      pitfalls: [
        'Формула-сумма работает только с ортогональным базисом.',
        md`Проверка ответа: $\mathbf x-\operatorname{Proj}_V\mathbf x$ должен быть перпендикулярен каждому базисному вектору $V$.`,
      ],
      uses: ['proj-line', 'fourier'],
    },
  ],
};

export const gramSchmidt: Topic = {
  id: 'gram-schmidt',
  title: 'Линейная независимость. Процесс ортогонализации Грама — Шмидта',
  longread: 11,
  units: [
    {
      id: 'gram-schmidt',
      title: 'Процесс Грама — Шмидта',
      source: 'Лонгрид 11, теоремы 11.2, 11.3',
      statement: {
        level: 'basic',
        text: md`Пусть $\mathbf v_1,\dots,\mathbf v_k$ — ненулевые векторы, $V=\operatorname{span}(\mathbf v_1;\dots;\mathbf v_k)$. Строим:
$$\mathbf w_1=\mathbf v_1,\qquad \mathbf w_j=\mathbf v_j-\sum_{i<j,\ \mathbf w_i\ne\mathbf 0}\frac{\langle\mathbf v_j;\mathbf w_i\rangle}{\|\mathbf w_i\|^2}\mathbf w_i\quad(j=2,\dots,k),$$
то есть из $\mathbf v_j$ вычитаем его проекцию на $\operatorname{span}(\mathbf w_1;\dots;\mathbf w_{j-1})$. Тогда ненулевые векторы среди $\mathbf w_1,\dots,\mathbf w_k$ образуют **ортогональный базис** $V$, а $\dim V$ равна их количеству.`,
      },
      notes: md`На каждом шаге $\operatorname{span}(\mathbf w_1;\dots;\mathbf w_j)=\operatorname{span}(\mathbf v_1;\dots;\mathbf v_j)$.

Если $\mathbf w_j=\mathbf 0$, то $\mathbf v_j$ выражается через предыдущие (векторы зависимы) — его просто пропускаем.

Любой $\mathbf w_j$ можно умножить на ненулевое число (например, чтобы убрать дроби): оболочка, ортогональность и проекции не меняются.

Ортонормированный базис — делим каждый $\mathbf w_i$ на его длину.

Пример: $\mathbf v_1=(1;2;2;-1)$, $\mathbf v_2=(0;1;1;-1)$: $\mathbf w_1=\mathbf v_1$, $\langle\mathbf v_2;\mathbf w_1\rangle=5$, $\|\mathbf w_1\|^2=10$, $\mathbf w_2=\mathbf v_2-\tfrac12\mathbf v_1=(-\tfrac12;0;0;-\tfrac12)\sim(1;0;0;1)$.`,
      pitfalls: [
        md`Вычитаем проекции на уже построенные $\mathbf w_i$, а не на исходные $\mathbf v_i$.`,
        md`Проверяй ответ: все $\langle\mathbf w_i;\mathbf w_j\rangle=0$ — это быстро и ловит арифметические ошибки.`,
        'Нулевой wⱼ — не ошибка, а сигнал линейной зависимости; в базис его не берут.',
      ],
      uses: ['orth-proj-thm', 'proj-line'],
    },
  ],
};
