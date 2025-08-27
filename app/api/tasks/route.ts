import { NextRequest, NextResponse } from 'next/server';
import { listTasks, createTask, updateTaskInDB } from '../../../lib/tasks';

export const runtime = 'edge';

export async function GET() {
  const tasks = await listTasks();
  const res = NextResponse.json(tasks);
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return res;
}

export async function POST(req: NextRequest) {
  try {
    const { title } = await req.json();
    const newTask = await createTask(title);
    const res = NextResponse.json(newTask, { status: 201 });
    res.headers.set('Access-Control-Allow-Origin', '*');
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    return res;
  } catch (error) {
    const res = NextResponse.json({ error: 'Error al crear la tarea' }, { status: 500 });
    res.headers.set('Access-Control-Allow-Origin', '*');
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    return res;
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, completed } = await req.json();
    const updatedTask = await updateTaskInDB(id, completed);
    const res = NextResponse.json(updatedTask);
    res.headers.set('Access-Control-Allow-Origin', '*');
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    return res;
  } catch (error) {
    const res = NextResponse.json({ error: 'Error al actualizar la tarea' }, { status: 500 });
    res.headers.set('Access-Control-Allow-Origin', '*');
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    return res;
  }
}

export async function OPTIONS() {
  const res = NextResponse.json({});
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return res;
}
