import { mockGhosts } from '@/data/ghosts';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(mockGhosts);
}