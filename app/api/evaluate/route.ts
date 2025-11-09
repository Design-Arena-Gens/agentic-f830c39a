import { NextResponse } from 'next/server';
import { evaluateTopK, HabitEngine, loadSampleDataset } from '../../../lib/habits';

export async function GET() {
  const rows = loadSampleDataset();
  const engine = new HabitEngine(rows);
  const metrics = evaluateTopK(engine, rows, 5);
  return NextResponse.json(metrics);
}
