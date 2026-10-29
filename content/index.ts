import type { Exam } from '../src/content/schema';
import { matanColloc } from './matan-colloc';
import { linalKr2 } from './linal-kr2';
import { miaColloc } from './mia-colloc';

/** Все экзамены сборника. Новый экзамен — папка content/<id>/ с конфигом Exam и строка здесь. */
export const exams: Exam[] = [matanColloc, miaColloc, linalKr2];
