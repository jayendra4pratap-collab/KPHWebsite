"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  defaultTheme,
  isTheme,
  themeStorageKey,
  type Theme,
} from "@/config/theme";

const themeChangeEvent = "kph-theme-change";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  window.dispatchEvent(new Event(themeChangeEvent));
}

function getTheme(): Theme {
  const theme = document.documentElement.dataset.theme;
  return isTheme(theme) ? theme : defaultTheme;
}

function subscribe(callback: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key === themeStorageKey || event.key === null) {
      applyTheme(isTheme(event.newValue) ? event.newValue : defaultTheme);
    }
  }
  window.addEventListener(themeChangeEvent, callback);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(themeChangeEvent, callback);
    window.removeEventListener("storage", onStorage);
  };
}

function setTheme(theme: Theme) {
  applyTheme(theme);
  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch {
    // The toggle still works for this session when storage is unavailable.
  }
}

function toggleTheme() {
  setTheme(getTheme() === "dark" ? "light" : "dark");
}

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
} | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => defaultTheme);

  useLayoutEffect(() => {
    // Reapply after React's development remount resets the root attributes.
    let next = getTheme();
    try {
      const saved = localStorage.getItem(themeStorageKey);
      next = isTheme(saved) ? saved : defaultTheme;
    } catch {
      // Keep the current theme if browser storage is blocked.
    }
    applyTheme(next);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
