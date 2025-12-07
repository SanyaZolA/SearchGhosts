import { z } from "zod";

export const ghostSchemaType = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  location: z.string(),
  threatLevel: z.enum(["Низкий", "Средний", "Высокий", "Критический"]),
  status: z.enum(["Активен", "Нейтрализован"]),
});

export type GhostType = z.infer<typeof ghostSchemaType>;