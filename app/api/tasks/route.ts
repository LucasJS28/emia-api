import { NextRequest, NextResponse } from 'next/server';
import { listTasks, createTask } from '../../../lib/tasks';

export const runtime = 'edge';

export async function GET() {
  try {
    const tasks = await listTasks();
    return NextResponse.json(tasks);
  } catch (err) {
    return NextResponse.json({ error: 'Error en DB' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const title = (body?.title || '').trim();
    if (!title) return NextResponse.json({ error: 'title es requerido' }, { status: 400 });
    const task = await createTask(title);
    return NextResponse.json(task, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Error en DB' }, { status: 500 });
  }
}
