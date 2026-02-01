import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX = 6;

export const useRecentStore = create(
  persist(
    (set, get) => ({
      ids: [],

      view: (productId) => {
        const ids = get().ids.filter((id) => id !== productId);
        ids.unshift(productId);
        set({ ids: ids.slice(0, MAX) });
      },

      clear: () => set({ ids: [] }),
    }),
    { name: "suos_recent_v1" }
  )
);
