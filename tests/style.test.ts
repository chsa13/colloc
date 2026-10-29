import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { exams } from '../content';

// Единый стиль всех экзаменов. Правила словами — в CLAUDE.md, раздел «Тексты экзамена».
// Меняешь правило — меняй его здесь и в CLAUDE.md и сразу приводи к нему ВСЕ экзамены, а не только новый.

const TASKS_TAIL = 'Сначала реши сам, потом открывай подсказки по одной, и только потом решение.';
const MOCK_TITLE = { ticket: 'Пробный билет', test: 'Пробная КР' } as const;
const HOW_FACTS = ['Когда', 'Время', 'Что входит', 'Нельзя'];
const HOW_LAST = 'Как готовиться на сайте';
/** Чего не должно быть в текстах: уровни — компонентом Star, пробный вариант — по названию из mock.title. */
const BANNED = [/🔴|⚫/u, /пробник/i];
/** Адреса внутри раздела экзамена, на которые можно ссылаться, кроме разделов из features. */
const PAGES = ['how', 'settings', 'topic'];

const files = (dir: string, ext: RegExp): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? files(join(dir, d.name), ext) : ext.test(d.name) ? [join(dir, d.name)] : [],
  );

describe('exam texts follow one style', () => {
  for (const e of exams) {
    describe(e.id, () => {
      const how = e.how.trim();
      const short = [e.when, e.format, e.scope, e.tasksNote, how];

      it('subject is the subject only; short is «Коллок по …» / «КР2 по …»', () => {
        expect(e.subject).not.toMatch(/поток|,/);
        expect(e.short).toMatch(/^(Коллок|КР\d*) по /);
      });

      it('when / format / scope: one line each, no trailing period', () => {
        for (const s of [e.when, e.format, e.scope]) expect(s, s).not.toMatch(/\.$|\n/);
        expect(e.format, 'format начинается с числа: «45 минут…», «~45 минут…»').toMatch(/^[~\d]/);
        expect(e.scope, 'scope = «Источник: темы»').toMatch(/^[^:]+: \S/);
        expect(e.scope, 'в scope без счётчиков вопросов').not.toMatch(/\d+ (вопрос|теорем)/);
      });

      it('tasksNote ends with the shared advice (empty without tasks)', () => {
        if (e.features.includes('tasks')) expect(e.tasksNote.endsWith(TASKS_TAIL), e.tasksNote).toBe(true);
        else expect(e.tasksNote).toBe('');
      });

      it('mock title matches its kind', () => {
        expect(e.mock.title).toBe(MOCK_TITLE[e.mock.kind]);
      });

      it('how: title, facts list, last section «Как готовиться на сайте»', () => {
        expect(how.split('\n')[0]).toMatch(/^# Как устроен(а)? (коллоквиум|контрольная)$/);
        for (const f of HOW_FACTS) expect(how, `нет пункта **${f}:**`).toContain(`- **${f}:** `);
        const h2 = [...how.matchAll(/^## (.+)$/gm)].map((m) => m[1]);
        expect(h2.at(-1)).toBe(HOW_LAST);
        const last = how.slice(how.lastIndexOf(`## ${HOW_LAST}`)).split('\n').filter((l) => /^\d+\. /.test(l));
        expect(last.length).toBeGreaterThan(2);
        for (const l of last) expect(l, 'пункт: «N. [Раздел](/id/…) — глагол на «ты»…»').toMatch(/^\d+\. \[[^\]]+\]\(\/[^)]+\)( и \[[^\]]+\]\(\/[^)]+\))? — \S/);
      });

      it('no emoji level marks or «пробник»', () => {
        for (const s of short) for (const re of BANNED) expect(s, `${re} в «${s.slice(0, 60)}…»`).not.toMatch(re);
      });

      it('every task has a source and 1–2 hints', () => {
        for (const t of e.tasks) {
          expect(t.source, t.id).toBeTruthy();
          expect(t.hints.length, t.id).toBeGreaterThanOrEqual(1);
          expect(t.hints.length, t.id).toBeLessThanOrEqual(2);
        }
      });

      it('links inside content lead to this exam and its sections', () => {
        const allowed = new Set<string>([...e.features, ...PAGES]);
        const topics = new Set(e.topics.map((t) => t.id));
        for (const f of files(join('content', e.id), /\.ts$/)) {
          for (const m of readFileSync(f, 'utf8').matchAll(/\]\((\/[^)\s]*)\)/g)) {
            const [, id, page, sub] = m[1].split(/[/?]/);
            expect(id, `${f}: ${m[1]}`).toBe(e.id);
            if (page) expect(allowed.has(page), `${f}: ${m[1]}`).toBe(true);
            if (page === 'topic') expect(topics.has(sub), `${f}: ${m[1]}`).toBe(true);
          }
        }
      });
    });
  }
});

describe('UI strings', () => {
  it('no emoji level marks or «пробник» in src (comments aside)', () => {
    for (const f of files('src', /\.tsx?$/)) {
      readFileSync(f, 'utf8')
        .split('\n')
        .forEach((line, i) => {
          const t = line.trim();
          if (/^(\/\/|\/\*|\*|\{\/\*)/.test(t)) return;
          const code = t.replace(/\s\/\/.*$/, '');
          for (const re of BANNED) expect(code, `${f}:${i + 1}`).not.toMatch(re);
        });
    }
  });
});
