import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GhostType } from '@/entities/ghost/model/types';
import { useEffect } from "react";
import { ThreatLevel } from "@/entities/ghost/model/types";

export function useGhostAll() {
  return useQuery({
    queryKey: ["ghosts"],
    queryFn: async () => {
      const res = await fetch("/api/ghosts");
      return res.json();
    },
  });
}

export function useCaptureGhost() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/ghosts/${id}`, {
        method: "PATCH",
      });

      if (!res.ok) throw new Error("Все отряды зачистки заняты");
      return res.json();
    },


    onMutate: async (id) => {
      await client.cancelQueries({ queryKey: ["ghosts"] });

      const prev = client.getQueryData(["ghosts"]);

      client.setQueryData(["ghosts"], (old: GhostType[]) =>
        old.map((g) => g.id === id ? { ...g, status: "Нейтрализован" } : g
        )
      );

      return { prev };
    },

    onError: (err, _id, ctx) => {
      if (ctx?.prev) {
        client.setQueryData(["ghosts"], ctx.prev);
      }
      alert(err.message);
    },

    onSuccess: (data) => {
          client.setQueryData(["ghosts"], (old: GhostType[]) =>
        old.map((g) => (g.id === data.id ? { ...g, status: data.status } : g))
      );
  setTimeout(() => {
    client.invalidateQueries({ queryKey: ["ghosts"] });
  }, 3000);
},
  });
}

export function useGhostSSE() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const eventSource = new EventSource("/api/ghosts/stream");

    eventSource.onmessage = (event) => {
      const data: { id: string; threatLevel: ThreatLevel } = JSON.parse(event.data);

      queryClient.setQueryData(["ghosts"], (old: GhostType[] = []) =>
        old.map((g) =>
          g.id === data.id ? { ...g, threatLevel: data.threatLevel } : g
        )
      );
    };

    return () => eventSource.close();
  }, [queryClient]);
}
