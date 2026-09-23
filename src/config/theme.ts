export type Theme = "light" | "dark";

export const defaultTheme: Theme = "dark";
export const themeStorageKey = "kph-theme";

// All app colors live here. Both palettes share the same semantic CSS tokens.
export const lightTheme = {
  background: "#f8fafb",
  surface: "#ffffff",
  "surface-muted": "#f5f8f4",
  "surface-hover": "#f0f5f1",
  "surface-selected": "#eaf5ee",
  header: "#ffffffee",
  text: "#182623",
  "text-secondary": "#415347",
  muted: "#65716d",
  "icon-muted": "#909c95",
  border: "#e6ebe8",
  "border-subtle": "#edf0eb",
  "border-strong": "#b9d0c3",
  accent: "#047857",
  "accent-hover": "#065f46",
  "on-accent": "#ffffff",
  "accent-subtle": "#ecfdf5",
  "accent-text": "#126140",
  "accent-indicator": "#29855d",
  "selection-background": "#d2eee0",
  "selection-text": "#164b35",
  "problem-background": "#f0f6ee",
  "problem-border": "#dde8d9",
  "problem-title": "#263e2b",
  "problem-text": "#526b57",
  "problem-accent": "#629562",
  "problem-tag": "#e6ede1",
  "problem-footer": "#edf3e9",
  "difficulty-background": "#e3efdf",
  "difficulty-border": "#d4e4cf",
  "difficulty-text": "#487540",
  "number-background": "#fffef6",
  "number-border": "#d9e0c9",
  "number-text": "#6c754e",
  "number-shadow": "#e4e9d7",
  "number-secondary-background": "#e3edde",
  "number-secondary-border": "#c9dac1",
  "number-secondary-text": "#557447",
  "number-secondary-shadow": "#d7e4cf",
  "avatar-sage-background": "#e1ebe2",
  "avatar-sage-text": "#365942",
  "avatar-blue-background": "#e0eafa",
  "avatar-blue-text": "#345c96",
  "avatar-rose-background": "#f5e2e6",
  "avatar-rose-text": "#934259",
  "mark-blue-background": "#eff6fb",
  "mark-blue-text": "#2f6592",
  "mark-ink-background": "#f2f3f4",
  "mark-ink-text": "#444e54",
  "mark-sand-background": "#f8f3e9",
  "mark-sand-text": "#806137",
  "mark-sage-background": "#f0f5ed",
  "mark-sage-text": "#4e6e50",
  "mark-rose-background": "#fbf1f0",
  "mark-rose-text": "#934f55",
  "chart-yellow": "#edc556",
  "chart-blue": "#55a6d1",
  "chart-rose": "#e28b81",
  "tooltip-background": "#253d2e",
  "tooltip-text": "#ffffff",
  overlay: "#152e2452",
  "shadow-subtle": "#064e3b0c",
  "shadow-elevated": "#16341e16",
  "shadow-dialog": "#122e2329",
  "avatar-ring": "#00000004",
  success: "#49733e",
  error: "#b34040",
  skeleton: "#e9efea",
} as const;

export type ThemeTokens = Record<keyof typeof lightTheme, string>;

export const darkTheme: ThemeTokens = {
  background: "#101815",
  surface: "#18231e",
  "surface-muted": "#1e2b24",
  "surface-hover": "#26372e",
  "surface-selected": "#234333",
  header: "#18231eee",
  text: "#edf4ef",
  "text-secondary": "#c6d7cb",
  muted: "#a1b4a7",
  "icon-muted": "#849d8d",
  border: "#2c4035",
  "border-subtle": "#25392e",
  "border-strong": "#4b705b",
  accent: "#6ee7b7",
  "accent-hover": "#a7f3d0",
  "on-accent": "#0a2b20",
  "accent-subtle": "#1d3c2d",
  "accent-text": "#96e9b7",
  "accent-indicator": "#6ee7b7",
  "selection-background": "#34644d",
  "selection-text": "#f0fdf4",
  "problem-background": "#1d3022",
  "problem-border": "#354e37",
  "problem-title": "#e2f1dc",
  "problem-text": "#b2c8a9",
  "problem-accent": "#a4cf8e",
  "problem-tag": "#30452b",
  "problem-footer": "#243827",
  "difficulty-background": "#30492b",
  "difficulty-border": "#46633c",
  "difficulty-text": "#c0e5a7",
  "number-background": "#36422c",
  "number-border": "#5a6745",
  "number-text": "#e0e5bc",
  "number-shadow": "#131f12",
  "number-secondary-background": "#30452b",
  "number-secondary-border": "#4d6943",
  "number-secondary-text": "#c3dfb0",
  "number-secondary-shadow": "#172713",
  "avatar-sage-background": "#304c39",
  "avatar-sage-text": "#c4e5c9",
  "avatar-blue-background": "#293f5b",
  "avatar-blue-text": "#bbd8ff",
  "avatar-rose-background": "#54323f",
  "avatar-rose-text": "#f6c3d2",
  "mark-blue-background": "#243c4e",
  "mark-blue-text": "#a2d4f5",
  "mark-ink-background": "#303b3d",
  "mark-ink-text": "#d2dee1",
  "mark-sand-background": "#423b29",
  "mark-sand-text": "#ebcf97",
  "mark-sage-background": "#2c412b",
  "mark-sage-text": "#bfdbad",
  "mark-rose-background": "#493036",
  "mark-rose-text": "#efb7bd",
  "chart-yellow": "#f2cf6b",
  "chart-blue": "#74bfe7",
  "chart-rose": "#eea197",
  "tooltip-background": "#d7e8dd",
  "tooltip-text": "#182623",
  overlay: "#030a07b3",
  "shadow-subtle": "#00000026",
  "shadow-elevated": "#00000040",
  "shadow-dialog": "#00000066",
  "avatar-ring": "#ffffff0a",
  success: "#b0df99",
  error: "#f5a4a4",
  skeleton: "#293d31",
};

export const themes = { light: lightTheme, dark: darkTheme };

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

// Rendered on the server so every route and portal has tokens before hydration.
// The :root fallback uses :where() (zero specificity) so an explicit
// data-theme always wins, whichever palette is the default or comes last.
export const themeStyles = Object.entries(themes)
  .map(([name, tokens]) => {
    const selector =
      name === defaultTheme
        ? `:where(:root), [data-theme="${name}"]`
        : `[data-theme="${name}"]`;
    const variables = Object.entries(tokens)
      .map(([key, value]) => `--${key}:${value};`)
      .join("");
    return `${selector}{color-scheme:${name};${variables}}`;
  })
  .join("\n");

// Runs before first paint to avoid flashing the light palette on a dark reload.
export const themeInitScript = `(() => {
  let theme = ${JSON.stringify(defaultTheme)};
  try {
    const saved = localStorage.getItem(${JSON.stringify(themeStorageKey)});
    if (saved === "light" || saved === "dark") theme = saved;
  } catch {}
  document.documentElement.dataset.theme = theme;
})();`;
