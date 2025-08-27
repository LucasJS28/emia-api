import { describe, it, expect } from 'vitest';
import { listTasks, createTask } from '../lib/tasks';

const fakeSql = (strings: TemplateStringsArray, ...values: any[]) => {
  const q = strings[0].toUpperCase();
  if (q.includes('SELECT')) return [{ id: 1, title: 'prueba', completed: false }];
  if (q.includes('INSERT')) return [{ id: 2, title: values[0], completed: false }];
  return [];
};

describe('Tasks service', () => {
  it('listTasks devuelve lista', async () => {
    const res = await listTasks(fakeSql as any);
    expect(res.length).toBeGreaterThan(0);
    expect(res[0]).toHaveProperty('title', 'prueba');
  });

  it('createTask inserta y devuelve', async () => {
    const res = await createTask('nueva tarea', fakeSql as any);
    expect(res).toHaveProperty('id');
    expect(res.title).toBe('nueva tarea');
  });
});
