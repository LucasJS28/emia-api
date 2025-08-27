import sql from './db';

export type Task = { id: number; title: string; completed: boolean };

/**
 * dbClient acepta la función sql por inyección para facilitar testing.
 */
export const listTasks = async (dbClient = sql): Promise<Task[]> => {
  const tasks = await dbClient`SELECT id, title, completed FROM tasks ORDER BY id`;
  return tasks as Task[];
};

export const createTask = async (title: string, dbClient = sql): Promise<Task> => {
  const [task] = await dbClient`INSERT INTO tasks (title) VALUES (${title}) RETURNING id, title, completed`;
  return task as Task;
};
export async function updateTaskInDB(id: number, completed: boolean, dbClient = sql): Promise<Task> {
  const [task] = await dbClient`
    UPDATE tasks
    SET completed = ${completed}
    WHERE id = ${id}
    RETURNING id, title, completed
  `;
  return task as Task;
}
