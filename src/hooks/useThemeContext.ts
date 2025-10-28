import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext/ThemeContext";

export const useThemeContext = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("Must be wrapped with ThemeContext.Provider!");
  }

  return {
    toggleTheme: themeContext.toggleTheme,
    theme: themeContext.theme,
  };
};
