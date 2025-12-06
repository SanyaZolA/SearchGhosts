import { mockGhosts } from "@/data/ghosts";
import { ThreatLevel } from "@/entities/ghost/model/types";

export const dynamic = "force-dynamic";

const levels: ThreatLevel[] = ["Низкий", "Средний", "Высокий", "Критический"];

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

          const data = `data: ${JSON.stringify({ id: ghost.id, threatLevel: ghost.threatLevel })}\n\n`;
          try {
            controller.enqueue(encoder.encode(data));
          } catch {
            break;
          }

          await new Promise((res) => setTimeout(res, 5000));
        }
      } catch (err) {
        console.error("Ошибка SSE:", err);
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
