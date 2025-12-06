import { NextResponse } from "next/server";
import { mockGhosts } from "@/data/ghosts";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (Math.random() < 0.3) {
    return NextResponse.json({ message: "Не удалось поймать духа" }, { status: 500 });
  }
  
  return NextResponse.json({ status: "Нейтрализован", id });
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const ghost = mockGhosts.find(g => g.id === String(id));
  if (!ghost) return NextResponse.json({ message: "Не найдено" }, { status: 404 });

  return NextResponse.json(ghost);
}