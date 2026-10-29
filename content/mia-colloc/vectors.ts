import { md, type Topic } from '../../src/content/schema';

// Лонгриды 1–2. Векторы в R^n, норма, расстояние, угол, скалярное произведение и его свойства.

export const vectors: Topic = {
  id: 'vectors',
  title: 'Векторы в Rⁿ и операции над ними',
  longread: 1,
  units: [
    {
      id: 'vector',
      title: 'n-мерный вектор. Нулевой и единичный вектор',
      source: 'Лонгрид 1, определения 1.1, 1.2, 1.5, 1.7',
      definition: {
        level: 'basic',
        text: md`**$n$-мерный вектор** ($n\in\mathbb N$) — упорядоченный набор из $n$ действительных чисел $\mathbf v=(v_1;v_2;\dots;v_n)$; число $n$ — размерность вектора. Множество всех $n$-мерных векторов обозначают $\mathbb R^n$.

**Нулевой вектор** в $\mathbb R^n$: $\mathbf 0=(0;0;\dots;0)$ — все $n$ координат нули.

**Единичный вектор** — вектор длины 1: $\|\mathbf v\|=1$.`,
      },
      notes: md`Числа, в отличие от векторов, называют **скалярами**.

Из любого ненулевого $\mathbf v$ единичный вектор того же направления получается делением на длину: $\dfrac{\mathbf v}{\|\mathbf v\|}$ (нормировка).

Пример: $(3;4)$ — не единичный ($\|\cdot\|=5$), а $\left(\tfrac35;\tfrac45\right)$ — единичный.`,
      pitfalls: [
        md`Важен **порядок** координат: $(1;2)\ne(2;1)$.`,
        md`Единичный вектор — это вектор длины 1, а не «вектор из единиц»: у $(1;1)$ длина $\sqrt2$.`,
        md`Нулевой вектор нельзя нормировать: делить на $\|\mathbf 0\|=0$ нельзя.`,
      ],
    },
    {
      id: 'vector-ops',
      title: 'Операции над векторами: сложение и умножение на скаляр',
      source: 'Лонгрид 1, определения 1.3, 1.4',
      definition: {
        level: 'basic',
        text: md`Для $\mathbf v,\mathbf w\in\mathbb R^n$ (одной размерности!) и $\lambda\in\mathbb R$ операции покомпонентные:
$$\mathbf v+\mathbf w=(v_1+w_1;\ \dots;\ v_n+w_n),\qquad \lambda\mathbf v=(\lambda v_1;\ \dots;\ \lambda v_n).$$`,
      },
      notes: md`Разность отдельно не определяют: $\mathbf v-\mathbf w=\mathbf v+(-1)\mathbf w$.

**Свойства** (проверяются покомпонентно через свойства чисел): $\mathbf a+\mathbf b=\mathbf b+\mathbf a$; $\mathbf a+(\mathbf b+\mathbf c)=(\mathbf a+\mathbf b)+\mathbf c$; $\mathbf a+\mathbf 0=\mathbf a$; $\mathbf a+(-\mathbf a)=\mathbf 0$; $(\alpha\beta)\mathbf a=\alpha(\beta\mathbf a)$; $(\alpha+\beta)\mathbf a=\alpha\mathbf a+\beta\mathbf a$; $\alpha(\mathbf a+\mathbf b)=\alpha\mathbf a+\alpha\mathbf b$; $1\cdot\mathbf a=\mathbf a$.

**Геометрия:** сумма — правило треугольника (начало второго вектора к концу первого); $\lambda\mathbf v$ при $\lambda>0$ растягивает в $\lambda$ раз, при $\lambda<0$ растягивает в $|\lambda|$ раз и разворачивает.`,
      pitfalls: [
        md`Складывать векторы разной размерности нельзя: $(1;3;2)+(1;4)$ не имеет смысла.`,
        md`При $\lambda<0$ вектор не только меняет длину в $|\lambda|$ раз, но и разворачивается.`,
      ],
    },
    {
      id: 'norm',
      title: 'Норма (длина) n-мерного вектора',
      source: 'Лонгрид 1, определение 1.6',
      definition: {
        level: 'basic',
        text: md`**Нормой** (длиной) вектора $\mathbf v=(v_1;\dots;v_n)\in\mathbb R^n$ называется число
$$\|\mathbf v\|=\sqrt{v_1^2+v_2^2+\dots+v_n^2}\ \ge 0.$$`,
      },
      notes: md`$\|\lambda\mathbf v\|=|\lambda|\,\|\mathbf v\|$: $\sqrt{\lambda^2v_1^2+\dots+\lambda^2v_n^2}=|\lambda|\sqrt{v_1^2+\dots+v_n^2}$.

Через скалярное произведение: $\|\mathbf v\|=\sqrt{\langle\mathbf v;\mathbf v\rangle}$.

$\|\mathbf v\|=0\iff\mathbf v=\mathbf 0$.`,
      pitfalls: [
        md`Не забудь корень: $\|\mathbf v\|^2=\sum v_i^2$, а $\|\mathbf v\|=\sqrt{\sum v_i^2}$.`,
        md`$\|\lambda\mathbf v\|=|\lambda|\|\mathbf v\|$, а не $\lambda\|\mathbf v\|$: длина не бывает отрицательной.`,
      ],
    },
    {
      id: 'distance',
      title: 'Расстояние между векторами в Rⁿ',
      source: 'Лонгрид 1, определение 1.8',
      definition: {
        level: 'basic',
        text: md`**Расстоянием** между векторами $\mathbf x,\mathbf y\in\mathbb R^n$ называется длина их разности:
$$d(\mathbf x,\mathbf y)=\|\mathbf x-\mathbf y\|=\sqrt{(x_1-y_1)^2+\dots+(x_n-y_n)^2}.$$`,
      },
      notes: md`В $\mathbb R^2$ это теорема Пифагора для отрезка между концами векторов; в $\mathbb R^n$ — определение по аналогии. $d(\mathbf x,\mathbf y)=d(\mathbf y,\mathbf x)$, так как $\|\mathbf x-\mathbf y\|=\|-(\mathbf y-\mathbf x)\|$.`,
      pitfalls: [md`Расстояние — это $\|\mathbf x-\mathbf y\|$, а не $\|\mathbf x\|-\|\mathbf y\|$ (разность длин может быть нулём у разных векторов).`],
    },
    {
      id: 'cosine',
      title: 'Косинус угла между n-мерными векторами',
      source: 'Лонгрид 1, определение 1.9',
      definition: {
        level: 'basic',
        text: md`Косинус угла $\theta$ между **ненулевыми** векторами $\mathbf u,\mathbf v\in\mathbb R^n$:
$$\cos\theta=\frac{u_1v_1+\dots+u_nv_n}{\|\mathbf u\|\,\|\mathbf v\|}=\frac{\langle\mathbf u;\mathbf v\rangle}{\|\mathbf u\|\,\|\mathbf v\|},\qquad\theta\in[0;\pi].$$`,
      },
      notes: md`Откуда формула: в $\mathbb R^2$ теорема косинусов для треугольника со сторонами $\mathbf a,\mathbf b,\mathbf a-\mathbf b$ даёт $\cos\theta=\dfrac{a_1b_1+a_2b_2}{\|\mathbf a\|\|\mathbf b\|}$; в $\mathbb R^n$ это берут как определение.

Почему $|\cos\theta|\le1$ — гарантирует неравенство Коши — Буняковского — Шварца.`,
      pitfalls: [
        'Угол определён только для ненулевых векторов (иначе делим на ноль).',
        md`Угол между векторами — от $0$ до $\pi$; $\cos\theta<0$ означает тупой угол, а не «отрицательный угол».`,
      ],
    },
    {
      id: 'dot',
      title: 'Скалярное произведение векторов в Rⁿ',
      source: 'Лонгрид 1, определение 1.10',
      definition: {
        level: 'basic',
        text: md`**Скалярным произведением** векторов $\mathbf x,\mathbf y\in\mathbb R^n$ называется число
$$\langle\mathbf x;\mathbf y\rangle=\mathbf x\cdot\mathbf y=x_1y_1+x_2y_2+\dots+x_ny_n=\sum_{i=1}^n x_iy_i.$$
Векторы **ортогональны** (перпендикулярны), если $\langle\mathbf x;\mathbf y\rangle=0$.`,
      },
      notes: md`Через него: $\cos\theta=\dfrac{\langle\mathbf x;\mathbf y\rangle}{\|\mathbf x\|\|\mathbf y\|}$, $\|\mathbf x\|^2=\langle\mathbf x;\mathbf x\rangle$.

Физический смысл: $\langle\mathbf u;\mathbf w\rangle$ связан с проекцией: $\operatorname{Proj}_{\mathbf w}\mathbf u=\dfrac{\langle\mathbf u;\mathbf w\rangle}{\|\mathbf w\|^2}\mathbf w$, а длина проекции равна $\dfrac{|\langle\mathbf u;\mathbf w\rangle|}{\|\mathbf w\|}$.`,
      pitfalls: [
        'Результат — число (скаляр), а не вектор.',
        md`Покомпонентное произведение $(x_1y_1;\dots;x_ny_n)$ — это не скалярное произведение: нужно ещё сложить.`,
      ],
    },
    {
      id: 'dot-props',
      title: 'Свойства скалярного произведения',
      source: 'Лонгрид 1, теорема 1.2',
      statement: {
        level: 'basic',
        text: md`Для любых $\mathbf v,\mathbf w,\mathbf w_1,\mathbf w_2\in\mathbb R^n$ и $\lambda,\lambda_1,\lambda_2\in\mathbb R$:
1. $\langle\mathbf v;\mathbf w\rangle=\langle\mathbf w;\mathbf v\rangle$ (коммутативность);
2. $\langle\mathbf v;\mathbf v\rangle=\|\mathbf v\|^2$;
3. $\langle\mathbf v;\lambda\mathbf w\rangle=\lambda\langle\mathbf v;\mathbf w\rangle$ (скаляр выносится);
4. $\langle\mathbf v;\lambda_1\mathbf w_1+\lambda_2\mathbf w_2\rangle=\lambda_1\langle\mathbf v;\mathbf w_1\rangle+\lambda_2\langle\mathbf v;\mathbf w_2\rangle$ (дистрибутивность, линейность).`,
      },
      proof: {
        level: 'basic',
        idea: md`Расписываем по определению $\sum v_iw_i$ и пользуемся свойствами чисел (коммутативность, дистрибутивность) в каждом слагаемом.`,
        steps: [
          {
            title: 'Коммутативность',
            body: md`$\langle\mathbf v;\mathbf w\rangle=\sum_{i=1}^n v_iw_i=\sum_{i=1}^n w_iv_i=\langle\mathbf w;\mathbf v\rangle$ — в каждом слагаемом переставили множители.`,
          },
          {
            title: 'Скалярный квадрат = квадрат длины',
            body: md`$\langle\mathbf v;\mathbf v\rangle=\sum v_i^2=\|\mathbf v\|^2$ по определению нормы.`,
          },
          {
            title: 'Вынос скаляра',
            body: md`$\lambda\mathbf w=(\lambda w_1;\dots;\lambda w_n)$, поэтому $\langle\mathbf v;\lambda\mathbf w\rangle=\sum v_i(\lambda w_i)=\lambda\sum v_iw_i=\lambda\langle\mathbf v;\mathbf w\rangle$.`,
          },
          {
            title: 'Дистрибутивность',
            body: md`$i$-я координата $\lambda_1\mathbf w_1+\lambda_2\mathbf w_2$ равна $\lambda_1w_{1i}+\lambda_2w_{2i}$. Тогда $\sum v_i(\lambda_1w_{1i}+\lambda_2w_{2i})=\lambda_1\sum v_iw_{1i}+\lambda_2\sum v_iw_{2i}=\lambda_1\langle\mathbf v;\mathbf w_1\rangle+\lambda_2\langle\mathbf v;\mathbf w_2\rangle$.`,
          },
        ],
      },
      notes: md`Следствие (по коммутативности): линейность и по первому аргументу. Самое частое применение — раскрытие скобок: $\|\mathbf v+\mathbf w\|^2=\|\mathbf v\|^2+2\langle\mathbf v;\mathbf w\rangle+\|\mathbf w\|^2$.`,
      pitfalls: [
        md`Каждый пункт доказывается **через координаты** $\sum v_iw_i$: ссылка на «очевидно» не доказательство.`,
        md`$\langle\lambda\mathbf v;\lambda\mathbf w\rangle=\lambda^2\langle\mathbf v;\mathbf w\rangle$, а не $\lambda\langle\mathbf v;\mathbf w\rangle$.`,
      ],
    },
  ],
};

