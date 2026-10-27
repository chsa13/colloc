import type { Task, Topic } from '../src/content/schema';
import { sets, logic } from './sets';
import { summation } from './summation';
import { sequences, seqLimit1 } from './sequences';
import { seqLimit2, seqLimit3 } from './seqlimit';
import { complex, functionsTopic, funcLimit } from './functions';
import { continuity } from './continuity';
import { tasks as allTasks } from './tasks';

/** Темы в порядке курса. */
export const topics: Topic[] = [
  sets,
  logic,
  summation,
  sequences,
  seqLimit1,
  seqLimit2,
  seqLimit3,
  complex,
  functionsTopic,
  funcLimit,
  continuity,
];

export const tasks: Task[] = allTasks;
