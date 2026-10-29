import { md, type Topic } from '../../src/content/schema';

// Лонгриды 12, 15. Матрицы, определители 2×2 и 3×3, векторное и смешанное произведение.

export const matrices: Topic = {
  id: 'matrices',
  title: 'Матрицы',
  longread: 12,
  units: [
    {
      id: 'matrix-scalar',
      title: 'Умножение матрицы на число',
      source: 'Лонгрид 12, §3',
      definition: {
        level: 'basic',
        text: md`**Произведением** матрицы $A=(a_{ij})$ размера $m\times n$ на число $\lambda$ называется матрица $C=\lambda A$ того же размера, у которой каждый элемент умножен на $\lambda$:
$$c_{ij}=\lambda a_{ij}.$$`,
      },
      notes: md`**Матрица** $m\times n$ — прямоугольная таблица чисел из $m$ строк и $n$ столбцов; $a_{ij}$ — элемент в $i$-й строке и $j$-м столбце. Квадратные матрицы размера $n$: $M_{n\,n}(\mathbb R)$.

Сложение — только для матриц одного размера, поэлементно: $c_{ij}=a_{ij}+b_{ij}$.

Пример: $2\begin{pmatrix}1&-3\\0&4\end{pmatrix}=\begin{pmatrix}2&-6\\0&8\end{pmatrix}$.`,
      pitfalls: [
        'На число умножается каждый элемент, а не одна строка (в отличие от определителя: det(λA) = λⁿ det A для n×n).',
      ],
    },
    {
      id: 'det2-geom',
      title: 'Геометрический смысл определителя матрицы 2×2',
      source: 'Лонгрид 12, определение 12.2; лонгрид 15',
      statement: {
        level: 'basic',
        text: md`$\det\begin{pmatrix}a&b\\c&d\end{pmatrix}=ad-bc$. Модуль определителя равен **площади параллелограмма**, построенного на векторах-строках $(a;b)$ и $(c;d)$ (или на столбцах):
$$S=\left|\det\begin{pmatrix}a&b\\c&d\end{pmatrix}\right|=|ad-bc|.$$
Знак показывает ориентацию: $\det>0$, если поворот от первого вектора ко второму (на угол меньше $180^\circ$) идёт против часовой стрелки, и $\det<0$ — если по часовой.`,
      },
      notes: md`Следствие: $\det=0\iff$ параллелограмм вырожден $\iff$ строки коллинеарны (линейно зависимы).

Площадь треугольника на тех же векторах — $\tfrac12|ad-bc|$.

Связь с векторным произведением: $(a;b;0)\times(c;d;0)=(0;0;ad-bc)$, а его длина — площадь параллелограмма.

При перестановке строк определитель меняет знак (ориентация меняется), а площадь — нет.`,
      pitfalls: [
        'Площадь — модуль определителя; сам определитель может быть отрицательным.',
        md`$ad-bc$, а не $ac-bd$: перемножаем по диагоналям.`,
      ],
    },
    {
      id: 'det3-geom',
      title: 'Геометрический смысл определителя матрицы 3×3',
      source: 'Лонгрид 12, определение 12.3; лонгрид 15, теорема 15.4',
      statement: {
        level: 'basic',
        text: md`Модуль определителя $3\times3$ равен **объёму параллелепипеда**, построенного на векторах-строках $\mathbf a,\mathbf b,\mathbf c$:
$$V=\left|\det\begin{pmatrix}a_1&a_2&a_3\\b_1&b_2&b_3\\c_1&c_2&c_3\end{pmatrix}\right|=|\mathbf a\cdot(\mathbf b\times\mathbf c)|.$$
Знак — ориентация тройки: $\det>0$ для правой тройки, $\det<0$ для левой. $\det=0\iff$ векторы компланарны (линейно зависимы).`,
      },
      notes: md`Раскрытие по первой строке:
$$\begin{vmatrix}a_1&a_2&a_3\\b_1&b_2&b_3\\c_1&c_2&c_3\end{vmatrix}=a_1\begin{vmatrix}b_2&b_3\\c_2&c_3\end{vmatrix}-a_2\begin{vmatrix}b_1&b_3\\c_1&c_3\end{vmatrix}+a_3\begin{vmatrix}b_1&b_2\\c_1&c_2\end{vmatrix}.$$

Определитель — это смешанное произведение строк, поэтому смысл тот же. Объём тетраэдра на тех же векторах — $\tfrac16|\det|$.`,
      pitfalls: [
        'Минус перед вторым слагаемым в разложении по строке.',
        'Объём — модуль, знак отвечает только за ориентацию.',
      ],
      uses: ['triple-geom'],
    },
  ],
};

