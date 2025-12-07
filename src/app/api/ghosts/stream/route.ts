import { mockGhosts } from "@/data/ghosts";
import { GhostType } from "@/entities/ghost/model/types";
import z from "zod";

export const dynamic = "force-dynamic";

const levels: GhostType["threatLevel"][] = ["Низкий", "Средний", "Высокий", "Критический"];

const ghostSchema = z.object({
  id: z.string(),
  threatLevel: z.enum(levels),
});

export async function GET() {
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      let closed = false;

      const closeController = () => {
        if (!closed) {
          closed = true;
          controller.close();
        }
      };

      try {
        while (true) {
          if (closed) break;

          const ghost = mockGhosts[Math.floor(Math.random() * mockGhosts.length)];
          ghost.threatLevel = levels[Math.floor(Math.random() * levels.length)];

          const dataS = { id: ghost.id, threatLevel: ghost.threatLevel };
          const parsed = ghostSchema.safeParse(dataS);   // проверка
          if (!parsed.success) continue;
          const dataString = `data: ${JSON.stringify(parsed.data)}\n\n`;
          try {
            controller.enqueue(encoder.encode(dataString));
          } catch {
            break;
          }
          await new Promise((res) => setTimeout(res, 5000));
        }
      } finally {
        closeController();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}
