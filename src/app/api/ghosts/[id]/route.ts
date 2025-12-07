import { z } from "zod";
import { NextResponse } from "next/server";
import { mockGhosts } from "@/data/ghosts";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const parseId = z.string().safeParse(id);
  if (!parseId.success)
    return NextResponse.json({ message: "Неверный id" }, { status: 400 });

  const ghost = mockGhosts.find((g) => g.id === id);
  if (!ghost) return NextResponse.json({ message: "Не найдено" }, { status: 404 });

  return NextResponse.json(ghost);
}


export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const parseId = z.string().safeParse(id);
  if (!parseId.success)
    return NextResponse.json({ message: "Неверный id" }, { status: 400 });

  if (Math.random() < 0.3) {
    return NextResponse.json({ message: "Не удалось поймать духа" }, { status: 500 });
  }
  
  return NextResponse.json({ status: "Нейтрализован", id });
}