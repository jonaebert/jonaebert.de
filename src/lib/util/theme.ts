export type Theme = "light" | "dark" | "system";

const KEY = "theme";

export function getStoredTheme(): Theme {
  if (typeof localStorage === "undefined") return "system";
  return (localStorage.getItem(KEY) as Theme) ?? "system";
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;

  const systemDark =
    window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;

  const shouldBeDark = theme === "dark" || (theme === "system" && systemDark);

  root.classList.toggle("dark", shouldBeDark);
  root.dataset.theme = theme;
  root.style.colorScheme = shouldBeDark ? "dark" : "light";
}

export function storeTheme(theme: Theme) {
  localStorage.setItem(KEY, theme);
}
