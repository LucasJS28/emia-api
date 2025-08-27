import { NextRequest, NextResponse } from 'next/server';
import { listTasks, createTask } from '../../../lib/tasks';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  // Usa tu función existente
  const tasks = await listTasks();

  const res = NextResponse.json(tasks);
  // Permitir solicitudes desde cualquier dominio
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  
  return res;
}

export async function OPTIONS() {
  const res = NextResponse.json({});
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return res;
}