export const dotResearch: Topic = {
  id: 'dot-research',
  title: 'Исследование скалярного произведения и свойств векторов',
  longread: 2,
  units: [
    {
      id: 'angle-distance',
      title: 'Связь между углом и расстоянием в Rⁿ',
      source: 'Лонгрид 2, §1',
      statement: {
        level: 'basic',
        text: md`Пусть $\mathbf v,\mathbf w\in\mathbb R^n$ — векторы одинаковой длины $\ell>0$ и $\theta$ — угол между ними. Тогда
$$\|\mathbf v-\mathbf w\|^2=2\ell^2(1-\cos\theta),\qquad \|\mathbf v-\mathbf w\|=\ell\sqrt{2(1-\cos\theta)}.$$
Чем меньше угол, тем меньше расстояние: $\theta=0\Rightarrow d=0$, $\theta=90^\circ\Rightarrow d=\ell\sqrt2$, $\theta=180^\circ\Rightarrow d=2\ell$.`,
      },
      notes: md`Вывод в одну строку: $\|\mathbf v-\mathbf w\|^2=\langle\mathbf v-\mathbf w;\mathbf v-\mathbf w\rangle=\|\mathbf v\|^2+\|\mathbf w\|^2-2\langle\mathbf v;\mathbf w\rangle=2\ell^2-2\ell^2\cos\theta$.

В общем случае (длины разные) это теорема косинусов: $\|\mathbf v-\mathbf w\|^2=\|\mathbf v\|^2+\|\mathbf w\|^2-2\|\mathbf v\|\|\mathbf w\|\cos\theta$.

Смысл: в $\mathbb R^n$ сохраняется та же связь «угол ↔ расстояние», что и на плоскости.`,
      pitfalls: [
        'Формула с 2ℓ²(1 − cos θ) верна только для векторов одинаковой длины; для разных длин — теорема косинусов.',
        md`Расстояние растёт с углом, потому что $\cos\theta$ на $[0;\pi]$ убывает.`,
      ],
    },
    {
      id: 'cbs',
      title: 'Неравенство Коши — Буняковского — Шварца',
      source: 'Лонгрид 2, теорема 2.3',
      statement: {
        level: 'basic',
        text: md`Для любых $\mathbf v,\mathbf w\in\mathbb R^n$:
$$-\|\mathbf v\|\,\|\mathbf w\|\le\langle\mathbf v;\mathbf w\rangle\le\|\mathbf v\|\,\|\mathbf w\|,\quad\text{то есть}\quad|\langle\mathbf v;\mathbf w\rangle|\le\|\mathbf v\|\,\|\mathbf w\|.$$`,
      },
      notes: md`Следствие: для ненулевых векторов $|\cos\theta|\le1$, так что угол в $\mathbb R^n$ определён корректно.

Равенство — когда векторы коллинеарны. В координатах: $(x_1y_1+\dots+x_ny_n)^2\le(x_1^2+\dots+x_n^2)(y_1^2+\dots+y_n^2)$.

Идея доказательства (было в ДЗ): при $\mathbf w\ne\mathbf 0$ квадратный трёхчлен $\|\mathbf v-t\mathbf w\|^2=\|\mathbf w\|^2t^2-2t\langle\mathbf v;\mathbf w\rangle+\|\mathbf v\|^2\ge0$ при всех $t$, значит его дискриминант $\le0$.`,
      pitfalls: [
        md`Неравенство про **модуль** скалярного произведения: само $\langle\mathbf v;\mathbf w\rangle$ может быть сколь угодно отрицательным, но не меньше $-\|\mathbf v\|\|\mathbf w\|$.`,
        'Справа произведение длин, а не сумма.',
      ],
    },
    {
      id: 'pythagoras',
      title: 'Многомерная теорема Пифагора',
      source: 'Лонгрид 2, теорема 2.2',
      statement: {
        level: 'basic',
        text: md`Ненулевые векторы $\mathbf v_1,\mathbf v_2\in\mathbb R^n$ перпендикулярны тогда и только тогда, когда
$$\|\mathbf v_1+\mathbf v_2\|^2=\|\mathbf v_1\|^2+\|\mathbf v_2\|^2.$$`,
      },
      proof: {
        level: 'basic',
        idea: md`Выражаем квадрат длины через скалярное произведение и раскрываем скобки: лишним остаётся только $2\langle\mathbf v_1;\mathbf v_2\rangle$.`,
        steps: [
          {
            title: 'Длина через скалярное произведение',
            body: md`$\|\mathbf v_1+\mathbf v_2\|^2=\langle\mathbf v_1+\mathbf v_2;\mathbf v_1+\mathbf v_2\rangle$.`,
          },
          {
            title: 'Раскрываем скобки',
            body: md`По дистрибутивности и коммутативности: $=\langle\mathbf v_1;\mathbf v_1\rangle+\langle\mathbf v_1;\mathbf v_2\rangle+\langle\mathbf v_2;\mathbf v_1\rangle+\langle\mathbf v_2;\mathbf v_2\rangle=\|\mathbf v_1\|^2+2\langle\mathbf v_1;\mathbf v_2\rangle+\|\mathbf v_2\|^2.$`,
          },
          {
            title: 'Прямое утверждение',
            body: md`Если $\mathbf v_1\perp\mathbf v_2$, то $\langle\mathbf v_1;\mathbf v_2\rangle=0$, и остаётся $\|\mathbf v_1\|^2+\|\mathbf v_2\|^2$.`,
          },
          {
            title: 'Обратное утверждение',
            body: md`Если $\|\mathbf v_1+\mathbf v_2\|^2=\|\mathbf v_1\|^2+\|\mathbf v_2\|^2$, то из формулы шага 2 получаем $2\langle\mathbf v_1;\mathbf v_2\rangle=0$, то есть векторы перпендикулярны.`,
          },
        ],
      },
      notes: md`Для $k$ попарно ортогональных векторов: $\|\mathbf v_1+\dots+\mathbf v_k\|^2=\|\mathbf v_1\|^2+\dots+\|\mathbf v_k\|^2$ (все перекрёстные слагаемые нули).`,
      pitfalls: [
        'Теорема — «тогда и только тогда»: на коллоквиуме нужно доказать обе стороны.',
        md`Не путай $\|\mathbf a+\mathbf b\|^2$ с $\|\mathbf a\|^2+\|\mathbf b\|^2$ в общем случае: между ними $2\langle\mathbf a;\mathbf b\rangle$.`,
      ],
      uses: ['dot-props'],
    },
    {
      id: 'triangle',
      title: 'Неравенство треугольника в Rⁿ',
      source: 'Лонгрид 2, следствие из теоремы 2.3',
      statement: {
        level: 'basic',
        text: md`Для любых $\mathbf v,\mathbf w\in\mathbb R^n$:
$$\|\mathbf v+\mathbf w\|\le\|\mathbf v\|+\|\mathbf w\|.$$`,
      },
      proof: {
        level: 'basic',
        idea: md`Пишем $\|\mathbf v+\mathbf w\|^2$ через скалярное произведение, оцениваем среднее слагаемое по КБШ и сворачиваем в полный квадрат.`,
        steps: [
          {
            title: 'Длина суммы через скалярное произведение',
            body: md`$\|\mathbf v+\mathbf w\|=\sqrt{\langle\mathbf v+\mathbf w;\mathbf v+\mathbf w\rangle}=\sqrt{\|\mathbf v\|^2+2\langle\mathbf v;\mathbf w\rangle+\|\mathbf w\|^2}$ (раскрыли скобки по свойствам скалярного произведения).`,
          },
          {
            title: 'Оценка по КБШ',
            body: md`По неравенству Коши — Буняковского — Шварца $\langle\mathbf v;\mathbf w\rangle\le\|\mathbf v\|\|\mathbf w\|$, поэтому подкоренное выражение не больше $\|\mathbf v\|^2+2\|\mathbf v\|\|\mathbf w\|+\|\mathbf w\|^2$.`,
          },
          {
            title: 'Полный квадрат',
            body: md`$\|\mathbf v\|^2+2\|\mathbf v\|\|\mathbf w\|+\|\mathbf w\|^2=(\|\mathbf v\|+\|\mathbf w\|)^2$, а корень — возрастающая функция и $\|\mathbf v\|+\|\mathbf w\|\ge0$, поэтому $\|\mathbf v+\mathbf w\|\le\|\mathbf v\|+\|\mathbf w\|$.`,
          },
        ],
      },
      notes: md`Геометрия: в треугольнике $ABC$ с $\overrightarrow{AB}=\mathbf a$, $\overrightarrow{BC}=\mathbf b$ получаем $|AC|\le|AB|+|BC|$.

Равенство — когда векторы сонаправлены или один из них нулевой (тогда в КБШ равенство и $\langle\mathbf v;\mathbf w\rangle\ge0$).`,
      pitfalls: [
        md`Без ссылки на КБШ доказательство не засчитают: ключевой шаг — $\langle\mathbf v;\mathbf w\rangle\le\|\mathbf v\|\|\mathbf w\|$.`,
        md`Корень извлекаем из неравенства между неотрицательными числами — стоит проговорить, почему знак сохраняется.`,
      ],
      uses: ['cbs', 'dot-props'],
    },
  ],
};