export const crossTriple: Topic = {
  id: 'cross-triple',
  title: 'Смешанное и векторное произведение векторов',
  longread: 15,
  units: [
    {
      id: 'cross',
      title: 'Векторное произведение',
      source: 'Лонгрид 15, определение 15.1',
      definition: {
        level: 'basic',
        text: md`**Векторным произведением** векторов $\mathbf a=(a_1;a_2;a_3)$ и $\mathbf b=(b_1;b_2;b_3)$ называется вектор
$$\mathbf a\times\mathbf b=(a_2b_3-a_3b_2;\ a_3b_1-a_1b_3;\ a_1b_2-a_2b_1)=\begin{vmatrix}\mathbf i&\mathbf j&\mathbf k\\a_1&a_2&a_3\\b_1&b_2&b_3\end{vmatrix}.$$`,
      },
      notes: md`Определено только в $\mathbb R^3$. Свойства: $\mathbf a\times\mathbf b=-\mathbf b\times\mathbf a$; линейно по каждому аргументу; $(c\mathbf a)\times\mathbf b=c(\mathbf a\times\mathbf b)$; не ассоциативно; $\mathbf a\times\mathbf a=\mathbf 0$.

Пример: $(1;0;0)\times(0;1;0)=(0;0;1)$, то есть $\mathbf i\times\mathbf j=\mathbf k$.`,
      pitfalls: [
        md`Средняя координата $a_3b_1-a_1b_3$ — со «сменой знака» при раскрытии определителя: $-\begin{vmatrix}a_1&a_3\\b_1&b_3\end{vmatrix}$.`,
        'Векторное произведение антикоммутативно: порядок множителей меняет знак.',
      ],
    },
    {
      id: 'triple',
      title: 'Смешанное произведение',
      source: 'Лонгрид 15, определение 15.2',
      definition: {
        level: 'basic',
        text: md`**Смешанным произведением** векторов $\mathbf a,\mathbf b,\mathbf c\in\mathbb R^3$ называется число $\mathbf a\cdot(\mathbf b\times\mathbf c)$. Оно равно определителю из координат:
$$\mathbf a\cdot(\mathbf b\times\mathbf c)=\begin{vmatrix}a_1&a_2&a_3\\b_1&b_2&b_3\\c_1&c_2&c_3\end{vmatrix}.$$`,
      },
      notes: md`$\mathbf a\cdot(\mathbf b\times\mathbf c)=(\mathbf a\times\mathbf b)\cdot\mathbf c$; при циклической перестановке не меняется, при перестановке двух векторов меняет знак.`,
      pitfalls: ['Смешанное произведение — число (скаляр), векторное — вектор.'],
    },
    {
      id: 'cross-geom',
      title: 'Геометрический смысл векторного произведения',
      source: 'Лонгрид 15, теоремы 15.1, 15.2 и следствие',
      statement: {
        level: 'basic',
        text: md`1. $\mathbf a\times\mathbf b$ перпендикулярен и $\mathbf a$, и $\mathbf b$; направление — по правилу правой руки (тройка $\mathbf a,\mathbf b,\mathbf a\times\mathbf b$ правая).
2. $\|\mathbf a\times\mathbf b\|=\|\mathbf a\|\,\|\mathbf b\|\sin\theta$, где $\theta\in[0;\pi]$ — угол между векторами; это **площадь параллелограмма**, построенного на $\mathbf a$ и $\mathbf b$.
3. Ненулевые $\mathbf a$ и $\mathbf b$ коллинеарны $\iff\mathbf a\times\mathbf b=\mathbf 0$.`,
      },
      notes: md`Перпендикулярность проверяется прямым вычислением $(\mathbf a\times\mathbf b)\cdot\mathbf a=0$. Длина: $\|\mathbf a\times\mathbf b\|^2=\|\mathbf a\|^2\|\mathbf b\|^2-\langle\mathbf a;\mathbf b\rangle^2=\|\mathbf a\|^2\|\mathbf b\|^2\sin^2\theta$.

Применения: нормаль к плоскости по двум направляющим векторам; площадь треугольника $ABC$ — $\tfrac12\|\overrightarrow{AB}\times\overrightarrow{AC}\|$.`,
      pitfalls: [
        'Площадь треугольника — половина длины векторного произведения.',
        md`Синус, а не косинус: у коллинеарных векторов $\sin\theta=0$ и произведение нулевое.`,
      ],
    },
    {
      id: 'triple-geom',
      title: 'Геометрический смысл смешанного произведения',
      source: 'Лонгрид 15, теорема 15.4',
      statement: {
        level: 'basic',
        text: md`Объём параллелепипеда, построенного на векторах $\mathbf a,\mathbf b,\mathbf c$, равен модулю их смешанного произведения:
$$V=|\mathbf a\cdot(\mathbf b\times\mathbf c)|.$$
Смешанное произведение равно нулю $\iff$ векторы **компланарны** (лежат в одной плоскости). Знак: $>0$ для правой тройки, $<0$ для левой.`,
      },
      notes: md`Почему: площадь основания $S=\|\mathbf b\times\mathbf c\|$, высота $h=\|\mathbf a\|\,|\cos\varphi|$, где $\varphi$ — угол между $\mathbf a$ и $\mathbf b\times\mathbf c$ (нормалью к основанию). $V=Sh=|\langle\mathbf a;\mathbf b\times\mathbf c\rangle|$.

Объём тетраэдра на тех же векторах — $\tfrac16|\mathbf a\cdot(\mathbf b\times\mathbf c)|$.`,
      pitfalls: [
        md`Модуль обязателен: угол между $\mathbf a$ и $\mathbf b\times\mathbf c$ может быть тупым.`,
        'Нулевое смешанное произведение — компланарность, а не коллинеарность.',
      ],
      uses: ['cross-geom'],
    },
  ],
};
