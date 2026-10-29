import { md, type Topic } from '../../src/content/schema';

// Лонгриды 4–5. Прямая на плоскости, плоскость в пространстве: способы задания, проекция, расстояние.

export const line: Topic = {
  id: 'line',
  title: 'Прямая на плоскости и в пространстве',
  longread: 4,
  units: [
    {
      id: 'point-line-proj',
      title: 'Проекция точки на прямую; расстояние от точки до прямой в R²',
      source: 'Лонгрид 4, определение 4.2',
      definition: {
        level: 'basic',
        text: md`**Проекция** точки $P$ на прямую $\ell$ — точка $P_\ell\in\ell$, ближайшая к $P$:
$$P_\ell=\arg\min_{X\in\ell}\|P-X\|.$$
**Расстояние** от точки до прямой $d(P,\ell)$ — расстояние между $P$ и её проекцией: $d(P,\ell)=\|P-P_\ell\|$.`,
      },
      notes: md`Геометрически $P_\ell$ — основание перпендикуляра, опущенного из $P$ на $\ell$. Если $P\in\ell$, то $P_\ell=P$ и $d=0$.`,
      pitfalls: [
        'Проекция — это точка на прямой, а расстояние — число; не путай, что спрашивают.',
        md`Определение через **ближайшую** точку ($\arg\min$); «основание перпендикуляра» — это уже свойство.`,
      ],
    },
    {
      id: 'line-forms',
      title: 'Способы задания прямой на плоскости и переход между ними',
      source: 'Лонгрид 4, §1',
      statement: {
        level: 'basic',
        text: md`Прямую $\ell$ на плоскости можно задать:
1. **Параметрически:** $\mathbf r=\mathbf r_0+t\mathbf a$, $t\in\mathbb R$, где $\mathbf r_0$ — радиус-вектор точки на прямой, $\mathbf a\ne\mathbf 0$ — направляющий вектор.
2. **Линейным уравнением:** $Ax+By+C=0$, $(A;B)\ne(0;0)$.
3. **Через нормаль и сдвиг:** $\langle\mathbf r-\mathbf r_0;\mathbf n\rangle=0$, где $\mathbf n\ne\mathbf 0$ перпендикулярен прямой.

**Переходы.**
- Параметрическая → нормаль: при $\mathbf a=(a_1;a_2)$ берём $\mathbf n=(a_2;-a_1)$ (тогда $\langle\mathbf a;\mathbf n\rangle=0$).
- Нормаль ↔ линейное: раскрываем $\langle\mathbf r-\mathbf r_0;\mathbf n\rangle=0$: $\mathbf n=(A;B)$, $C=-\langle\mathbf r_0;\mathbf n\rangle$. Обратно, у $Ax+By+C=0$ нормаль $(A;B)$.
- Линейное → параметрическая: находим одну точку $\mathbf r_0$ на прямой и берём $\mathbf a=(B;-A)$ (перпендикулярно нормали).`,
      },
      notes: md`Пример: $2x-y+1=0$. Нормаль $(2;-1)$, направляющий $(1;2)$, точка $(0;1)$: $\mathbf r=(0;1)+t(1;2)$.

Форма $Ax+By+C=0$ общее, чем $y=kx+b$: вертикальная прямая $x=x_0$ задаётся только первой.

**В пространстве** прямая задаётся только параметрически $\mathbf r=\mathbf r_0+t\mathbf a$ (или системой двух линейных уравнений): одно уравнение $\langle\mathbf r-\mathbf r_0;\mathbf n\rangle=0$ в $\mathbb R^3$ задаёт плоскость.`,
      pitfalls: [
        md`Нормаль и направляющий вектор — разные векторы: $\langle\mathbf a;\mathbf n\rangle=0$.`,
        md`В $\mathbb R^3$ уравнение $\langle\mathbf r-\mathbf r_0;\mathbf n\rangle=0$ — это плоскость, а не прямая.`,
        'Параметрическое задание не единственно: любую точку прямой и любой ненулевой коллинеарный вектор можно взять.',
      ],
    },
    {
      id: 'point-line-dist',
      title: 'Расстояние от точки до прямой в R² и координаты проекции',
      source: 'Лонгрид 4, теорема 4.1',
      statement: {
        level: 'basic',
        text: md`Расстояние от $P=(x_0;y_0)$ до прямой $\ell:\ Ax+By+C=0$:
$$d(P,\ell)=\frac{|Ax_0+By_0+C|}{\sqrt{A^2+B^2}}.$$
Проекция точки $P$ на $\ell$:
$$P_\ell=\begin{pmatrix}x_0\\y_0\end{pmatrix}-\frac{Ax_0+By_0+C}{A^2+B^2}\begin{pmatrix}A\\B\end{pmatrix}.$$`,
      },
      notes: md`Для прямой $\langle\mathbf r-\mathbf r_0;\mathbf n\rangle=0$ и точки с радиус-вектором $\mathbf p$: $d=\dfrac{|\langle\mathbf p-\mathbf r_0;\mathbf n\rangle|}{\|\mathbf n\|}$, $P_\ell=\mathbf p-\dfrac{\langle\mathbf p-\mathbf r_0;\mathbf n\rangle}{\|\mathbf n\|^2}\mathbf n$.

Идея вывода: через $P$ проводим перпендикуляр $(x_0+tA;\ y_0+tB)$, подставляем в уравнение прямой, находим $t=-\dfrac{Ax_0+By_0+C}{A^2+B^2}$; расстояние $=|t|\,\|\mathbf n\|$.

Пример: от $(1;2)$ до $3x+4y-1=0$: $\dfrac{|3+8-1|}{5}=2$.`,
      pitfalls: [
        'В числителе модуль: расстояние неотрицательно.',
        md`В знаменателе $\sqrt{A^2+B^2}$, а не $A^2+B^2$; а в формуле проекции — именно $A^2+B^2$, без корня.`,
        md`Проекция — сдвиг $P$ **против** знака $Ax_0+By_0+C$ вдоль нормали; проверка: подставь $P_\ell$ в уравнение прямой — должен быть 0.`,
      ],
    },
  ],
};

