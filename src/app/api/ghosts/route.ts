import { mockGhosts } from '@/data/ghosts';
import { NextResponse } from 'next/server';
import { ghostSchemaType } from '@/entities/ghost/model/types';
import { z } from "zod";

export const dynamic = 'force-dynamic';

export async function GET() {

  const parsed = z.array(ghostSchemaType).safeParse(mockGhosts);
  if (!parsed.success) {
    console.log(parsed.error.format());
    return NextResponse.json({ message: "Некорректные данные" }, { status: 500 });
  }

  return NextResponse.json(parsed.data);
}