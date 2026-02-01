import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      ids: [],

      toggle: (productId) => {
        const ids = new Set(get().ids);
        if (ids.has(productId)) ids.delete(productId);
        else ids.add(productId);
        set({ ids: Array.from(ids) });
      },

      has: (productId) => get().ids.includes(productId),

      clear: () => set({ ids: [] }),
    }),
    { name: "suos_wishlist_v1" }
  )
);