export const plane: Topic = {
  id: 'plane',
  title: 'Плоскость в пространстве',
  longread: 5,
  units: [
    {
      id: 'point-plane-proj',
      title: 'Проекция точки на плоскость; расстояние от точки до плоскости в R³',
      source: 'Лонгрид 5, определение 5.2',
      definition: {
        level: 'basic',
        text: md`**Проекция** точки $P$ на плоскость $\pi$ — точка $P_\pi\in\pi$, ближайшая к $P$:
$$P_\pi=\arg\min_{X\in\pi}\|P-X\|.$$
**Расстояние** от точки до плоскости: $d(P,\pi)=\|P-P_\pi\|$.`,
      },
      notes: md`Геометрически $P_\pi$ — основание перпендикуляра из $P$ на $\pi$.`,
      pitfalls: ['Как и для прямой: проекция — точка, расстояние — число; определяем через ближайшую точку.'],
    },
    {
      id: 'plane-forms',
      title: 'Способы задания плоскости в пространстве и переход между ними',
      source: 'Лонгрид 5, §2',
      statement: {
        level: 'basic',
        text: md`Плоскость $\pi$ в $\mathbb R^3$ можно задать:
1. **Параметрически:** $\mathbf r=\mathbf r_0+t_1\mathbf v_1+t_2\mathbf v_2$, $t_1,t_2\in\mathbb R$, где $\mathbf v_1,\mathbf v_2$ — неколлинеарные направляющие векторы.
2. **Линейным уравнением:** $Ax+By+Cz+D=0$, $(A;B;C)\ne\mathbf 0$.
3. **Через нормаль и сдвиг:** $\langle\mathbf r-\mathbf r_0;\mathbf n\rangle=0$.

**Переходы.**
- Параметрическая → нормаль: $\mathbf n$ — любой ненулевой вектор, перпендикулярный $\mathbf v_1$ и $\mathbf v_2$ (например, $\mathbf v_1\times\mathbf v_2$ или решение системы $\langle\mathbf n;\mathbf v_1\rangle=\langle\mathbf n;\mathbf v_2\rangle=0$).
- Нормаль ↔ линейное: $\mathbf n=(A;B;C)$, $D=-\langle\mathbf r_0;\mathbf n\rangle$.
- Линейное → параметрическая: находим точку $\mathbf r_0$ и два неколлинеарных вектора, перпендикулярных $\mathbf n$.`,
      },
      notes: md`Через три **неколлинеарные** точки $\mathbf p_0,\mathbf p_1,\mathbf p_2$ проходит ровно одна плоскость: $\mathbf r=\mathbf p_0+t_1(\mathbf p_1-\mathbf p_0)+t_2(\mathbf p_2-\mathbf p_0)$.

Точки коллинеарны, если $\mathbf p_1-\mathbf p_0=\lambda(\mathbf p_2-\mathbf p_0)$.

Размерность: прямая — 1 параметр, плоскость — 2.`,
      pitfalls: [
        'Направляющие векторы плоскости должны быть неколлинеарны, иначе получится прямая.',
        md`Нормаль перпендикулярна **обоим** направляющим векторам — проверь оба скалярных произведения.`,
      ],
      uses: ['cross-geom'],
    },
    {
      id: 'point-plane-dist',
      title: 'Расстояние от точки до плоскости в R³ и координаты проекции',
      source: 'Лонгрид 5, теорема 5.1',
      statement: {
        level: 'basic',
        text: md`Расстояние от $P=(x_0;y_0;z_0)$ до плоскости $\pi:\ Ax+By+Cz+D=0$:
$$d(P,\pi)=\frac{|Ax_0+By_0+Cz_0+D|}{\sqrt{A^2+B^2+C^2}}.$$
Проекция:
$$P_\pi=\begin{pmatrix}x_0\\y_0\\z_0\end{pmatrix}-\frac{Ax_0+By_0+Cz_0+D}{A^2+B^2+C^2}\begin{pmatrix}A\\B\\C\end{pmatrix}.$$`,
      },
      notes: md`Для $\langle\mathbf r-\mathbf r_0;\mathbf n\rangle=0$: $d=\dfrac{|\langle\mathbf p-\mathbf r_0;\mathbf n\rangle|}{\|\mathbf n\|}$, $P_\pi=\mathbf p-\dfrac{\langle\mathbf p-\mathbf r_0;\mathbf n\rangle}{\|\mathbf n\|^2}\mathbf n$ — те же формулы, что для прямой на плоскости.

Вывод тот же: прямая через $P$ вдоль нормали $(x_0+tA;\ y_0+tB;\ z_0+tC)$, подставляем в уравнение плоскости.`,
      pitfalls: [
        'Модуль в числителе и корень в знаменателе; в формуле проекции знаменатель без корня.',
        'Проверка проекции: она должна удовлетворять уравнению плоскости.',
      ],
    },
    {
      id: 'plane-sides',
      title: 'Взаимное расположение точек и плоскости',
      source: 'Лонгрид 5, теоремы 5.2, 5.3',
      statement: {
        level: 'basic',
        text: md`Пусть $\pi:\ Ax+By+Cz+D=0$. Точки $\mathbf p$ и $\mathbf v$ (не лежащие на $\pi$) лежат **по одну сторону** от $\pi$ тогда и только тогда, когда
$$\operatorname{sign}(Ap_1+Bp_2+Cp_3+D)=\operatorname{sign}(Av_1+Bv_2+Cv_3+D).$$
Для $\pi:\ \langle\mathbf r-\mathbf r_0;\mathbf n\rangle=0$: $\operatorname{sign}\langle\mathbf p-\mathbf r_0;\mathbf n\rangle=\operatorname{sign}\langle\mathbf v-\mathbf r_0;\mathbf n\rangle$. Значение $0$ означает, что точка лежит на плоскости.`,
      },
      notes: md`Смысл: $\langle\mathbf p-\mathbf r_0;\mathbf n\rangle>0$ — точка в полупространстве, куда смотрит нормаль, $<0$ — в другом.

Для прямой $Ax+By+C=0$ на плоскости то же самое: одинаковые знаки — одна полуплоскость.`,
      pitfalls: [
        'Сравниваем знаки, а не значения: числа могут быть разными по величине.',
        'Разные знаки — разные стороны; ноль — точка на плоскости.',
      ],
    },
  ],
};
