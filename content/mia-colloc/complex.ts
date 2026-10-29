import { md, type Topic } from '../../src/content/schema';

// Лонгрид 21. Тригонометрическая и показательная форма комплексного числа, геометрия умножения.

export const complex: Topic = {
  id: 'complex',
  title: 'Комплексные числа. Часть 2',
  longread: 21,
  units: [
    {
      id: 'trig-form',
      title: 'Тригонометрическая форма комплексного числа',
      source: 'Лонгрид 21, определения 21.1, 21.2',
      definition: {
        level: 'basic',
        text: md`Представление комплексного числа $z\ne0$ в виде
$$z=r(\cos\varphi+i\sin\varphi),\qquad r>0,\ \varphi\in\mathbb R,$$
называется **тригонометрической формой**. Здесь $r=|z|=\sqrt{x^2+y^2}$ — модуль числа $z=x+yi$, а $\varphi=\arg z$ — **аргумент**: угол между положительным направлением действительной оси и вектором $z$ (против часовой стрелки — положительный, по часовой — отрицательный).`,
      },
      notes: md`Связь с алгебраической формой: $x=r\cos\varphi$, $y=r\sin\varphi$.

Аргумент определён с точностью до $2\pi k$. У $z=0$ аргумент не определён, тригонометрической формы нет.

Примеры: $1+i=\sqrt2\left(\cos\frac\pi4+i\sin\frac\pi4\right)$; $-2=2(\cos\pi+i\sin\pi)$; $-3i=3\left(\cos\left(-\frac\pi2\right)+i\sin\left(-\frac\pi2\right)\right)$.`,
      pitfalls: [
        md`$r>0$ обязательно: $-2(\cos\varphi+i\sin\varphi)$ — не тригонометрическая форма.`,
        md`$\varphi=\operatorname{arctg}\frac yx$ верно только при $x>0$; четверть определяй по рисунку.`,
        md`Внутри скобок одинаковый угол и знак «плюс»: $\cos\varphi-i\sin\varphi$ — не форма (это $\cos(-\varphi)+i\sin(-\varphi)$).`,
      ],
    },
    {
      id: 'complex-exp',
      title: 'Комплексная экспонента',
      source: 'Лонгрид 21, определения 21.3, 21.4',
      definition: {
        level: 'basic',
        text: md`**Комплексная экспонента** (формула Эйлера):
$$e^{i\varphi}=\cos\varphi+i\sin\varphi,\qquad\varphi\in\mathbb R.$$
Отсюда **показательная форма** числа $z\ne0$: $z=re^{i\varphi}$, $r>0$.`,
      },
      notes: md`$|e^{i\varphi}|=1$: это точка единичной окружности под углом $\varphi$.

Правила как у обычной экспоненты: $e^{i\varphi_1}e^{i\varphi_2}=e^{i(\varphi_1+\varphi_2)}$, $\dfrac{r_1e^{i\varphi_1}}{r_2e^{i\varphi_2}}=\dfrac{r_1}{r_2}e^{i(\varphi_1-\varphi_2)}$, $(re^{i\varphi})^n=r^ne^{in\varphi}$ (формула Муавра).

Частные значения: $e^{i\pi}=-1$, $e^{i\pi/2}=i$, $e^{2\pi i}=1$.

Корни: $\sqrt[n]{re^{i\varphi}}=\sqrt[n]r\,e^{i\frac{\varphi+2\pi k}n}$, $k=0,1,\dots,n-1$ — ровно $n$ значений.`,
      pitfalls: [
        md`$e^{i\varphi}$ — комплексное число на единичной окружности, а не «очень большое число».`,
        md`Корень $n$-й степени из ненулевого комплексного числа имеет $n$ значений, а не одно.`,
      ],
    },
    {
      id: 'mult-geom',
      title: 'Геометрический смысл умножения комплексных чисел',
      source: 'Лонгрид 21, лемма 21.1',
      statement: {
        level: 'basic',
        text: md`При умножении $z_1=r_1(\cos\varphi_1+i\sin\varphi_1)$ на $z_2=r_2(\cos\varphi_2+i\sin\varphi_2)$ **модули перемножаются, аргументы складываются**:
$$z_1z_2=r_1r_2\bigl(\cos(\varphi_1+\varphi_2)+i\sin(\varphi_1+\varphi_2)\bigr).$$
На комплексной плоскости: вектор $z_1$ поворачивается на угол $\varphi_2$ (против часовой стрелки при $\varphi_2>0$) и растягивается в $r_2$ раз.`,
      },
      notes: md`Вывод: раскрыть скобки и применить формулы косинуса и синуса суммы: $\cos\varphi_1\cos\varphi_2-\sin\varphi_1\sin\varphi_2=\cos(\varphi_1+\varphi_2)$, $\cos\varphi_1\sin\varphi_2+\sin\varphi_1\cos\varphi_2=\sin(\varphi_1+\varphi_2)$.

Деление: модули делятся, аргументы вычитаются. Степень: $z^n=r^n(\cos n\varphi+i\sin n\varphi)$ — повторный поворот на $\varphi$.

Пример: умножение на $i$ ($r=1$, $\varphi=\frac\pi2$) — поворот на $90^\circ$ против часовой стрелки; на $2i$ — поворот на $90^\circ$ и растяжение вдвое.`,
      pitfalls: [
        'Аргументы складываются, а не перемножаются; модули перемножаются, а не складываются.',
        md`Растяжение в $r_2$ раз при $r_2<1$ — это сжатие.`,
      ],
      uses: ['trig-form'],
    },
    {
      id: 'mult-exp-geom',
      title: 'Геометрический смысл умножения на комплексную экспоненту e^{iφ}',
      source: 'Лонгрид 21, §2',
      statement: {
        level: 'basic',
        text: md`Умножение числа $z=re^{i\psi}$ на $e^{i\varphi}$ — это **поворот** вектора $z$ вокруг начала координат на угол $\varphi$ (против часовой стрелки при $\varphi>0$, по часовой при $\varphi<0$) **без изменения длины**:
$$z\cdot e^{i\varphi}=re^{i(\psi+\varphi)},\qquad|ze^{i\varphi}|=|z|.$$`,
      },
      notes: md`Причина: $|e^{i\varphi}|=1$, $\arg e^{i\varphi}=\varphi$, а при умножении модули перемножаются и аргументы складываются.

Примеры: $ze^{i\pi}=-z$ (поворот на $180^\circ$, центральная симметрия); $ze^{i\pi/2}=iz$ (поворот на $90^\circ$); $ze^{-i\pi/3}$ — поворот на $60^\circ$ по часовой.`,
      pitfalls: [
        'Длина не меняется — меняется только направление.',
        'Поворот вокруг начала координат (точки 0), а не вокруг точки z.',
      ],
      uses: ['mult-geom', 'complex-exp'],
    },
  ],
};
