import { createContext } from "react";

export type Theme = "light" | "dark";

interface ThemeContextType {
  toggleTheme: () => void;
  theme: Theme;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
