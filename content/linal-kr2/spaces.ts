import { md, type Topic } from '../../src/content/schema';

// Неделя 6. Векторные пространства, базисы и координаты.

export const spaces: Topic = {
  id: 'spaces',
  title: 'Векторные пространства, базисы и координаты',
  longread: 6,
  units: [
    {
      id: 'vector-space',
      title: 'Векторное пространство',
      source: 'Лонгрид 6, §1',
      definition: {
        level: 'basic',
        text: md`**Векторное пространство** над полем $\mathbb F$ ($\mathbb R$, $\mathbb Q$ или $\mathbb C$) — множество $\mathbb V$ с двумя операциями: сложением $\mathbb V\times\mathbb V\to\mathbb V$ и умножением на скаляр $\mathbb F\times\mathbb V\to\mathbb V$, для которых при всех $\mathbf u,\mathbf v,\mathbf w\in\mathbb V$, $\lambda,\mu\in\mathbb F$:
1. $(\mathbf u+\mathbf v)+\mathbf w=\mathbf u+(\mathbf v+\mathbf w)$;
2. $\mathbf u+\mathbf v=\mathbf v+\mathbf u$;
3. есть вектор $\mathbf 0$: $\mathbf v+\mathbf 0=\mathbf v$;
4. для каждого $\mathbf v$ есть $-\mathbf v$: $\mathbf v+(-\mathbf v)=\mathbf 0$;
5. $\lambda(\mathbf u+\mathbf v)=\lambda\mathbf u+\lambda\mathbf v$;
6. $(\lambda+\mu)\mathbf v=\lambda\mathbf v+\mu\mathbf v$;
7. $(\lambda\mu)\mathbf v=\lambda(\mu\mathbf v)$;
8. $1\cdot\mathbf v=\mathbf v$.`,
      },
      notes: md`Главные примеры: $\mathbb F^n$, $\operatorname{Mat}_{m\times n}(\mathbb F)$, $\mathbb F[t]_{\le d}$, все функции $X\to\mathbb F$ с поточечными операциями.

Не пространство: решения неоднородной системы $A\mathbf x=\mathbf b$, $\mathbf b\ne\mathbf 0$ — в нём нет нуля (это сдвиг $\mathbf x_0+\ker A$).

Следствия аксиом (в определение не входят): $0\mathbf v=\mathbf 0$, $\lambda\mathbf 0=\mathbf 0$, $(-1)\mathbf v=-\mathbf v$; нулевой и противоположный векторы единственны.`,
      pitfalls: [
        md`Нулевой вектор задаётся операцией сложения, а не «столбцом из нулей». При необычных операциях (например, $(u,v)\oplus(x,y)=(u+x-2,\,v+y+5)$) ноль — это тот $\mathbf z$, для которого $\mathbf v\oplus\mathbf z=\mathbf v$, здесь $(2,-5)$.`,
        'Аксиомы проверяются для всех векторов и скаляров; один пример ничего не доказывает, а один контрпример всё опровергает.',
      ],
    },
    {
      id: 'zero-unique',
      title: 'Единственность нуля и простейшие следствия аксиом',
      source: 'Лонгрид 6, §1',
      statement: {
        level: 'basic',
        text: md`В любом векторном пространстве нулевой вектор единствен, и для каждого $\mathbf v$ противоположный вектор единствен. Кроме того, $0\cdot\mathbf v=\mathbf 0$ и $(-1)\mathbf v=-\mathbf v$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Сталкиваем два «кандидата» в одной сумме и пользуемся коммутативностью.`,
        steps: [
          {
            title: md`Ноль единствен`,
            body: md`Если $\mathbf 0$ и $\mathbf 0'$ оба нули, то $\mathbf 0=\mathbf 0+\mathbf 0'=\mathbf 0'+\mathbf 0=\mathbf 0'$ (первое равенство — свойство $\mathbf 0'$, последнее — свойство $\mathbf 0$).`,
          },
          {
            title: md`Противоположный единствен`,
            body: md`Если $\mathbf v+\mathbf a=\mathbf 0$ и $\mathbf v+\mathbf b=\mathbf 0$, то $\mathbf a=\mathbf a+(\mathbf v+\mathbf b)=(\mathbf a+\mathbf v)+\mathbf b=\mathbf b$.`,
          },
          {
            title: md`$0\cdot\mathbf v=\mathbf 0$`,
            body: md`$0\mathbf v=(0+0)\mathbf v=0\mathbf v+0\mathbf v$; прибавляем к обеим частям $-0\mathbf v$ и получаем $\mathbf 0=0\mathbf v$.`,
          },
          {
            title: md`$(-1)\mathbf v=-\mathbf v$`,
            body: md`$\mathbf v+(-1)\mathbf v=1\mathbf v+(-1)\mathbf v=(1-1)\mathbf v=0\mathbf v=\mathbf 0$, а противоположный единствен.`,
          },
        ],
      },
      pitfalls: ['Это следствия аксиом, а не аксиомы: на вопрос «почему 0·v = 0» нужно вывести, а не сослаться на определение.'],
    },
    {
      id: 'subspace',
      title: 'Подпространство и критерий подпространства',
      source: 'Лонгрид 6, §2, утверждение 1',
      definition: {
        level: 'basic',
        text: md`Подмножество $\mathbb U\subseteq\mathbb V$ — **подпространство**, если $\mathbf 0\in\mathbb U$ и $\mathbb U$ замкнуто относительно сложения и умножения на скаляры: $\mathbf u+\mathbf v\in\mathbb U$, $\lambda\mathbf u\in\mathbb U$ для всех $\mathbf u,\mathbf v\in\mathbb U$, $\lambda\in\mathbb F$.`,
      },
      statement: {
        level: 'basic',
        text: md`**Критерий.** Непустое $\mathbb U\subseteq\mathbb V$ — подпространство тогда и только тогда, когда $\lambda\mathbf u+\mu\mathbf v\in\mathbb U$ для всех $\mathbf u,\mathbf v\in\mathbb U$ и $\lambda,\mu\in\mathbb F$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Подставляем удобные $\lambda,\mu$: нули дают $\mathbf 0$, единицы — сумму, $\mu=0$ — умножение на скаляр.`,
        steps: [
          { title: md`$\Rightarrow$`, body: md`$\lambda\mathbf u\in\mathbb U$ и $\mu\mathbf v\in\mathbb U$ по замкнутости относительно умножения, их сумма — по замкнутости относительно сложения.` },
          { title: md`$\Leftarrow$: ноль`, body: md`$\mathbb U$ непусто — возьмём $\mathbf u\in\mathbb U$; при $\lambda=\mu=0$ получаем $0\mathbf u+0\mathbf u=\mathbf 0\in\mathbb U$.` },
          { title: md`$\Leftarrow$: сложение и умножение`, body: md`$\lambda=\mu=1$ даёт $\mathbf u+\mathbf v\in\mathbb U$; $\mu=0$ даёт $\lambda\mathbf u\in\mathbb U$.` },
        ],
      },
      notes: md`Подпространства: $\{\mathbf 0\}$, само $\mathbb V$, $\ker A\subseteq\mathbb F^n$, симметричные матрицы ($A^{\mathsf T}=A$), многочлены с $p(a)=0$.

Не подпространства: обратимые матрицы (нет нуля), многочлены степени ровно $d$ (разность двух может упасть в степени), многочлены с $p(a)=1$ (нет нуля).

Подпространства $\mathbb R^2$: $\{\mathbf 0\}$, прямые через начало координат, вся плоскость.

Операции на $\mathbb U$ берутся из $\mathbb V$, поэтому аксиомы для $\mathbb U$ проверять не нужно.`,
      pitfalls: [
        md`Непустоты и замкнутости относительно сложения и взятия противоположного **мало**: $\mathbb Z\subset\mathbb R$ замкнуто относительно $+$ и $-$, но $\tfrac12\cdot1\notin\mathbb Z$.`,
        'Чтобы доказать, что множество НЕ подпространство, нужен конкретный пример: два вектора, сумма которых выходит из множества, или вектор и скаляр.',
        md`Первым делом проверяй $\mathbf 0$: если условие вида «$=1$», «$\ne$», «$\ge$», ответ обычно виден сразу.`,
      ],
    },
    {
      id: 'span',
      title: 'Линейная оболочка и порождающая система',
      source: 'Лонгрид 6, §3',
      definition: {
        level: 'basic',
        text: md`**Линейная комбинация** векторов $\mathbf v_1,\dots,\mathbf v_k$ — вектор $\lambda_1\mathbf v_1+\dots+\lambda_k\mathbf v_k$, $\lambda_i\in\mathbb F$. **Линейная оболочка** $\operatorname{span}\{\mathbf v_1,\dots,\mathbf v_k\}$ — множество всех таких комбинаций.

Система **порождает** $\mathbb V$ (порождающая система), если $\operatorname{span}\{\mathbf v_1,\dots,\mathbf v_k\}=\mathbb V$.`,
      },
      notes: md`Оболочка — **наименьшее подпространство**, содержащее $\mathbf v_1,\dots,\mathbf v_k$: она сама подпространство (комбинация комбинаций — комбинация), а любое подпространство с этими векторами содержит все их комбинации.

Пустая система: $\operatorname{span}\varnothing=\{\mathbf 0\}$.`,
      pitfalls: [
        'Оболочка — это подпространство, а не просто «набор векторов»: в ней бесконечно много элементов (над ℝ), если хоть один вектор ненулевой.',
        md`Удаление вектора, который выражается через остальные, оболочку не меняет — так из порождающей системы получают базис.`,
      ],
    },
    {
      id: 'lin-indep',
      title: 'Линейная независимость и её свойства',
      source: 'Лонгрид 6, §3, утверждение 2',
      definition: {
        level: 'basic',
        text: md`Система $\mathbf v_1,\dots,\mathbf v_k$ **линейно зависима**, если есть скаляры $\lambda_1,\dots,\lambda_k$, **не все равные нулю**, с $\lambda_1\mathbf v_1+\dots+\lambda_k\mathbf v_k=\mathbf 0$. Если такое равенство возможно только при $\lambda_1=\dots=\lambda_k=0$, система **линейно независима**. Пустая система независима.`,
      },
      statement: {
        level: 'basic',
        text: md`1. Система линейно зависима $\iff$ один из её векторов выражается через остальные.
2. Если $\mathbf v_1,\dots,\mathbf v_k$ независимы, то $\mathbf v_1,\dots,\mathbf v_k,\mathbf w$ независимы $\iff$ $\mathbf w\notin\operatorname{span}\{\mathbf v_1,\dots,\mathbf v_k\}$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Нетривиальную зависимость можно «разрешить» относительно вектора с ненулевым коэффициентом, и наоборот.`,
        steps: [
          { title: md`П. 1, $\Rightarrow$`, body: md`Пусть $\sum\lambda_i\mathbf v_i=\mathbf 0$ и $\lambda_j\ne0$. Делим на $\lambda_j$: $\mathbf v_j=-\sum_{i\ne j}\frac{\lambda_i}{\lambda_j}\mathbf v_i$.` },
          { title: md`П. 1, $\Leftarrow$`, body: md`Если $\mathbf v_j=\sum_{i\ne j}c_i\mathbf v_i$, то $\sum_{i\ne j}c_i\mathbf v_i-1\cdot\mathbf v_j=\mathbf 0$ — коэффициент при $\mathbf v_j$ равен $-1\ne0$.` },
          { title: md`П. 2: если $\mathbf w$ вне оболочки, то $\mu=0$`, body: md`Пусть $\sum\lambda_i\mathbf v_i+\mu\mathbf w=\mathbf 0$. Если $\mu\ne0$, то $\mathbf w=-\frac1\mu\sum\lambda_i\mathbf v_i\in\operatorname{span}$ — противоречие. Значит, $\mu=0$.` },
          { title: md`П. 2: остальные коэффициенты нулевые`, body: md`При $\mu=0$ остаётся $\sum\lambda_i\mathbf v_i=\mathbf 0$, и по независимости все $\lambda_i=0$.` },
          { title: md`П. 2, обратно`, body: md`Если $\mathbf w=\sum c_i\mathbf v_i$, то $\sum c_i\mathbf v_i-\mathbf w=\mathbf 0$ — нетривиальная зависимость расширенной системы.` },
        ],
      },
      notes: md`Быстрые признаки независимости без счёта: многочлены попарно различных степеней; «ступенчатые» векторы (у каждого следующего ведущая позиция правее); функции, которые «растут с разной скоростью» (делим на самую быструю и переходим к пределу); подстановка точек, где все функции, кроме одной, обнуляются.`,
      pitfalls: [
        md`«Один вектор выражается через остальные» — не обязательно **каждый**: в системе $\mathbf e_1,\,2\mathbf e_1,\,\mathbf e_2$ вектор $\mathbf e_2$ через остальные не выражается, а система зависима.`,
        md`Система с нулевым вектором всегда зависима: $1\cdot\mathbf 0=\mathbf 0$.`,
        'Попарная непропорциональность не означает независимости: (1,0), (0,1), (1,1) попарно непропорциональны, но зависимы.',
      ],
    },
    {
      id: 'main-lemma',
      title: 'Основная лемма о линейной зависимости',
      source: 'Лонгрид 6, §3, утверждение 3',
      statement: {
        level: 'basic',
        text: md`Если каждый из векторов $\mathbf w_1,\dots,\mathbf w_k$ лежит в $\operatorname{span}\{\mathbf v_1,\dots,\mathbf v_m\}$ и $k>m$, то $\mathbf w_1,\dots,\mathbf w_k$ линейно зависимы.

Иначе: больше векторов, чем «порождающих», всегда зависимы.`,
      },
      proof: {
        level: 'basic',
        idea: md`Ищем коэффициенты $\lambda_j$, обнуляющие все коэффициенты при $\mathbf v_i$: это однородная система из $m$ уравнений на $k>m$ неизвестных — у неё есть ненулевое решение.`,
        steps: [
          { title: md`Случай $m=0$`, body: md`Тогда все $\mathbf w_j=\mathbf 0$, и при $k\ge1$ система зависима.` },
          { title: md`Раскладываем $\mathbf w_j$`, body: md`$\mathbf w_j=a_{1j}\mathbf v_1+\dots+a_{mj}\mathbf v_m$, $j=1,\dots,k$.` },
          { title: md`Подставляем в $\sum\lambda_j\mathbf w_j$`, body: md`Коэффициент при $\mathbf v_i$ равен $a_{i1}\lambda_1+\dots+a_{ik}\lambda_k$. Достаточно сделать все эти $m$ коэффициентов нулями.` },
          { title: md`Однородная система с $k>m$`, body: md`Система $\sum_j a_{ij}\lambda_j=0$, $i=1,\dots,m$: уравнений $m$, неизвестных $k>m$. После метода Гаусса есть свободная переменная, значит, есть ненулевое решение $(\lambda_1,\dots,\lambda_k)$.` },
          { title: md`Это и есть зависимость`, body: md`Для него $\sum\lambda_j\mathbf w_j=\sum_i 0\cdot\mathbf v_i=\mathbf 0$, а не все $\lambda_j$ нулевые. Независимость $\mathbf v_i$ при этом не нужна.` },
        ],
      },
      pitfalls: [
        md`Лемма не требует, чтобы $\mathbf v_1,\dots,\mathbf v_m$ были независимы: обнуления коэффициентов при них достаточно.`,
        'Ключевой факт из прошлых недель: однородная система, где неизвестных больше, чем уравнений, имеет ненулевое решение (есть свободная переменная).',
      ],
    },
    {
      id: 'indep-le-span',
      title: 'Независимых векторов не больше, чем порождающих',
      source: 'Лонгрид 6, §3, утверждение 4',
      statement: {
        level: 'basic',
        text: md`Если $\mathbf u_1,\dots,\mathbf u_m$ порождают $\mathbb V$, а $\mathbf v_1,\dots,\mathbf v_n\in\mathbb V$ линейно независимы, то $n\le m$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Прямое следствие основной леммы.`,
        steps: [
          { title: md`Все $\mathbf v_i$ лежат в оболочке $\mathbf u$`, body: md`Потому что $\operatorname{span}\{\mathbf u_1,\dots,\mathbf u_m\}=\mathbb V$.` },
          { title: md`От противного`, body: md`Если $n>m$, по основной лемме $\mathbf v_1,\dots,\mathbf v_n$ зависимы — противоречие. Значит, $n\le m$.` },
        ],
      },
      uses: ['main-lemma'],
      pitfalls: ['Типичное применение: «4 вектора в ℝ³ всегда зависимы», «2 вектора не могут породить ℝ³».'],
    },
    {
      id: 'basis',
      title: 'Базис и критерий базиса',
      source: 'Лонгрид 6, §4, утверждение 5',
      definition: {
        level: 'basic',
        text: md`**Базис** пространства $\mathbb V$ — **упорядоченная** система $\mathcal B=(\mathbf b_1,\dots,\mathbf b_n)$, которая линейно независима и порождает $\mathbb V$. Базис $\{\mathbf 0\}$ — пустая система.`,
      },
      statement: {
        level: 'basic',
        text: md`$\mathcal B=(\mathbf b_1,\dots,\mathbf b_n)$ — базис $\mathbb V$ $\iff$ каждый $\mathbf x\in\mathbb V$ **единственным образом** записывается как $\mathbf x=x_1\mathbf b_1+\dots+x_n\mathbf b_n$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Существование разложения = порождение, единственность = независимость.`,
        steps: [
          { title: md`$\Rightarrow$: существование`, body: md`$\mathcal B$ порождает $\mathbb V$, значит, любой $\mathbf x$ — комбинация $\mathbf b_i$.` },
          { title: md`$\Rightarrow$: единственность`, body: md`Если $\mathbf x=\sum x_i\mathbf b_i=\sum x_i'\mathbf b_i$, то $\sum(x_i-x_i')\mathbf b_i=\mathbf 0$, и по независимости $x_i=x_i'$.` },
          { title: md`$\Leftarrow$`, body: md`Существование разложений означает, что $\mathcal B$ порождает $\mathbb V$. Единственность разложения **нулевого** вектора ($\mathbf 0=\sum0\cdot\mathbf b_i$) — это и есть независимость.` },
        ],
      },
      notes: md`Пример: в $\mathbb R[t]_{\le2}$ система $(1,t,t^2)$ — базис; $(1,t,t^2,1+t)$ порождает, но зависима; $(1,t)$ независима, но не порождает.

ФСР однородной системы — базис $\ker A$.`,
      pitfalls: [
        'Базис упорядочен: (b₁, b₂) и (b₂, b₁) — разные базисы, у вектора в них переставлены координаты.',
        'Нужно проверить оба условия; если число векторов равно размерности, достаточно одного (утверждение 8).',
      ],
    },
    {
      id: 'extend-basis',
      title: 'Выделение базиса и дополнение до базиса',
      source: 'Лонгрид 6, §4, утверждение 6',
      definition: {
        level: 'basic',
        text: md`Пространство **конечномерно**, если у него есть конечная порождающая система.`,
      },
      statement: {
        level: 'basic',
        text: md`Пусть $\mathbb V$ конечномерно. Тогда:
1. из любой конечной порождающей системы можно выкинуть некоторые векторы и получить базис;
2. любую линейно независимую систему можно дополнить до базиса.`,
      },
      proof: {
        level: 'basic',
        idea: md`Выкидываем векторы, которые выражаются через остальные (оболочка не меняется); добавляем векторы, которые не выражаются через уже выбранные (независимость сохраняется).`,
        steps: [
          { title: md`П. 1: выкидываем лишнее`, body: md`Если порождающая система зависима, какой-то её вектор выражается через остальные; без него оболочка та же. Повторяем, пока система не станет независимой — процесс конечен, векторов конечное число.` },
          { title: md`П. 2: берём порождающую систему`, body: md`Пусть $\mathbf v_1,\dots,\mathbf v_k$ независимы, а $\mathbf u_1,\dots,\mathbf u_m$ порождают $\mathbb V$ (есть по конечномерности).` },
          { title: md`П. 2: добавляем по одному`, body: md`Просматриваем $\mathbf u_i$ по очереди: если $\mathbf u_i$ лежит в оболочке уже выбранных — пропускаем, иначе добавляем. По свойству 2 независимости система остаётся независимой.` },
          { title: md`П. 2: получился базис`, body: md`В конце каждый $\mathbf u_i$ либо добавлен, либо выражается через выбранные. Значит, оболочка выбранных содержит все $\mathbf u_i$, то есть равна $\mathbb V$. Независимая порождающая система — базис, и он содержит исходные $\mathbf v_j$.` },
        ],
      },
      uses: ['lin-indep'],
      pitfalls: ['Дополнение до базиса не единственно: к независимой системе можно добавить много разных наборов.', 'Дополнять можно только независимую систему; зависимую сначала прореживают.'],
    },
    {
      id: 'dimension',
      title: 'Размерность',
      source: 'Лонгрид 6, §4, утверждение 7',
      definition: {
        level: 'basic',
        text: md`**Размерность** $\dim\mathbb V$ конечномерного пространства — число векторов в любом его базисе. $\dim\{\mathbf 0\}=0$.`,
      },
      statement: {
        level: 'basic',
        text: md`Все базисы конечномерного пространства содержат одинаковое число векторов (поэтому размерность определена корректно).`,
      },
      proof: {
        level: 'basic',
        idea: md`Каждый базис одновременно порождающий и независимый — применяем «независимых не больше, чем порождающих» в обе стороны.`,
        steps: [
          { title: md`Первое неравенство`, body: md`Пусть базисы из $n$ и $m$ векторов. Первый порождает, второй независим, поэтому $m\le n$.` },
          { title: md`Второе неравенство`, body: md`Меняем роли: $n\le m$. Значит, $m=n$.` },
        ],
      },
      uses: ['indep-le-span'],
      notes: md`$\dim\mathbb F^n=n$, $\ \dim\operatorname{Mat}_{m\times n}(\mathbb F)=mn$ (базис — матричные единицы $E_{ij}$), $\ \dim\mathbb F[t]_{\le d}=d+1$ (базис $1,t,\dots,t^d$).

Симметричные $n\times n$: $\frac{n(n+1)}2$; кососимметричные: $\frac{n(n-1)}2$.

$\mathbb C$ над $\mathbb R$: $\dim=2$, базис $(1,i)$; над $\mathbb C$: $\dim=1$.

$\mathbb F[t]$ (все многочлены) бесконечномерно: у конечного набора есть максимальная степень, многочлен большей степени через него не выражается.`,
      pitfalls: [
        md`Размерность зависит от поля: $\dim_{\mathbb R}\mathbb C=2$, $\dim_{\mathbb C}\mathbb C=1$. Векторы $1+i$ и $1-i$ независимы над $\mathbb R$, но зависимы над $\mathbb C$.`,
        md`$\dim\mathbb F[t]_{\le d}=d+1$, а не $d$: не забывай константу.`,
      ],
    },
    {
      id: 'dim-consequences',
      title: 'Следствия: n векторов в n-мерном пространстве',
      source: 'Лонгрид 6, §4, утверждение 8',
      statement: {
        level: 'basic',
        text: md`Пусть $\dim\mathbb V=n$. Тогда
1. любые $n$ линейно независимых векторов образуют базис;
2. любая порождающая система из $n$ векторов — базис;
3. любое подпространство $\mathbb U\subseteq\mathbb V$ конечномерно и $\dim\mathbb U\le n$; если $\dim\mathbb U=n$, то $\mathbb U=\mathbb V$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Дополняем или прореживаем до базиса — но в базисе ровно $n$ векторов, так что менять ничего не приходится.`,
        steps: [
          { title: md`П. 1`, body: md`Дополним независимую систему до базиса. В базисе ровно $n$ векторов, а у нас уже $n$ — добавлять нечего, система и была базисом.` },
          { title: md`П. 2`, body: md`Выделим из порождающей системы базис: в нём $n$ векторов, выкидывать нечего.` },
          { title: md`П. 3: строим базис $\mathbb U$`, body: md`Начинаем с пустой системы и добавляем векторы $\mathbb U$ вне оболочки уже выбранных — независимость сохраняется. Независимая система в $\mathbb V$ содержит не больше $n$ векторов (основная лемма), так что процесс остановится на базисе $\mathbb U$ длины $\le n$.` },
          { title: md`П. 3: равенство размерностей`, body: md`Если в базисе $\mathbb U$ ровно $n$ векторов, по п. 1 это базис и всего $\mathbb V$, поэтому $\mathbb U=\mathbb V$.` },
        ],
      },
      uses: ['extend-basis', 'dimension', 'main-lemma'],
      pitfalls: [
        'Главный способ экономить счёт: знаешь размерность — проверяй только одно из двух условий базиса.',
        md`Для подпространств одной размерности одно включение $\mathbb U\subseteq\mathbb W$ уже даёт равенство.`,
      ],
    },
    {
      id: 'coordinates',
      title: 'Координаты вектора в базисе',
      source: 'Лонгрид 6, §5, утверждение 9',
      definition: {
        level: 'basic',
        text: md`Если $\mathcal B=(\mathbf b_1,\dots,\mathbf b_n)$ — базис и $\mathbf x=x_1\mathbf b_1+\dots+x_n\mathbf b_n$, то столбец $[\mathbf x]_{\mathcal B}=(x_1,\dots,x_n)^{\mathsf T}\in\mathbb F^n$ — **координаты** $\mathbf x$ в базисе $\mathcal B$. Отображение $\kappa_{\mathcal B}:\mathbf x\mapsto[\mathbf x]_{\mathcal B}$ — координатная функция.`,
      },
      statement: {
        level: 'basic',
        text: md`1. $[\lambda\mathbf x+\mu\mathbf y]_{\mathcal B}=\lambda[\mathbf x]_{\mathcal B}+\mu[\mathbf y]_{\mathcal B}$.
2. Для каждого столбца $\mathbf a\in\mathbb F^n$ есть ровно один $\mathbf x\in\mathbb V$ с $[\mathbf x]_{\mathcal B}=\mathbf a$.

Поэтому $\kappa_{\mathcal B}$ — изоморфизм $\mathbb V\to\mathbb F^n$: он сохраняет независимость и свойство порождать.`,
      },
      proof: {
        level: 'basic',
        idea: md`Складываем разложения; обратное отображение — «собрать вектор по столбцу».`,
        steps: [
          { title: md`Линейность`, body: md`Если $\mathbf x=\sum x_i\mathbf b_i$, $\mathbf y=\sum y_i\mathbf b_i$, то $\lambda\mathbf x+\mu\mathbf y=\sum(\lambda x_i+\mu y_i)\mathbf b_i$ — это разложение, а оно единственно.` },
          { title: md`Существование`, body: md`По столбцу $\mathbf a$ берём $\mathbf x=a_1\mathbf b_1+\dots+a_n\mathbf b_n$: по единственности разложения $[\mathbf x]_{\mathcal B}=\mathbf a$.` },
          { title: md`Единственность`, body: md`Любой вектор с координатами $\mathbf a$ равен $\sum a_i\mathbf b_i$ по определению координат.` },
        ],
      },
      uses: ['basis'],
      notes: md`Различай три объекта: вектор $\mathbf x\in\mathbb V$ (может быть многочленом, матрицей, функцией), базис $\mathcal B$ и числовой столбец $[\mathbf x]_{\mathcal B}$.

Пример: в $\mathcal B=(1,\,t-1,\,(t-1)^2)$ многочлен $t^2+1=2+2(t-1)+(t-1)^2$, так что $[t^2+1]_{\mathcal B}=(2,2,1)^{\mathsf T}$, а в стандартном базисе — $(1,0,1)^{\mathsf T}$.

Удобные базисы, где координаты видны сразу: $(1,x-a,\frac{(x-a)^2}{2},\dots)$ — координаты $p(a),p'(a),p''(a),\dots$; интерполяционный базис Лагранжа в точках $x_0,x_1,x_2$ — координаты $p(x_0),p(x_1),p(x_2)$.`,
      pitfalls: [
        'Координаты — всегда числовой столбец, даже если сам вектор — многочлен или матрица. Не пиши «координаты = t² + 1».',
        'Порядок координат следует порядку векторов базиса.',
      ],
    },
    {
      id: 'complete-algorithm',
      title: 'Как дополнить систему до базиса (алгоритм)',
      source: 'Лонгрид 6, §6',
      statement: {
        level: 'basic',
        text: md`Пусть $\mathcal A=(\mathbf a_1,\dots,\mathbf a_n)$ — известный базис $\mathbb V$, а $\mathbf v_1,\dots,\mathbf v_k$ независимы.
1. Записываем координаты $[\mathbf v_i]_{\mathcal A}$ **строками** матрицы и приводим её к улучшенному ступенчатому виду.
2. Для каждого столбца без ведущей единицы добавляем стандартную строку $\mathbf e_j^{\mathsf T}$.
3. Соответствующие векторы $\mathbf a_j$ дополняют $\mathbf v_1,\dots,\mathbf v_k$ до базиса.

Если в ходе Гаусса появилась нулевая строка, исходная система зависима.`,
      },
      proof: {
        level: 'basic',
        idea: md`Преобразования строк не меняют оболочку; ступенчатые строки вместе со стандартными порождают всё $\mathbb F^n$; координаты переносят результат в $\mathbb V$.`,
        steps: [
          { title: md`Гаусс сохраняет оболочку строк`, body: md`Элементарные преобразования заменяют строки их комбинациями и обратимы, поэтому оболочка строк та же.` },
          { title: md`Сколько добавить`, body: md`Ненулевые строки ступенчатого вида независимы (по ведущим столбцам) и порождают ту же оболочку, что $k$ независимых исходных, — значит, их ровно $k$. Свободных столбцов $n-k$, столько стандартных строк и добавляем.` },
          { title: md`Получаем всё $\mathbb F^n$`, body: md`Вычитая из ступенчатых строк кратные добавленных, получаем все $n$ стандартных строк. Значит, набор порождает $\mathbb F^n$, и из $n$ векторов — это базис.` },
          { title: md`Возвращаемся к исходным`, body: md`Замена ступенчатых строк исходными не меняет оболочку и число векторов — снова базис $\mathbb F^n$. Координатная функция — изоморфизм, поэтому $\mathbf v_1,\dots,\mathbf v_k$ с добавленными $\mathbf a_j$ — базис $\mathbb V$.` },
        ],
      },
      uses: ['coordinates', 'dim-consequences'],
      pitfalls: [
        'Координаты записываются СТРОКАМИ: мы не решаем систему, а храним векторы и меняем их на комбинации.',
        'В ответ идут исходные векторы плюс добавленные стандартные, а не строки после Гаусса (хотя и они тоже дают базис).',
      ],
    },
  ],
};
