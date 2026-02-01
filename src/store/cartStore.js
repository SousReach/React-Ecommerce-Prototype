import { create } from "zustand";
import { persist } from "zustand/middleware";

function clampQty(qty) {
  const n = Number(qty);
  if (Number.isNaN(n)) return 1;
  return Math.min(99, Math.max(1, Math.floor(n)));
}

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, variant) => {
        const key = `${product.id}__${variant.size}__${variant.color}`;
        const items = get().items.slice();
        const existing = items.find((i) => i.key === key);

        if (existing) {
          existing.qty = clampQty(existing.qty + 1);
        } else {
          items.push({
            key,
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.images?.[0] ?? "",
            variant,
            qty: 1,
          });
        }

        set({ items });
      },

      removeItem: (key) => set({ items: get().items.filter((i) => i.key !== key) }),

      setQty: (key, qty) => {
        const items = get().items.slice();
        const item = items.find((i) => i.key === key);
        if (!item) return;
        item.qty = clampQty(qty);
        set({ items });
      },

      clear: () => set({ items: [] }),

      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),

      count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
    }),
    { name: "suos_cart_v1" }
  )
);
