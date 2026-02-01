import { create } from "zustand";
import { persist } from "zustand/middleware";

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: "light",

      setTheme: (theme) => {
        set({ theme });
        applyTheme(theme);
      },

      toggle: () => {
        const next = get().theme === "dark" ? "light" : "dark";
        set({ theme: next });
        applyTheme(next);
      },

      init: () => {
        applyTheme(get().theme);
      },
    }),
    { name: "suos_theme_v1" }
  )
);
